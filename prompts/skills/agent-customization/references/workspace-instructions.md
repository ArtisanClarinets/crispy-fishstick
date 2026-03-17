# Workspace Instructions — Enterprise Governance Layer

> **DEFINITION:** Persistent, always-on guidelines that automatically apply to all agent interactions within a workspace. Serves as the authoritative source of truth for project-wide standards.

---

## Strict File Selection — Choose ONE Only

| File | Location | Primary Use Case | Editor Support |
|------|----------|-----------------|----------------|
| `copilot-instructions.md` | `.github/` | **RECOMMENDED** — Cross-editor, version-controlled | VS Code, Cursor, etc. |
| `AGENTS.md` | Root or subfolders | Open standard, monorepo hierarchy support | Claude Code, OpenAI |

> **MANDATORY:** Use **exactly ONE** file type per scope. Having both causes undefined behavior and split governance.

---

## Monorepo Hierarchy — Strict Precedence Rules

For monorepo structures, the **closest AGENTS.md in the directory tree takes precedence**. This follows the principle of specificity in governance:

```
/
├── AGENTS.md                    # Root defaults (fallback for all)
├── frontend/
│   ├── AGENTS.md               # Frontend-specific (overrides root)
│   ├── src/
│   │   └── components/
│   │       └── AGENTS.md      # Component-specific (overrides frontend)
├── backend/
│   └── AGENTS.md               # Backend-specific (overrides root)
└── shared/
    └── AGENTS.md               # Shared code (overrides root)
```

### Hierarchy Enforcement Rules

1. **Root AGENTS.md** — Defines workspace-wide defaults (language standards, universal conventions)
2. **Subdirectory AGENTS.md** — Extends or overrides root for domain-specific concerns
3. **Override Scope** — Subdirectory inherits ALL root rules unless explicitly overridden
4. **No Duplication** — Avoid copying root content; use extension pattern:

```markdown
# Frontend Standards

## Inherited from Root
All rules from `/AGENTS.md` apply.

## Frontend-Specific Additions
- Use TypeScript strict mode
- Prefer React Server Components
- Tailwind CSS for styling
```

---

## Kitchen Sink Anti-Pattern — STRICTLY PROHIBITED

> **ENTERPRISE CONSTRAINT:** The root AGENTS.md file MUST NOT become a "kitchen sink" containing every conceivable rule. This violates the principle of focused governance and burns context tokens.

### Definition

A "kitchen sink" AGENTS.md contains:
- Rules that only apply to 5% of tasks
- Full documentation copied verbatim
- Language-specific rules in a polyglot repository
- Obvious conventions enforced by linters/formatters
- Length exceeding 500 lines

### Modular Alternative: `applyTo` Instructions

Instead of bloating AGENTS.md, use **modular file instructions** with targeted `applyTo` patterns:

```
.github/
├── AGENTS.md                    # Root governance (≤100 lines)
├── instructions/
│   ├── python-migration.instructions.md   # applyTo: "**/*.py"
│   ├── react-testing.instructions.md     # applyTo: "src/**/*.tsx"
│   ├── database-schema.instructions.md    # applyTo: "**/schema/**"
│   └── dockerfile.instructions.md         # applyTo: "**/Dockerfile*"
```

This approach:
- ✅ Loads only relevant instructions for current task
- ✅ Enables parallel governance without conflict
- ✅ Supports domain-specific teams
- ✅ Scales to enterprise complexity

---

## Template — Enterprise Grade

```markdown
# Project Guidelines — {PROJECT_NAME}

> **Version:** {MAJOR.MINOR} | **Last Updated:** {YYYY-MM-DD} | **Owner:** {TEAM/OWNER}

## Language & Framework Standards

- **Primary Language:** {e.g., TypeScript 5.x, Python 3.12}
- **Framework:** {e.g., Next.js 14, FastAPI}
- **Linter:** {e.g., ESLint, Ruff} — Rules enforced automatically
- **Formatter:** {e.g., Prettier, Black} — Runs on save

> **Note:** Do NOT duplicate linter/formatter rules here. Reference config files instead.

## Architecture & Service Boundaries

### System Overview
{Brief description of system components and their responsibilities}

### Data Flow
{How data moves through the system — reference diagrams}

### Key Boundaries
- **{Service A}** → **{Service B}**: {Purpose}
- **{Service A}** ↔ **{External API}**: {Purpose}

## Build, Test, & Deploy

### Commands
| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm test` | Unit + integration tests |
| `npm run lint` | Static analysis |

### CI/CD Pipeline
{Reference `.github/workflows/` or link to CI documentation}

## Conventions That Differ From Defaults

> **Principle:** Only include conventions that DEVIATE from common practice or require explicit rationale.

### Git Workflow
- Branch naming: `{type}/{ticket-id}/{short-description}`
- Commit format: `{type}: {description} (#{ticket})`

### Code Style
- Use functional components over classes (React)
- Prefer `async/await` over Promise chains
- Strict null checks enabled

### Error Handling
- Use custom error classes extending `AppError`
- All async operations must have try/catch
- Log errors with correlation IDs

## Security & Compliance

- **Secrets:** Never commit `.env` files; use vault/secrets manager
- **Dependencies:** Audit before merge (`npm audit`)
- **PII:** Never log personally identifiable information
- **API Keys:** Rotate every 90 days; use environment injection

## Reference Links

| Resource | Location |
|----------|----------|
| Architecture Decision Records | `./docs/adr/` |
| API Documentation | `./docs/api/` |
| Runbooks | `./docs/runbooks/` |
| Testing Strategy | `./docs/TESTING.md` |

---

## Anti-Patterns — Strictly Avoided

| Anti-Pattern | Violation | Correction |
|--------------|-----------|------------|
| Full README copy | Context bloat | Link: `See ./README.md` |
| Linter rule duplication | Redundancy | Reference: `ESLint config: .eslintrc.json` |
| Obvious instructions | Wasted tokens | Remove: `// Use semicolons` |
| Multi-language rules | Scope creep | Use `applyTo` instructions |
| Without expiration | Stale governance | Review quarterly |

---

## Governance Contract

1. **Review Cycle:** Quarterly review of all workspace instructions
2. **Ownership:** Each section has a designated owner
3. **Change Control:** All modifications via PR with owner approval
4. **Audit Trail:** Changes tracked in git history with rationale
5. **Deprecation:** Mark obsolete sections as `> DEPRECATED — Reason`
