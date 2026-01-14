# Crispy Fishstick — Production Security Review (Updated: Jan 13, 2026)

This report documents the security status and remediation efforts for the Vantus application.

## 🚨 Release Blockers (Status: ✅ ALL RESOLVED)

### 1) Sensitive credential material exposure
- **Issue**: Password hashes and MFA secrets were potentially exposed in API responses.
- **Remediation**: ✅ **RESOLVED**. Implementation uses `SAFE_USER_SELECT` in `lib/security/safe-user.ts` to exclude all sensitive fields from Prisma queries. Audit logs are redacted.

### 2) Unrestricted file upload & Path Traversal
- **Issue**: Potential for path traversal in media download and unrestricted uploads.
- **Remediation**: ✅ **RESOLVED**. 
    - `validateFile` in `lib/security/upload.ts` enforces strict MIME types and size limits.
    - Path traversal vulnerability in `app/api/admin/media/[id]/download/route.ts` fixed with `path.resolve` and strict filename validation.

### 3) Public cron endpoint
- **Issue**: Unprotected cron endpoints.
- **Remediation**: ✅ **RESOLVED**. `app/api/cron/contract-reminders/route.ts` requires `CRON_SECRET` Bearer token.

### 4) Database file in repository
- **Issue**: `prisma/dev.db` was present in the repo.
- **Remediation**: ✅ **RESOLVED**. The binary file has been removed from the repository.

### 5) Insecure Seed Credentials
- **Issue**: Default "admin" password in seed script.
- **Remediation**: ✅ **RESOLVED**. `prisma/seed.ts` now enforces environment variables in production and warns in development.

### 6) Prisma query logging
- **Issue**: Query logging enabled in production.
- **Remediation**: ✅ **RESOLVED**. `lib/prisma.ts` configures logging based on `NODE_ENV`.

## 🛡️ Additional Enhancements

- **Global Middleware**: Implemented `middleware.ts` for consistent authentication enforcement and secure headers (CSP, HSTS, etc.).
- **MFA Security**: Enhanced `POST /api/admin/auth/mfa/disable` to require password verification.
- **Input Validation**: Centralized Zod schemas for all sensitive API operations.

---

## File-by-file remediation plan

### `.gitignore`
**Add**:
- `prisma/*.db`
- `prisma/dev.db`
- `contact_submissions.json`
- `.agent/`
- `.env*` (if not already)
- `public/uploads/` (if you keep local uploads)

---

### `prisma/dev.db`
**Action:** Delete from repo & deployment. Assume it is compromised if it ever contained real data.

---

### `contact_submissions.json`
**Action:** Remove from repo & deployment (PII risk). If you need archival, store in DB with access control.

---

### `prisma/seed.ts`
**Issues:**
- Defaults to `admin@vantus.com` + password `"admin"` if env vars absent.
- Bcrypt cost is low and bcryptjs is slower than native bcrypt.

**Fix:**
- Require `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` (or generate a random password and print it once).
- Fail in production if defaults are used.
- Consider using `bcrypt` (native) and cost 12+.

---

### `lib/prisma.ts`
**Issues:**
- `log: ["query"]` always enabled.

**Fix:**
- Set logs based on `NODE_ENV` (dev-only query logs).
- Consider structured logging with redaction.

---

### `lib/admin/audit.ts`
**Issues:**
- Stores `before`/`after` objects *verbatim*.
- Those objects can include `passwordHash`, `mfaSecret`, and other secrets.
- Audit logs become a secondary datastore for secrets.

**Fix:**
- Implement a `redactForAudit()` helper to strip sensitive keys recursively:
  - `passwordHash`, `mfaSecret`, `secret`, `token`, `apiKey`, etc.
- Store minimal diffs instead of full objects for high-risk resources.

---

### `app/api/admin/audit/route.ts`
**Issues:**
- Returns raw audit rows, including sensitive `before`/`after` if present.
- No pagination/limits (DoS / large response risk).

**Fix:**
- Paginate and cap results.
- Ensure returned JSON is redacted (or store redacted only).

---

### `app/api/admin/users/route.ts`
**Issues:**
- `GET` returns full user records including `passwordHash` and `mfaSecret`.
- `POST` returns full created user record including `passwordHash`.
- Weak password policy (min length 6).

**Fix:**
- Use Prisma `select` for safe fields only.
- Never return `passwordHash` or `mfaSecret` to any client.
- Implement stronger password policy (length 12+, zxcvbn-style checks).
- Add rate limiting for user creation endpoints (or restrict to Owner role).

---

### `app/api/admin/users/[id]/route.ts`
**Issues:**
- Returns full user on GET/PATCH, and returns deleted user on DELETE (including secrets).
- Role update is not transactional (deleteMany + create can leave partial state).
- Audit logging captures secrets.

**Fix:**
- Use `select` everywhere.
- For DELETE: return `{ success: true }` only.
- Use `prisma.$transaction()` for role updates.
- Redact audit.

---

### `app/api/admin/users/[id]/roles/route.ts`
**Issues:**
- Returns full user record with secrets via `include: { RoleAssignment: ... }`.

