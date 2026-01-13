# Crispy-Fishstick: Agent Architecture Guide & Source Map

**⚠️ CRITICAL INSTRUCTION FOR AGENTS:**
Before modifying any code, you must identify which **Domain** your change affects. You must verify that your changes do not break the **Vital Functions** or **Data Flows** listed below.

---

## 1. Project Overview
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Server Components (RSC) + Server Actions
- **React**: React 19
- **Database**: SQLite via Prisma (v5.22.0) ORM (with multi-tenancy support)
- **Authentication**: NextAuth.js
- **Deployment**: Baremetal Ubuntu 22.04 LTS Server with Nginx Reverse Proxy

---

## 2. Vital Functions & "Do Not Break" Zones
Refactors in these areas require comprehensive regression testing.

### A. Authentication & Security (The Gatekeeper)
*   **File:** `proxy.ts`
    *   **Vital Function:** CSP Header Generation (Nonce-based).
    *   **Vital Function:** Route Protection (`/admin` checks).
*   **File:** `lib/admin/guards.ts`
    *   **Vital Function:** `requireAdmin()` - Server-side permission check.
    *   **Vital Function:** `tenantWhere()` - **CRITICAL.** Enforces data isolation between tenants.

### B. Data Integrity & Audit (The Ledger)
*   **File:** `lib/admin/audit.ts`
    *   **Vital Function:** `createAuditLog()` - Every write operation (POST/PATCH/DELETE) in the admin panel *must* trigger this.
    *   **Constraint:** Audit logs are immutable.

### C. Media Management (The Asset Pipeline)
*   **Flow:** Client requests signed URL -> Uploads to S3 -> Registers asset in DB.
*   **Vital Function:** `GET /api/admin/media/credentials` - Must enforce strict file type/size limits.
*   **Vital Function:** `POST /api/admin/media/register` - Must link S3 key to a DB record immediately.

---

## 3. Prisma Schema (Source of Truth)
*Based on `ADMIN.md`. Agents must ensure `schema.prisma` matches this structure.*

```prisma
// CORE IDENTITY
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  roles     RoleAssignment[]
  tenantId  String?  // CRITICAL: Null = Super Admin, Value = Tenant User
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique
  permissions String   // JSON string or String[] depending on DB
  assignments RoleAssignment[]
}

model RoleAssignment {
  userId String
  roleId String
  user   User @relation(fields: [userId], references: [id])
  role   Role @relation(fields: [roleId], references: [id])
  @@id([userId, roleId])
}

// BUSINESS ENTITIES
model Tenant {
  id   String @id @default(cuid())
  slug String @unique
}

model Lead {
  id         String   @id @default(cuid())
  status     String   @default("new")
  tenantId   String?  // Multi-tenancy enforcement
}

// SYSTEM
model AuditLog {
  id      String @id @default(cuid())
  action  String // e.g. "lead.update"
  before  Json?  // Previous state
  after   Json?  // New state
}
```

---

## 4. Critical User Flows (Regression Test Map)

**Flow 1: The Admin Login**
1.  User hits `/admin`.
2.  `proxy.ts` intercepts.
3.  Checks for `next-auth.session-token`.
4.  If missing -> Redirect to `/admin/login`.

**Flow 2: Lead Ingestion & Update**
1.  API receives `POST /api/admin/leads`.
2.  **Validation:** Zod schema check.
3.  **Auth:** `requireAdmin` check.
4.  **DB:** Prisma creates row.
5.  **Audit:** `createAuditLog` records creation.

**Flow 3: Secure Media Upload**
1.  UI requests Presigned URL.
2.  Server validates permissions & file type.
3.  Server returns URL.
4.  Browser uploads directly to S3.
5.  Browser calls `register` API.

---

## 5. Agent Refactoring Protocol

To prevent "missed portions of refactors," agents must follow this checklist:

1.  **Dependency Search:**
    *   *Command:* `grep -r "functionName" .`
    *   *Action:* If you change a function signature, find *every* usage.

2.  **Schema Sync:**
    *   If you modify `schema.prisma`, you **MUST** run `npx prisma generate`.
    *   You **MUST** update any Zod schemas in `lib/validations` or `app/api/...`.

3.  **Audit Check:**
    *   Did you add a database write? -> **Add an Audit Log.**

4.  **Permission Check:**
    *   Did you add an API route? -> **Add `requireAdmin()` guard.**

5.  **Test Run:**
    *   Run `npm run test` (Vitest) for logic.
    *   Run `npm run test:e2e` (Playwright) for flows.