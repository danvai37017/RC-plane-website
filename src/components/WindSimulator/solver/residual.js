/**
 * residual.js — the governing equations, as one nonlinear residual R(x).
 *
 * The solver's answers still come from the sequential fixed-point loop in
 * coupling.js. This module does not replace it. What it does is state the same
 * physics in the form Newton needs: a single vector-valued function of a single
 * state vector, whose root is the solution.
 *
 * That distinction matters more than it sounds. A sequence of algorithms has no
 * well-defined notion of "how wrong is this answer" — each stage is exact given
 * its inputs, and the error lives in the disagreement between stages, which
 * nothing measures directly. A residual makes that disagreement the primary
 * object: R(x) is exactly the amount by which the governing equations fail to
 * hold at x, one number per equation, attributable to a specific physical
 * relation at a specific station.
 *
 * ## The blocks
 *
 * R has the same dimension as x, and the blocks pair up with the state blocks
 * they determine:
 *
 *   tangency    n    flow tangency with transpiration, determining gamma
 *   kutta       1    equal-and-opposite sheet strength at the trailing edge
 *   ue          n    edge velocity equals the tangential velocity the sheets induce
 *   ueWake      nw   the same, on the wake line
 *   theta       n    von Karman momentum integral, as integrated by the marcher
 *   thetaWake   nw
 *   dstar       n    displacement thickness from the closure
 *   dstarWake   nw
 *   H           n    shape-factor closure
 *   HWake       nw
 *   cf          n    skin-friction closure
 *   xtr         2    amplification has reached n_crit exactly at x_tr
 *
 * ## Defect form, and why
 *
 * The boundary-layer blocks are written as defects — theta minus the theta the
 * marcher produces from the state's edge velocity — rather than as the
 * differenced momentum equation at each station.
 *
 * This is a deliberate and consequential choice. The textbook route for a
 * Newton coupling is to discretise the momentum and entrainment equations
 * implicitly, two-point, so each station's residual involves only itself and
 * its upstream neighbour and the Jacobian is banded. That is what XFOIL does,
 * and it is the better long-run formulation.
 *
 * It is not what the physics in this repository currently is. The marcher is
 * explicit, adaptively sub-stepped, and carries several rate limiters and a
 * blended transition region that exist because measurement showed the
 * un-limited version producing spurious separation bubbles and limit cycles.
 * Re-discretising it implicitly would change all of that, and the previous
 * phase demonstrated at some cost that changing the iteration invalidates the
 * calibration that the validation suite is built on.
 *
 * So the defect form states exactly the physics that is there. Its price is the
 * Jacobian: because marching is causal, dR_theta/dUe is dense lower-triangular
 * in the streamwise index rather than bidiagonal. That is a real cost and it is
 * the main thing an eventual implicit re-discretisation would buy back. It is
 * recorded here so the choice is visible rather than inherited.
 *
 * ## What R measures at the current solver's answer
 *
 * Not zero, and the pattern is the point. The boundary-layer blocks vanish to
 * machine precision, because the state was produced by the same marcher this
 * calls. The tangency, Ue and transition blocks do not, because the panel solve
 * used the *previous* iteration's transpiration source while the state carries
 * the current one, and because the transition location is relaxed rather than
 * satisfied. Those non-zero blocks are the coupling gap and the transition lag,
 * now measured per equation instead of inferred from a scalar.
 */

import {
  findStagnation,
  streamLayout,
  streamTranspiration,
  marchStream,
  marchWake,
  wakeTranspiration,
} from './boundaryLayer.js';
import { getTransitionModel } from './transition.js';

/** Residual block order. Mirrors the state layout; see state.js. */
const RESIDUAL_BLOCKS = [
  ['tangency', (n) => n],
  ['kutta', () => 1],
  ['ue', (n) => n],
  ['ueWake', (n, nw) => nw],
  ['theta', (n) => n],
  ['thetaWake', (n, nw) => nw],
  ['dstar', (n) => n],
  ['dstarWake', (n, nw) => nw],
  ['H', (n) => n],
  ['HWake', (n, nw) => nw],
  ['cf', (n) => n],
  ['xtr', () => 2],
];

