/**
 * state.js — the canonical nonlinear state vector.
 *
 * There is exactly one authoritative set of unknowns in this solver, and it
 * lives here. Every governing equation reads from this vector; every update
 * writes to it; nothing else owns any of it.
 *
 * ## Why this exists
 *
 * The solver was organised as a sequence of algorithms — panels, then boundary
 * layer, then transition, then repeat — and in that arrangement the unknowns
 * are scattered. The nodal vortex strengths live in the panel solution, the
 * momentum thickness lives in the boundary-layer state, the transition location
 * lives in a two-element array that the boundary layer relaxes internally
 * between calls. Each module solves its own part and hands the answer on.
 *
 * That arrangement cannot be handed to Newton, because Newton does not solve
 * anything in sequence: it needs a single vector x and a single residual R(x),
 * and it needs every unknown to appear exactly once so that dR/dx is a matrix
 * rather than a description of a procedure. Scattered unknowns also make it
 * impossible to say what "the solution" is — the transition relaxation, for
 * instance, is a hidden state that makes two calls with identical inputs return
 * different answers, which is fatal to a finite-difference Jacobian.
 *
 * ## The layout
 *
 * Blocks are contiguous and in a fixed order, so a Jacobian row or column index
 * can always be attributed to a physical quantity and a station — which is what
 * makes a sparsity plot or a derivative-verification report readable rather
 * than a wall of numbers.
 *
 *   gamma       n+1   nodal vortex sheet strength
 *   ue          n     surface edge velocity, signed along the panel tangent
 *   ueWake      nw    wake edge velocity
 *   theta       n     surface momentum thickness
 *   thetaWake   nw
 *   dstar       n     surface displacement thickness
 *   dstarWake   nw
 *   H           n     surface shape factor
 *   HWake       nw
 *   cf          n     surface skin friction coefficient
 *   xtr         2     transition arc length from the stagnation point, per stream
 *
 * H and Cf are algebraically determined — H is the ratio of delta* to theta,
 * and Cf comes from the closure — so they could be eliminated and the system
 * made smaller. They
 * are carried as unknowns anyway because they are the quantities the closure
 * relations are *stated* in, and keeping them explicit means each closure
 * becomes one residual row that can be verified on its own rather than
 * disappearing into the definition of another. A Newton implementation that
 * wants the smaller system can eliminate them later; it is much harder to add
 * them back once the residuals have been written around their absence.
 *
 * ## Nondimensionalisation
 *
 * Everything is on V_inf = chord = 1, as it is everywhere else in the solver.
 * The blocks therefore have genuinely different scales — gamma and ue are order
 * one, theta and delta* are order 1e-3, xtr is order 1e-1 — which matters for
 * any norm taken over the whole vector. `scales()` below reports the natural
 * size of each block so a scaled norm can be formed rather than one dominated
 * by whichever block happens to be largest.
 */

