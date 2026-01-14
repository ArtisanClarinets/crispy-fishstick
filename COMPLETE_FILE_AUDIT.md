# Complete File Audit

## [package.json]: Dependency Manifest

**PATH:** `/package.json`

### Issues Found:
1. **Line 39:** `"prisma": "^6.4.1"` - Severity: CRITICAL
   - **Impact:** Dependency hell. Prisma 6 does not exist. Using fake/future versions prevents reproducible builds.
   - **Fix:** `"prisma": "^5.10.0"` (or latest stable)
   - **Estimated Time:** 0.5 hours

2. **Line 33:** `"next": "^16.1.1"` - Severity: MEDIUM
   - **Impact:** Bleeding edge instability.
   - **Fix:** Downgrade to `^14.1.0` or `^15.0.0` (LTS).
   - **Estimated Time:** 2 hours (testing required)

## [lib/auth.ts]: Authentication Configuration

**PATH:** `/lib/auth.ts`

### Issues Found:
1. **Line 65:** `console.warn("No auth secret found. Using a development fallback secret.");` - Severity: CRITICAL
   - **Impact:** If `NODE_ENV` configuration fails in production, app insecurely defaults to a known secret.
   - **Fix:**
     ```typescript
     if (!secret) {
       throw new Error("FATAL: NEXTAUTH_SECRET is missing.");
     }
     ```
   - **Estimated Time:** 0.5 hours

2. **Line 132:** `// @ts-expect-error` - Severity: LOW
   - **Impact:** Suppressing type errors masks potential API incompatibilities.
   - **Fix:** Update `next-auth` types or dependencies to matching versions.
   - **Estimated Time:** 1 hour

## [lib/admin/guards.ts]: Authorization Logic

**PATH:** `/lib/admin/guards.ts`

### Issues Found:
1. **Line 44:** `return JSON.parse(r.Role.permissions);` - Severity: HIGH
   - **Impact:** CPU blocking vulnerability. Parsing potentially large JSON strings on every admin request.
   - **Fix:** Normalize database schema to use `RolePermissions` table.
   - **Estimated Time:** 8 hours (Migration required)

2. **Line 150:** `handler: (req: Request, context: any, user: AdminUserContext)` - Severity: MEDIUM
   - **Impact:** `any` type destroys type safety for route contexts.
   - **Fix:** Define `RouteContext` interface.
   - **Estimated Time:** 1 hour

## [prisma/schema.prisma]: Database Schema

**PATH:** `/prisma/schema.prisma`

### Issues Found:
1. **Line 6:** `provider = "sqlite"` - Severity: CRITICAL (for production)
   - **Impact:** SQLite locks the database file on write, effectively single-threading writes. Not suitable for multi-user SaaS.
   - **Fix:** `provider = "postgresql"`
   - **Estimated Time:** 4 hours (plus infrastructure setup)

2. **Line 368:** `specsJson String` - Severity: MEDIUM
   - **Impact:** Unstructured data. No validation at DB level.
   - **Fix:** Use specific columns for critical specs (`cpuCores`, `ramGb`) or ensure Zod validation at app boundary (exists, but DB is loose).
   - **Estimated Time:** 4 hours

## [middleware.ts]: Request Interceptor

**PATH:** `/middleware.ts`

### Issues Found:
1. **Line 1:** `export { default, config } from "./proxy";` - Severity: LOW
   - **Impact:** Indirection. Makes it harder to trace where middleware logic lives.
   - **Fix:** Move logic into `middleware.ts` directly or rename `proxy.ts` to `lib/middleware-logic.ts`.
   - **Estimated Time:** 0.5 hours

## [proxy.ts]: Security Middleware Logic

**PATH:** `/proxy.ts`

### Issues Found:
1. **Line 58:** `script-src 'self' 'nonce-${nonce}' ... 'unsafe-eval'` - Severity: MEDIUM
   - **Impact:** `unsafe-eval` is enabled in non-prod, but `isProd` check logic relies on `NODE_ENV`. If misconfigured, security is weakened.
   - **Fix:** Ensure strict CSP in production regardless of other flags. (Code essentially does this, but review logic carefully).
   - **Estimated Time:** 1 hour
