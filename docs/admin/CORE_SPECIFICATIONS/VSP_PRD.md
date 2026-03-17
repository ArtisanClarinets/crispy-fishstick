# PRD — Vantus Studio Platform (VSP)
**Version:** 1.1
**Date:** 2026-03-05
**Owner:** Dylan Thompson
**Status:** Implementation-ready (define epics next)

## 0) Executive summary
VSP is Vantus’s internal control plane for shipping **enterprise-grade websites and web apps** repeatedly.

If you don’t build VSP (at least VSP-lite), you will:
- deliver from memory,
- miss steps,
- let scope creep leak margin,
- and fail to compound.

VSP is not “an ERP.” It is a **delivery and governance system**.

---

## 1) Goals
1. Make delivery repeatable: every project runs through the same gates.
2. Make quality provable: every claim links to evidence.
3. Make scope controllable: changes are captured, estimated, and approved.
4. Make ownership real: credentials + handoff are tracked, not “remembered.”

## 2) Non-goals (v1)
- Full accounting/invoicing.
- Full customer support ticketing.
- General-purpose CMS for all industries.

## 3) Personas
| Persona | Uses VSP for | Needs |
|---|---|---|
| Founder/Operator | Pipeline + delivery | One dashboard, no surprises |
| Engineer/Contractor | Build tasks + checklists | Clear requirements, fast context |
| Client Approver (later) | Content approvals + change requests | Simple UI, plain language |

## 4) System boundaries
VSP manages:
- sales pipeline (CRM-lite),
- project delivery gates,
- content workflow,
- change control,
- deployments & environments,
- proof artifacts,
- handoff packages.

VSP does not manage:
- payroll,
- broad HR,
- deep accounting.

---

## 5) Scope and phases
### Phase 0 — VSP-lite (ship in days, not months)
**Objective:** stop running projects in your head.

In scope:
- clients + leads pipeline
- projects + package type
- deliverables checklist
- change requests
- file attachments

### Phase 1 — Delivery OS (after first 3 clients)
In scope:
- content workbook workflow (page inventory + approvals)
- QA gates (perf/a11y/security) with evidence links
- environment status (stage/prod)

### Phase 2 — Client approvals (after first 5 clients)
In scope:
- client login for approvals + change requests
- read-only progress view

---

## 6) Information architecture (pages)
### Founder/Ops
- Dashboard (today’s risks + next actions)
- Leads (pipeline)
- Clients
- Projects
- Change Requests
- Evidence Library

### Project detail
- Overview (status, dates, package)
- Content (page list + approvals)
- Deliverables (checklist + evidence)
- Environments (stage/prod + health)
- Change Requests
- Handoff (ownership checklist)

---

## 7) Functional requirements

### 7.1 Authentication & access control
**VSP-F-001:** Admin authentication required.
- v1: email + password + TOTP MFA (recommended)

**VSP-F-002:** Role-based access control (RBAC).
- Roles: Founder (super), Engineer, Client (phase 2)
- Deny-by-default.

**Acceptance:**
- Users cannot access projects unless assigned.
- All role changes are audit logged.

### 7.2 CRM-lite
**VSP-F-010:** Lead pipeline with stages.
- Stages: new → contacted → call_booked → proposal_sent → won → lost
- Each lead must have a next action + due date.

**Acceptance:**
- Dashboard shows overdue next actions.

### 7.3 Project delivery gates
**VSP-F-020:** Project status flows through fixed stages.
- discovery → content → build → QA → deploy → handoff

**VSP-F-021:** Gate enforcement.
- Cannot move to deploy without QA gates green.
- Cannot move to build without approved page inventory.

### 7.4 Content workflow
**VSP-F-030:** Page inventory per project.
- Each page has status: draft → in_review → approved → published

**VSP-F-031:** Approval logging.
- Store who approved and when.

### 7.5 Change control
**VSP-F-040:** Change request intake.
- Required fields: description, requested_by, business reason.

**VSP-F-041:** Impact assessment.
- Time impact (hours/days)
- Cost impact (if used)

**VSP-F-042:** Approval before work.

### 7.6 Deployments & environments
**VSP-F-050:** Environment records.
- dev/stage/prod, hosting mode, URL

**VSP-F-051:** Health checks.
- Store last-known health status and timestamp.

### 7.7 Proof artifacts
**VSP-F-060:** Evidence registry.
- Attach Lighthouse/a11y/security reports and link to before/after.

### 7.8 Owner handoff
**VSP-F-070:** Ownership checklist.
- Domain owner confirmed
- Hosting owner confirmed
- Credentials delivered
- Runbook delivered

---

## 8) Non-functional requirements
- **Performance:** pages load < 1s on modern connections.
- **Auditability:** all sensitive actions logged.
- **Determinism:** gate logic enforced server-side.
- **Backup:** daily DB backups.
- **Security:** input validation at boundaries.

---

## 9) Success metrics
- Cycle time per project (target: down 20% by project #5).
- QA pass rate (target: 80% gates green by first QA run).
- Scope creep rate (target: <10% of projects with unapproved changes).

---

## 10) Risks and mitigations
- Risk: overbuilding.
  - Mitigation: phase gates; ship VSP-lite first.
- Risk: client UX complexity.
  - Mitigation: client portal only after core workflows are stable.

---

## 11) Next actions
- [ ] Convert Phase 0 + Phase 1 into epics and tickets.
- [ ] Decide auth approach (NextAuth vs custom) and document ADR.
- [ ] Implement VSP-lite with minimal UI.
