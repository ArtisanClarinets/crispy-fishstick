# Vantus Admin Backend — Complete Next Steps Plan

**Project**: Vantus Admin Backend (Fortune-500 refactor)
**Last Updated**: 2026-01-09

---

## Original 60 Todos — Completion Status

- ✅ All original 60 items have been completed in the prior backend sweep.
- Verification: See `./.agent/TODO.md` — Status shows Critical Gates (lint/build/tests/migrations) all passing, 20/20 CRUD entity sets complete, and Search/Export/Bulk endpoints implemented.
- This document focuses on remaining polish, frontend integration, documentation, and operational readiness.

---

## High-Level State

- Build: ✅ PASS (production build clean)
- Lint: ✅ PASS (0 errors)
- Tests: ✅ 49/49 passing
- Migrations: ✅ 7 created and applied

---

## Granular Pending Work Outline (with acceptance criteria)

### 1) Admin UI Pagination (cursor-based across all list pages)

Implement pagination controls and URL-driven state for the following pages:

1. Leads list (`/admin/leads`)
2. Services list (`/admin/services`)
3. Incidents list (`/admin/incidents`)
4. Proposals list (`/admin/proposals`)
5. Contracts list (`/admin/contracts`)
6. Content list (`/admin/content`)
7. Media assets list (`/admin/media`)
8. Invoices list (`/admin/invoices`)
9. Projects list (`/admin/projects`)
10. Audit logs list (`/admin/audit`)
11. Time entries list (`/admin/time-entries`)
12. Assignments list (`/admin/assignments`)
13. Role assignments list (`/admin/role-assignments`)
14. Webhook endpoints list (`/admin/webhooks/endpoints`)
15. Webhook deliveries list (`/admin/webhooks/deliveries`)
16. JIT requests list (`/admin/jit/requests`)
17. Global search results (`/admin/search`)

Acceptance criteria per page:
- [ ] Pagination controls (Next/Prev) wired to URLSearchParams (`cursor`, `limit`)
- [ ] Initial load shows skeletons; no layout shift on page transitions
- [ ] Cursor-based backend integration via `buildPaginationResult()` fields
- [ ] E2E test validates page navigation and item persistence across pages
- [ ] Accessibility: controls are keyboard-navigable with ARIA labels

### 2) CSRF Header Integration (frontend)

- [ ] Create `lib/fetchWithCsrf.ts` helper to fetch token from `/api/csrf` and attach `X-CSRF-Token` header for POST/PATCH/DELETE
- [ ] Refactor all admin mutations to use `fetchWithCsrf` (leads, projects, proposals workflow, time-entries approve/reject, bulk ops, role/webhook/jit endpoints)
- [ ] Add unit tests that verify header presence and server 403 behavior when missing
- [ ] Update documentation: usage examples and troubleshooting for expired tokens

### 3) Role-Based UI Rendering (permission-gated components)

- [ ] Implement `useAdmin()` hook utilities (`hasPermission`, `hasRole`, `inTenant`)
- [ ] Gate action buttons (create/delete/restore/approve/reject) per permission
- [ ] Provide disabled state with tooltip message when permissions are insufficient
- [ ] Add component tests for gated rendering across at least 5 pages (e.g., leads, projects, invoices, time-entries, proposals)

### 4) Admin Login Canonicalization

- [ ] Ensure `/admin/login` is canonical (redirect any legacy admin auth routes there)
- [ ] Update docs: point all admin onboarding to `/admin/login`
- [ ] E2E test confirms single canonical login route and access guard redirects

### 5) API Documentation & OpenAPI

- [ ] Create `docs/openapi.yaml` covering all admin endpoints (20 CRUD sets + search/export/bulk + jit + role-assignments + webhooks)
- [ ] Provide example requests/responses and error models
- [ ] Add `scripts/generate-openapi.ts` (optional automation) to keep spec in sync
- [ ] Publish usage guide in `docs/PRODUCTION_DEPLOYMENT.md` and `README.md`

### 6) Job Queue Verification & Documentation

