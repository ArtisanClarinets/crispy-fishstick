# Prompts — Parameterized Task Templates

> **DEFINITION:** Reusable, single-focused task templates triggered on-demand in chat. Designed for stateless, one-shot execution with clearly defined parameterized inputs.

---

## Locations — Scope Matrix

| Path | Scope | Persistence | Version Control |
|------|-------|-------------|-----------------|
| `.github/prompts/*.prompt.md` | Workspace | Team-shared | ✅ Committed |
| `<user-profile>/prompts/*.prompt.md` | User | Portable | ❌ Settings sync |

---

## Frontmatter Schema — Strict Contract

```yaml
---
# RECOMMENDED — Keyword-rich description for discoverability
description: "Generate comprehensive test cases for selected code with edge cases, error scenarios, and existing pattern matching."

# OPTIONAL — Defaults to filename
name: "Test Case Generator"

# REQUIRED for parameterized prompts — Input guidance
# Shown in chat input to guide user
argument-hint: "Code snippet or file path to generate tests for"

# OPTIONAL — Agent mode selection
# Values: "ask" (Q&A), "agent" (autonomous), "plan" (planning)
agent: "agent"

# OPTIONAL — Model selection with fallback
model: "Claude Sonnet 4.5"

# OPTIONAL — Tool restrictions for this prompt
# SEE: "Tool Priority Hierarchy" section
tools: [read, search]
---
```

### Model Fallback Support

```yaml
# First available model is used
model: ['Claude Sonnet 4.5 (copilot)', 'GPT-5 (copilot)', 'Claude 3.5 Sonnet']
```

---

## Parameterization — Strict Requirements

> **ENTERPRISE CONSTRAINT:** Prompts must have clearly defined `argument-hint` inputs to ensure repeatable, standardized outputs.

### Parameter Definition

| Field | Purpose | Example |
|-------|---------|---------|
| `argument-hint` | Input guidance shown in chat | "File path or code snippet to analyze" |
| `{placeholder}` | Inline parameter in body | `Analyze the following code: {code}` |

### Good Parameterization Examples

```yaml
# ✅ EXCELLENT: Clear, actionable hint
argument-hint: "Code snippet or file path to generate tests for"

# ✅ GOOD: Provides context
argument-hint: "API endpoint path (e.g., /users/:id) for documentation"

# ✅ GOOD: Multiple parameters via description
argument-hint: "Function name and expected output format"
```

### Bad Parameterization Examples

```yaml
# ❌ BAD: Too vague
argument-hint: "Input"

# ❌ BAD: No hint provided
# (harder to discover prompt intent)
```

### Template with Parameters

```markdown
---
description: "Generate comprehensive test cases for selected code"
argument-hint: "Code snippet or file path to generate tests for"
agent: "agent"
tools: [read]
---
Generate comprehensive test cases for the provided code:

**Input:** {code}

**Requirements:**
- Include edge cases and error scenarios
- Follow existing test patterns in the codebase
- Use descriptive test names following `test_<function>_<scenario>` format
- Include both positive and negative test cases

**Output Format:**
```python
def test_function_name_case():
    # Arrange
    ...
    # Act
    ...
    # Assert
    ...
```
```

---

## Tool Priority Hierarchy — Precedence Rules

> **ENTERPRISE CONSTRAINT:** When multiple tool sources define tools, a strict precedence hierarchy determines which tools are active.

### Priority Order (Highest to Lowest)

| Priority | Source | Example |
|----------|--------|---------|
| **1 (Highest)** | Prompt file `tools` field | `tools: [read, search]` |
| **2** | Referenced custom agent `tools` | `agent: "security-reviewer"` |
| **3** | Selected agent defaults | `agent: "agent"` default tools |

### Hierarchy Examples

```yaml
# Case 1: Prompt specifies tools ONLY
---
tools: [read, search]  # ✅ Only read and search available
---

# Case 2: Prompt specifies agent, no tools
---
agent: "security-reviewer"  # ✅ Uses agent's defined tools
---

# Case 3: Prompt specifies BOTH
---
agent: "security-reviewer"
tools: [read, search]  # ✅ PROMPT tools OVERRIDE agent tools
---
```

### Tool Override Behavior

| Configuration | Active Tools |
|--------------|--------------|
| Prompt has `tools` | Prompt tools ONLY |
| Prompt has `agent` only | Agent's tools |
| Neither specified | Default agent tools |
| Prompt `tools: []` | **NO tools** — conversational only |

---

## Invocation Methods

| Method | Trigger | Context |
|--------|---------|---------|
| **Slash Command** | Type `/` → select prompt | Current file/selection |
| **Command Palette** | `Chat: Run Prompt...` | Current file/selection |
| **Editor** | Open prompt file → play button | Selected text |
| **Quick Pick** | Start new chat → prompt suggestions | Based on context |

> **NOTE:** Both prompts and skills appear as slash commands after typing `/` in chat.

---

## Template — Enterprise Prompt Definition

```markdown
---
description: "Generate comprehensive test cases for selected code with edge cases, error scenarios, and existing pattern matching."
name: "Test Case Generator"
argument-hint: "Code snippet or file path to generate tests for"
agent: "agent"
tools: [read, search]
---
Generate comprehensive test cases for the provided code.

## Input
{code}

## Requirements

### Test Coverage
- [ ] Happy path / positive cases
- [ ] Edge cases and boundary conditions
- [ ] Error handling and exceptions
- [ ] Null/undefined inputs
- [ ] Empty collections
- [ ] Maximum value boundaries

### Code Standards
- Follow existing test patterns in the codebase
- Use descriptive test names: `test_<function>_<scenario>`
- Include Arrange-Act-Assert comments
- Mock external dependencies where appropriate

### Output
Return ONLY the test code, wrapped in markdown code blocks with the appropriate language.
```

---

## When to Use Prompts — Decision Criteria

| Criterion | Use Prompts? | Alternative |
|-----------|--------------|-------------|
| Single focused task | ✅ Yes | Skills for multi-step |
| Stateless (no state between steps) | ✅ Yes | Agents for state |
| Has parameterized inputs | ✅ Yes | Instructions for general guidance |
| Requires bundled assets (scripts) | ❌ No | Use Skills |
| Needs context isolation | ❌ No | Use Custom Agents |
| Applies to most tasks | ❌ No | Use Workspace Instructions |

---

## Core Principles — Enterprise Compliance

1. **Single Task Focus:** One prompt = one well-defined task
2. **Output Examples:** Show expected format when structure matters
3. **Reuse Over Duplication:** Reference instruction files, don't copy
4. **Clear Parameterization:** Define `argument-hint` for discoverability
5. **Minimal Tools:** Restrict to what the task requires
6. **Version Control:** All workspace prompts committed

---

## Anti-Patterns — Strictly Prohibited

| Anti-Pattern | Violation | Enterprise Consequence |
|--------------|-----------|----------------------|
| Multi-task prompts | Scope creep | Unpredictable results |
| Vague descriptions | No discoverability | Users don't know when to use |
| Over-tooling | Resource waste | Unnecessary tool access |
| No parameterization | Irreproducible | Inconsistent outputs |
| Copying documentation | Redundancy | Link instead |

---

## Validation Checklist

Before committing a prompt:

- [ ] `description` contains clear "Use when..." trigger
- [ ] `argument-hint` defined for parameterized input
- [ ] Single, focused task (not multi-step)
- [ ] Output format explicitly defined
- [ ] Tool restrictions appropriate for task
- [ ] No bundled assets required (use Skills if so)
- [ ] File is version-controlled
