# Admin Backend Refactor - Status Tracker

**Last Updated**: 2026-01-09
**Phase**: Fortune-500 Completion Sprint
**Target**: Complete all remaining features with 0 lint/build/test errors

## Completion Gates (MUST PASS BEFORE END)
- [ ] `npm run lint` → 0 errors
- [ ] `npm run build` → 0 errors  
- [ ] All tests passing
- [ ] Prisma migrations created (not just db push)

---

## A) CRUD API Route Refactoring (Complete Parity)

### Already Complete ✅
- [x] Invoices (list, detail, restore, soft delete)
- [x] Leads (list, detail, restore, soft delete)
- [x] Projects (list, detail, restore, soft delete)
- [x] Tenants (list, detail, soft delete)
- [x] Time entries approval endpoint
- [x] Contracts e-sign initiation
- [x] Media download endpoint
- [x] Proposal to project conversion

### Remaining Routes to Refactor
- [ ] Services (list + detail + restore + soft delete)
- [ ] Incidents (list + detail + restore + soft delete)
- [ ] Proposals (list + detail + restore + soft delete + workflow)
- [ ] Contracts (list + detail - complete with concurrency)
- [ ] Content (list + detail + restore + soft delete)
- [ ] Media (list + detail - complete refactor)
- [ ] Users (list + detail - complete refactor)
- [ ] Audit (list with pagination/filter)
- [ ] Time entries (complete CRUD + list)

---

## B) Admin Login Canonicalization
- [ ] Ensure /admin/login is primary login surface
- [ ] Update NextAuth config pages.signIn
- [ ] Update middleware redirects
- [ ] Deprecate /auth/login safely (redirect or remove)

---

