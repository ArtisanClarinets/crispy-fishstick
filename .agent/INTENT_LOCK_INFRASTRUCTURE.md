# INTENT_LOCK_INFRASTRUCTURE.md

## Goal
Implement the "Infrastructure / Truth Engine" module (Hub, Academy, Estimator, Configurator) with Fortune-500 grade quality, security, and "proof-first transparency".

## Acceptance Criteria
- [ ] Public routes active: /infrastructure, /infrastructure/academy, /infrastructure/estimator, /infrastructure/configurator, /c/[code].
- [ ] /lab/server-config backward compatibility maintained (redirect or wrapper).
- [ ] "Proof-first transparency": recommendations show math, constraints, and tradeoffs.
- [ ] API endpoints hardened: origin check, rate limit, Zod validation, no-store, normalized errors.
- [ ] "Save build" shortlink: 48h TTL, server-side snapshot (immutable).
- [ ] Reservation TTL: 15m scaffolding.
- [ ] CFO Defense Pack v1: Gated export with HTML report.
- [ ] Tests: Unit tests for math/validation, E2E for critical path.
- [ ] Docs: Updated and accurate.

## Invariants (Must Not Break)
- [ ] Logic must never break (build/lint/test gates).
- [ ] Security first: CSP, headers, proxy.ts boundary, origin checks.
- [ ] Server is control plane: Client validation is UX only.
- [ ] No scope creep: Minimal implementation for requirements.
- [ ] Wiring integrity: Routes, nav, sitemap, API contracts.

## Plan
1.  **Phase 0: Baseline & Intent Lock** (Done)
2.  **Phase 1: Pre-flight Fix + Harden Existing Lab API**
    -   Fix `z.any()` in `lib/server-config/schema.ts`.
    -   Harden `app/api/server-config/recommend/route.ts`.
    -   Update `intent-form.tsx` for error handling.
3.  **Phase 2: Public Routes + Navigation + Sitemap**
    -   Create directory structure and pages.
    -   Update `sitemap.ts` and `header.tsx`.
4.  **Phase 3: Academy (MDX)**
    -   Create content and components.
5.  **Phase 4: Estimator**
    -   Create wizard and logic.
6.  **Phase 5: Configurator**
    -   Enhance configurator with persistent context and validation.
7.  **Phase 6: Save Build + Reservation**
    -   Prisma migrations.
    -   API endpoints.
8.  **Phase 7: CFO Defense Pack**
    -   Lead capture and report generation.
9.  **Phase 8: Tests + Docs**
    -   Verification and documentation.
