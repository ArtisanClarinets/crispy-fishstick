# The Living Blueprint — Homepage Upgrade Plan

## Repo path reality check
- Requested path: `/mnt/data/crispy-fishstick-main`
- Actual accessible repo root: `/home/meb/crispy-fishstick` (verified via `git rev-parse --show-toplevel`).

## Goal
Replace the repetitive Build Plan card module on the homepage with a scroll-triggered sticky split section (“The Living Blueprint”):
- Desktop (md+): 50/50 layout; left sticky Spline visual; right 7 tall step panels.
- Scroll drives 3D object through **8 phases minimum (0..7)**.
- Mobile (sm): no sticky split; provide accessible fallback (reuse existing BuildPlanModule).

## Key decisions
- Use `framer-motion` scroll progress (`useScroll`) to compute:
  - `progress` in [0,1]
  - `phase` as an integer in [0,7]
- Encapsulate all Spline runtime interaction in `components/spline-blueprint-canvas.tsx`.
- Fail gracefully: if the self-hosted `.splinecode` file is missing or Spline runtime API isn’t available, render a polished CSS fallback (no crashes, no console spam).
- Respect `prefers-reduced-motion`: snap only on phase changes (no per-frame scrubbing).
- Performance: lazy-mount Spline canvas via IntersectionObserver.

## Work sequence
1) Baseline: install/build/lint/e2e; capture outputs.
2) Read required files before edits.
3) Add Spline deps.
4) Implement `SplineBlueprintCanvas` + `LivingBlueprintSection`.
5) Wire into `app/page.tsx` (hero preview links to section).
6) Update Playwright tests to assert section/panels exist (no WebGL dependency).
7) Rerun lint/build/e2e; then dev server + manual verification.