## C) Roles & Permissions Management
- [ ] Create API: GET/POST /api/admin/roles
- [ ] Create API: GET/PATCH/DELETE /api/admin/roles/[id]
- [ ] Create API: GET/POST /api/admin/role-assignments
- [ ] Create API: DELETE /api/admin/role-assignments/[id]
- [ ] Create UI: app/(admin)/admin/(dashboard)/settings/roles/page.tsx
- [ ] Create components: components/admin/roles/*
- [ ] Update settings hub to remove "Coming Soon"
- [ ] Support scoped role assignments (PROJECT/TENANT/GLOBAL)

---

## D) JIT Access Workflow
- [ ] Create API: POST /api/admin/jit/requests
- [ ] Create API: GET /api/admin/jit/requests (list pending)
- [ ] Create API: POST /api/admin/jit/requests/[id]/approve
- [ ] Create API: POST /api/admin/jit/requests/[id]/deny
- [ ] Update lib/admin/guards.ts to check JIT grants
- [ ] Create UI: app/(admin)/admin/(dashboard)/security/jit/page.tsx
- [ ] Implement auto-expiry logic
- [ ] Add audit logging for all JIT actions

---

## E) Proposal Components & Workflow
- [ ] Create API: GET/POST /api/admin/proposal-components
- [ ] Create API: GET/PATCH/DELETE /api/admin/proposal-components/[id]
- [ ] Create API: POST /api/admin/proposals/[id]/submit
- [ ] Create API: POST /api/admin/proposals/[id]/approve
- [ ] Create API: POST /api/admin/proposals/[id]/reject
- [ ] Update proposal-to-project conversion with components
- [ ] Create UI for component library
- [ ] Create UI for proposal approval queue

---

## F) Time Tracking Complete
- [ ] Create API: GET /api/admin/time-entries (list with pagination/filter)
- [ ] Create API: POST /api/admin/time-entries
- [ ] Create API: GET /api/admin/time-entries/[id]
- [ ] Create API: PATCH /api/admin/time-entries/[id]
- [ ] Create API: DELETE /api/admin/time-entries/[id] (soft)
- [ ] Create API: POST /api/admin/time-entries/[id]/reject
- [ ] Create UI: app/(admin)/admin/(dashboard)/time/page.tsx
- [ ] Ensure draft-from-time prevents double billing

---

## G) DevOps Surfaces (Environments/Deployments)
- [ ] Create API: GET/POST /api/admin/environments
- [ ] Create API: GET/PATCH/DELETE /api/admin/environments/[id]
- [ ] Create API: GET/POST /api/admin/deployments
- [ ] Create API: GET /api/admin/deployments/[id]
- [ ] Create API: POST /api/admin/deployments/[id]/promote
- [ ] Create API: POST /api/admin/deployments/[id]/rollback
- [ ] Create UI: environments list/detail pages
- [ ] Create UI: deployments list/detail pages
- [ ] Implement safe command dispatcher (job-based)

---

## H) Global Search + Exports + Bulk Actions
- [ ] Create API: GET /api/admin/search (tenant-scoped)
- [ ] Create component: components/admin/global-search.tsx
- [ ] Integrate search into admin header
- [ ] Create API: POST /api/admin/exports/[resource]
- [ ] Create API: GET /api/admin/exports/[id]
- [ ] Implement job-based export generation
- [ ] Create API: POST /api/admin/leads/bulk
- [ ] Create API: POST /api/admin/projects/bulk
- [ ] Add selection checkboxes to list pages
- [ ] Add bulk action bar to list pages

---

## I) Job Queue Production Ready
- [ ] Install BullMQ + ioredis dependencies
- [ ] Update scripts/worker.ts for real queue
- [ ] Update lib/jobs/queue.ts to use real BullMQ
- [ ] Implement email job processor
- [ ] Implement PDF generation job processor
- [ ] Implement export job processor
- [ ] Implement webhook retry job processor
- [ ] Ensure all jobs are idempotent
- [ ] Update systemd worker service

---

## J) Test Suite (Minimum Required)
- [ ] Test: soft delete default exclusion
- [ ] Test: restore functionality
- [ ] Test: tenant scope enforcement
- [ ] Test: CSRF rejection without token
- [ ] Test: same-origin rejection
- [ ] Test: invoice sequence uniqueness
- [ ] Test: media download auth
- [ ] Test: contract optimistic concurrency (409 on version mismatch)
- [ ] Ensure all tests pass

---

## K) Prisma Migrations (No More db push)
- [ ] Create migration for soft delete fields
- [ ] Create migration for scoped RBAC
- [ ] Create migration for contract e-sign fields
- [ ] Create migration for time tracking approval
- [ ] Create migration for audit enhancements
- [ ] Create migration for media security fields
- [ ] Create migration for IdempotencyKey
- [ ] Verify migration history is clean
- [ ] Document migration process in README

---

## L) Admin UI Updates
- [ ] Update all list pages with pagination controls
- [ ] Add "Show Archived" toggle to all list pages
- [ ] Add restore buttons to archived items
- [ ] Add CSRF token to all mutation forms
- [ ] Add idempotency headers where needed
- [ ] Update leads UI
- [ ] Update projects UI
- [ ] Update invoices UI
- [ ] Update proposals UI
- [ ] Update contracts UI
- [ ] Update services UI
- [ ] Update incidents UI

---

## M) Config & Ops Finalization
- [x] .env.example updated with all new vars
- [x] systemd main service configured
- [x] systemd worker service created
- [ ] Verify nginx config alignment (if generator exists)
- [ ] Document deployment process
- [ ] Document secret rotation process

---

## Security Checklist (Must Verify at End)
- [ ] Soft delete enforced everywhere
- [ ] Pagination enforced on all lists
- [ ] CSRF enforced on all mutations
- [ ] Same-origin enforced on all mutations
- [ ] Tenant scoping enforced on tenant-owned entities
- [ ] Private media protected with auth + audit
- [ ] Invoice sequencing atomic + idempotency verified
- [ ] Contract concurrency verified
- [ ] Audit logging complete and tested

---

**Total Items**: 108
**Completed**: 8
**Remaining**: 100
