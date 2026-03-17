# Skills — Bundled Workflow Primitives

> **DEFINITION:** Self-contained, on-demand workflows with bundled assets (scripts, templates, references) and branching logic. Designed for repeatable procedural tasks that require multiple steps and error handling.

---

## Structure — Strict File Organization

```
.github/skills/<skill-name>/
├── SKILL.md                    # REQUIRED — name MUST match folder
├── scripts/                    # Executable code
│   ├── test-runner.js
│   └── validator.sh
├── references/                 # Documentation loaded as needed
│   └── api-patterns.md
└── assets/                     # Templates, boilerplate
    ├── component-template.tsx
    └── docker-compose.yml
```

---

## Locations — Scope Matrix

| Path | Scope | Persistence | Version Control |
|------|-------|-------------|-----------------|
| `.github/skills/<name>/` | Project | Team-shared | ✅ Committed |
| `.agents/skills/<name>/` | Project | Alternative | ✅ Committed |
| `.claude/skills/<name>/` | Project | Alternative | ✅ Committed |
| `~/.copilot/skills/<name>/` | User | Portable | ❌ Settings sync |
| `~/.agents/skills/<name>/` | User | Portable | ❌ Settings sync |
| `~/.claude/skills/<name>/` | User | Portable | ❌ Settings sync |

---

## SKILL.md Format — Strict Contract

```yaml
---
# REQUIRED — 1-64 characters, lowercase alphanumeric + hyphens
# MANDATORY: MUST match folder name exactly
name: webapp-testing

# REQUIRED — Discovery surface for agent selection
# MAXIMUM: 1024 characters
# MANDATORY: Use "Use when..." pattern with specific triggers
description: 'Test web applications using Playwright. Use for verifying frontend functionality, debugging UI behavior, capturing screenshots, testing responsive layouts, and validating forms.'

# OPTIONAL — Hint shown for slash invocation
argument-hint: 'URL or local path to test'

# OPTIONAL — Show as slash command (default: true)
user-invocable: true

# OPTIONAL — Disable automatic model-triggered loading (default: false)
disable-model-invocation: false
---
```

### Name Matching Rules

| Folder Name | `name` Field | Valid? |
|-------------|--------------|--------|
| `webapp-testing/` | `name: webapp-testing` | ✅ Yes |
| `security-audit/` | `name: security-audit` | ✅ Yes |
| `db-migration/` | `name: database-migration` | ❌ NO — mismatch |
| `MySkill/` | `name: my-skill` | ❌ NO — case mismatch |

---

## Progressive Loading — Token Budget Constraints

> **ENTERPRISE CONSTRAINT:** Skills implement progressive loading to minimize context overhead while ensuring availability.

### Loading Stages

| Stage | Trigger | Token Budget | What Loads |
|-------|---------|--------------|------------|
| **Discovery** | Agent evaluates skill relevance | ~100 tokens | `name` + `description` only |
| **Instructions** | Skill selected for execution | <5000 tokens | Full SKILL.md body |
| **Resources** | References in body | As needed | Referenced files (`./script/*.js`) |

### Budget Enforcement

```markdown
# ✅ COMPLIANT: Under 5000 tokens
---
name: example-skill
description: 'Use when...'
---
# Overview (2-3 sentences)
# Procedure (numbered steps)
# Output format (example)
# Error handling (basic)

# References
- [script](./scripts/run.js)
- [template](./assets/template.yaml)

---
# ❌ NON-COMPLIANT: Over 5000 tokens (should use references)
---
name: example-skill
description: 'Use when...'
---
# Extensive documentation (1000+ lines here)
# Full tutorial content
# Every possible edge case
# Complete API reference (should be in references/)
```

### Progressive Loading Example

```markdown
---
name: security-audit
description: 'Use when scanning code for security vulnerabilities, finding OWASP Top 10 issues, or reviewing authentication logic.'
---

# Security Audit Skill

## When to Use
- Scanning for SQL injection
- Finding XSS vulnerabilities
- Reviewing authentication code

## Procedure

1. **Scope Definition**
   - Identify entry points
   - Map trust boundaries

2. **Pattern Scanning**
   - Run [security scanner](./scripts/scan.js)
   - Review findings

3. **Analysis**
   - Verify each finding
   - Assess severity

4. **Reporting**
   - Generate [report template](./assets/report.md)
   - Include remediation steps

## Output Format
See [report template](./assets/report.md) for structure.
```

---

## Branching Logic — Required Error Handling

> **ENTERPRISE CONSTRAINT:** Skills must include branching logic to handle failures gracefully. Self-contained skills must define "if step X fails, do Y."

### Branching Template

```markdown
## Procedure

### Step 1: Validate Input
1. Check required parameters
2. Verify file exists
3. Validate format

**If Step 1 fails:**
- Missing parameter → Return error with required fields
- File not found → Check alternative locations
- Invalid format → Show correct format example

### Step 2: Execute Main Operation
1. Run primary script
2. Capture output
3. Log results

**If Step 2 fails:**
- Script error → Log error output, continue with fallback
- Timeout → Retry once with exponential backoff
- Partial success → Report what completed, what failed

### Step 3: Post-Processing
1. Validate results
2. Format output
3. Clean up temp files

**If Step 3 fails:**
- Validation error → Show expected format
- Cleanup failure → Log warning, proceed (non-critical)
```

