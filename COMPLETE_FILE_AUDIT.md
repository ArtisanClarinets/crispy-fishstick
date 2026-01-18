# COMPLETE FILE AUDIT

**DATE:** 2025-05-15
**AUDIT SCOPE:** Critical Path Files

## proxy.ts: Security Middleware

**PATH:** `/proxy.ts`

### Issues Found:
1.  **Line 83-93:** Middleware Matcher Bypass - Severity: CRITICAL
    *   **Impact:** The regex `(?!api|...)` explicitly excludes `/api` routes from middleware execution. Security headers and auth checks are skipped.
    *   **Fix:**
        ```typescript
        // Remove 'api' from the negative lookahead
        '/((?!_next/static|_next/image|favicon.ico|...).*)',
        ```
    *   **Estimated Time:** 1 hour

2.  **Line 13:** Missing HTTP Strict Transport Security (HSTS) configuration for subdomains
    *   **Impact:** `includeSubDomains` is present but `preload` is missing, and it's only set in production env check which might fail in staging.
    *   **Fix:** Ensure HSTS is always set for non-localhost.
    *   **Estimated Time:** 0.5 hours

### Recommendations:
- Switch to standard `middleware.ts` naming convention to avoid confusion with custom proxies.

---

## lib/security/rate-limit.ts: Rate Limiting Logic

**PATH:** `/lib/security/rate-limit.ts`

### Issues Found:
1.  **Line 118-125:** Fail Open on Redis Error - Severity: CRITICAL
    *   **Impact:** If Redis is down/unreachable, `catch` block returns `success: true`. Attackers can DDOS Redis to bypass rate limits.
    *   **Fix:**
        ```typescript
        return { success: false, retryAfter: 60 }; // Fail closed
        ```
    *   **Estimated Time:** 1 hour

2.  **Line 16:** Insecure Default Window - Severity: MEDIUM
    *   **Impact:** Default window is 1 minute.
    *   **Fix:** Make defaults configurable via ENV.
    *   **Estimated Time:** 0.5 hours

---

## components/admin/content/content-form.tsx: CMS Input

**PATH:** `/components/admin/content/content-form.tsx`

### Issues Found:
1.  **Line 241:** Stored XSS via ReactMarkdown - Severity: CRITICAL
    *   **Impact:** Renders raw HTML from user input. `<script>` tags will execute.
    *   **Fix:**
        ```typescript
        import rehypeSanitize from 'rehype-sanitize';
        // ...
        <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{field.value}</ReactMarkdown>
        ```
    *   **Estimated Time:** 2 hours (install dep + refactor)

---

## scripts/bootstrap-ubuntu22.sh: Deployment Script

**PATH:** `/scripts/bootstrap-ubuntu22.sh`

### Issues Found:
1.  **Line 671:** Logic Error / Early Exit - Severity: HIGH
    *   **Impact:** `exit 1` is placed in a way that terminates the script during what seems to be a cleanup phase, preventing subsequent steps.
    *   **Fix:** Remove the unconditional `exit 1` and fix the `if/fi` block nesting.
    *   **Estimated Time:** 1 hour

2.  **Line 13-14:** Hardcoded User/Paths - Severity: MEDIUM
    *   **Impact:** inflexible deployment.
    *   **Fix:** Use variables.
    *   **Estimated Time:** 1 hour

---

## package.json: Dependencies & Scripts

**PATH:** `/package.json`

### Issues Found:
1.  **Line 9:** Hardcoded Secrets in Build Script - Severity: CRITICAL
    *   **Impact:** `NEXTAUTH_SECRET` is visible in the codebase.
    *   **Fix:** Remove `NEXTAUTH_SECRET=...` from the script command. Rely on `.env` or CI secrets.
    *   **Estimated Time:** 0.5 hours

2.  **Dependencies:** Duplicate Animation Libs - Severity: MEDIUM
    *   **Impact:** Bloated bundle.
    *   **Fix:** Remove `gsap`.
    *   **Estimated Time:** 2 hours

---

## app/layout.tsx: Root Layout

**PATH:** `/app/layout.tsx`

### Issues Found:
1.  **Line 55:** Global Force Dynamic - Severity: HIGH
    *   **Impact:** `export const dynamic = "force-dynamic"` disables all static optimization.
    *   **Fix:** Remove this line. Use granular dynamic config on specific pages.
    *   **Estimated Time:** 1 hour
