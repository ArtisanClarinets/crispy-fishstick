# CODE QUALITY VIOLATIONS REPORT

**DATE:** 2026-05-21
**METRICS:**
- `console.log` count: ~135
- `any` usage: ~77
- `@ts-ignore`: ~10

---

## 1. TypeScript & Type Safety

**Severity: HIGH**
The codebase relies heavily on bypassing the type system, defeating the purpose of TypeScript.

**Evidence:**
- `tsconfig.json`: `"skipLibCheck": true` hides potential library conflicts.
- `.eslintrc.json`: `"@typescript-eslint/no-explicit-any": "warn"` allows `any` to proliferate.
- **Explicit Type Casting in Tests:**
  `tests/auth.test.ts`:
  ```typescript
  (prisma.user.findUnique as any).mockResolvedValue(mockUser);
  ```
  **Fix:** Use `vi.mocked(prisma.user.findUnique)` to preserve type safety.

**Impact:** Refactoring is dangerous because the compiler cannot guarantee type correctness. Runtime errors are likely.

---

## 2. Code Smells & Maintainability

**Issue: Magic Numbers & Hardcoding**
**File:** `components/living-blueprint-section.tsx`
```typescript
const rawPhase = p * 7; // Magic number 7 (coupled to STEPS array length)
```
**Fix:** Derive dynamic values from data structures (e.g., `STEPS.length`).

**Issue: Debugging Leftovers**
There are **135 instances** of `console.log` in the codebase.
**Example:** `proxy.ts`
```typescript
console.log("Proxy checking admin access for:", pathname, ...);
```
**Fix:** Remove all console logs or replace with a structured logger (`winston` or `pino`) visible only in dev/debug mode.

---

## 3. Testing Quality

**Status: FRAGILE**
- **Unit Tests:** Exist (`vitest`), but rely on heavy mocking of primitives (like `Redis` class structure) which drifts from reality.
- **Integration Tests:** `e2e` tests exist (`playwright`) but `ci.yml` is misconfigured (Port 3005 vs 3000), meaning they likely fail or test the wrong target in CI.
- **Coverage:** No coverage report available, but manual inspection suggests critical paths (Billing, Complex Auth) are under-tested.

---

## 4. Documentation

**Status: INCOMPLETE**
- Public functions in `lib/` lack JSDoc.
- `AGENTS.md` files exist, but `README.md` for developers (setup, architecture) is minimal or scattered (`docs/` folder exists but structure is loose).

## 5. Error Handling

**Issue: Generic Error Swallowing**
**File:** `app/api/admin/users/route.ts`
```typescript
} catch (error: any) {
    // ...
    return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
}
```
**Fix:** Log the actual error to an error tracking service (Sentry is installed, ensure it captures these) before returning 500. Currently, `console.error` is missing in some catch blocks.