/** Block order. Fixed: index attribution in every diagnostic depends on it. */
const BLOCKS = [
  ['gamma', (n, nw) => n + 1],
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
 * Allocate a canonical state for a given panelling.
 *
 * `views` are `subarray` windows onto the single backing buffer, not copies, so
 * writing through a view and writing through `x` are the same operation. That
 * is deliberate: it removes any possibility of a block and the vector
 * disagreeing about what the state is, which is exactly the failure this module
 * exists to prevent.
 */
export function createState(n, nw) {
  const layout = {};
  let offset = 0;
  for (const [name, size] of BLOCKS) {
    const length = size(n, nw);
    layout[name] = { offset, length };
    offset += length;
  }
  const dim = offset;
  const x = new Float64Array(dim);
  const views = {};
  for (const [name] of BLOCKS) {
    const { offset: o, length: l } = layout[name];
    views[name] = x.subarray(o, o + l);
  }
  return { n, nw, dim, layout, x, views, blockNames: BLOCKS.map(([b]) => b) };
}

/** Which block and local index a global index belongs to. For diagnostics. */
export function locate(state, i) {
  for (const name of state.blockNames) {
    const { offset, length } = state.layout[name];
    if (i >= offset && i < offset + length) return { block: name, index: i - offset };
  }
  return { block: '?', index: -1 };
}

/**
 * Natural magnitude of each block, for forming a scaled norm.
 *
 * Taken from the state itself rather than from constants, because the right
 * scale for the momentum thickness at Re 5e4 and at Re 2e7 differ by an order
 * of magnitude and a hard-coded value would be wrong at one end. A floor keeps
 * a block that happens to be all but zero from dividing the norm by nothing.
 */
export function scales(state, floors = {}) {
  const out = {};
  for (const name of state.blockNames) {
    const v = state.views[name];
    let m = 0;
    for (let i = 0; i < v.length; i++) {
      const a = Math.abs(v[i]);
      if (a > m) m = a;
    }
    out[name] = Math.max(m, floors[name] ?? 1e-6);
  }
  return out;
}

/* ============================================================================
 * Checkpointing
 * ==========================================================================*/

/** Save the current vector. Cheap enough to do every iteration. */
export function checkpoint(state) {
  return { dim: state.dim, x: Float64Array.from(state.x) };
}

/** Restore a saved vector in place, so all views stay valid. */
export function rollback(state, cp) {
  if (!cp || cp.dim !== state.dim) return false;
  state.x.set(cp.x);
  return true;
}

/**
 * Compare two states block by block.
 *
 * Returns the maximum absolute and relative difference in each block, plus
 * where the worst one is. Used to answer "did continuation land on the same
 * solution it started from?" and "which part of the state moved when the
 * initial guess changed?" — both of which are branch questions, and neither of
 * which a single scalar norm can answer.
 */
export function diff(a, b) {
  if (a.dim !== b.dim) return null;
  const out = { byBlock: {}, maxAbs: 0, maxAbsBlock: null };
  for (const name of a.blockNames) {
    const { offset, length } = a.layout[name];
    let mAbs = 0;
    let mRel = 0;
    let at = -1;
    let scale = 0;
    for (let i = 0; i < length; i++) scale = Math.max(scale, Math.abs(b.x[offset + i]));
    scale = Math.max(scale, 1e-30);
    for (let i = 0; i < length; i++) {
      const d = Math.abs(a.x[offset + i] - b.x[offset + i]);
      if (d > mAbs) {
        mAbs = d;
        at = i;
      }
    }
    mRel = mAbs / scale;
    out.byBlock[name] = { maxAbs: mAbs, maxRel: mRel, at };
    if (mAbs > out.maxAbs) {
      out.maxAbs = mAbs;
      out.maxAbsBlock = name;
    }
  }
  return out;
}

/* ============================================================================
 * Bridging to and from the legacy solver arrays
 *
 * The sequential solver is still the thing that produces answers, and will be
 * until Newton replaces it. These two functions are the seam. They exist so the
 * residual can be evaluated at a state the existing solver produced — which is
 * the only way to check the central claim that the residual vanishes there.
 * ==========================================================================*/

/** Fill the canonical state from a converged (or in-progress) legacy solve. */
export function packState(state, sol, bl) {
  const { views } = state;
  views.gamma.set(sol.gamma);
  views.ue.set(sol.ue);
  views.ueWake.set(sol.ueWake);
  views.theta.set(bl.theta);
  views.thetaWake.set(bl.thetaW);
  views.dstar.set(bl.dstar);
  views.dstarWake.set(bl.dstarW);
  views.H.set(bl.H);
  views.HWake.set(bl.HW);
  views.cf.set(bl.cf);
  views.xtr[0] = bl.transitionS[0];
  views.xtr[1] = bl.transitionS[1];
  return state;
}

/** Write the canonical state back onto the legacy arrays. */
export function unpackState(state, sol, bl) {
  const { views } = state;
  sol.gamma.set(views.gamma);
  sol.ue.set(views.ue);
  sol.ueWake.set(views.ueWake);
  bl.theta.set(views.theta);
  bl.thetaW.set(views.thetaWake);
  bl.dstar.set(views.dstar);
  bl.dstarW.set(views.dstarWake);
  bl.H.set(views.H);
  bl.HW.set(views.HWake);
  bl.cf.set(views.cf);
  bl.transitionS[0] = views.xtr[0];
  bl.transitionS[1] = views.xtr[1];
  // Cp follows from the edge velocity and is not an independent unknown.
  for (let i = 0; i < state.n; i++) sol.cp[i] = 1 - views.ue[i] * views.ue[i];
  return state;
}
