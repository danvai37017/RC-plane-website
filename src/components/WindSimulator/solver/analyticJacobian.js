/**
 * analyticJacobian.js — the derivative blocks that can be written down exactly.
 *
 * Every block here is checked against the finite-difference reference in
 * jacobian.js before it is used for anything. That is the rule for this phase:
 * no analytic derivative is accepted until it agrees with the reference, and a
 * block that has not been derived is left to finite differences rather than
 * guessed at.
 *
 * ## What is here, and what is not
 *
 * The panel and coupling blocks are here, and they are exact rather than
 * approximate — the influence matrices *are* the derivatives, because the
 * tangency and edge-velocity equations are linear in the sheet strengths and in
 * the transpiration source. So is the source's own dependence on the boundary
 * layer: the transpiration is a fixed linear operator applied to the mass
 * defect, so its derivative is that operator times a diagonal.
 *
 * That is the whole of the viscous-inviscid coupling, which is the part that
 * matters most. The tangency, Ue and wake-Ue blocks are what carry the gap
 * between the two halves of the solver, they are the blocks the residual study
 * shows to be the only non-zero ones at the current solver's answer, and they
 * are dense — so having them exactly and for free is the difference between a
 * Newton step costing one matrix build and costing fifteen hundred residual
 * evaluations.
 *
 * The boundary-layer marching blocks are *not* here. dR_theta/dUe and its
 * relatives require differentiating an explicit, adaptively sub-stepped march
 * with rate limiters and a blended transition region, which is a substantial
 * piece of work in its own right and is the natural next task. They are
 * reported as "not derived" rather than approximated, and the Newton framework
 * can take them from finite differences in the meantime — they are lower
 * triangular in the streamwise index, so column-wise differencing of one stream
 * at a time is affordable in a way a full dense difference is not.
 *
 * ## The two columns that are not exact
 *
 * Three blocks — the Ue columns of the tangency, Ue and wake-Ue rows — agree
 * with the reference everywhere except at two panels, and those two are the
 * ones bracketing the stagnation point. Measured on NACA 0012 at four degrees
 * with sixty panels, they carry 100.0% of the disagreement; every other column
 * matches to 1e-13.
 *
 * The reason is that the stagnation point is not only located at a panel index,
 * it is *interpolated* between two panels: its arc length is
 *
 *   s_stag = s_i + f (s_{i+1} - s_i),   f = -Ue_i / (Ue_{i+1} - Ue_i)
 *
 * and every station's arc length on both streams is measured from it. So
 * perturbing the edge velocity at either bracketing panel slides the entire
 * arc-length coordinate, which changes every weight of the non-uniform
 * derivative stencil, which changes the transpiration source at every station.
 * The derivative exists and is perfectly well defined; it is simply a global
 * term from a local perturbation, and deriving it means differentiating the
 * stencil weights of two whole streams with respect to one scalar.
 *
 * It is left undone rather than approximated. `stagnationColumns` reports which
 * columns are affected so a Newton implementation can fill exactly those two by
 * finite differences — two extra residual evaluations against the fifteen
 * hundred a dense difference would cost, which is a price worth paying to keep
 * the rest exact and to avoid a hand-derived term that would be hard to check.
 *
 * ## Non-smoothness
 *
 * Several derivatives here are exactly zero on one side of a threshold and
 * non-zero on the other: a clamped transpiration source contributes nothing,
 * and a separated station's mass defect uses a frozen edge velocity rather than
 * its own. Those are honest one-sided derivatives, and they match what a finite
 * difference reports as long as the perturbation does not straddle the
 * threshold. Where it does, neither is right and the smoothness probe says so.
 */

import { findStagnation, streamLayout, SIGMA_MAX } from './boundaryLayer.js';

/**
 * State-vector columns whose analytic derivative is incomplete, and which a
 * Newton implementation should fill from finite differences.
 *
 * The two panels bracketing the stagnation point; see the note above. Returned
 * as global column indices so the caller can patch them without knowing the
 * layout.
 */
export function stagnationColumns(ctx, state) {
  const i = ctx.info.stagnationIndex;
  if (i < 0) return [];
  const off = state.layout.ue.offset;
  const cols = [off + i];
  if (i + 1 < ctx.n) cols.push(off + i + 1);
  return cols;
}

