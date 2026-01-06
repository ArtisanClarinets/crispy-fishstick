# Crispy Fishstick — Production Security Review (Jan 5, 2026)

This report is based on a file-by-file review of the supplied repository archive.

## Reality check (non-negotiable)

It is **not possible** to guarantee “zero chance of attack infiltration.” What you *can* do is remove the obvious footguns, eliminate data leaks, add real access controls, harden upload paths, and ensure your production runtime and secrets are correctly configured.

Below are **release blockers** and then a **file-by-file remediation plan**.

---

## 🚨 Release Blockers (fix before any public launch)

### 1) Sensitive credential material is being returned to the browser
**Impact:** Password hashes and MFA secrets can be exposed to admin users (and in some flows, to the browser via client components / API responses). This is catastrophic.

**Primary locations:**
- `app/api/admin/users/route.ts`
- `app/api/admin/users/[id]/route.ts`
- `app/api/admin/users/[id]/roles/route.ts`
- `app/api/admin/audit/route.ts` (because audit logs store raw before/after)
- `app/(admin)/admin/users/[id]/page.tsx` (passes full `user` to a client component)

**Fix:** Use Prisma `select` to return only safe fields. Redact secrets from audit logs. Never serialize full `User` records to client components.

---

### 2) Unrestricted file upload to `public/uploads` (stored malware / XSS hosting)
**Impact:** Even with admin-only access, a compromised admin account becomes a malware hosting platform on your domain. Additionally, serving user-controlled files from your origin increases blast radius and can enable same-origin attacks.

**Primary locations:**
- `app/api/admin/media/route.ts`
- `lib/storage.ts`
- `app/api/admin/media/[id]/route.ts` (contains a path-join bug)

**Fix:** Restrict types + size, store outside `public/`, serve via a controlled download route with forced `Content-Type` and `Content-Disposition`, or move to S3 with signed URLs. Fix the absolute-path join bug.

---

### 3) Public cron endpoint can be triggered by anyone
**Impact:** Anyone can spam-trigger reminders, DB reads, and outgoing emails.

**Primary location:**
- `app/api/cron/contract-reminders/route.ts`

**Fix:** Require a secret header/token and use POST-only. Rate limit. Consider removing entirely unless actively used.

---

### 4) You are shipping a real SQLite database file in the repo
**Impact:** `prisma/dev.db` can contain users, hashes, MFA secrets, and PII. Deploying it is a hard “no.”

**Primary location:**
- `prisma/dev.db` (binary in repo)
- `.gitignore` (does not ignore it)

**Fix:** Delete the file, rotate secrets, and add proper ignore rules. Use a real production DB (Postgres/MySQL) via `DATABASE_URL`.

---

### 5) Seed creates an admin user with default password `"admin"`
**Impact:** If seeding is run in prod, you will deploy with a trivial credential.

**Primary location:**
- `prisma/seed.ts`

**Fix:** Remove defaults. Fail hard if env vars are missing. Never seed prod automatically.

---

### 6) Prisma is logging every query in production
**Impact:** Query logs can include sensitive values (emails, messages, tokens, etc.). This becomes an exfiltration vector via logs.

**Primary location:**
- `lib/prisma.ts` (`log: ["query"]`)

**Fix:** Enable query logging only in dev.

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
