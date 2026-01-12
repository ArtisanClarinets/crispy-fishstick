# Wiring & Invariants (Read First)

## Goal
Prevent “works in one place but breaks elsewhere.” Every change must remain fully wired across:
**entrypoints → routes → APIs → data → security → tests**.

## Never break these invariants
- Admin auth + server-side RBAC enforcement
- CSRF + same-origin enforcement on all mutations
- CSP + nonce plumbing (per-request nonce)
- Tenant isolation on all tenant-scoped queries
- Audit trail for privileged admin mutations
- Prisma model → Zod schema → migrations sync
- Route → UI → API → data flow consistency (including client helpers and established fetchers)
- Next.js 16 interception entrypoint (`proxy.ts`)
- Build/lint/test gates

## Required quick checks for non-trivial changes
- Confirm Next.js 16 interception entrypoint is present and active: **proxy.ts**
  - Only one `proxy.ts` is supported; keep interception centralized.
  - Pass context via headers/cookies/redirects/rewrites (no shared globals). :contentReference[oaicite:2]{index=2}
- Confirm UI links to route and route calls correct API
- Confirm Zod validation exists at boundaries
- Confirm tests still cover the affected flow
- Confirm Prisma model changes are reflected in migrations, `prisma generate`, and Zod schemas
- Confirm all admin APIs use `adminRead`/`adminMutation` wrappers
- Confirm tenant isolation is enforced on all tenant-scoped queries
- Confirm audit trail is created for all privileged admin mutations
- Confirm no security regressions (CSRF, RBAC, CSP/nonce, tenant isolation)
- Confirm build/lint/tests pass