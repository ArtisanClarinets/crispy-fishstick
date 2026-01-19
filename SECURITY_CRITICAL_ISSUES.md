# 🛡️ Security Critical Issues Audit

**STATUS: 🔴 CRITICAL - DO NOT DEPLOY**

This codebase contains multiple **severity-critical vulnerabilities** that would lead to immediate compromise if deployed.

## 🔴 CRITICAL (Deploy Blocker)

### 1. Middleware Security Bypass & Dead Code
**Location:** `proxy.ts` (Root)
- **Vulnerability:** The project uses `proxy.ts` instead of `middleware.ts`. Next.js **does not load** `proxy.ts` by default, meaning **NO middleware is running**.
- **Impact:** All security headers (CSP, HSTS, X-Frame-Options), authentication checks, and rate limiting intended to be global are **completely bypassed**.
- **Configuration Flaw:** Even if renamed to `middleware.ts`, the matcher explicitly **excludes** API routes:
  ```typescript
  // proxy.ts:63
  '/((?!api|_next/static|...))'
  ```
  This means `/api/*` endpoints have **zero protection** from the middleware.
- **Fix:** Rename to `middleware.ts` and fix the matcher.

### 2. Hardcoded Secrets in Build Script
**Location:** `package.json`
- **Vulnerability:**
  ```json
  "build": "node scripts/generate-build-proof.mjs && NEXTAUTH_URL=https://vantus.systems NEXTAUTH_SECRET=12345678901234567890123456789012 next build",
  ```
- **Impact:** The `NEXTAUTH_SECRET` is committed to version control. Anyone with read access to the repo can forge session tokens and takeover admin accounts.
- **Fix:** Remove secrets from `package.json`. Use `.env` or CI/CD secrets.

### 3. Fail-Open Rate Limiting
**Location:** `lib/auth.ts`
- **Vulnerability:**
  ```typescript
  if (process.env.DISABLE_RATE_LIMITING === "true") {
    // ... returns success: true
  } else {
    try {
      const redis = new Redis(...);
    } catch (_error) {
      // Returns success: true
    }
  }
  ```
- **Impact:** If Redis fails or isn't configured (which is true, as there's no Redis service in `bootstrap-ubuntu22.sh`), rate limiting defaults to **allowing all requests**. This leaves login endpoints vulnerable to brute-force attacks.
- **Fix:** Fail closed (deny access) if security infrastructure is missing.

### 4. Admin API CSRF vulnerability
**Location:** `app/api/admin/users/route.ts` (and others)
- **Vulnerability:** Admin routes manually implement `verifyCsrfToken(req)`.
- **Impact:** This relies on developer discipline. If a developer forgets to add this line to a new mutation route, the endpoint is immediately vulnerable to CSRF.
- **Fix:** Enforce CSRF checks in `middleware.ts` for all non-GET requests to `/api`.

## 🟡 HIGH RISK

### 1. SQLite in Production
**Location:** `prisma/schema.prisma`
- **Issue:** `provider = "sqlite"`
- **Impact:** SQLite is not suitable for a Fortune 500 multi-tenant application. It lacks concurrency handling, connection pooling, and will lock under load, causing downtime.
- **Fix:** Migrate to PostgreSQL.

### 2. Sensitive Data Logging
**Location:** `lib/auth.ts`
- **Issue:**
  ```typescript
  console.log("Password invalid for user", user.email);
  ```
- **Impact:** Login failures are logged to stdout. In some logging configurations, this could leak valid usernames (enumeration) or clutter logs with PII.
- **Fix:** Use a structured logger (e.g., Winston) and avoid logging specific failure reasons or user emails in plain text.

## 🟠 MEDIUM RISK

### 1. Missing CSP for API
**Location:** `proxy.ts` (Logic)
- **Issue:** CSP is only applied to HTML pages (if middleware ran). API responses return JSON without security headers.
- **Impact:** While less critical for JSON, lack of headers like `Cache-Control` or `X-Content-Type-Options` on API routes can lead to mime-sniffing attacks or stale data caching.
