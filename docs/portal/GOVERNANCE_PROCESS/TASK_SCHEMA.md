# TASK_SCHEMA — Development Tasks & Milestones (Vantus Monorepo)
**Version:** 1.0.0  
**Date:** 2026-02-21  
**Scope:** apps/web (public) + apps/admin + apps/portal + shared packages  
**Priority order:** Security → Performance → Usability/Accessibility → Velocity

---

## 0. Purpose
Authoritative work breakdown structure (WBS) + milestone map for building and launching the Vantus platform as an enterprise-grade monorepo.

### 0.1 Non‑negotiables
- Stop‑ship gates block releases (see QUALITY_GATES.md)
- Determinism + traceability required (see GOVERNANCE.md)
- “Proof artifacts” produced for each milestone (`/docs/templates/*`)

---

## 1. Milestones (recommended)

### M0 — Repo + Governance Baseline (Week 0)
**Outcome:** runnable monorepo with deterministic workflows + zero-warning CI.

Deliverables:
- Workspace scaffold (`apps/*`, `packages/*`)
- CI: lint/typecheck/test/build/security/budgets (zero warnings)
- Baseline docs: SECURITY, GOVERNANCE, QUALITY_GATES, DEVELOPMENT, ARCHITECTURE, RUNBOOK

Acceptance:
- Clean PR passes all gates
- Secret scanning enabled and clean
- CSP + headers module present

Required artifacts:
- PREFLIGHT_REPORT
- TRACEABILITY_MATRIX
- SECURITY_REVIEW

---

### M1 — Public Authority Site MVP (Weeks 1–3)
**Outcome:** public site v1 proves Vantus Standard + captures qualified leads.

Scope:
- Public routes: /, /services, /industries, /server-planner, /standards, /learn, /proof, /pricing, /start-audit, /contact, /status, /legal
- MDX pipeline (allowlist), RSS, sitemap/robots
- Secure forms via server actions (rate limited + spam defense)

Acceptance:
- Performance budgets enforced
- Headers + CSP + rate limiting shipping
- WCAG 2.1 AA+ checklist passes on key templates

Artifacts:
- PERFORMANCE_BUDGET
- ACCESSIBILITY_AUDIT
- SECURITY_REVIEW

---

### M2 — Admin Console MVP (Weeks 3–6)
**Outcome:** run the business without vendor lock-in: CMS + CRM + pricing governance.

Scope:
- Auth + RBAC baseline (admin MFA-ready)
- CMS: draft/review/publish + rollback
- CRM: leads + pipeline + convert to Org
- Pricing SKUs + “last verified” workflow

Acceptance:
- Every write audit-logged
- Publishing rollback verified
- Permissions deny-by-default tested

Artifacts:
- TRACEABILITY_MATRIX (admin)
- SECURITY_REVIEW

---

### M3 — Client Portal MVP (Weeks 6–9)
**Outcome:** client trust surface: tickets + docs vault + billing visibility.

Scope:
- Org users/roles
- Ticketing + attachments pipeline (sanitized)
- Docs vault with hash manifests
- Billing view + invoices

Acceptance:
- RBAC enforced server-side
- Evidence download shows hashes
- E2E for critical flows

Artifacts:
- SECURITY_REVIEW (portal)
- PREFLIGHT_REPORT (portal)

---

### M4 — Evidence + Change Control (Weeks 9–12)
**Outcome:** scale defensibly: change requests + approvals + evidence exports.

Scope:
- Change requests → estimates → approvals → audit trail
- Evidence export bundle (ZIP + manifest)

Acceptance:
- Approvals cannot be bypassed
- Exports are deterministic (same inputs → same outputs)

Artifacts:
- CHANGE_REQUEST
- POSTMORTEM (tabletop)
- THREAT_MODEL (updated)

---

## 2. Workstreams (task lists)

### 2.1 Platform Foundations
- FND-001 Workspace config + shared configs
- FND-002 Route registry + metadata system
- FND-003 Audit log primitives (append-only)
- FND-004 Feature flags + kill switches
- FND-005 Security: headers/CSP + rate limit + spam defense
- FND-006 Observability baseline
- FND-007 Content: MDX safe renderer + indexers

### 2.2 Public Site
- WEB-001 Nav (≤5 items) + hubs/detail/article templates
- WEB-002 Server Planner: education/hardware/calculator/downloads
- WEB-003 Proof: metrics methods + case studies
- WEB-004 Standards + Learn + Search + RSS + Sitemap
- WEB-005 Forms: contact + audit intake

### 2.3 Admin
- ADM-001 CMS collections + publish workflow
- ADM-002 CRM pipeline + lead conversion
- ADM-003 Pricing SKUs + verification workflow
- ADM-004 Media library (alt text required)

### 2.4 Portal
- POR-001 Tickets + docs vault
- POR-002 Billing view
- POR-003 Change control (P2)

---

## 3. Definition of Done (DoD)
A task is “done” only when:
- CI green (zero warnings)
- tests appropriate to risk exist
- security review completed when relevant
- docs/traceability updated

