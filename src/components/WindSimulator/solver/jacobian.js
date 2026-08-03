/**
 * jacobian.js — the reference Jacobian, by finite differences.
 *
 * This exists to be right, not to be fast. Every analytic derivative written
 * later will be checked against it block by block, and an analytic block is
 * only accepted once it agrees. Nothing in the production solve path calls it.
 *
 * ## Central differences, and why not forward
 *
 * Forward differences cost half as much and are the usual choice for a
 * throwaway check. They are not good enough to be a *reference*: their
 * truncation error is O(h), so the best achievable accuracy is around the
 * square root of machine epsilon, about 1e-8 relative. An analytic derivative
 * with a genuine 1e-6 error would then be indistinguishable from one with a
 * typo in the third decimal place.
 *
 * Central differences are O(h^2), which balances against round-off at h of
 * order eps^(1/3) and gives roughly 1e-11 relative. That is enough margin to
 * make a disagreement mean something.
 *
 * ## Scaling
 *
 * The state's blocks differ in magnitude by four orders — gamma and Ue are
 * order one, theta and delta* are order 1e-3, and the transition location is
 * order 1e-1. A single absolute step would be a 1e-6 relative perturbation of
 * gamma and a 1e-3 relative perturbation of theta, so the same matrix would be
 * measuring truncation error in one block and round-off in another. Each
 * component therefore gets a step scaled to its own block.
 *
 * ## Non-smoothness
 *
 * This solver's residual is only piecewise differentiable, and the pieces are
 * not incidental:
 *
 *   - the stagnation point is located by an integer panel index, so a small
 *     change in Ue can move it a whole panel;
 *   - the laminar, turbulent and separated closures switch on thresholds in the
 *     shape factor and Thwaites' lambda;
 *   - the transpiration source is clamped, and the shape factor's rate of
 *     change is limited per station.
 *
 * At a point where one of those switches, the derivative does not exist and a
 * finite difference straddling it returns a large meaningless number. Newton
 * would take that at face value. `probeSmoothness` below therefore compares the
 * one-sided differences against each other: where they agree the function is
 * locally smooth and the central difference is a derivative, and where they do
 * not, the column is flagged rather than silently believed.
 */

import { assembleResidual } from './residual.js';
import { scales } from './state.js';

/** Cube root of machine epsilon: the step that balances truncation against round-off. */
const CBRT_EPS = Math.pow(2.220446049250313e-16, 1 / 3);

/**
 * Per-component step size.
 *
 * Scaled by the larger of the component's own magnitude and its block's
 * magnitude. Using the component alone would give a vanishing step wherever the
 * state passes through zero — which the vortex sheet strength does twice, at
 * the two stagnation points — and a vanishing step is pure round-off.
 */
function steps(state, factor = 1) {
  const sc = scales(state);
  const h = new Float64Array(state.dim);
  for (const name of state.blockNames) {
    const { offset, length } = state.layout[name];
    const blockScale = sc[name];
    for (let i = 0; i < length; i++) {
      const own = Math.abs(state.x[offset + i]);
      h[offset + i] = factor * CBRT_EPS * Math.max(own, blockScale);
    }
  }
  return h;
}

/**
 * Dense finite-difference Jacobian, J[i][j] = dR_i/dx_j, stored row-major.
 *
 * `onColumn` is called with each column index as it completes, so a caller can
 * report progress on what is deliberately a slow operation.
 */
export function jacobianFD(ctx, state, params, opts = {}) {
  const dim = state.dim;
  if (dim !== ctx.dim) throw new Error(`state dim ${dim} != residual dim ${ctx.dim}`);

  const J = new Float64Array(dim * dim);
  const h = steps(state, opts.stepFactor ?? 1);
  const Rp = new Float64Array(dim);
  const Rm = new Float64Array(dim);
  const x0 = Float64Array.from(state.x);

  for (let j = 0; j < dim; j++) {
    const hj = h[j];
    state.x[j] = x0[j] + hj;
    assembleResidual(ctx, state, Rp, params);
    state.x[j] = x0[j] - hj;
    assembleResidual(ctx, state, Rm, params);
    state.x[j] = x0[j];

    const inv = 1 / (2 * hj);
    for (let i = 0; i < dim; i++) J[i * dim + j] = (Rp[i] - Rm[i]) * inv;
    if (opts.onColumn) opts.onColumn(j, dim);
  }

  state.x.set(x0);
  return { J, dim, steps: h };
}

