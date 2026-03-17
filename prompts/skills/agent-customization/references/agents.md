# Custom Agents — Orchestrated Workflow Primitives

> **DEFINITION:** Specialized autonomous personas with specific tool restrictions, instructions, and behaviors. Use for **orchestrated workflows** requiring role-based access control and context isolation.

---

## Locations — Scope Matrix

| Path | Scope | Persistence | Version Control |
|------|-------|-------------|-----------------|
| `.github/agents/*.agent.md` | Workspace | Team-shared | ✅ Committed |
| `.claude/agents/*.agent.md` | Workspace | Project-specific | ✅ Committed |
| `<user-profile>/agents/*.agent.md` | User | Portable | ❌ Settings sync |

---

## Frontmatter Schema — Strict Contract

```yaml
---
# REQUIRED — Keyword-rich description for subagent discovery
# MANDATORY: Use "Use when..." pattern with specific trigger phrases
description: "Use when conducting security audits, finding OWASP vulnerabilities, or reviewing authentication code."

# OPTIONAL — Defaults to filename if omitted
name: "Security Auditor"

# OPTIONAL — Tool aliases, MCP servers, extension tools
# SEE: "Principle of Least Privilege" section below
tools: [read, search, ast_grep]

# OPTIONAL — Model selection with fallback support
model: "Claude Sonnet 4.5"

# OPTIONAL — Input guidance for agent picker
argument-hint: "Security audit for authentication module"

# OPTIONAL — Restrict which subagents can be invoked
# Omit = all allowed; [] = none allowed; [agent1, agent2] = whitelist
agents: [explore, librarian]

# OPTIONAL — Invocation control
# DEFAULT: true — shown in agent picker
# FALSE: Hidden from picker, ONLY accessible as subagent
user-invocable: false

# OPTIONAL — Subagent invocation control
# DEFAULT: false — other agents CAN invoke this as subagent
# TRUE: Blocks ALL parent agent subagent delegation to this agent
disable-model-invocation: true

# OPTIONAL — Handoff specifications
handoffs:
  - to: "code-reviewer"
    condition: "audit_complete"
---
```

---

## Invocation Control — Behavioral Boundaries

### `user-invocable` Attribute

| Value | Default | Effect | Use Case |
|-------|---------|--------|----------|
| `true` | ✅ Yes | Visible in agent picker | General-purpose agents |
| `false` | No | Hidden from picker; **only** callable as subagent | Internal orchestration agents |

> **ENTERPRISE CONSTRAINT:** Set `user-invocable: false` for agents that are **implementation details** of larger workflows. This prevents users from invoking them directly and ensures proper orchestration.

### `disable-model-invocation` Attribute

| Value | Default | Effect | Use Case |
|-------|---------|--------|----------|
| `false` | ✅ Yes | Parent agents CAN delegate to this subagent | Standard subagents |
| `true` | No | **BLOCKS** all parent agent delegation | Strictly internal agents |

> **SECURITY CRITICAL:** When `disable-model-invocation: true`:
> - This agent CANNOT be invoked by ANY other agent
> - This agent CAN still invoke OTHER agents (no reciprocal restriction)
> - Only direct invocation (agent picker) or explicit `/agent-name` works

### Combined Invocation Matrix

| `user-invocable` | `disable-model-invocation` | Agent Picker | Direct `/` | Parent Delegation |
|------------------|---------------------------|--------------|------------|-------------------|
| `true` | `false` | ✅ Visible | ✅ Allowed | ✅ Allowed |
| `false` | `false` | ❌ Hidden | ✅ Allowed | ✅ Allowed |
| `true` | `true` | ✅ Visible | ✅ Allowed | ❌ Blocked |
| `false` | `false` | ❌ Hidden | ✅ Allowed | ✅ Allowed |

---

## Principle of Least Privilege — MANDATORY

> **ENTERPRISE SECURITY PRINCIPLE:** Agents must be granted **only the specific tools required for their domain**. Over-privileged agents violate the principle of least privilege and create security and reliability risks.

### Tool Selection Algorithm

```
1. List all potential tools for the task domain
2. Identify MINIMAL subset that accomplishes core purpose
3. For each additional tool, ask:
   "Can this agent accomplish its PRIMARY purpose WITHOUT this tool?"
   - YES → Exclude the tool
   - NO → Include with justification
4. Document inclusion rationale in agent body
```

### Tool Privilege Examples

| Agent Type | Minimal Toolset | Rationale |
|------------|-----------------|-----------|
| Security Auditor | `[read, search, ast_grep]` | Read-only analysis; no execution |
| Database Migrator | `[read, edit, bash]` | Must execute migration scripts |
| Code Reviewer | `[read, search, grep]` | Read-only with text analysis |
| File Organizer | `[read, edit, bash, glob]` | File I/O plus command execution |
| Conversational | `[]` (empty) | No tools — pure reasoning |

