---
name: agent-customization
description: '**WORKFLOW SKILL** — Enterprise-grade router for creating, validating, and managing VS Code agent customization files. USE FOR: scaffolding .instructions.md, .prompt.md, .agent.md, SKILL.md, copilot-instructions.md, AGENTS.md; troubleshooting silent failures; enforcing architectural patterns; packaging domain knowledge for autonomous agents. DO NOT USE FOR: general coding tasks (use default agent); runtime error diagnosis; MCP server configuration (use MCP documentation). INVOKES: filesystem tools (read/write/customize), subagents for pattern exploration, ask-questions for requirement elicitation. FOR SINGLE OPERATIONS: Direct file edit suffices — no skill invocation required.'
---

# Agent Customization — Enterprise Architecture Router

This skill serves as the **definitive routing authority** for all agent customization primitives within the repository. It enforces deterministic decision-making, maintains architectural integrity, and ensures all customizations integrate into the unified ecosystem.

---

## Decision Flow — Strict Architectural Routing Matrix

| Primitive | Trigger Condition | Architectural Responsibility | Execution Model |
|-----------|-------------------|----------------------------|-----------------|
| **Workspace Instructions** | `applyTo` not specified OR glob matches workspace root | Persistent, always-on governance layer | Non-deterministic guidance |
| **File Instructions** | Explicit `applyTo` glob match OR `description` keyword detection | Domain-specific rule enforcement | On-demand context injection |
| **MCP** | External system integration required | Stateful API/SDK bridging | Protocol-mediated I/O |
| **Hooks** | Lifecycle event (`PreToolUse`, `PostToolUse`, etc.) matches | Zero-trust execution gating | Deterministic shell enforcement |
| **Custom Agents** | Multi-step workflow requiring **context isolation** OR **per-stage tool restrictions** | Orchestrated delegation with role-based access control | Subagent returns single output |
| **Prompts** | Single focused task with **parameterized inputs** | Stateless task templating | One-shot execution |
| **Skills** | Multi-step workflow with **bundled assets** (scripts/templates) AND **branching logic** | Stateful workflow automation | Procedural with conditional branches |

---

## Primitive Selection Algorithm

```
IF task requires external system integration
    → MCP (NOT a skill/prompt/agent)
ELSE IF lifecycle event requires deterministic enforcement
    → Hooks (block, validate, inject)
ELSE IF task is stateless AND single-shot AND has parameters
    → Prompts
ELSE IF task requires multi-step workflow AND bundled assets AND branching
    → Skills
ELSE IF task requires context isolation OR per-stage tool restrictions
    → Custom Agents
ELSE IF instruction applies to specific file patterns
    → File Instructions (applyTo)
ELSE IF instruction applies universally across workspace
    → Workspace Instructions
```

---

## Edge Cases — Definitive Boundaries

### Skill vs. Custom Agent

| Criterion | Skill | Custom Agent |
|-----------|-------|--------------|
| Context Isolation | ❌ No — shares parent context | ✅ Yes — returns single output to parent |
| Tool Restrictions | Single toolset for all steps | Per-stage toolset variation |
| Bundled Assets | ✅ Required — scripts, templates | ❌ Optional |
| Branching Logic | ✅ Required — "if X fails, do Y" | ❌ Not primary design goal |
| Invocation | `/skill-name` slash command | Agent picker OR subagent delegation |

**Decision:** If you need the agent to return ONE result to a parent → **Agent**. If you need a self-contained workflow with scripts and error handling → **Skill**.

### Hooks vs. Instructions

| Aspect | Instructions | Hooks |
|--------|-------------|-------|
| Determinism | Non-deterministic — agent may ignore | Deterministic — MUST execute |
| Failure Mode | Agent may proceed | Can BLOCK operation (exit code 2) |
| Trigger | Description keyword matching | Lifecycle event (PreToolUse, etc.) |
| Input/Output | No contract | JSON stdin/stdout contract |

**Decision:** If behavior must be GUARANTEED regardless of agent discretion → **Hooks**. If you want to GUIDE agent behavior → **Instructions**.

---

## Mandatory Ecosystem Integration

