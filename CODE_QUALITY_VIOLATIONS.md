# Code Quality Violations

## TypeScript Violations
- **`@ts-ignore` / `@ts-expect-error`:** 11 occurrences.
  - *Risk:* Hides critical type errors, potential runtime crashes.
  - *Recommendation:* Resolve the underlying type issues.
- **`any` Type:** 81 occurrences.
  - *Risk:* Disables type checking for variables, allowing unsafe access.
  - *Recommendation:* Replace with `unknown` or specific interfaces.
  - *Config:* `tsconfig.json` has `strict: true`, so these explicit `any`s are bypasses.

## Error Handling
- **Generic Error Swallowing:**
  - `lib/admin/guards.ts`:
    ```typescript
    try { return JSON.parse(r.Role.permissions); } catch { return []; }
    ```
    *Issue:* If permissions are corrupted, this fails silently, potentially granting "no access" instead of alerting an admin to data corruption.

## Code Smells
- **Console Logging:** 127 occurrences of `console.log`.
  - *Issue:* Clutters stdout/stderr, makes debugging hard in production, potential leak of PII.
- **Magic Strings:**
  - `permissions: ["users.read"]` scattered across files.
  - *Fix:* Use a `Permissions` enum or constant object.

## Testing
- **Coverage:** Low.
  - `e2e` folder exists with Playwright tests. Good.
  - `tests` folder exists (Vitest). Good.
  - *Gap:* Unit test coverage for complex logic like `lib/admin/guards.ts` (permission logic) is critical.

---

# Infrastructure Deficiencies

## Containerization (MISSING)
- **Dockerfile:** ❌ NOT FOUND
- **docker-compose.yml:** ❌ NOT FOUND
- **Impact:** Application environment is not reproducible. Deployments rely on the specific state of the host server ("Snowflake server").
- **Fix:** Add a multi-stage Dockerfile immediately.

## CI/CD
- **GitHub Actions:** ✅ `.github/workflows/ci.yml` exists.
- **Gap:** No `cd.yml` (Deployment pipeline). It seems deployment is manual or handled outside this repo context.

## Monitoring & Observability
- **Logging:** ❌ No structured logging (using `console.log`).
- **Metrics:** ❌ No APM (Datadog/NewRelic) or OpenTelemetry setup visible in deps.
- **Impact:** "Flying blind" in production.

## Database
- **Backups:** No automated backup strategy defined in code/infra.
- **Migrations:** `prisma migrate dev` usage in `package.json` suggests dev-mode thinking. Need `migrate deploy` for production.
