## 🔴 CRITICAL (Deploy Blocker)

### 1. Missing Infrastructure-as-Code (Docker)
**Severity:** CRITICAL
**Location:** Root Directory
**Impact:** Application cannot be reliably deployed, scaled, or recovered. "Works on my machine" syndrome guaranteed.
**Evidence:**
- `find . -name "Dockerfile"` returned 0 results.
- `find . -name "docker-compose.yml"` returned 0 results.
**Remediation:**
Create a multi-stage `Dockerfile` immediately to pin Node.js version and dependencies.

### 2. Dependency Conflict & "Ghost" Versions
**Severity:** CRITICAL
**Location:** `package.json`
**Impact:** Build instability and potential runtime crashes due to version mismatch.
**Evidence:**
```json
"dependencies": {
  "prisma": "^6.4.1",
  "@prisma/client": "^6.4.1"
},
"devDependencies": {
  "prisma": "^5.22.0"
}
```
*Note:* Prisma 6 does not exist yet (current stable is v5). Mixing v5 and "v6" (fake or beta) is a recipe for disaster.
**Remediation:**
Run `npm uninstall prisma @prisma/client && npm install prisma@5.10.2 @prisma/client@5.10.2 --save-exact`.

### 3. Hardcoded Secrets Risk
**Severity:** CRITICAL
**Location:** `lib/auth.ts`
**Impact:** Potential secret leakage or fallback to insecure defaults in production.
**Evidence:**
```typescript
if (!secret) {
  console.warn("No auth secret found. Using a development fallback secret.");
  return "dev-secret-fallback-for-development-only";
}
```
While there is a check for `NODE_ENV === "production"`, relying on logic branches to prevent hardcoded secrets is risky if `NODE_ENV` is misconfigured.
**Remediation:**
Throw a hard error if secrets are missing, regardless of environment, or strictly separate dev config.

---

## 🟡 HIGH RISK

### 1. Extensive Use of `any` Type
**Severity:** HIGH
**Location:** Codebase-wide (81 occurrences)
**Impact:** Defeats the purpose of TypeScript. Runtime errors that TS should have caught will crash the app.
**Evidence:**
`grep -r ": any" . | wc -l` -> 81
Example in `lib/admin/guards.ts`:
```typescript
export function withAdminGuard(
  handler: (req: Request, context: any, user: AdminUserContext) => Promise<NextResponse>,
  // ...
)
```
**Remediation:**
Replace `any` with strict types (`unknown`, `z.infer<...>`, or specific interfaces).

### 2. JSON Parsing in Hot Path (Auth)
**Severity:** HIGH
**Location:** `lib/admin/guards.ts`
**Impact:** CPU DoS vulnerability. Malformed JSON in the DB could crash the auth logic.
**Evidence:**
```typescript
const rolePermissions = user.RoleAssignment.flatMap((r) => {
  try {
    return JSON.parse(r.Role.permissions); // Runs on EVERY admin request
  } catch {
    return [];
  }
});
```
**Remediation:**
Cache parsed permissions or move to a normalized relational schema (`RolePermission` table) instead of storing JSON strings.

### 3. Missing Rate Limiting in API Handlers
**Severity:** HIGH
**Location:** `app/api/admin/users/route.ts` (and others)
**Impact:** Brute force or DoS attacks on sensitive admin creation endpoints.
**Evidence:**
The `POST` handler checks `requireAdmin` but does not appear to call a rate limiter function explicitly inside the handler logic (unlike `login` which does).
**Remediation:**
Apply `rateLimit()` middleware/utility to all `POST/PUT/DELETE` endpoints.

---

## 🟠 MEDIUM RISK

### 1. Console Log Pollution
**Severity:** MEDIUM
**Location:** Codebase-wide (127 occurrences)
**Impact:** Performance degradation (synchronous I/O in Node) and potential sensitive data leakage in logs.
**Evidence:**
`grep -r "console.log" . | wc -l` -> 127
**Remediation:**
Implement a structured logger (e.g., `winston` or `pino`) and lint rule `no-console`.

### 2. "Bleeding Edge" Dependency Risk
**Severity:** MEDIUM
**Location:** `package.json`
**Impact:** Stability issues with `next@16.1.1` and `react@19.2.3`. These are very new/beta versions.
**Evidence:**
Dependencies allow potential breaking changes from non-LTS releases.
**Remediation:**
Downgrade to LTS versions (Next.js 14/15, React 18) unless specific features are strictly required.
