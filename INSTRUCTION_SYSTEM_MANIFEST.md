
# Crispy-Fishstick — Instruction System (Generated)

Generated: **2026-01-12 21:09 UTC**

This bundle provides a complete, cross-referenced instruction system for:
- GitHub Copilot Chat instructions (`.github/copilot-instructions.md`)
- Path-scoped Copilot instructions (`.github/instructions/*.instructions.md`)
- Coding agent contracts (`AGENTS.md` + scoped `*/AGENTS.md`)
- Specialized agents (`.github/agents/*.agent.md`)
- Agent Skills (`.github/skills/**/SKILL.md`)
- Optional reusable prompt macros (`.github/prompts/*.prompt.md`)

## Repo facts (validated from source tree)
- `proxy.ts` present: **True**
- Admin wrappers present (`lib/admin/route.ts`): **True**
- RBAC/tenancy guards present (`lib/admin/guards.ts`): **True**
- CSRF fetch helper present (`lib/fetchWithCsrf.ts`): **True**
- OpenAPI spec present (`docs/openapi.yaml`): **True**
- Execution log present (`.agent/EXECUTION_LOG.md`): **True**

## Installation
Unzip into the **repo root**. This will add/overlay:
- `.github/` instruction assets
- `AGENTS.md` and scoped `AGENTS.md` files

Then review diffs and commit.

## Notes
- This suite intentionally bans `middleware.ts` and uses `proxy.ts` as the interception boundary.
- Documentation update discipline is enforced (skills + instructions) and requires appending to `.agent/EXECUTION_LOG.md` for non-trivial changes.