### Branching Pattern Examples

```yaml
# Conditional execution based on environment
- name: Run unit tests
  command: npm test -- --coverage
  on-failure:
    - name: Run without coverage
      command: npm test
      on-failure:
        - name: Show last test output
          command: npm test -- --reporters=verbose

# Skip optional steps if dependencies missing
- name: Build Docker image
  command: docker build -t app .
  only-if: docker-available
```

---

## Self-Contained Requirement

> **ENTERPRISE CONSTRAINT:** Skills must include all procedural knowledge to complete the task. External documentation should be referenced, but the skill body must be executable without additional guidance.

### Self-Contained Checklist

| Requirement | Description |
|-------------|-------------|
| ✅ Complete procedure | Every step detailed with commands |
| ✅ Error handling | Branching logic for failures |
| ✅ Dependencies | Listed (npm packages, tools) |
| ✅ Output format | Explicit example shown |
| ✅ References | Relative paths to assets |

---

## Slash Command Behavior

| Configuration | Slash Command | Auto-Loaded | Use Case |
|--------------|---------------|--------------|-----------|
| Default (both omitted) | ✅ Yes | ✅ Yes | Standard skill |
| `user-invocable: false` | ❌ No | ✅ Yes | Internal workflow |
| `disable-model-invocation: true` | ✅ Yes | ❌ No | Manual-only |
| Both set | ❌ No | ❌ No | Disabled |

---

## Template — Enterprise Skill Definition

```markdown
---
name: security-audit
description: 'Use when scanning code for security vulnerabilities, finding OWASP Top 10 issues, XSS, SQL injection, or reviewing authentication and authorization logic. Triggered by: security, audit, vulnerability, injection, auth.'
argument-hint: 'Codebase path to audit (e.g., ./src or .)'
user-invocable: true
---

# Security Audit Skill

## When to Use
- Scanning for SQL injection vulnerabilities
- Finding XSS attack vectors
- Reviewing authentication/authorization code
- Checking for hardcoded secrets
- Identifying insecure deserialization

## Prerequisites
- Node.js 18+
- `npm install` in project root

## Procedure

### Step 1: Scope the Audit
1. Identify entry points (API routes, form handlers)
2. Map trust boundaries
3. List data flows

### Step 2: Run Security Scanner
1. Execute [scan script](./scripts/security-scan.js)
2. Capture vulnerability findings
3. Log scan metadata

**If scanner fails:**
- Missing dependencies → Install and retry
- Timeout → Run on smaller scope
- No findings → Proceed to manual review

### Step 3: Manual Security Review
1. Review high-risk areas
2. Check authentication flows
3. Verify input validation
4. Examine secrets handling

**If manual review inconclusive:**
- Flag for expert review
- Document uncertainty

### Step 4: Generate Report
1. Compile [report template](./assets/report.md)
2. Include severity classifications
3. Add remediation guidance

**If report generation fails:**
- Output findings in markdown format directly
- Include file:line references

## Output Format

```markdown
## Security Audit Report

### Summary
- Critical: N | High: N | Medium: N | Low: N
- Scoped: {path}
- Date: {timestamp}

### Findings

#### [CRITICAL] SQL Injection in {file}:{line}
**Description:** ...
**CWE:** CWE-89
**Remediation:** ...
```

## Error Handling Summary
| Step | Failure Mode | Recovery |
|------|--------------|----------|
| Scanner | Missing deps | Install + retry |
| Scanner | Timeout | Reduce scope |
| Manual review | Inconclusive | Flag for review |
| Report | Generation fail | Markdown output |
```

---

## Core Principles — Enterprise Compliance

1. **Keyword-Rich Descriptions:** Include trigger phrases for discovery
2. **Progressive Loading:** SKILL.md under 5000 tokens; use reference files
3. **Relative Paths:** Always use `./` for skill resources
4. **Self-Contained:** Include all procedural knowledge
5. **Branching Logic:** Define error handling for each step
6. **Version Control:** All skills committed to repository
7. **Registration:** Add to AGENTS.md Skills Registry

---

## Anti-Patterns — Strictly Prohibited

| Anti-Pattern | Violation | Enterprise Consequence |
|--------------|-----------|----------------------|
| Vague descriptions | No discovery | Skill not invoked |
| Monolithic SKILL.md | Context overflow | Token limit errors |
| Name mismatch | Not discoverable | Silent failure |
| No error handling | Fragile workflow | Unrecoverable failures |
| Missing procedures | Not self-contained | Requires human guidance |
| No output format | Unpredictable | Integration failures |

---

## Validation Checklist

Before committing a skill:

- [ ] `name` field matches folder name exactly
- [ ] `description` contains "Use when..." trigger phrases
- [ ] SKILL.md under 5000 tokens
- [ ] Procedure includes branching logic
- [ ] Error handling defined for each step
- [ ] Output format explicitly shown
- [ ] Relative paths use `./` prefix
- [ ] Skill registered in AGENTS.md
- [ ] File structure matches template
- [ ] Version controlled
