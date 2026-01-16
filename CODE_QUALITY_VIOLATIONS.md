# CODE QUALITY VIOLATIONS

## TypeScript Configuration
- **Issue**: `skipLibCheck: true`
- **Location**: `tsconfig.json`
- **Severity**: High
- **Description**: This suppresses type errors in node_modules, but often masks real incompatibility issues between libraries (e.g., mismatched React versions in `@types/react`).
- **Fix**: Set to `false` and resolve the actual type conflicts.

## Error Handling
- **Issue**: Generic `any` usage in catch blocks
- **Location**: `app/api/admin/users/route.ts`, `components/admin/content/content-form.tsx`
- **Snippet**: `catch (error: any)`
- **Impact**: Swallows specific error types, making debugging impossible and preventing proper error reporting to Sentry.
- **Fix**: Use `if (error instanceof Error)` type narrowing.

## Maintainability
- **Issue**: Logic in Layouts
- **Location**: `app/(site)/layout.tsx` (implied by memory) and `app/layout.tsx`.
- **Description**: `app/layout.tsx` contains providers, font loading, auth checks, and theme logic.
- **Fix**: Move providers to a dedicated `providers.tsx` Client Component wrapper to keep the root layout clean and server-only where possible.

## Documentation
- **Issue**: Missing JSDoc on complex logic.
- **Location**: `components/react-bits/Waves.tsx`
- **Description**: The canvas math (physics simulation) is undocumented.
- **Fix**: Add comments explaining the `tension`, `friction`, and wave algorithms.

## Testing
- **Coverage**: Low.
- **Issue**: `ci.yml` runs tests, but there are very few unit tests visible for complex logic like `lib/admin/guards.ts` or `lib/security/csrf.ts`.
- **Fix**: Add unit tests for all security utility functions.
