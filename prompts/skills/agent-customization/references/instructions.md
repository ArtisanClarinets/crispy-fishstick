# File-Specific Instructions — Domain Governance Primitives

> **DEFINITION:** On-demand guidelines loaded when relevant to the current task, or explicitly attached when files match a pattern. Serves as the domain-specific governance layer complementing workspace instructions.

---

## Locations — Scope Matrix

| Path | Scope | Persistence | Version Control |
|------|-------|-------------|-----------------|
| `.github/instructions/*.instructions.md` | Workspace | Team-shared | ✅ Committed |
| `<user-profile>/instructions/*.instructions.md` | User | Portable | ❌ Settings sync |

---

## Frontmatter Schema — Strict Contract

```yaml
---
# REQUIRED — Keyword-rich description for on-demand discovery
# MANDATORY: Use "Use when..." pattern with specific trigger phrases
description: "Use when writing database migrations, schema changes, or data transformations in PostgreSQL. Covers safety checks, rollback patterns, and zero-downtime strategies."

# OPTIONAL — Defaults to filename
name: "Database Migration Guidelines"

# OPTIONAL — Explicit file pattern matching
# WARNING: Never use "**" unless instruction truly applies to ALL files
applyTo: "**/*.py"
---
```

---

## Discovery Modes — Execution Contract

| Mode | Trigger | Loading Behavior | Use Case |
|------|---------|-----------------|----------|
| **On-demand** | Agent detects task relevance via `description` keywords | Loads when task matches description | Task-based: migrations, refactoring |
| **Explicit** | Files match `applyTo` glob | Auto-attached when file in context | File-based: language standards |
| **Manual** | User adds via "Add Context" | Explicit user attachment | Ad-hoc guidance |

### On-Demand Discovery Algorithm

```
1. User submits task
2. Agent extracts keywords from task
3. Agent matches keywords against ALL instruction descriptions
4. Relevant instructions loaded into context
5. Agent proceeds with enhanced context
```

> **DISCOVERY CRITICAL:** The `description` field is the ONLY discovery mechanism for on-demand mode. Keywords NOT in description = instruction NOT loaded.

---

## Context Burning Anti-Pattern — STRICTLY PROHIBITED

> **ENTERPRISE CONSTRAINT:** The `applyTo: "**"` pattern burns context tokens on EVERY file request, regardless of relevance. This is a critical anti-pattern that degrades agent performance.

### The Problem

```yaml
# ❌ NEVER DO THIS
---
description: "Migration guidelines"
applyTo: "**"
---
```

When `applyTo: "**"`:
- Instruction loads for EVERY file in the workspace
- Context window fills with irrelevant rules
- Token limits cause truncation of critical information
- Agent performance degrades significantly

### The Solution — Specific Glob Patterns

```yaml
# ✅ CORRECT: Targeted patterns
---
description: "Use when writing database migrations in Python"
applyTo: "**/migrations/*.py"
---

# ✅ CORRECT: Multiple specific patterns
---
description: "Use when writing React components"
applyTo: ["src/components/**/*.tsx", "src/pages/**/*.tsx"]
---

# ✅ CORRECT: File extension only (if truly universal for type)
---
description: "Use when writing SQL queries"
applyTo: "**/*.sql"
---
```

### applyTo Pattern Best Practices

| Pattern | Matches | Use Case |
|---------|---------|----------|
| `"**/*.py"` | All Python files | Language-specific rules |
| `"src/api/**/*.ts"` | TypeScript in API folder | Domain-specific |
| `["src/**", "tests/**"]` | Multiple roots | Multiple domains |
| `"**/migrations/**"` | Any migrations folder | Cross-language |
| `"*.config.js"` | Config files at root only | Specific location |
| `"**"` | ❌ EVERY file | **NEVER USE** |

### Decision Tree

```
Does this instruction apply to >80% of files in the workspace?
├── YES → Consider workspace instructions instead
└── NO → Use specific applyTo pattern

Does this instruction apply to multiple distinct patterns?
├── YES → Use array syntax: ["src/**", "lib/**"]
└── NO → Use single pattern: "src/**/*.ts"
```

---

## Template — Enterprise Instruction Definition