/** Which blocks this module derives. Everything else is left to finite differences. */
export const DERIVED_BLOCKS = [
  ['tangency', 'gamma'],
  ['tangency', 'ue'],
  ['tangency', 'dstar'],
  ['tangency', 'dstarWake'],
  ['tangency', 'ueWake'],
  ['kutta', 'gamma'],
  ['ue', 'gamma'],
  ['ue', 'ue'],
  ['ue', 'dstar'],
  ['ue', 'dstarWake'],
  ['ue', 'ueWake'],
  ['ueWake', 'gamma'],
  ['ueWake', 'ueWake'],
  ['ueWake', 'ue'],
  ['ueWake', 'dstar'],
  ['ueWake', 'dstarWake'],
  ['theta', 'theta'],
  ['thetaWake', 'thetaWake'],
  ['dstar', 'dstar'],
  ['dstarWake', 'dstarWake'],
  ['H', 'H'],
  ['HWake', 'HWake'],
  ['cf', 'cf'],
  ['xtr', 'xtr'],
];

/**
 * Coefficients of the three-point non-uniform derivative at index `j` of a
 * length-`K` array, as the triple (index, weight).
 *
 * This is the same stencil `derivative` in boundaryLayer.js applies; written
 * out as weights so it can be composed into a matrix rather than only applied
 * to a vector. Any change to that function must be mirrored here, which is
 * exactly the sort of duplication the finite-difference check exists to catch.
 */
function stencil(sArr, j, K, out) {
  out.length = 0;
  if (K < 2) return out;
  if (j === 0) {
    const h = sArr[1] - sArr[0];
    if (h > 1e-12) out.push([0, -1 / h], [1, 1 / h]);
    return out;
  }
  if (j === K - 1) {
    const h = sArr[j] - sArr[j - 1];
    if (h > 1e-12) out.push([j - 1, -1 / h], [j, 1 / h]);
    return out;
  }
  const h1 = sArr[j] - sArr[j - 1];
  const h2 = sArr[j + 1] - sArr[j];
  if (!(h1 > 1e-12 && h2 > 1e-12)) return out;
  out.push(
    [j - 1, -h2 / (h1 * (h1 + h2))],
    [j, (h2 - h1) / (h1 * h2)],
    [j + 1, h1 / (h2 * (h1 + h2))]
  );
  return out;
}

/**
 * Derivatives of the transpiration source with respect to the state.
 *
 * The source on a stream is
 *
 *   sigma_k = D_k [ m ],    m_0 = 0,  m_{l+1} = Ue_eff,l * delta*_l
 *
 * with D the three-point stencil above and Ue_eff the edge velocity, frozen at
 * its pre-separation value inside a separated region. Both factors of the
 * product are state variables, so
 *
 *   d sigma_k / d delta*_l = D_k[l+1] * Ue_eff,l
 *   d sigma_k / d Ue_l     = D_k[l+1] * delta*_l     (attached stations only)
 *
 * and for a separated station the Ue dependence transfers to the single
 * upstream station whose velocity was frozen.
 *
 * Written into `dSigma_dDstar` and `dSigma_dUe` as dense n-by-n blocks in panel
 * indexing, which is small enough not to be worth a sparse structure and much
 * easier to check.
 */