/**
 * Where the residual is not differentiable.
 *
 * For each of a sample of columns, compare the forward and backward one-sided
 * derivatives. On a smooth function they agree to O(h); across a switch they do
 * not agree at all. The measure returned is the disagreement relative to the
 * size of the derivative itself, so it is meaningful for a column whose
 * derivative is large as well as for one whose derivative is nearly zero.
 *
 * Sampling rather than sweeping because the point is to characterise, not to
 * enumerate: if one column in twenty is non-smooth, a sample of a hundred finds
 * it, and a full sweep costs three residual evaluations per unknown.
 */
export function probeSmoothness(ctx, state, params, opts = {}) {
  const dim = state.dim;
  const sample = opts.sample ?? 120;
  const stride = Math.max(1, Math.floor(dim / sample));
  const h = steps(state, opts.stepFactor ?? 1);

  const R0 = new Float64Array(dim);
  const Rp = new Float64Array(dim);
  const Rm = new Float64Array(dim);
  const x0 = Float64Array.from(state.x);
  assembleResidual(ctx, state, R0, params);

  const columns = [];
  for (let j = 0; j < dim; j += stride) {
    const hj = h[j];
    state.x[j] = x0[j] + hj;
    assembleResidual(ctx, state, Rp, params);
    state.x[j] = x0[j] - hj;
    assembleResidual(ctx, state, Rm, params);
    state.x[j] = x0[j];

    // Forward and backward one-sided derivatives, and how far apart they are.
    let worst = 0;
    let scale = 0;
    for (let i = 0; i < dim; i++) {
      const fwd = (Rp[i] - R0[i]) / hj;
      const bwd = (R0[i] - Rm[i]) / hj;
      worst = Math.max(worst, Math.abs(fwd - bwd));
      scale = Math.max(scale, Math.abs(fwd), Math.abs(bwd));
    }
    columns.push({ j, mismatch: worst, scale, relative: worst / Math.max(scale, 1e-30) });
  }

  state.x.set(x0);
  const rough = columns.filter((c) => c.relative > (opts.threshold ?? 0.1));
  return {
    columns,
    rough,
    fraction: rough.length / columns.length,
    worst: columns.reduce((a, b) => (b.relative > a.relative ? b : a), columns[0]),
  };
}

/* ============================================================================
 * Structure and comparison
 * ==========================================================================*/

/**
 * Block-level coupling map: for each (residual block, state block) pair, the
 * largest entry of that sub-matrix.
 *
 * This is the sparsity picture at the only granularity that means anything
 * physically. A dense 1491-square matrix of numbers says nothing; a twelve by
 * eleven table saying "the tangency equations depend on gamma and delta* but
 * not on Cf" is a statement about the formulation that can be checked against
 * what the equations were meant to say.
 */
export function blockStructure(J, ctx, state) {
  const table = {};
  for (const rb of ctx.blockNames) {
    const { offset: ro, length: rl } = ctx.layout[rb];
    table[rb] = {};
    for (const cb of state.blockNames) {
      const { offset: co, length: cl } = state.layout[cb];
      let m = 0;
      for (let i = 0; i < rl; i++) {
        const row = (ro + i) * state.dim;
        for (let j = 0; j < cl; j++) {
          const a = Math.abs(J[row + co + j]);
          if (a > m) m = a;
        }
      }
      table[rb][cb] = m;
    }
  }
  return table;
}