**Fix:**
- Use `select`:
  - user: `id`, `name`, `email`, `createdAt`, `RoleAssignment.roleId`, `Role.name`
- Redact audit.

---

### `app/(admin)/admin/users/page.tsx`
**Issues:**
- `prisma.user.findMany()` without `select` (unnecessary secrets fetched).

**Fix:**
- Add `select` for only required fields.

---

### `app/(admin)/admin/users/[id]/page.tsx`
**Issues:**
- Fetches full user (including `passwordHash`/`mfaSecret`) and passes to client component `<UserForm initialData={user} />`.
- This will serialize secrets to the browser.

**Fix:**
- Fetch a **safe DTO**:
  - `id`, `name`, `email`, roleIds
- Pass that DTO to the client component.

---

### `components/admin/users/user-form.tsx`
**Issues:**
- Accepts `initialData: any` (encourages accidental secret use).
- UI offers “New Password” but backend PATCH does not accept password currently (broken UX + future security footgun).

**Fix:**
- Type `initialData` strictly to a safe DTO.
- Either remove password update from UI or implement a dedicated password-rotation endpoint (requires re-auth).

---

### `app/(admin)/admin/page.tsx`
**Issues:**
- **Missing `requireAdmin()`** entirely.

**Fix:**
- Add `await requireAdmin({ permissions: ["admin.access"] })` (or a tighter set).

---

### `app/(admin)/admin/layout.tsx`
**Issues:**
- If unauthenticated, it still renders `{children}` (just without sidebar). Middleware currently redirects, but server-side guard should not rely solely on middleware.

**Fix:**
- If `!session`, `redirect("/admin/login")`.

---

### `app/api/admin/auth/mfa/disable/route.ts`
**Issues:**
- Allows disabling MFA with only a session cookie (no token / re-auth).

**Fix:**
- Require current password **and** a valid MFA token (or a “recent re-auth” timestamp).
- Log to audit.

---

### `lib/auth.ts`
**Issues:**
- No login rate limiting (credential stuffing).
- MFA secret stored plaintext in DB.

**Fix:**
- Add rate limiting keyed on `(ip,email)` for authorize().
- Encrypt MFA secret at rest (libsodium / envelope encryption).

---

### `lib/rate-limit.ts`
**Issues:**
- Key includes `user-agent` in some callers; easy to bypass.
- Not atomic under concurrency.

**Fix:**
- Prefer keying by IP (and route namespace), not UA.
- Use a transaction/atomic approach.

---

### `app/api/contact/route.ts`
**Issues:**
- Rate-limit key includes UA (bypass).

**Fix:**
- Rate limit by IP only (or IP + /24 subnet).

---

### `app/api/admin/media/[id]/route.ts`
**Issues:**
- `path.join(process.cwd(), "public", asset.url)` where `asset.url` begins with `/uploads/...`.
  - `path.join()` discards previous segments when a later segment is absolute.

**Fix:**
- Compute filepath from a known base using `asset.key`:
  - `join(process.cwd(), "public", "uploads", asset.key)`
- Validate `asset.key` contains no path separators.

---

### `middleware.ts`
**Issues:**
- CSP includes `'unsafe-eval'` even in production.
- Uses `NEXTAUTH_SECRET` only; auth config also allows `AUTH_SECRET`.

**Fix:**
- Remove `'unsafe-eval'` in production.
- Use `process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET`.

---

### `lib/email.ts`
**Issues:**
- Mock email sender logs email content (PII) to console.

**Fix:**
- Implement a real email provider (SES/SendGrid/Postmark) with secrets in env.
- Redact logs.

---

## Files to create (recommended)

### `lib/security/redact.ts`
- Recursive redaction helper for logs/audit responses.

### `lib/security/safe-user.ts`
- `SAFE_USER_SELECT` Prisma select object and `SafeUser` type.

### `lib/security/origin.ts`
- Shared origin/CSRF enforcement for admin mutation endpoints.

### `lib/security/cron.ts`
- Verify `CRON_SECRET` header/token; reject otherwise.

### `lib/uploads/validate.ts`
- Allowed mime list, max bytes, filename normalization.

---

## Production environment checklist (minimum)

- `NEXTAUTH_URL` = your canonical HTTPS URL
- `NEXTAUTH_SECRET` = long random (32+ bytes)
- `DATABASE_URL` = Postgres/MySQL (do not use local SQLite for real prod)
- `ALLOWED_ORIGINS` = exact origins allowed for `/api/contact` (comma-separated)
- `CRON_SECRET` = random secret for cron endpoints
- `UPLOAD_MAX_BYTES`, `UPLOAD_ALLOWED_MIME` (if keeping local uploads)

---

## Quick “did we fix it?” verification steps

1. Hit `/api/admin/users` as an admin: **verify no `passwordHash` or `mfaSecret`** appear.
2. Open `/admin/users/[id]` and inspect Network payload: ensure no secrets are serialized.
3. Attempt to upload `.html` or `.js`: should be rejected.
4. Call `/api/cron/contract-reminders` without secret: must be 401/403.
5. Confirm production logs contain no query logs and no email content.
