# Admin Portal & Owner Plan — LLM-Friendly, Recursive, Actionable

Last updated: 2026-01-04

Purpose
-------
This document is a detailed, step-by-step, LLM-friendly plan to design, implement, test, and operate a full-featured Admin/Owner Portal for Vantus Systems. It is intentionally recursive: every high-level task is broken into concrete subtasks (file names, API contracts, DB models, tests, CI steps) so an LLM or engineer can execute them deterministically.

Scope & Non-goals
------------------
- In scope: Admin Portal (operator UI), Admin APIs, RBAC, media manager, leads inbox, audit logs, proof/artifact management, settings, integration hooks for the Customer Portal (tenant-aware sync + webhooks), observability, CI/CD for admin features.
- Out of scope: Billing/payment rails, in-depth external SSO vendor-specific implementation beyond initial configuration; customer portal UI (integration patterns covered).

Goals & Acceptance Criteria
--------------------------
- Admin users (Owner, Admin, Editor, Analyst) can securely sign in and perform role-allowed actions.
- Admin APIs are namespaced under `app/api/admin/*` and protected by server-side checks.
- All privileged actions are recorded in immutable `AuditLog` entries.
- Media uploads use signed URLs; media is accessible via controlled CDN paths.
- Leads can be viewed, updated, exported, and pushed to CRM/webhook destinations.
- Customer Portal integration is seamless: publish actions and lead assignments are consumable by the Customer Portal through tenant-scoped APIs/webhooks.
- Tests (unit, integration, e2e) cover critical admin flows; CI blocks merges on failure.

High-level Architecture
-----------------------
- Frontend: Next.js App Router (`app/admin/*`) + components in `components/admin/*` using site theme tokens and `app/vantus-theme.css`.
- Backend: Next.js server routes under `app/api/admin/*` for Admin APIs. Server-side helpers in `lib/admin/*`.
- Database: PostgreSQL (recommended) accessed via Prisma ORM. Redis for sessions, rate-limiting, and pub/sub.
- Storage: S3-compatible object store for media + signed upload URLs; CDN in front for public assets.
- Auth: NextAuth (or vendor SSO) with session cookies + role claims. Enforce 2FA for Owner accounts.
- Observability: Sentry for errors, structured logs (JSON), and a metrics pipeline (Prometheus/hosted).

Technology & Libraries (recommended)
-----------------------------------
- Next.js (App Router) — keep existing app structure.
- TypeScript — strongly typed contracts.
- Prisma + PostgreSQL — data modeling and migrations.
- NextAuth (or your SSO) — authentication/session management.
- Redis — sessions and ephemeral locks, rate-limiting.
- AWS S3 or DigitalOcean Spaces — media storage.
- Zod — request/response validation for server routes.
- Playwright — end-to-end tests (repo already uses Playwright).
- Vitest/Jest — unit tests.
- ESLint + Prettier + Husky — pre-commit hooks.

Data Model (Prisma canonical example)
------------------------------------
Use the following as a starting point; adjust based on product needs.

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  roles     Role[]   @relation(references: [id])
  tenantId  String?  // null => global/admin
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  permissions String[]
}

model Tenant {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
}

model Lead {
  id         String   @id @default(cuid())
  name       String
  email      String
  message    String?
  source     String
  status     String   @default("new")
  assignedTo String?
  tenantId   String?
  createdAt  DateTime @default(now())
}

model MediaAsset {
  id         String   @id @default(cuid())
  key        String   @unique // S3 key
  url        String
  mime       String
  size       Int
  uploadedBy String?
  tenantId   String?
  createdAt  DateTime @default(now())
}