function transpirationDerivatives(ctx, state, sigmaClampMask) {
  const { geo, n, nw, wake } = ctx;
  const v = state.views;
  const dSdD = new Float64Array(n * n);
  const dSdU = new Float64Array(n * n);
  const stag = findStagnation(geo, v.ue);
  const sten = [];

  for (let slot = 0; slot < 2; slot++) {
    const upper = slot === 0;
    const K = streamLayout(geo, stag, v.ue, upper, ctx._idx, ctx._s, ctx._ue, ctx._x);
    if (K < 3) continue;
    const sign = upper ? 1 : -1;

    // ms[0] = 0 is the stagnation point; station l lives at index l+1.
    const ms = ctx._ms;
    ms[0] = 0;
    for (let l = 0; l < K; l++) ms[l + 1] = ctx._s[l];

    // Which station supplied the frozen edge velocity, and where separation began.
    let frozenFrom = -1;
    for (let l = 0; l < K; l++) {
      if (ctx.march.flags[ctx._idx[l]] === 2) {
        frozenFrom = l > 0 ? l - 1 : l;
        break;
      }
    }

    for (let k = 0; k < K; k++) {
      const iRow = ctx._idx[k];
      if (sigmaClampMask[iRow]) continue; // clamped: contributes no derivative
      stencil(ms, k + 1, K + 1, sten);
      for (const [j, w] of sten) {
        if (j === 0) continue; // the stagnation entry is identically zero
        const l = j - 1;
        const iCol = ctx._idx[l];
        const separated = ctx.march.flags[iCol] === 2;
        const ueEff = separated ? ctx._ue[frozenFrom >= 0 ? frozenFrom : l] : ctx._ue[l];

        dSdD[iRow * n + iCol] += w * ueEff;

        // d(Ue_eff)/d(ue) carries the panel-tangent sign, and for a separated
        // station points at the frozen upstream station instead of itself.
        const src = separated && frozenFrom >= 0 ? ctx._idx[frozenFrom] : iCol;
        dSdU[iRow * n + src] += w * v.dstar[iCol] * sign;
      }
    }
  }

  /* ---- Wake ---------------------------------------------------------------
   * sigmaW_p = (Ue_p delta*_p - Ue_{p-1} delta*_{p-1}) / (s_p - s_{p-1}), with
   * the p = 0 term reaching back to the trailing-edge mass defect, which is
   * itself the sum of the two surface layers' contributions. */
  const dSWdDW = new Float64Array(nw * nw);
  const dSWdUW = new Float64Array(nw * nw);
  let prevS = 0;
  for (let p = 0; p < nw; p++) {
    const den = wake.s[p] - prevS;
    prevS = wake.s[p];
    if (!(den > 1e-12)) continue;
    const uP = Math.abs(v.ueWake[p]) > 1e-7 ? Math.sign(v.ueWake[p]) : 0;
    dSWdDW[p * nw + p] += (Math.max(Math.abs(v.ueWake[p]), 1e-7) * 1) / den;
    dSWdUW[p * nw + p] += (uP * v.dstarWake[p]) / den;
    if (p > 0) {
      const uM = Math.abs(v.ueWake[p - 1]) > 1e-7 ? Math.sign(v.ueWake[p - 1]) : 0;
      dSWdDW[p * nw + (p - 1)] -= Math.max(Math.abs(v.ueWake[p - 1]), 1e-7) / den;
      dSWdUW[p * nw + (p - 1)] -= (uM * v.dstarWake[p - 1]) / den;
    }
  }

  /* ---- The wake's trailing-edge handover ----------------------------------
   * The first wake panel's source differences against the mass defect arriving
   * from the surface, mTE = mean(Ue_TE) * (delta*_upperTE + delta*_lowerTE),
   * so it depends on the *surface* displacement thickness and edge velocity at
   * the two trailing-edge panels — not only on wake quantities.
   *
   * Omitting this was the single error in an earlier version of this module,
   * and it is worth recording how it presented: eighteen of twenty-four derived
   * blocks matched the finite-difference reference to 1e-11 while six did not,
   * and the six were exactly those routing through the transpiration chain.
   * Checking the transpiration derivatives on their own showed them correct to
   * 1e-9, which located the fault in the chaining rather than the closure, and
   * the two offending columns were the two trailing-edge panels. A block-by-
   * block comparison is what made that a twenty-minute search instead of a
   * rewrite. */
  const dSWdDs = new Float64Array(nw * n);
  const dSWdUs = new Float64Array(nw * n);
  if (nw > 0 && wake.s[0] > 1e-12) {
    const inv = -1 / wake.s[0]; // only p = 0 sees mTE
    const iUpper = n - 1;
    const iLower = 0;
    const ueUpper = Math.max(v.ue[iUpper], 1e-7);
    const ueLower = Math.max(-v.ue[iLower], 1e-7);
    const ueMean = 0.5 * (ueUpper + ueLower);
    const dstarTE = v.dstar[iUpper] + v.dstar[iLower];

    dSWdDs[0 * n + iUpper] = inv * ueMean;
    dSWdDs[0 * n + iLower] = inv * ueMean;
    // The lower stream's edge speed is the negated panel-tangent velocity.
    dSWdUs[0 * n + iUpper] = inv * 0.5 * dstarTE;
    dSWdUs[0 * n + iLower] = inv * 0.5 * dstarTE * -1;
  }

  return { dSdD, dSdU, dSWdDW, dSWdUW, dSWdDs, dSWdUs };
}

