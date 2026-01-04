# Intent Lock

## Goal
Upgrade Next.js app to mobile-first, theme-aware experience with interactive "glowing lines" hero.

## Acceptance Criteria
### A) Homepage Banner
- [x] Remove auto-animation (idle loop).
- [x] Interactive (pointer/touch).
- [x] Respects prefers-reduced-motion (static).
- [x] Performant (clamp DPR, throttled).

### B) Theming
- [x] Follows system theme (light/dark).
- [x] Banner adapts to theme.

### C) Self-Check
- [x] .agent/INTENT_LOCK.md created.
- [x] .agent/VERIFY.md created.
- [x] Visual verification (screenshots).

### D) Final Gates
- [x] npm run lint (0 errors).
- [x] npm run build (0 errors).

## Guardrails
- No random refactors.
- Keep CSP intact.
- Accessibility first.

## Checklist
- [x] Baseline recorded.
- [x] Signal bus implemented (zustand).
- [x] SignalLinesField implemented.
- [x] Homepage updated.
- [x] Motion package migration (optional - attempted and reverted).
- [x] Visual verification.
- [x] Final lint/build.
