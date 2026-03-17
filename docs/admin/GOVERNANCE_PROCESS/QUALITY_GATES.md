# QUALITY_GATES — Zero-Warning Gates (Next.js 16)
**Version:** 1.0.0  
**Date:** 2026-02-21  
**Priority:** Stop‑Ship

---

## 0. Zero warnings rule
Any warning is treated as an error in CI.

## 1. CI gates (required)
- lint (Next.js `next lint` + repo rules) — zero warnings
- typecheck — zero errors
- tests (unit/integration; E2E for critical flows)
- security scans (deps + secrets)
- bundle budgets
- Lighthouse CI (public)
- a11y checks (automated + manual checklist for RC)

## 2. Release candidate (RC) gate
RC blocked unless:
- all CI gates pass
- SECURITY_REVIEW done for release
- PERFORMANCE_BUDGET attached
- ACCESSIBILITY_AUDIT attached
- rollback plan documented

## 3. Waivers
Allowed only with explicit owner signoff + timebox + tracking issue.