/**
 * Assemble the derived blocks into a dense Jacobian, leaving the rest zero.
 *
 * `mask` reports which (residual, state) block pairs were actually written, so
 * a comparison against the finite-difference reference can restrict itself to
 * them rather than reporting every underived block as a failure.
 */
export function assembleAnalyticJacobian(ctx, state, params) {
  // A clamped source is flat in every direction, so those rows contribute
  // nothing. Read off the source the last residual evaluation produced rather
  // than recomputed, so the mask and the residual always agree about which
  // stations were limited.
  const sigmaClampMask = new Uint8Array(ctx.n);
  for (let i = 0; i < ctx.n; i++) {
    sigmaClampMask[i] = Math.abs(ctx.sigma[i]) >= SIGMA_MAX * (1 - 1e-12) ? 1 : 0;
  }

  const { sys, wakeInf, n, nw, layout } = ctx;
  const { AVN, AVT, SN, ST, m: mDim } = sys;
  const { WN, WT, KV, KS, KW } = wakeInf;
  const sl = state.layout;
  const dim = state.dim;
  const J = new Float64Array(dim * dim);

  const { dSdD, dSdU, dSWdDW, dSWdUW, dSWdDs, dSWdUs } =
    transpirationDerivatives(ctx, state, sigmaClampMask);

  const tang = layout.tangency.offset;
  const ueR = layout.ue.offset;
  const ueWR = layout.ueWake.offset;

  /* ---- Panel blocks in gamma: the influence matrices, exactly -------------- */
  for (let i = 0; i < n; i++) {
    const rowT = (tang + i) * dim + sl.gamma.offset;
    const rowU = (ueR + i) * dim + sl.gamma.offset;
    const src = i * mDim;
    for (let k = 0; k < mDim; k++) {
      J[rowT + k] = AVN[src + k];
      J[rowU + k] = -AVT[src + k];
    }
  }
  for (let p = 0; p < nw; p++) {
    const row = (ueWR + p) * dim + sl.gamma.offset;
    const src = p * mDim;
    for (let k = 0; k < mDim; k++) J[row + k] = -KV[src + k];
  }

  // Kutta: gamma_0 + gamma_n.
  const kRow = layout.kutta.offset * dim + sl.gamma.offset;
  J[kRow + 0] = 1;
  J[kRow + n] = 1;

  /* ---- Coupling blocks: chain the source derivatives through the influence
   * matrices. R_tangency = ... + SN sigma - sigma, so the surface block picks
   * up the -I; the Ue rows have no such term. */
  for (let i = 0; i < n; i++) {
    const rowT = (tang + i) * dim;
    const rowU = (ueR + i) * dim;
    for (let l = 0; l < n; l++) {
      let aT = 0;
      let aU = 0;
      for (let j = 0; j < n; j++) {
        const dD = dSdD[j * n + l];
        if (dD !== 0) {
          aT += (SN[i * n + j] - (i === j ? 1 : 0)) * dD;
          aU += ST[i * n + j] * dD;
        }
      }
      // ... plus the wake source's dependence on this surface station, which
      // is non-zero only at the two trailing-edge panels.
      let bT = 0;
      let bU = 0;
      for (let w = 0; w < nw; w++) {
        const dW = dSWdDs[w * n + l];
        if (dW !== 0) {
          bT += WN[i * nw + w] * dW;
          bU += WT[i * nw + w] * dW;
        }
      }
      J[rowT + sl.dstar.offset + l] = aT + bT;
      J[rowU + sl.dstar.offset + l] = -(aU + bU);
    }
    for (let l = 0; l < n; l++) {
      let aT = 0;
      let aU = 0;
      for (let j = 0; j < n; j++) {
        const dU = dSdU[j * n + l];
        if (dU !== 0) {
          aT += (SN[i * n + j] - (i === j ? 1 : 0)) * dU;
          aU += ST[i * n + j] * dU;
        }
      }
      let bT = 0;
      let bU = 0;
      for (let w = 0; w < nw; w++) {
        const dW = dSWdUs[w * n + l];
        if (dW !== 0) {
          bT += WN[i * nw + w] * dW;
          bU += WT[i * nw + w] * dW;
        }
      }
      J[rowT + sl.ue.offset + l] = aT + bT;
      J[rowU + sl.ue.offset + l] = -(aU + bU);
    }
    // Wake source contributions.
    for (let l = 0; l < nw; l++) {
      let aTD = 0;
      let aUD = 0;
      let aTU = 0;
      let aUU = 0;
      for (let w = 0; w < nw; w++) {
        const dD = dSWdDW[w * nw + l];
        const dU = dSWdUW[w * nw + l];
        if (dD !== 0) {
          aTD += WN[i * nw + w] * dD;
          aUD += WT[i * nw + w] * dD;
        }
        if (dU !== 0) {
          aTU += WN[i * nw + w] * dU;
          aUU += WT[i * nw + w] * dU;
        }
      }
      J[rowT + sl.dstarWake.offset + l] = aTD;
      J[rowU + sl.dstarWake.offset + l] = -aUD;
      J[rowT + sl.ueWake.offset + l] = aTU;
      J[rowU + sl.ueWake.offset + l] = -aUU;
    }
    // The Ue rows carry their own unknown.
    J[rowU + sl.ue.offset + i] += 1;
  }

  /* ---- Wake edge velocity rows -------------------------------------------- */
  for (let p = 0; p < nw; p++) {
    const row = (ueWR + p) * dim;
    for (let l = 0; l < n; l++) {
      let aD = 0;
      let aU = 0;
      for (let j = 0; j < n; j++) {
        const dD = dSdD[j * n + l];
        const dU = dSdU[j * n + l];
        if (dD !== 0) aD += KS[p * n + j] * dD;
        if (dU !== 0) aU += KS[p * n + j] * dU;
      }
      let bD = 0;
      let bU = 0;
      for (let w = 0; w < nw; w++) {
        const dD2 = dSWdDs[w * n + l];
        const dU2 = dSWdUs[w * n + l];
        if (dD2 !== 0) bD += KW[p * nw + w] * dD2;
        if (dU2 !== 0) bU += KW[p * nw + w] * dU2;
      }
      J[row + sl.dstar.offset + l] = -(aD + bD);
      J[row + sl.ue.offset + l] = -(aU + bU);
    }
    for (let l = 0; l < nw; l++) {
      let aD = 0;
      let aU = 0;
      for (let w = 0; w < nw; w++) {
        const dD = dSWdDW[w * nw + l];
        const dU = dSWdUW[w * nw + l];
        if (dD !== 0) aD += KW[p * nw + w] * dD;
        if (dU !== 0) aU += KW[p * nw + w] * dU;
      }
      J[row + sl.dstarWake.offset + l] = -aD;
      J[row + sl.ueWake.offset + l] = -aU;
    }
    J[row + sl.ueWake.offset + p] += 1;
  }

  /* ---- Defect diagonals ---------------------------------------------------
   * Every boundary-layer and closure residual is written as "the state's value
   * minus the marched value", so its derivative with respect to its own
   * unknown is exactly the identity. */
  for (const name of ['theta', 'thetaWake', 'dstar', 'dstarWake', 'H', 'HWake', 'cf', 'xtr']) {
    const { offset, length } = layout[name];
    const so = sl[name].offset;
    for (let i = 0; i < length; i++) J[(offset + i) * dim + so + i] = 1;
  }

  return { J, derived: DERIVED_BLOCKS };
}

/** Test hook: exposes the transpiration derivative blocks for direct verification. */
export function _debugTranspirationDerivatives(ctx, state) {
  const mask = new Uint8Array(ctx.n);
  for (let i = 0; i < ctx.n; i++) mask[i] = Math.abs(ctx.sigma[i]) >= SIGMA_MAX * (1 - 1e-12) ? 1 : 0;
  return transpirationDerivatives(ctx, state, mask);
}
