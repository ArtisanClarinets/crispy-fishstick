## proxy.ts: Security Middleware

**PATH:** `/proxy.ts`

### Issues Found:
1.  **Line 63:** Security Bypass Regex - Severity: CRITICAL
    -   **Impact:** The matcher explicitly excludes `/api` routes from the middleware. API endpoints receive **NO** security headers, CSRF protection, or authentication checks.
    -   **Fix:**
        ```typescript
        export const config = {
          matcher: [
            /*
             * Match all request paths except for the ones starting with:
             * - _next/static (static files)
             * - _next/image (image optimization files)
             * - favicon.ico, sitemap.xml, robots.txt (metadata files)
             */
            '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
          ],
        };
        ```
    -   **Estimated Time:** 1 hour

2.  **Filename:** Wrong Filename - Severity: CRITICAL
    -   **Impact:** Next.js looks for `middleware.ts`, not `proxy.ts`. This file is effectively dead code.
    -   **Fix:** Rename `proxy.ts` to `middleware.ts`.
    -   **Estimated Time:** 0.1 hours

### Recommendations:
-   Ensure middleware runs on API routes to enforce CSRF and Headers.
-   Add specific exclusion for public webhooks if necessary, but default to secure.

---

## package.json: Dependency Configuration

**PATH:** `/package.json`

### Issues Found:
1.  **Line 10:** Hardcoded Secret - Severity: CRITICAL
    -   **Impact:** `NEXTAUTH_SECRET` is exposed in the build script.
    -   **Fix:** Remove `NEXTAUTH_SECRET=...` from the script.
    -   **Estimated Time:** 0.1 hours

2.  **Line 41:** Duplicate Animation Libraries - Severity: HIGH
    -   **Impact:** Bloats bundle size. `gsap` and `framer-motion` are both present.
    -   **Fix:** Remove `gsap` and refactor components to use `framer-motion` (or vice versa).
    -   **Estimated Time:** 4 hours

---

## lib/auth.ts: Authentication Logic

**PATH:** `/lib/auth.ts`

### Issues Found:
1.  **Line 15:** Fail-Open Rate Limiting - Severity: HIGH
    -   **Impact:** If Redis is missing, rate limiting is disabled, allowing brute-force attacks.
    -   **Fix:** Throw an error or block requests if security infrastructure is critical and missing.
    -   **Estimated Time:** 2 hours

2.  **Line 131:** Sensitive Logging - Severity: MEDIUM
    -   **Impact:** Logs "Password invalid for user [email]".
    -   **Fix:** `console.log("Password invalid");` (Remove user email from failure log).
    -   **Estimated Time:** 0.5 hours

---

## app/api/admin/users/route.ts: Admin User Creation

**PATH:** `/app/api/admin/users/route.ts`

### Issues Found:
1.  **Line 19:** Force Dynamic - Severity: HIGH
    -   **Impact:** `export const dynamic = "force-dynamic";` disables optimization.
    -   **Fix:** Remove this line. Let Next.js decide or use `revalidate`.
    -   **Estimated Time:** 0.5 hours

2.  **Line 48:** Manual CSRF Check - Severity: MEDIUM
    -   **Impact:** Relies on manual inclusion.
    -   **Fix:** Rely on global middleware (once fixed).
    -   **Estimated Time:** 1 hour

---

## scripts/bootstrap-ubuntu22.sh: Infrastructure Script

**PATH:** `/scripts/bootstrap-ubuntu22.sh`

### Issues Found:
1.  **Line 475:** Syntax Error / Logic Flow - Severity: CRITICAL
    -   **Impact:** The script contains a broken `if` block structure and unconditionally calls `exit 1` in the middle of execution.
    -   **Fix:** Remove the rogue `fi` and `exit 1`.
    -   **Estimated Time:** 1 hour
