# NON_FUNCTIONAL — Client Portal NFRs
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only  
**Priority order:** Security → Performance → Usability

---

## 1) Performance targets (portal)
- Portal pages must feel instant and stable.
- Define and enforce budgets in CI.

Targets (initial):
- LCP < 2.5s (authenticated pages)
- INP < 200ms
- CLS < 0.1

Budgets:
- Avoid large client bundles; Server Components by default
- No third-party trackers
- Images optimized, fonts minimal

---

## 2) Reliability
- Availability targets defined per environment
- Graceful degradation on partial failures
- Idempotent mutations where relevant

---

## 3) Accessibility (WCAG 2.1 AA+)
- Full keyboard navigation
- Visible focus rings
- Form error summaries + inline errors
- Reduced motion supported

---

## 4) Maintainability
- Strict TypeScript
- Zero-warning lint gates
- Test pyramid with E2E for critical flows:
  - login + select org + dashboard
  - ticket creation + message + attachment metadata
  - docs download + hash display
  - billing invoice view

---

## 5) Portability
- Must run on Ubuntu 22.04 + MariaDB behind NGINX
- No vendor lock-in requirements (cloud optional)
