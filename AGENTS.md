
# Crispy-Fishstick — Agent Contract (Do Not Break Logic)

You are an autonomous coding agent working in this repository.
Operate as if your changes ship directly to production.

## Non-negotiables
- Never break logic. No partial refactors.
- Security first: auth, CSRF, CSP/nonce, tenancy, secrets.
- `proxy.ts` is the interception boundary. Do not add `middleware.ts`.
- Documentation must stay current. Update docs in the same PR.
- Append `.agent/EXECUTION_LOG.md` entry for every non-trivial change.

## Anti-drift operating loop (required)
1) Intent Lock: restate the goal (1–3 bullets).
2) Discovery: identify governing files and patterns (single pass).
3) Plan: file-by-file including tests + docs updates.
4) Implement: minimal diffs; update all call sites.
5) Verify: lint/test/build (+ e2e for critical flows).
6) Document: update docs + execution log (and decisions if needed).

## Wiring integrity checklist (mandatory)
If you touch any of these, update all usages + tests + docs:
- `proxy.ts`
- `lib/admin/*`
- `lib/security/*`
- `prisma/schema.prisma` + migrations
- admin APIs under `app/api/admin/*`
- `docs/openapi.yaml` (when contracts change)

## Sources of truth (read order)
1) `.github/copilot-instructions.md`
2) `.github/instructions/README.md` + matching `.instructions.md`
3) `.github/skills/**/SKILL.md`
4) `REPO_MAP.md`, `AGENT_GUIDE.md`, `ADMIN.md`, `ARCHITECTURE_REVIEW.md`
