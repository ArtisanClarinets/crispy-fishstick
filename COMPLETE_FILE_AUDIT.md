# COMPLETE FILE AUDIT

## proxy.ts: Security Middleware

**PATH:** `/proxy.ts`

### Issues Found:
1. **Line 66-77:** Middleware Matcher Bypass - Severity: CRITICAL
   - **Impact:** API routes (`/api/*`) are explicitly excluded from the middleware. This means security headers (CSP, HSTS) and authentication checks are NOT applied to the most sensitive endpoints.
   - **Fix:** Update matcher to include API routes.
     ```typescript
     matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
     ```
   - **Estimated Time:** 1 Hour

2. **Line 37:** Console Log in Production - Severity: LOW
   - **Impact:** `console.log("Proxy checking admin access...")` pollutes logs.
   - **Fix:** Remove the log line.
   - **Estimated Time:** 0.2 Hours

### Recommendations:
- Centralize route protection logic.
- Remove debug logging.

---

## package.json: Project Configuration

**PATH:** `/package.json`

### Issues Found:
1. **Line 9:** Hardcoded Secrets in Build Script - Severity: CRITICAL
   - **Impact:** `NEXTAUTH_SECRET` is visible in the codebase.
   - **Fix:** Remove inline secrets.
     ```json
     "build": "node scripts/generate-build-proof.mjs && next build",
     ```
   - **Estimated Time:** 0.5 Hours

2. **Lines 50-52:** Duplicate Animation Libraries - Severity: MEDIUM
   - **Impact:** Bloated bundle size (~600KB extra).
   - **Fix:** Remove `@gsap/react`, `gsap`, and `@splinetool/*` if possible, consolidating on `framer-motion`.
   - **Estimated Time:** 4 Hours

### Recommendations:
- Audit dependencies and remove unused/duplicate libraries.
- Move secrets to `.env` files.

---

## prisma/schema.prisma: Database Schema

**PATH:** `/prisma/schema.prisma`

### Issues Found:
1. **Line 6:** SQLite Provider - Severity: CRITICAL
   - **Impact:** Database does not support concurrent writes, blocking scaling.
   - **Fix:** Change provider to `postgresql`.
   - **Estimated Time:** 8 Hours (including migration setup)

2. **Line 411:** JSON Permission Storage - Severity: HIGH
   - **Impact:** `permissions String` (JSON) prevents efficient DB-level filtering.
   - **Fix:** Create a `Permission` model and `RolePermission` relation.
   - **Estimated Time:** 8 Hours

### Recommendations:
- Migrate to a production-grade database (Postgres).
- Normalize data structures.

---

## app/api/admin/users/route.ts: Admin API

**PATH:** `/app/api/admin/users/route.ts`

### Issues Found:
1. **Line 41:** Generic Error Swallowing - Severity: MEDIUM
   - **Impact:** Errors are caught as `any`, and unknown errors return generic 500 without logging to Sentry/monitoring in the catch block.
   - **Fix:** Add structured error logging.
     ```typescript
     console.error("User fetch error:", error); // Or Sentry.captureException(error)
     ```
   - **Estimated Time:** 1 Hour

### Recommendations:
- Implement a global error handler wrapper for API routes.

---

## components/living-blueprint-section.tsx: UI Component

**PATH:** `/components/living-blueprint-section.tsx`

### Issues Found:
1. **Lines 4-6 & 11:** Heavy Imports - Severity: HIGH
   - **Impact:** Imports `gsap`, `@gsap/react`, and dynamically imports `@splinetool/react-spline`. This one component likely contributes >1MB to the bundle.
   - **Fix:** Replace GSAP with Framer Motion. Only load Spline on desktop + idle.
   - **Estimated Time:** 8 Hours

2. **Line 81:** Magic Number Coupling - Severity: LOW
   - **Impact:** `const rawPhase = p * 7;` creates brittle logic tied to array length.
   - **Fix:** Use `STEPS.length`.
   - **Estimated Time:** 0.5 Hours

### Recommendations:
- Refactor to use a single animation library.
- optimize `SplineBlueprintCanvas` loading strategy.