```markdown
---
description: "Use when writing database migrations, schema changes, or data transformations in PostgreSQL. Covers safety checks, rollback patterns, zero-downtime strategies, and data migration scripts."
name: "Database Migration Guidelines"
applyTo: "**/migrations/**"
---

# Database Migration Guidelines

## Core Principles

1. **Always Reversible:** Every migration must have a corresponding rollback
2. **Zero Downtime:** Use `CONCURRENTLY` for index creation in PostgreSQL
3. **Data First:** Migrate data before schema changes
4. **Idempotent:** Safe to run multiple times

## Migration Template

```sql
-- Migration: add_user_email_index
-- Direction: up

CREATE INDEX CONCURRENTLY idx_user_email ON users(email);

-- Direction: down
DROP INDEX IF EXISTS idx_user_email;
```

## Safety Checklist

- [ ] Backup verified before migration
- [ ] Rollback script tested
- [ ] Migration is idempotent
- [ ] Long-running operations use `CONCURRENTLY`
- [ ] Data migrated before schema changes
- [ ] Migration has timestamp prefix for ordering

## Anti-Patterns

| Anti-Pattern | Risk | Correct Approach |
|--------------|------|------------------|
| `DROP COLUMN` without backup | Data loss | Create new column, migrate, drop old |
| Non-idempotent operations | Duplicate key errors | Use `IF EXISTS` / `IF NOT EXISTS` |
| Long locks during migration | Service downtime | Use `CONCURRENTLY` where possible |
```

---

## Integration with Workspace Instructions

File instructions **extend** workspace instructions — they do not replace them:

```
Workspace Instructions (AGENTS.md)
    ↓ (inherits)
File Instructions (*.instructions.md)
    ↓ (inherits)
Agent Context
```

### Extension Pattern

```markdown
# Frontend Testing Instructions

## Inherited from Workspace
All rules from `/AGENTS.md` apply.

## Frontend-Specific Testing
- Use React Testing Library
- Prefer user-centric queries over test IDs
- Mock external API calls
```

---

## Discovery Examples

### Good Description Patterns

```yaml
# ✅ EXCELLENT: Specific triggers
description: "Use when writing PostgreSQL migrations, adding columns, creating indexes, or changing schema. Covers zero-downtime patterns and rollback strategies."

# ✅ GOOD: Task-specific keywords  
description: "Use when refactoring React class components to functional components with hooks."

# ✅ GOOD: Technology-specific
description: "Use when writing GraphQL resolvers, schema definitions, or Apollo Client queries."
```

### Bad Description Patterns

```yaml
# ❌ BAD: Too vague - no discovery keywords
description: "Coding guidelines"

# ❌ BAD: Only describes "what" not "when"
description: "This file contains testing best practices"

# ❌ BAD: Missing trigger context
description: "Python SQLAlchemy ORM patterns"
```

---

## Core Principles — Enterprise Compliance

1. **Keyword-Rich Descriptions:** Include "Use when..." with specific triggers
2. **Single Concern:** One instruction file per domain
3. **Concise and Actionable:** Keep focused; respect context limits
4. **Show, Don't Tell:** Brief code examples over lengthy explanations
5. **Specific applyTo:** Never use `"**"` unless truly universal
6. **Version Control:** All workspace instructions committed

---

## Anti-Patterns — Strictly Prohibited

| Anti-Pattern | Violation | Enterprise Consequence |
|--------------|-----------|----------------------|
| `applyTo: "**"` | Context burning | Performance degradation |
| Vague descriptions | No discovery | Instructions never loaded |
| Copying README | Redundancy | Link instead |
| Multiple concerns | Scope creep | Split into files |
| Obvious rules | Wasted tokens | Let linters handle |
| Unversioned | No audit trail | Commit to source control |

---

## Validation Checklist

Before committing an instruction:

- [ ] `description` contains "Use when..." trigger phrases
- [ ] `applyTo` uses specific patterns (NOT `"**"`)
- [ ] No more than one concern per file
- [ ] Content is actionable, not just guidance
- [ ] Links to docs instead of copying
- [ ] File is version-controlled
- [ ] Tested with on-demand discovery