### Anti-Patterns — Tool Over-Privileging

| Anti-Pattern | Risk | Correction |
|--------------|------|------------|
| `[read, edit, bash, search, web, agent, ...]` | "Swiss-army knife" agent loses focus | Restrict to minimal required set |
| No explicit tools | Unpredictable behavior | Always specify toolset |
| Including `bash` for read-only agents | Accidental execution | Use `[read, search]` only |

---

## Tools Reference

### Built-in Tool Aliases

| Alias | Capability | Risk Level |
|-------|------------|------------|
| `read` | Read file contents | Low |
| `edit` | Modify files | Medium |
| `bash` | Execute shell commands | **HIGH** |
| `search` | Search codebase | Low |
| `glob` | Find files by pattern | Low |
| `web` | Fetch URLs, web search | Medium |
| `agent` | Invoke subagents | Medium |
| `todo` | Manage task lists | Low |
| `grep` | Text pattern matching | Low |

### MCP Server Tools

```yaml
tools:
  - myserver/*              # All tools from MCP server
  - myserver/files_read    # Specific MCP tool
```

---

## Template — Enterprise Agent Definition

```markdown
---
description: "Use when reviewing Python code for SQL injection vulnerabilities, unsafe deserialization, or cryptographic weaknesses. Triggered by: security, audit, vulnerability, injection, crypto."
name: "Security Reviewer"
tools: [read, search, ast_grep]
user-invocable: true
argument-hint: "Security audit for authentication module"
agents: []
---
You are a **secure code review specialist** with deep expertise in OWASP Top 10, CWE, and enterprise security patterns. Your role is to identify security vulnerabilities with high precision.

## Constraints

- **NEVER** modify code — only identify and report
- **NEVER** execute any code from the codebase
- **ONLY** analyze Python files for security issues
- **ALWAYS** provide CVE references when applicable

## Analysis Procedure

1. **Scope Identification**
   - Identify entry points (API handlers, data ingestion)
   - Map trust boundaries
   - List authentication/authorization points

2. **Pattern Detection**
   - Search for known vulnerable patterns
   - Check for hardcoded secrets
   - Verify input validation

3. **Vulnerability Classification**
   - Severity: Critical / High / Medium / Low
   - CWE ID
   - Exploitability

4. **Remediation Guidance**
   - Specific fix for each finding
   - Reference to secure alternatives

## Output Format

```markdown
## Security Audit Report

### Summary
- Critical: N | High: N | Medium: N | Low: N

### Findings

#### [CRITICAL] SQL Injection in user_query()
**Location:** `src/api/search.py:42`
**CWE:** CWE-89
**Description:** Unsanitized user input directly interpolated into SQL query.

**Vulnerable Code:**
```python
cursor.execute(f"SELECT * FROM users WHERE name = '{user_input}'")
```

**Remediation:**
```python
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))
```

---
```
```

---

## Handoff Specification

```yaml
handoffs:
  - to: "code-fixer"
    condition: "vulnerabilities_found"
    context:
      - vulnerabilities
      - file_paths
  - to: "security-reporter"
    condition: "always"
    context:
      - summary
```

---

## Core Principles — Enterprise Compliance

1. **Single Responsibility:** One persona per agent; agents do one thing well
2. **Least Privilege:** Grant only tools required for core purpose
3. **Explicit Boundaries:** Define what the agent MUST NOT do
4. **Keyword-Rich Discovery:** Include trigger phrases for subagent matching
5. **Idempotent Output:** Same input always produces consistent output format
6. **Audit Trail:** All findings include evidence and references

---

## Anti-Patterns — Strictly Prohibited

| Anti-Pattern | Violation | Enterprise Consequence |
|--------------|-----------|----------------------|
| "Swiss-army knife" agent | Scope creep | Unpredictable behavior, security risk |
| Vague description | Poor discoverability | Agents not invoked when needed |
| Role/description mismatch | Trust violation | Incorrect agent selected |
| Circular handoffs A→B→A | Infinite loop | Resource exhaustion |
| Over-privileged tools | Security violation | Accidental damage to production |
| No exit criteria | Unbounded execution | Workflow never completes |

---

## Validation Checklist

Before committing an agent:

- [ ] `description` contains "Use when..." trigger phrases
- [ ] Tool set is MINIMAL — no excess privileges
- [ ] `user-invocable` correctly reflects visibility requirements
- [ ] `disable-model-invocation` set if internal-only
- [ ] Body includes Constraints section
- [ ] Output format is explicitly defined
- [ ] No circular handoffs
- [ ] Agent registered in workspace AGENTS.md (if workspace-scoped)