model AuditLog {
  id          String   @id @default(cuid())
  actorId     String?
  actorEmail  String?
  action      String
  resource    String
  resourceId  String?
  before      Json?
  after       Json?
  ip          String?
  userAgent   String?
  createdAt   DateTime @default(now())
}
```

APIs & Routes (contracts)
-------------------------
Place admin APIs under `app/api/admin/*`. Use `zod` for input validation and ensure server-side guards run for every route.

Core endpoints (examples with payload notes):

- `GET /api/admin/leads?status=&tenantId=&page=&pageSize=` — returns paginated leads (sanitized fields).
- `POST /api/admin/leads` — ingest lead (body: `LeadSchema`).
- `PATCH /api/admin/leads/:id` — update lead (body: `{ status, assignedTo }`).
- `GET /api/admin/media/credentials` — return signed upload credential(s) (short TTL).
- `POST /api/admin/media/register` — register metadata after upload (body: `{ key, url, mime, size, tenantId }`).
- `GET /api/admin/audit` — read-only audit query (filters: actorId, resource, dateRange).
- `POST /api/admin/hooks/webhook` — admin-triggered webhook forwarder (signed payloads, retry queue).

For each mutating request:

1. Validate with zod.
2. Confirm `requireAdmin()` and `hasPermissions()` server-side.
3. Execute DB change and call `logAudit({actor, action, resource, resourceId, before, after, meta})`.

Auth & RBAC Implementation
--------------------------
Role suggestions: Owner, Admin, Editor, Analyst. Map these to permission strings like `content.publish`, `leads.update`, `media.upload`, `audit.read`.

Server guard (recommended helpers):

- `lib/admin/guards.ts` — exports `requireAdmin(req, { permissions?: string[] })` and `getSessionUser(req)` (server-only functions).
- `lib/admin/audit.ts` — exports `logAudit({actor, action, resource, resourceId, before, after, meta})`.

Middleware enforcement:

1. Update `middleware.ts` to detect `/admin` and `/api/admin` requests.
2. For admin paths, verify session cookie and role claim server-side.
3. Redirect unauthorized requests to login or return 401/403 for API routes.

Admin UI: File-by-file scaffold (explicit tasks)
---------------------------------------------
Phase 0 scaffold (create these files):

1. `app/admin/layout.tsx` — admin shell with nav and permission-aware links.
2. `app/admin/page.tsx` — Admin Dashboard component.
3. `app/admin/leads/page.tsx` — Leads inbox (table + filters + bulk actions).
4. `app/api/admin/leads/route.ts` — server route for leads with GET/POST/PATCH.
5. `lib/admin/guards.ts` — server-side auth helper.
6. `lib/admin/audit.ts` — audit logger helper.

Each task should include types and tests. Example subtask for `app/api/admin/leads/route.ts`:

- Implement `GET` returning `Lead[]` with pagination; use `zod` for query parsing.
- Implement `PATCH /:id` with `LeadPatchSchema` and call `logAudit()` after update.

Media Library implementation tasks
---------------------------------
1. `app/api/admin/media/credentials/route.ts` — returns signed URL(s) for client to PUT directly to S3.
2. `components/admin/MediaUploader.tsx` — direct upload UI with progress, type/size validation.
3. `app/api/admin/media/register/route.ts` — accept key and metadata, create `MediaAsset` row.

Naming & key pattern:
`tenant/{tenantId}/media/{YYYY}/{MM}/{cuid()}.{ext}` — include tenant prefix to ease cleanup.

Audit & Export
--------------
Implement `app/api/admin/audit/route.ts` supporting pagination, filtering and CSV export. Ensure exports are rate-limited and logged (export action requires `audit.export` permission).

Customer Portal Integration (detailed)
------------------------------------
Two patterns depending on deployment:

1. Co-hosted (single DB): use Postgres Row-Level Security (RLS) to isolate tenants. Provide server-side helper `withTenant(req)` to enforce tenantId on queries.
2. Decoupled (separate services): use signed webhooks + HMAC; maintain a `Webhooks` table with endpoints and retries.

Recommended integration endpoints:

- `POST /api/admin/portal/notify` — send tenant-scoped event (e.g., content published). Payload signed with project HMAC.
- `GET /api/admin/portal/tenants/:tenantId/delta?since=` — return changed content since timestamp.

Design notes:

- If both Admin and Customer portals live in same DB, implement row-level security (RLS) on Postgres for tenant isolation.
- If they are separate, prefer signing payloads (HMAC) and versioning webhooks.

Observability & Logging
-----------------------
- Structured logs (JSON). Tag logs with `actorId`, `route`, `requestId`, `tenantId`.
- Sentry for exceptions; capture `user` context for admin routes.
- Metrics for request rate, error rate, and queue backfills.

Testing & QA
-----------
- Add unit tests for `lib/admin/*` helpers.
- Add integration tests for `app/api/admin/*` using a test db fixture.
- E2E (Playwright) test suite: `e2e/admin.spec.ts` covering login, lead edit, media upload, audit check.

CI & Deployment
----------------
CI pipeline (GitHub Actions recommended):

1. lint (ESLint) + typecheck
2. unit tests (Vitest)
3. integration tests (optional, requires DB); run with ephemeral DB or use a configured test DB URL.
4. e2e tests (Playwright) on a preview deployment (Vercel preview or ephemeral stage).
5. Build and publish artifacts (Vercel deploy, Docker image push for self-hosting).

Secrets & Env variables (sample)
-------------------------------
Add `.env.example` with placeholders (DO NOT commit `.env`):

```
# For local development with SQLite
DATABASE_URL=file:./dev.db
# DATABASE_URL=postgres://user:pass@host:5432/dbname (Production)

NEXTAUTH_SECRET=super-secret
# MUST match the URL where the app is running (e.g. http://localhost:3006)
NEXTAUTH_URL=http://localhost:3006
NEXTAUTH_URL_INTERNAL=http://localhost:3006

REDIS_URL=redis://:pass@host:6379
S3_BUCKET_NAME=your-bucket
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SENDGRID_API_KEY=...
SENTRY_DSN=...
ADMIN_MFA_ENFORCE=true
```

Security Best Practices
-----------------------
- Enforce CSP and HSTS for admin hosts. Extend `middleware.ts` to add `frame-ancestors 'none'` for admin.
- Use short-lived sessions for elevated roles; allow session revocation from `app/admin/settings`.
- Limit admin console IP via allowlist (optional) and require MFA for Owner.

Phased Roadmap (concise)
------------------------
- Phase 0: scaffold + auth + guards + audit helpers.
- Phase 1: leads inbox + media library + basic RBAC.
- Phase 2: content publishing + proof artifacts + audit viewer.
- Phase 3: tenant sync + webhooks + hardening + monitoring.

LLM-friendly Prompts & Recipes
------------------------------
Use these as templates when asking an LLM to generate code. Be explicit about file path, framework, and validation.

1) Create `lib/admin/guards.ts`:

"Create a TypeScript module at `lib/admin/guards.ts` exporting `requireAdmin(request, {permissions?: string[]})` that reads NextAuth session server-side, fetches roles from DB via Prisma, resolves permissions, and throws 401/403 if unauthorized. Provide tests for the helper."

2) Create `app/api/admin/leads/route.ts`:

"Create a Next.js server route at `app/api/admin/leads/route.ts` implementing GET (paginated) and PATCH/:id (update lead) using Prisma and zod, and call `logAudit()` after updates. Use TypeScript and return clear error shapes."

Appendix: Example Zod Schemas
----------------------------
Lead schema (zod):

```ts
const LeadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(["new","contacted","won","lost"]).optional(),
  tenantId: z.string().optional(),
});
```

Audit schema (zod):

```ts
const AuditSchema = z.object({
  actorId: z.string().nullable(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable(),
  before: z.any().optional(),
  after: z.any().optional(),
});
```

Acceptance Checklist (ready-to-run verification)
------------------------------------------------
- [ ] Admin scaffold present at `app/admin/layout.tsx` and basic nav shown.
- [ ] `requireAdmin()` guard enforced for admin routes.
- [ ] Leads API and `app/admin/leads` page functional and tested.
- [ ] Media upload flow end-to-end (signed URL → upload → register) tested.
- [ ] `AuditLog` entries created for write operations and exportable.
- [ ] Customer Portal integration endpoints exist and are documented.

Next steps (suggested immediate commit set)
-----------------------------------------
1. Add Prisma models and run a first migration (`npx prisma migrate dev --name admin-init`).
2. Add `lib/admin/guards.ts` and `lib/admin/audit.ts` helpers.
3. Add `app/admin/layout.tsx` and a placeholder `app/admin/page.tsx` (dashboard shell).
4. Implement `leads` endpoints and `app/admin/leads/page.tsx` with Playwright test.

If you want, I can generate the code for any of the above files (Prisma schema, guards, audit helpers, leads route, admin layout). Tell me which file to produce first and I will create the patch.

---
