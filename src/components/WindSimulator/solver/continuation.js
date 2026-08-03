/**
 * continuation.js — reaching an operating point by walking to it.
 *
 * Continuation is usually presented as a way to help a solver converge: start
 * somewhere easy, creep toward the hard case, and each step is a small
 * perturbation of the last. That is true here and it is not the reason this
 * module exists.
 *
 * The reason is branch preservation. The branch study in validation/branches.js
 * establishes, by measurement, that this system has one solution below about
 * twelve degrees and several above it. At eighteen degrees, five different
 * starting points produce lift coefficients spanning 0.19 — twelve percent —
 * and the states behind them are qualitatively different, one with the
 * trailing-edge shape factor pinned at the separation criterion of 2.0 and a
 * third of the chord separated, another that has passed through it to 2.35 with
 * half the chord separated. Both satisfy the same equations to the same
 * tolerance. Neither is more converged than the other.
 *
 * A solver with no history has no way to prefer one. Continuation supplies the
 * missing information: the physical branch is the one connected to the
 * attached-flow solution at low incidence, and the way to stay on it is never
 * to leave it. Each step starts from the previous converged state, and the
 * steps are small enough that the previous state is inside the right basin.
 *
 * This matters more once Newton arrives, not less. Newton converges to whatever
 * root lies in the basin of its initial guess, and it converges *fast*, which
 * means it reaches the wrong branch more decisively than a relaxed fixed-point
 * iteration does. Continuation is what makes a Newton solve well-posed as a
 * physical question rather than merely as an algebraic one.
 *
 * ## Interface
 *
 * Deliberately generic. A `driver` supplies three things:
 *
 *   solve(parameter, opts) -> report    corrector at one parameter value
 *   snapshot() -> object                the state the path carries
 *   restore(snapshot)                   put it back
 *
 * and optionally `blend(a, b, t)` for the predictor. Nothing here knows what the
 * parameter is, so the same code continues in angle of attack, Reynolds number
 * or anything else added later.
 */

/** Iteration count the step size aims for: enough to be converging, few enough to be cheap. */
const TARGET_ITERATIONS = 6;

/** Step-size growth and shrink limits per accepted step. */
const GROW_MAX = 1.2;
const SHRINK_MIN = 0.5;

/** A step is retried at half size this many times before the walk gives up. */
const MAX_RETRIES = 6;

/**
 * Largest change in the tracked observable per unit of parameter, above which a
 * step is treated as having left the branch.
 *
 * Two rules were tried before this one and both failed, in opposite directions.
 *
 * Gating on "the corrector converged" stalls the walk at two degrees, because
 * this corrector does not reach its tolerance anywhere in the envelope. Gating
 * on the *growth* of the residual fails too, and less obviously: the residual
 * this corrector achieves rises smoothly by four orders of magnitude from 3e-5
 * at zero incidence to 1e-1 at thirteen, so any multiplier loose enough to
 * permit that ordinary growth is also loose enough to permit the crossing.
 *
 * The discriminator is in solution space, not residual space. Along a branch
 * the lift coefficient changes at the lift-curve slope, about 0.11 per degree
 * and falling toward stall. Crossing to the collapsed branch it drops by 0.5 in
 * a twentieth of a degree — ten per degree, two orders above anything physical.
 * A bound on the rate of change of the observable therefore separates the two
 * cleanly, and it does so using a quantity whose physical scale is known in
 * advance rather than one that has to be calibrated against the corrector's
 * current shortcomings.
 */
const SLOPE_LIMIT = 0.5;

/** Absolute change always tolerated, so a tiny step is not held to a tiny bound. */
const JUMP_FLOOR = 0.06;

function defaultAccept(report, prev, opts, h) {
  const observable = opts.observable ?? ((r) => r.cl);
  const y = observable(report);
  if (!isFinite(report.residual) || !isFinite(y)) return false;
  if (prev.value === undefined) return true;
  const limit = Math.max(opts.jumpFloor ?? JUMP_FLOOR, (opts.slopeLimit ?? SLOPE_LIMIT) * h);
  return Math.abs(y - prev.value) <= limit;
}

/**
 * Walk from `start` to `target`, correcting at every step.
 *
 * Returns the path actually taken, including the steps that failed and were
 * retried, because a continuation that needed six bisections near fifteen
 * degrees is telling you something about the problem that a bare final answer
 * is not.
 */