/**
 * Allocate everything a residual evaluation needs.
 *
 * All scratch is pre-allocated and reused, because the finite-difference
 * Jacobian calls this once per column — one to two thousand times per matrix —
 * and an allocation per call would dominate.
 */
export function createResidualContext(sys, wakeInf, n, nw) {
  const layout = {};
  let offset = 0;
  for (const [name, size] of RESIDUAL_BLOCKS) {
    const length = size(n, nw);
    layout[name] = { offset, length };
    offset += length;
  }

  return {
    sys,
    wakeInf,
    geo: sys.geo,
    wake: wakeInf.wake,
    n,
    nw,
    dim: offset,
    layout,
    blockNames: RESIDUAL_BLOCKS.map(([b]) => b),
    // Transpiration implied by the state, which is what couples the boundary
    // layer back into the panel equations.
    sigma: new Float64Array(n),
    sigmaWake: new Float64Array(nw),
    // Marched boundary layer, evaluated at the state's edge velocity.
    march: {
      theta: new Float64Array(n),
      dstar: new Float64Array(n),
      H: new Float64Array(n),
      cf: new Float64Array(n),
      flags: new Uint8Array(n),
      thetaWake: new Float64Array(nw),
      dstarWake: new Float64Array(nw),
      HWake: new Float64Array(nw),
      xtr: new Float64Array(2),
    },
    // Per-stream scratch, in stream order.
    _idx: new Int32Array(n),
    _s: new Float64Array(n),
    _ue: new Float64Array(n),
    _x: new Float64Array(n),
    _dstar: new Float64Array(n),
    _sig: new Float64Array(n),
    _m: new Float64Array(n + 2),
    _ms: new Float64Array(n + 2),
    _out: {
      theta: new Float64Array(n),
      dstar: new Float64Array(n),
      H: new Float64Array(n),
      cf: new Float64Array(n),
      reTheta: new Float64Array(n),
      state: new Uint8Array(n),
    },
    // Diagnostics from the last evaluation.
    info: { stagnationIndex: -1, separatedStations: 0, clamped: 0 },
  };
}

/** Which residual block and station a global row belongs to. */
export function locateResidual(ctx, i) {
  for (const name of ctx.blockNames) {
    const { offset, length } = ctx.layout[name];
    if (i >= offset && i < offset + length) return { block: name, index: i - offset };
  }
  return { block: '?', index: -1 };
}

/* ============================================================================
 * Assembly
 * ==========================================================================*/

/**
 * Evaluate R(x) into `R`.
 *
 * Pure: the same state and the same parameters give the same residual, every
 * time. That is not a stylistic preference — a finite-difference Jacobian is
 * meaningless without it, and the transition relaxation the sequential solver
 * carries between calls is precisely the kind of hidden state that would make
 * column j of the Jacobian depend on how many times column j-1 had been
 * evaluated. Here the transition location is an unknown in x, so there is
 * nothing left to remember.
 */
