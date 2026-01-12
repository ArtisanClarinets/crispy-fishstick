# Security & Auth Rules

## Admin APIs
- MUST use `lib/admin/route.ts` wrappers:
  - `adminRead` for reads
  - `adminMutation` for writes
- Mutations must enforce:
  - same-origin
  - CSRF token verification
  - server-side RBAC
  - audit metadata (or explicit audit call)

## CSP / Headers / Nonce
- Do not weaken CSP.
- Do not add `unsafe-inline` scripts.
- Any nonce/header plumbing should be performed at the **proxy.ts** boundary and passed to the app via headers/cookies. :contentReference[oaicite:3]{index=3}

## Request interception boundary (Next.js 16)
- Use `proxy.ts` (not middleware) for request interception. :contentReference[oaicite:4]{index=4}

## Tenancy
- Never query tenant-scoped records by ID alone.
- Always scope by tenant and verify user context.