> **CRITICAL:** Any newly created skill **MUST** be registered in the central `AGENTS.md` file to ensure ecosystem integration, discoverability, and auditability.

Registration format in `AGENTS.md`:

```markdown
## Skills Registry

| Skill | Location | Purpose |
|-------|----------|---------|
| `webapp-testing` | `.claude/skills/webapp-testing/` | QA verification and screenshot capture |
| `security-audit` | `.agents/skills/security-audit/` | Static analysis and vulnerability scanning |
```

---

## File Location Reference

| Type | File Pattern | Location | Scope |
|------|-------------|----------|-------|
| Workspace Instructions | `copilot-instructions.md`, `AGENTS.md` | `.github/` or root | Project-wide |
| File Instructions | `*.instructions.md` | `.github/instructions/` | Domain-specific |
| Prompts | `*.prompt.md` | `.github/prompts/` | Task templates |
| Hooks | `*.json` | `.github/hooks/` | Lifecycle enforcement |
| Custom Agents | `*.agent.md` | `.github/agents/` | Orchestrated workflows |
| Skills | `SKILL.md` | `.github/skills/<name>/`, `.agents/skills/<name>/`, `.claude/skills/<name>/` | Bundled workflows |

**User-level customizations:** `{{USER_PROMPTS_FOLDER}}/` (roam with settings sync)

---

## Creation Workflow

### Phase 1: Scope Determination

Interview the user to determine:

1. **Workspace vs. User scope:**
   - Workspace → `.github/` (version-controlled, team-shared)
   - User → `{{USER_PROMPTS_FOLDER}}/` (settings-synced, personal)

2. **Persistence requirements:**
   - Always-on → Workspace Instructions
   - On-demand → Instructions/Prompts/Skills

### Phase 2: Primitive Selection

Apply the **Decision Flow — Strict Architectural Routing Matrix** above.

### Phase 3: Implementation

1. Create file at designated path
2. Include required YAML frontmatter
3. Author body following reference templates
4. Validate YAML syntax (NO unquoted colons, NO tabs)

### Phase 4: Registration

- Add to `AGENTS.md` Skills Registry (skills only)
- Document in team knowledge base if workspace-level

---

## Silent Failure Warnings — Critical

### YAML Frontmatter Failures

| Failure Mode | Symptom | Prevention |
|--------------|---------|-------------|
| Unescaped colons in values | Silent skip — file not loaded | Always quote: `description: "Use when: doing X"` |
| Tab indentation | Silent skip — YAML parse failure | Use 2 spaces ONLY for indentation |
| `name` mismatch with folder | Silent skip — skill not discovered | Ensure exact match: `name: my-skill` = `my-skill/` folder |
| Invalid glob in `applyTo` | Pattern never matches | Test with glob tester; avoid regex |

### Context Burning Anti-Patterns

| Anti-Pattern | Impact | Solution |
|--------------|--------|----------|
| `applyTo: "**"` | Burns context on EVERY file request | Use specific globs: `src/api/**/*.ts`, `tests/**/*test*.py` |
| Overly verbose descriptions | Token overflow, truncation | Keep descriptions ≤1024 chars; focus on trigger keywords |
| Multiple primitives for same concern | Conflicting guidance | Single source of truth per concern |

---

## Quick Reference Commands

```bash
# Validate YAML frontmatter
grep -A5 "^---" <file> | python -c "import yaml, sys; yaml.safe_load(sys.stdin)"

# Find all customization files
find .github -name "*.md" -o -name "*.prompt.md" -o -name "*.instructions.md" -o -name "*.agent.md"

# Check AGENTS.md registration
grep -i "skills" AGENTS.md
```

---

## Related References

- [Workspace Instructions](./references/workspace-instructions.md) — Persistent governance
- [File Instructions](./references/instructions.md) — Domain-specific rules
- [Prompts](./references/prompts.md) — Parameterized task templates
- [Hooks](./references/hooks.md) — Zero-trust execution gates
- [Custom Agents](./references/agents.md) — Orchestrated workflows
- [Skills](./references/skills.md) — Bundled procedural workflows
