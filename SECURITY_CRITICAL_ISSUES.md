# SECURITY CRITICAL ISSUES AUDIT

**DATE:** 2025-05-15
**AUDITOR:** Senior Principal Engineer
**STATUS:** 🔴 NO-GO FOR DEPLOYMENT

This document outlines security vulnerabilities that pose an immediate threat to the confidentiality, integrity, and availability of the Vantus Systems platform.

---

## 🔴 CRITICAL (Deploy Blocker)
*Immediate exploitation possible. Must be fixed before any production traffic.*

### 1. Middleware Security Bypass on API Routes
**Location:** `proxy.ts` (Lines 83-93)
**Vulnerability:** The middleware matcher explicitly excludes all `/api` routes from the security filter. This means `applySecurityHeaders` (CSP, HSTS, X-Frame-Options) and authentication checks are **completely skipped** for the most sensitive part of the application.
**Impact:** API endpoints are exposed to Clickjacking, lack HSTS enforcement, and bypass global auth checks.
**Evidence:**
```typescript
// proxy.ts
matcher: [
  // EXCLUDES api from middleware execution!
  '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/uploads|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)$).*)',
],
```
**Remediation:** Remove `api` from the exclusion list or create a specific matcher for protected API routes.

### 2. "Fail Open" Rate Limiting Strategy
**Location:** `lib/security/rate-limit.ts` (Lines 118-125)
**Vulnerability:** If the Redis connection fails, the rate limiter catches the error and returns `success: true` with full quota remaining. Attackers can DoS the Redis instance to disable rate limiting globally.
**Impact:** Unlimited brute force attacks (credential stuffing) and API abuse during infrastructure stress.
**Evidence:**
```typescript
// lib/security/rate-limit.ts
} catch (error) {
  console.error("Rate limiting error:", error);
  // Fail open if Redis is unavailable
  return {
    success: true,  // <-- SECURITY FLAW
    remaining: this.maxAttempts
  };
}
```
**Remediation:** Change default behavior to "Fail Closed" or implement a local memory fallback with strict limits.

### 3. Stored XSS in Content Management
**Location:** `components/admin/content/content-form.tsx` (Line 189)
**Vulnerability:** User input is rendered using `<ReactMarkdown>` without any sanitization plugins (like `rehype-sanitize`). Malicious scripts saved in the `content` field will execute in the browser of any admin viewing the preview or any user viewing the published page.
**Impact:** Persistent XSS allowing session hijacking, admin account takeover, and defacement.
**Evidence:**
```tsx
// components/admin/content/content-form.tsx
<ReactMarkdown>{field.value}</ReactMarkdown>
```
**Remediation:** Implement `rehype-sanitize` to strip dangerous tags/attributes.
```tsx
<ReactMarkdown rehypePlugins={[rehypeSanitize]}>{field.value}</ReactMarkdown>
```

### 4. Hardcoded Secrets in Build Script
**Location:** `package.json` (Line 9)
**Vulnerability:** The `build` script hardcodes the `NEXTAUTH_SECRET` and `NEXTAUTH_URL`. This exposes the production secret in the repository history and potentially in build logs.
**Impact:** Complete compromise of session signing; attackers can forge session tokens.
**Evidence:**
```json
"build": "node scripts/generate-build-proof.mjs && NEXTAUTH_URL=https://vantus.systems NEXTAUTH_SECRET=12345678901234567890123456789012 next build",
```
**Remediation:** Remove secrets from `package.json`. Use environment variables injected at build time via CI/CD secrets.

---

## 🟡 HIGH RISK
*Significant potential for damage. Fix required before public launch.*

### 5. Insecure Infrastructure Bootstrap
**Location:** `scripts/bootstrap-ubuntu22.sh`
**Vulnerability:**
1.  **Root Execution:** Script runs entirely as root.
2.  **Firewall Check Only:** It checks `ufw status` but does not *enable* or *configure* it if inactive.
3.  **Dangling Exit:** Line 671 contains a logic error with `exit 1` that may abort valid installations or create undefined states.
**Impact:** Server left exposed with open ports; undefined provisioning state.

### 6. SQLite in Production
**Location:** `scripts/bootstrap-ubuntu22.sh` / `prisma/schema.prisma`
**Vulnerability:** The stack relies on SQLite for a "Fortune 500" deployment. SQLite is not concurrent-safe for high-traffic writes and lacks row-level locking.
**Impact:** Database locking errors, data corruption under load, and inability to scale horizontally.

---

## 🟠 MEDIUM RISK
*Best practice violations that increase attack surface.*

### 7. Information Leakage in Auth Logs
**Location:** `lib/auth.ts`
**Vulnerability:** `console.log("Password invalid for user", user.email);` leaks valid email addresses to stdout.
**Impact:** user enumeration facilitation.

### 8. Missing HTTP Security Headers on API
**Location:** `proxy.ts`
**Vulnerability:** Due to the matcher issue (item #1), API responses lack `Strict-Transport-Security`, `Content-Security-Policy`, and `X-Content-Type-Options`.