export function assembleResidual(ctx, state, R, params) {
  const { sys, wakeInf, geo, wake, n, nw, layout, march } = ctx;
  const { AVN, AVT, SN, ST, m: mDim } = sys;
  const { WN, WT, KV, KS, KW } = wakeInf;
  const v = state.views;

  const nu = 1 / Math.max(params.re, 1);
  const tmodel = getTransitionModel(params.transitionModel ?? 'en', params.nCrit);
  const vx = Math.cos(params.alphaRad);
  const vy = Math.sin(params.alphaRad);

  R.fill(0);
  let clamped = 0;
  let separated = 0;

  /* ---- Boundary layer, marched at the state's edge velocity --------------- */
  const stag = findStagnation(geo, v.ue);
  ctx.info.stagnationIndex = stag.index;

  const streamTE = [0, 0]; // theta, dstar at the trailing edge, summed over streams
  let ueTESum = 0;

  for (let slot = 0; slot < 2; slot++) {
    const upper = slot === 0;
    const K = streamLayout(geo, stag, v.ue, upper, ctx._idx, ctx._s, ctx._ue, ctx._x);
    if (K < 3) {
      march.xtr[slot] = v.xtr[slot];
      continue;
    }

    /* Two marches, for two different questions.
     *
     * The first is unforced and answers "where does the amplification integral
     * reach n_crit, given this edge velocity?" — which is the transition
     * equation, and the right-hand side of its residual. It has to be a
     * separate march because once transition is forced the criterion stops
     * being integrated at the forced point and the marcher has no crossing to
     * report: evaluating the residual from the forced march alone returned a
     * predicted location of "none", which falls back to the end of the stream
     * and put the transition residual at 1.0 — the full stream length — at
     * every angle, swamping every other block.
     *
     * The second is forced at the location the *state* carries, and answers
     * "what is the boundary layer, given that transition is there?". That is
     * what the theta, delta*, H and Cf residuals are defects against.
     *
     * At the root the two locations coincide, which is exactly the statement
     * that the transition residual has vanished. The sequential solver runs the
     * same pair for the same reason; the only difference is that it closes the
     * gap with a relaxation factor and this makes it an equation. */
    const ev = marchStream(K, ctx._s, ctx._ue, ctx._x, nu, tmodel, ctx._out, -1);
    march.xtr[slot] =
      ev.predictedTransitionS >= 0 ? ev.predictedTransitionS : ctx._s[K - 1];

    const forced = v.xtr[slot] >= 0 && v.xtr[slot] < ctx._s[K - 1] ? v.xtr[slot] : -1;
    if (forced >= 0 && Math.abs(forced - march.xtr[slot]) > 1e-6) {
      marchStream(K, ctx._s, ctx._ue, ctx._x, nu, tmodel, ctx._out, forced);
    }

    for (let k = 0; k < K; k++) {
      const i = ctx._idx[k];
      march.theta[i] = ctx._out.theta[k];
      march.dstar[i] = ctx._out.dstar[k];
      march.H[i] = ctx._out.H[k];
      march.cf[i] = ctx._out.cf[k];
      march.flags[i] = ctx._out.state[k];
      if (ctx._out.state[k] === 2) separated++;
      // Gather the state's displacement thickness into stream order: the source
      // must come from the unknown, not from the march, or the panel equations
      // would not depend on delta* at all and the coupling would drop straight
      // out of the Jacobian.
      ctx._dstar[k] = v.dstar[i];
    }

    clamped += streamTranspiration(
      K, ctx._s, ctx._ue, ctx._dstar, ctx._out.state, ctx._m, ctx._ms, ctx._sig
    );
    for (let k = 0; k < K; k++) ctx.sigma[ctx._idx[k]] = ctx._sig[k];

    // Trailing-edge handover into the wake, taken from the state.
    const iTE = ctx._idx[K - 1];
    streamTE[0] += v.theta[iTE];
    streamTE[1] += v.dstar[iTE];
    ueTESum += ctx._ue[K - 1];
  }
  ctx.info.separatedStations = separated;

  /* ---- Wake --------------------------------------------------------------- */
  const thetaTE = Math.max(streamTE[0], 1e-9);
  const dstarTE = streamTE[1];
  marchWake(nw, wake.s, v.ueWake, thetaTE, dstarTE, {
    theta: march.thetaWake,
    dstar: march.dstarWake,
    H: march.HWake,
  });
  clamped += wakeTranspiration(
    nw, wake.s, v.ueWake, v.dstarWake, 0.5 * ueTESum * dstarTE, ctx.sigmaWake
  );
  ctx.info.clamped = clamped;

  /* ---- Panel equations ----------------------------------------------------
   * Flow tangency with transpiration: the normal velocity at the wall equals
   * the rate at which the growing boundary layer displaces fluid outward,
   * n . V = v_w, rather than vanishing. Written as a residual it is simply the
   * difference between the two sides. */
  const tang = layout.tangency.offset;
  const ueOff = layout.ue.offset;
  for (let i = 0; i < n; i++) {
    let vn = vx * geo.nx[i] + vy * geo.ny[i];
    let vt = vx * geo.tx[i] + vy * geo.ty[i];
    const rowM = i * mDim;
    for (let k = 0; k < mDim; k++) {
      vn += AVN[rowM + k] * v.gamma[k];
      vt += AVT[rowM + k] * v.gamma[k];
    }
    const rowN = i * n;
    for (let j = 0; j < n; j++) {
      vn += SN[rowN + j] * ctx.sigma[j];
      vt += ST[rowN + j] * ctx.sigma[j];
    }
    const rowW = i * nw;
    for (let w = 0; w < nw; w++) {
      vn += WN[rowW + w] * ctx.sigmaWake[w];
      vt += WT[rowW + w] * ctx.sigmaWake[w];
    }
    R[tang + i] = vn - ctx.sigma[i];
    R[ueOff + i] = v.ue[i] - vt;
  }

  // Kutta: the flow leaves the trailing edge at equal speed from both sides.
  // The surface speed is the local sheet strength, and the two nodes meeting at
  // the trailing edge have opposite tangent senses, so equal speeds read as
  // gamma_0 + gamma_N = 0.
  R[layout.kutta.offset] = v.gamma[0] + v.gamma[n];

  const ueWOff = layout.ueWake.offset;
  for (let p = 0; p < nw; p++) {
    let vt = vx * wake.tx[p] + vy * wake.ty[p];
    const rowM = p * mDim;
    for (let k = 0; k < mDim; k++) vt += KV[rowM + k] * v.gamma[k];
    const rowN = p * n;
    for (let j = 0; j < n; j++) vt += KS[rowN + j] * ctx.sigma[j];
    const rowW = p * nw;
    for (let w = 0; w < nw; w++) vt += KW[rowW + w] * ctx.sigmaWake[w];
    R[ueWOff + p] = v.ueWake[p] - vt;
  }

  /* ---- Boundary-layer and closure defects --------------------------------- */
  const pairs = [
    ['theta', v.theta, march.theta],
    ['dstar', v.dstar, march.dstar],
    ['H', v.H, march.H],
    ['cf', v.cf, march.cf],
    ['thetaWake', v.thetaWake, march.thetaWake],
    ['dstarWake', v.dstarWake, march.dstarWake],
    ['HWake', v.HWake, march.HWake],
  ];
  for (const [name, have, want] of pairs) {
    const off = layout[name].offset;
    for (let i = 0; i < have.length; i++) R[off + i] = have[i] - want[i];
  }

  /* ---- Transition ---------------------------------------------------------
   * The amplification integral reaches n_crit exactly at x_tr. Stated as a
   * defect between the location the state carries and the location the march
   * predicts from it, which is the same equation and is what the marcher can
   * actually report. */
  const xtrOff = layout.xtr.offset;
  R[xtrOff] = v.xtr[0] - march.xtr[0];
  R[xtrOff + 1] = v.xtr[1] - march.xtr[1];

  return R;
}

