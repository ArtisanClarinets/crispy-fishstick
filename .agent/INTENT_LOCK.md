# Intent Lock: Mobile-First Upgrade & Glowing Lines Hero

## Acceptance Criteria
- [ ] **Homepage Banner**:
    - [ ] No auto-animation loop (remove Waves RAF).
    - [ ] Interactive: Responds to pointer (desktop) and touch (mobile).
    - [ ] Respects `prefers-reduced-motion` (static if set).
    - [ ] Performance: No continuous RAF when idle; clamp DPR on mobile.
- [ ] **Theming**:
    - [ ] Automatic system theme (light/dark).
    - [ ] No flash/hydration jank.
- [ ] **Self-Check**:
    - [ ] Artifacts updated (`.agent/INTENT_LOCK.md`, `.agent/VERIFY.md`).
    - [ ] Visual verification scripts added/updated.
- [ ] **Final Gates**:
    - [ ] `npm run lint` (0 errors/warnings).
    - [ ] `npm run build` (0 errors/warnings).

## "Do Not Broaden Scope" Rules
- No new heavy 3D libraries.
- No loose CSP policies.
- No degradation of accessibility.
- No "random refactors" unrelated to the goal.

## Self-Review Checklist
- [ ] No continuous RAF idle loops in hero background.
- [ ] Light + dark verified.
- [ ] Reduced motion verified.
- [ ] No console errors on home.
- [ ] No CSP regressions.
- [ ] Build + lint clean.
