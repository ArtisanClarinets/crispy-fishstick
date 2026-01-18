# CODE QUALITY VIOLATIONS

**DATE:** 2025-05-15
**STATUS:** NEEDS REMEDIATION

## 1. TypeScript Strictness & Type Safety
*   **Issue:** `tsconfig.json` enables `"skipLibCheck": true`.
    *   **Impact:** Masking potential type conflicts in dependencies, which can lead to runtime errors when libraries interact.
*   **Issue:** Usage of `any` in critical logic.
    *   **Example (`proxy.ts`):** `console.log("...", token?.roles)` where token is cast or inferred loosely.
    *   **Example (`content-form.tsx`):** `catch (error: any)` suppresses type checking on errors.
    *   **Example (`lib/auth.ts`):** `const prismaError = error as any;`.

## 2. Error Handling Anti-Patterns
*   **Generic Catch Blocks:**
    *   In `app/api/admin/users/route.ts`:
        ```typescript
        catch (error) {
            // ... checks for instanceof z.ZodError
            return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
        }
        ```
        It swallows the actual error stack for 500s, making debugging impossible in production logs.
*   **Console Logging:**
    *   `console.log`, `console.warn`, `console.error` are used throughout (`lib/auth.ts`, `proxy.ts`).
    *   **Fix:** Use a structured logger (e.g., `winston` or `pino`) to ensure logs are parsable and severity levels are respected in monitoring tools.

## 3. Component Structure & logic
*   **Duplicate Logic:**
    *   Rate limiting logic exists in `lib/security/rate-limit.ts` (Redis) but `lib/auth.ts` has a hardcoded mock fallback that duplicates the interface.
*   **Prop Drilling:**
    *   Not immediately obvious from the sample, but `ContentForm` takes `initialData` which is good.
*   **Hardcoded Configuration:**
    *   `scripts/bootstrap-ubuntu22.sh` contains hardcoded paths (`/var/www/vantus`) and user names (`vantus`), making the script brittle if directory requirements change.

## 4. Documentation
*   **Missing JSDoc:**
    *   Public functions in `lib/auth.ts` (like the callbacks) lack JSDoc explaining side effects (e.g., "This callback updates session activity in Redis").
*   **Incomplete README:**
    *   No documentation on how to rotate the `NEXTAUTH_SECRET` or `mfaSecret`.

## 5. Testing Gaps
*   **Missing Tests:**
    *   `tests/auth-secret.test.ts` was not found in the file list (though mentioned in prompt context).
    *   `tests/skill-bars.test.tsx` seems to test a UI component.
    *   **Gap:** No integration tests for the `rate-limit` fail-open scenario. No unit tests for `proxy.ts` routing logic.

## Recommended Actions
1.  **Enforce Strict Types:** Remove `any` casts. Use `unknown` and type narrowing.
2.  **Centralize Logging:** Replace `console.log` with `lib/logger.ts`.
3.  **Sanitize Inputs:** Always use `rehype-sanitize` with Markdown.
4.  **Unit Test Core Logic:** Write Jest/Vitest tests for `rate-limit.ts` and `auth.ts` specifically mocking Redis failures.