/* ============================================================================
 * Norms
 * ==========================================================================*/

/**
 * Residual norms, whole and per block.
 *
 * The per-block breakdown is the part that earns its keep. A single scalar says
 * the equations do not hold; the breakdown says *which* equations do not hold,
 * and in this solver the answer has consistently been the interesting part —
 * the boundary-layer blocks sit at machine precision while the tangency block
 * carries the whole of the coupling gap.
 */
export function residualNorms(ctx, R) {
  let inf = 0;
  let sumsq = 0;
  let worst = -1;
  const byBlock = {};

  for (const name of ctx.blockNames) {
    const { offset, length } = ctx.layout[name];
    let bInf = 0;
    let bSum = 0;
    let bAt = -1;
    for (let i = 0; i < length; i++) {
      const a = Math.abs(R[offset + i]);
      bSum += a * a;
      if (a > bInf) {
        bInf = a;
        bAt = i;
      }
    }
    byBlock[name] = { inf: bInf, l2: Math.sqrt(bSum), at: bAt, length };
    sumsq += bSum;
    if (bInf > inf) {
      inf = bInf;
      worst = offset + bAt;
    }
  }

  return {
    inf,
    l2: Math.sqrt(sumsq),
    rms: Math.sqrt(sumsq / ctx.dim),
    worstIndex: worst,
    worst: worst >= 0 ? locateResidual(ctx, worst) : null,
    byBlock,
  };
}
