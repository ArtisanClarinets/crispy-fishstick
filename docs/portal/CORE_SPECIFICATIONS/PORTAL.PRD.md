# PRD — Vantus Client Portal
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Owner:** Product Owner (Vantus)  
**Scope:** Client Portal only (authenticated surface)

---

## 0. Executive Summary

The Vantus Client Portal is the **trust surface** for delivery and ongoing care:
- It makes work visible and auditable.
- It provides clients with a secure evidence vault for deliverables and runbooks.
- It enables approvals and change control.
- It provides billing clarity and support channels.

### Mission alignment (why this matters)
To become an industry leader, Vantus must scale **trust** and **operational clarity**:
- **Security first:** clients can safely rely on the portal for evidence and actions.
- **Owner-Controlled Systems:** clients retain ownership of outputs and can export evidence bundles.
- **Proof over promises:** the portal shows what changed, when, and why — with artifacts.

---

## 1. Goals

### 1.1 Primary goals (Portal)
1. **Transparency:** show real status (milestones, updates, decisions, risks).
2. **Evidence:** provide a secure documents vault and exportable evidence bundles.
3. **Control:** approvals and change requests with audit trails.
4. **Support:** ticketing with clear SLAs and accountability.
5. **Clarity:** billing and entitlements, without surprises.

### 1.2 Non-goals (Portal)
- Marketing/internal-system content (belongs elsewhere).
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
- Lead capture, proposals, or internal-system (belongs elsewhere).
- Storing raw secrets/passwords in the portal (never).

---

## 2. Personas & Roles (Portal)

### 2.1 Client-side roles
- **Org Owner:** full portal access for the client org (billing, exports, user management).
- **Approver:** can approve changes and view relevant artifacts; limited billing.
- **Billing:** billing routes only (plus minimal org context).
- **Member:** work visibility + tickets + docs (scoped).
- **Viewer:** read-only (optional).

### 2.2 Vantus-side roles (represented in portal UI, but not “internal staff tooling”)
- **Vantus Support (Staff):** may respond to tickets, upload deliverables, and perform privileged actions **only if explicitly permitted by contract and policy**, and always audit-logged.

---

## 3. Core User Journeys (Portal)

### J1 — Client signs in and selects org
1) Login → (optional MFA) → select org (if multiple) → dashboard.

### J2 — Client checks status of work
Dashboard → work updates → milestone detail → decision log.

### J3 — Client submits a support ticket
Tickets list → new ticket → messages + attachments → resolution + closeout checklist.

### J4 — Client retrieves deliverables and runbooks
Docs Vault → document detail → download → verify hash → acknowledgement (optional).

### J5 — Client requests a change (phase 2 / but specified now)
Create change request → Vantus responds with estimate → client approves → audit trail preserved.

### J6 — Client views billing
Billing → subscription + invoices → download invoice PDF → view entitlement tier.

---

## 4. Functional Requirements (Portal)

### 4.1 Authentication & Session Security
- Secure session cookies (httpOnly, secure, sameSite).
- MFA-capable authentication (enforced by policy if enabled).
- Device/session list and self-revoke.
- Safe redirect handling (prevent open redirect).
- Rate limiting and lockout policy hooks.

### 4.2 Organization & Membership
- Org selection flow for multi-org accounts.
- User invites (client-side within org owner permissions).
- Role assignment with least privilege.
- Full audit trail for membership changes.

### 4.3 Work Visibility
- Work hub with:
  - Updates feed (weekly notes)
  - Milestones
  - Decisions (ADR summaries)
  - Risks (tracked items)
- Each item has:
  - owner, timestamps, links to artifacts, and immutable history.

### 4.4 Tickets
- Ticket creation with categories, severity, and SLA tier indicators.
- Threaded messaging (sanitized markdown subset).
- Attachments pipeline:
  - type allowlist
  - forced download headers
  - hash recorded
  - malware scan hook (phaseable)
- Ticket closeout checklist and reopen policy.

### 4.5 Documents Vault
- Document list with filters (type, tag, date, project).
- Document detail view includes:
  - hash + hash algorithm
  - version and “supersedes” links
  - classification label
- Evidence export bundle (phaseable but documented):
  - ZIP + manifest with hashes.

### 4.6 Approvals & Change Control (Phase 2 but specified now)
- Change request entity with:
  - scope, rationale, estimate, timeline, risk notes
- Approvals workflow:
  - approval required for high-impact changes
  - cannot bypass approvals
  - audit events always recorded

### 4.7 Billing
- Subscription summary (plan/tier, renewal, status).
- Invoices list + invoice detail.
- Entitlements surfaced clearly (what the client gets).
- Webhooks and idempotency handled server-side.

---

## 5. Success Metrics

### Leading indicators
- Weekly active portal orgs
- Ticket time-to-first-response (by tier)
- % deliverables downloaded (docs vault usage)
- Approval turnaround time (phase 2)

### Lagging indicators
- Care retention and expansion
- Reduced support load through clarity and documentation

---

## 6. Constraints & Principles

- **Security > Speed > Usability** in conflict resolution.
- No vendor lock-in required for operation (Ubuntu 22.04 + MariaDB baseline).
- No third-party trackers in portal UI.
- Plain language; no dark patterns.

---

## 7. Acceptance Gates (Stop-Ship)

- RBAC deny-by-default, server-side enforced.
- Audit log for sensitive actions.
- Secure headers + CSP plan.
- Rate limiting/spam defense for any mutation endpoints.
- Accessibility baseline (WCAG 2.1 AA+) for portal templates.


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
