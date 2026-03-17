# Portal Documentation — ARCHITECTURE
**Version:** 1.2.0  
**Last Updated:** 2026-02-21  
**Applies to:** `apps/portal` within a monorepo (`apps/*`, `packages/*`)  
**Rule:** No timelines in this document.

---

## 0) Portal Mission (Architecture-aligned)

The portal is the **Trust Surface**:
- makes delivery transparent
- makes ownership tangible (docs + exports + receipts)
- reduces ambiguity with auditability
- enforces security-by-default without slowing the owner down

**Priority order:** Security → Performance → Usability.

---

## 1) High-Level Topology

### 1.1 Surfaces (separation)
- `apps/portal` — authenticated client portal (this document)
- Other surfaces (admin/public) exist as separate applications and are intentionally **out of scope** for this portal-only suite.
### 1.2 Shared packages (recommended)
- `packages/ui` — primitives + tokens (shadcn/radix)
- `packages/core` — shared types, route registry, validation helpers
- `packages/db` — Prisma schema + repository layer
- `packages/security` — auth helpers, CSP/headers, rate limiting, sanitization
- `packages/observability` — logging, error reporting, vitals
- `packages/config` — eslint/tsconfig/tailwind configs

### 1.3 Infrastructure boundary
- Reverse proxy: NGINX (no vendor lock-in)
- Optional edge/WAF: Cloudflare (optional, replaceable)
- DB: MariaDB
- Payments: Stripe (replaceable interface)
- Email: transactional provider (replaceable interface)

---

## 2) Application Modules (Portal)

### 2.1 Domain modules (entities)
Portal domain entities are org-scoped (tenant isolation):
- Org + Membership + Role
- Tickets (Ticket, Message, Attachment)
- Docs Vault (Document, Version, Acknowledgement, Tags/Collections)
- Approvals
- Change Requests
- Scorecards + Metrics
- Exports (Evidence bundles + hash manifests)
- Billing (subscription, invoices, entitlements)

### 2.2 Feature modules
Feature modules implement UI + server actions around domain entities:
- `features/auth`
- `features/tickets`
- `features/docs-vault`
- `features/approvals`
- `features/change-control`
- `features/scorecards`
- `features/exports`
- `features/billing`
- `features/notifications`
- `features/portal-search`

---

## 3) Routing Model (Next.js 16 App Router)

### 3.1 Route structure
- `(auth)` — unauthenticated entry routes (login, invites, MFA)
- `portal/` — authenticated portal routes live under `/portal/*` (single middleware boundary)

### 3.2 Route-to-module mapping
Each route should:
- call **server-only** data access
- enforce tenancy + RBAC
- render Server Components by default
- use Client Components only for interactivity

Example mapping:
- `/portal/tickets` → `features/tickets` + `entities/ticket`
- `/portal/docs` → `features/docs-vault` + `entities/document`

---

## 4) Data Access & Tenancy Enforcement

### 4.1 Tenancy rules (non-negotiable)
- Every tenant table includes `orgId`
- Every query includes `orgId` in the WHERE clause
- Never accept `orgId` from the client without verification
- Active org is resolved from:
  - session
  - membership
  - org selection (if multi-org)

### 4.2 Repository pattern (recommended)
- Shared repository methods require `orgId` explicitly:
  - `TicketRepo.list({ orgId, ...filters })`
  - `DocRepo.get({ orgId, id })`
- Repo methods must never return cross-org data.

---

## 5) Mutations (Server Actions)

### 5.1 Boundary rules
- All mutations occur through **server actions**
- Each action:
  - validates input via Zod
  - checks RBAC
  - writes audit log entry
  - returns typed result (success/error code)
- No direct client-to-DB mutation path.

---

## 6) Upload Architecture (Docs + Ticket Attachments)

### 6.1 Pipeline
1) Validate file type + size
2) Generate safe storage key (no raw filename trust)
3) Hash server-side (SHA-256)
4) Store (object storage or filesystem, replaceable)
5) Record metadata in DB
6) Log access and download events
7) Optional AV scan hook (quarantine supported)

### 6.2 Security constraints
- Content-type allowlist
- No inline HTML execution or client-side preview of unsafe formats
- Download endpoints re-check auth + org + permissions

---

## 7) Exports Architecture (Evidence Bundles)

### 7.1 Export job flow
- User creates export job → server builds manifest
- Manifest includes:
  - file inventory
  - hashes
  - version identifiers
- Download endpoint:
  - requires auth + org checks
  - emits audit log event
  - supports expiring links

### 7.2 Integrity-first UX
- Show user how to verify checksums
- Never claim “tamper-proof” without method; show method.

---

## 8) Observability (trust surface)

Required telemetry:
- structured logs with correlation IDs
- error reporting (server + client)
- security events (auth failures, permission changes)
- audit logs (append-only)

Portal must expose safe visibility:
- what changed
- who did it
- when it happened
without leaking sensitive internals.

---

## 9) ADR policy
Any change to auth/RBAC/tenancy/uploads/exports/billing requires an ADR with rollback plan.

---

## Appendix: Portal conventions
- strict TypeScript
- Server Components by default
- `.client.tsx` only when necessary
- all lists paginated
- all user content sanitized and encoded