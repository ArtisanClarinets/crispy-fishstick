# SECURITY CRITICAL ISSUES AUDIT

**DATE:** 2026-05-21
**AUDITOR:** Senior Principal Engineer
**SCOPE:** Complete Codebase Analysis

---

## 🔴 CRITICAL SEVERITY (Deploy Blockers)

### 1. API Security Bypass (Middleware Misconfiguration)
**Location:** `proxy.ts` (Lines 66-77)
**Issue:** The middleware `matcher` explicitly excludes all routes starting with `/api`. This completely bypasses the security headers (CSP, HSTS, X-Frame-Options) and authentication checks implemented in the middleware for the most sensitive part of the application.
**Impact:** API endpoints are exposed without global security headers or gateway-level auth checks.
**Code Evidence:**
```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) <-- VULNERABILITY
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/uploads|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)$).*)',
  ],
};
```
**Remediation:**
Replace the matcher configuration to include API routes while excluding only static assets.
```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```
**Time Estimate:** 1 Hour

### 2. Hardcoded Secrets in Build Script
**Location:** `package.json` (Line 9)
**Issue:** Production secrets are hardcoded directly into the build command. This exposes the `NEXTAUTH_SECRET` to anyone with read access to the repository or CI logs.
**Impact:** Complete compromise of session security. Attackers can forge session tokens.
**Code Evidence:**
```json
"build": "node scripts/generate-build-proof.mjs && NEXTAUTH_URL=https://vantus.systems NEXTAUTH_SECRET=12345678901234567890123456789012 next build",
```
**Remediation:**
Remove hardcoded secrets. Use environment variables.
```json
"build": "node scripts/generate-build-proof.mjs && next build",
```
**Time Estimate:** 0.5 Hours

### 3. Fail-Open Rate Limiting Strategy
**Location:** `lib/security/rate-limit.ts`
**Issue:** The rate limiting implementation permits requests to proceed if the Redis connection fails ("Fail Open"). In a DDoS scenario, an attacker could potentially degrade Redis to bypass the limiter.
**Impact:** System vulnerability to brute-force and DDoS attacks during infrastructure stress.
**Remediation:** Implement a "Fail Closed" strategy for critical auth endpoints, or use an in-memory fallback with strict limits.
**Time Estimate:** 4 Hours

---

## 🟡 HIGH RISK (Significant Data Loss/Downtime)

### 1. Stored XSS in Admin Content
**Location:** `components/admin/content/content-form.tsx`
**Issue:** `react-markdown` is used to render content without `rehype-sanitize`.
**Impact:** An internal malicious user (or compromised admin account) can inject scripts into content that executes in other admins' browsers.
**Remediation:** Install `rehype-sanitize` and configure it in the component.
**Time Estimate:** 2 Hours

### 2. Insecure Dependency (NextAuth v4)
**Location:** `package.json`
**Issue:** Usage of `next-auth` v4 (deprecated/maintenance).
**Impact:** Missing latest security patches and features available in Auth.js (v5).
**Remediation:** Plan migration to Auth.js v5.
**Time Estimate:** 20 Hours (Refactor)

---

## 🟠 MEDIUM RISK

### 1. Weak Permissions Querying
**Location:** `prisma/schema.prisma`
**Issue:** `Role.permissions` is stored as a JSON string.
**Impact:** Impossible to efficiently query "Who has permission X?" at the database level. Requires fetching all roles and parsing in application memory.
**Remediation:** Normalize permissions into a `Permission` table with a many-to-many relation.
**Time Estimate:** 8 Hours

### 2. Rate Limit Bypass via IPv6
**Location:** `lib/security/rate-limit.ts`
**Issue:** Standard IP-based rate limiting often fails to handle IPv6 subnets correctly, allowing attackers to rotate IPs easily.
**Remediation:** Normalize IP addresses to /64 subnets for IPv6.
**Time Estimate:** 2 Hours