- [ ] Inventory BullMQ queues (names, retry/backoff, dead-letter behavior)
- [ ] Confirm worker process configuration (`config/supervisor` or `config/systemd`)
- [ ] Add health endpoint or dashboard link; set up alerts on failure rate and queue depth
- [ ] Document job lifecycle patterns and operational runbook

### 7) DevOps & Configuration Finalization

- [ ] Finalize `.env.example` with all required variables and brief descriptions
- [ ] Verify `config/systemd/` services and restart policies; add smoke test checklist
- [ ] Verify `config/nginx/` reverse proxy headers (CSP, HSTS, security headers)
- [ ] Verify `config/supervisor/` worker processes and logging rotation
- [ ] Create deployment checklist in `docs/PRODUCTION_DEPLOYMENT.md`

### 8) Security Review & Documentation

- [ ] Generate security checklist covering: CSRF, tenant isolation, soft delete, audit logging, rate limiting, secret management
- [ ] Document secret rotation procedures and audit log retention policy
- [ ] Add vulnerability scanning step to CI (dependency audit)
- [ ] Produce `docs/SECURITY_REVIEW.md` sign-off notes

### 9) E2E Tests Expansion (Playwright)

- [ ] Add pagination navigation tests per page (see Section 1 list)
- [ ] Add CSRF failure/success tests on representative mutation routes
- [ ] Add role-based rendering tests for restricted actions
- [ ] Validate global search behavior across multiple entities

### 10) Load & Performance Testing

- [ ] Select tool (k6 or Artillery) and define target SLOs (p95 < 300ms for list endpoints)
- [ ] Create scenarios for high-volume list endpoints and bulk operations
- [ ] Baseline metrics, document findings, and create follow-up performance issues if needed

### 11) Telemetry & Instrumentation

- [ ] Update `instrumentation.ts` with trace spans for admin mutations and high-traffic list endpoints
- [ ] Add structured logs with correlation IDs and user/tenant tags
- [ ] Document observability setup and dashboards

### 12) Accessibility & UX Polish

- [ ] Ensure keyboard accessibility for table actions and pagination controls
- [ ] Add ARIA roles/labels for critical components (modals, menus)
- [ ] Verify color contrast for admin theme; update `vantus-theme.css` if needed
- [ ] Improve error boundary UX with actionable retry guidance

### 13) Final Deliverables & Release Notes

- [ ] Update `docs/PRODUCTION_DEPLOYMENT.md` with final steps and rollback plan
- [ ] Update `DEPLOYMENT_UPDATE_SUMMARY.md` with migration notes and endpoint diffs
- [ ] Create release notes summarizing backend completion and next steps

---

## Monitoring & Observability (post-deploy)

1. Queue Health
   - BullMQ dashboard monitoring, alerts on queue depth and failure rate, latency tracking

2. Audit Log Review
   - Weekly privilege escalation review; monthly JIT access pattern review; quarterly compliance export

3. Performance Metrics
   - Track API response time percentiles (p50, p95, p99); DB slow query log; CSRF token generation latency

---

## Future Enhancements (Phase 2 — Not Blocking MVP)

- Advanced search (Elasticsearch)
- Real-time notifications (WebSockets)
- Cloud file storage (S3/GCS)
- Advanced rate limiting (Redis sliding window)
- Audit visualization dashboard
- Rich audit diffs (jsondiffpatch)
- Webhook retry/backoff refinements
- Pagination cursor encoding review (e.g., base64)

---

## Stakeholder Communications & Docs

- [ ] Notify platform team of new endpoints and auth patterns
- [ ] Publish API documentation and OpenAPI spec
- [ ] Security review sign-off and compliance approval for audit logs
- [ ] DevOps handoff for monitoring setup and on-call runbooks

---

## Cross-References

- Status baseline and prior completion details: `./.agent/TODO.md` and `./.agent/SESSION_SUMMARY.md`
- Security and deployment notes: `docs/SECURITY_REVIEW.md`, `docs/PRODUCTION_DEPLOYMENT.md`