/**
 * Compare an analytic Jacobian against the finite-difference reference, block
 * by block.
 *
 * Reports both absolute and relative disagreement per block. Relative alone is
 * misleading where the reference is near zero — a block that should be
 * identically zero and is, in the analytic version, exactly zero, has an
 * infinite relative error against a reference full of 1e-13 round-off. Absolute
 * alone is misleading in the other direction, because the blocks differ in
 * magnitude by orders. Both are reported and a block passes only on the
 * combination.
 */
export function compareJacobians(Jref, Jtest, ctx, state, tol = 1e-4) {
  const dim = state.dim;
  const blocks = [];
  let worstBlock = null;

  for (const rb of ctx.blockNames) {
    const { offset: ro, length: rl } = ctx.layout[rb];
    for (const cb of state.blockNames) {
      const { offset: co, length: cl } = state.layout[cb];
      let maxAbs = 0;
      let refMax = 0;
      let at = null;
      for (let i = 0; i < rl; i++) {
        const row = (ro + i) * dim;
        for (let j = 0; j < cl; j++) {
          const r = Jref[row + co + j];
          const t = Jtest[row + co + j];
          const d = Math.abs(r - t);
          if (Math.abs(r) > refMax) refMax = Math.abs(r);
          if (d > maxAbs) {
            maxAbs = d;
            at = { row: i, col: j };
          }
        }
      }
      const rel = maxAbs / Math.max(refMax, 1e-12);
      const ok = maxAbs < tol || rel < tol;
      const entry = { residual: rb, state: cb, maxAbs, refMax, relative: rel, at, ok };
      blocks.push(entry);
      if (!ok && (!worstBlock || rel > worstBlock.relative)) worstBlock = entry;
    }
  }

  return {
    blocks,
    failed: blocks.filter((b) => !b.ok),
    worstBlock,
    ok: blocks.every((b) => b.ok),
  };
}

/** Condition number estimate of a dense matrix, by power iteration on J and J^T J. */
export function conditionEstimate(J, dim, iterations = 60) {
  const mul = (M, x, out, transpose) => {
    out.fill(0);
    for (let i = 0; i < dim; i++) {
      const row = i * dim;
      if (transpose) {
        const xi = x[i];
        if (xi === 0) continue;
        for (let j = 0; j < dim; j++) out[j] += M[row + j] * xi;
      } else {
        let s = 0;
        for (let j = 0; j < dim; j++) s += M[row + j] * x[j];
        out[i] = s;
      }
    }
  };

  const v = new Float64Array(dim);
  const w = new Float64Array(dim);
  const u = new Float64Array(dim);
  let seed = 1;
  for (let i = 0; i < dim; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    v[i] = seed / 0x7fffffff - 0.5;
  }

  const normalise = (a) => {
    let s = 0;
    for (let i = 0; i < dim; i++) s += a[i] * a[i];
    s = Math.sqrt(s);
    if (s > 0) for (let i = 0; i < dim; i++) a[i] /= s;
    return s;
  };

  // Largest singular value: power iteration on J^T J.
  normalise(v);
  let sMax = 0;
  for (let it = 0; it < iterations; it++) {
    mul(J, v, w, false);
    mul(J, w, u, true);
    sMax = Math.sqrt(normalise(u));
    v.set(u);
  }

  // Smallest singular value is not reachable this way without a solve, so what
  // is reported is a *lower bound* on the condition number from the ratio of
  // the largest singular value to the smallest row norm. Cheap, and enough to
  // separate "well conditioned" from "hopeless"; a genuine estimate needs the
  // factorisation the Newton solve will produce anyway.
  let minRow = Infinity;
  for (let i = 0; i < dim; i++) {
    let s = 0;
    const row = i * dim;
    for (let j = 0; j < dim; j++) s += J[row + j] * J[row + j];
    minRow = Math.min(minRow, Math.sqrt(s));
  }

  return { sMax, minRowNorm: minRow, lowerBound: sMax / Math.max(minRow, 1e-300) };
}