export function continuate(driver, start, target, opts = {}) {
  const tol = opts.parameterTolerance ?? 1e-9;
  const minStep = opts.minStep ?? 1e-3;
  let step = opts.initialStep ?? Math.min(Math.abs(target - start) || 1, opts.maxStep ?? 2);
  const maxStep = opts.maxStep ?? 2;
  const direction = Math.sign(target - start) || 1;

  const path = [];
  let p = start;

  // Anchor the walk with a converged solution at the starting parameter.
  const first = driver.solve(p, { ...opts.solveOpts, reset: true });
  path.push({ parameter: p, ...first, step: 0, retries: 0, predicted: false });

  // Previous two accepted states, for the linear predictor.
  let prev = { p, snap: driver.snapshot() };
  let prevPrev = null;
  let retries = 0;
  let failures = 0;
  // The branch's current position in observable space, which is what a step is
  // judged against.
  const observable = opts.observable ?? ((r) => r.cl);
  const prevPoint = { value: observable(first) };

  while (Math.abs(target - p) > tol) {
    const remaining = Math.abs(target - p);
    const h = Math.min(step, remaining, maxStep);
    const pNext = p + direction * h;

    /* ---- Predictor ------------------------------------------------------
     * Linear extrapolation along the path: the state at the next parameter is
     * the current state plus the rate of change measured across the last
     * accepted step. On a smooth branch this lands far closer than the current
     * state alone does, which is the whole saving.
     *
     * It is skipped on the first step, when there is no rate to measure, and
     * whenever the driver offers no blend — extrapolating a state one does not
     * understand the structure of is a good way to leave the basin the walk is
     * trying to stay inside. */
    let predicted = false;
    if (prevPrev && driver.blend) {
      const dp = prev.p - prevPrev.p;
      if (Math.abs(dp) > 1e-12) {
        driver.restore(driver.blend(prevPrev.snap, prev.snap, 1 + (direction * h) / dp));
        predicted = true;
      }
    }
    if (!predicted) driver.restore(prev.snap);

    /* ---- Corrector ------------------------------------------------------- */
    const report = driver.solve(pNext, { ...opts.solveOpts, reset: false });
    const accepted = opts.accept
      ? opts.accept(report, prevPoint, h)
      : defaultAccept(report, prevPoint, opts, h);

    if (!accepted && retries < MAX_RETRIES && h > minStep * 1.0001) {
      // Fall back to the last good state and try again with a smaller step.
      // Halving rather than any cleverer rule because the failure has already
      // told us the local scale was wrong by an unknown factor, and a rule that
      // guesses that factor from a failed step is guessing from noise.
      driver.restore(prev.snap);
      step = Math.max(h * 0.5, minStep);
      retries++;
      failures++;
      path.push({ parameter: pNext, ...report, step: h, retries, predicted, rejected: true });
      continue;
    }

    if (!accepted) {
      /* The step cannot be made to work at the smallest permitted size, so the
       * walk stops here rather than stepping anyway.
       *
       * This is the whole point of the module and it is worth being blunt
       * about. Continuing through a step the corrector could not solve does not
       * produce a slightly worse answer on the same branch — measurement shows
       * it produces a confident, well-converged answer on a *different* one. On
       * NACA 0012 at Re 3e6 an earlier version of this accepted a handful of
       * steps with residuals near 1.0 between 13.3 and 13.6 degrees, and came
       * out the other side onto a collapsed branch that then converged to 3e-5
       * and reported a lift coefficient of 0.56 at eighteen degrees against the
       * 1.79 the direct solve gives. Refusing to move is the honest outcome:
       * the caller learns the branch could not be followed past here, which is
       * a fact about the problem, rather than receiving a number from somewhere
       * else entirely. */
      driver.restore(prev.snap);
      path.push({ parameter: pNext, ...report, step: h, retries, predicted, rejected: true });
      return {
        path,
        accepted: path.filter((s) => !s.rejected),
        failures: failures + 1,
        final: path.filter((s) => !s.rejected).pop(),
        reachedTarget: false,
        stalledAt: p,
        reason: `corrector could not converge at ${pNext.toFixed(3)} even at the minimum step of ${minStep}`,
      };
    }

    // Accept.
    p = pNext;
    prevPrev = prev;
    prev = { p, snap: driver.snapshot() };
    path.push({ parameter: p, ...report, step: h, retries, predicted, rejected: false });
    retries = 0;
    prevPoint.value = observable(report);

    /* ---- Adaptive step size ----------------------------------------------
     * Driven by how hard the corrector had to work. A step that converged in
     * two iterations was too timid and the next one can be longer; a step that
     * used the whole budget was near the edge of the basin and the next one
     * must be shorter. The growth cap matters more than the shrink floor —
     * overshooting into a region with a different branch structure is the
     * failure this module exists to prevent, and it is not recoverable by
     * noticing afterwards. */
    const used = Math.max(report.iterations ?? TARGET_ITERATIONS, 1);
    const factor = Math.min(GROW_MAX, Math.max(SHRINK_MIN, TARGET_ITERATIONS / used));
    step = Math.min(Math.max(h * factor, minStep), maxStep);
  }

  return {
    path,
    accepted: path.filter((s) => !s.rejected),
    failures,
    final: path[path.length - 1],
    reachedTarget: Math.abs(p - target) <= tol,
  };
}

/**
 * Linear blend of two snapshots made of Float64Arrays.
 *
 * `t` beyond 1 extrapolates, which is what the predictor wants. Supplied as a
 * default for the common case where a snapshot is a flat bag of typed arrays of
 * matching shape.
 */
export function blendArrays(a, b, t) {
  const out = {};
  for (const key of Object.keys(a)) {
    const va = a[key];
    const vb = b[key];
    if (!(va instanceof Float64Array) || !(vb instanceof Float64Array)) {
      out[key] = vb;
      continue;
    }
    const r = new Float64Array(va.length);
    for (let i = 0; i < va.length; i++) r[i] = va[i] + t * (vb[i] - va[i]);
    out[key] = r;
  }
  return out;
}
