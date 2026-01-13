# Skills Directory

This directory contains _skill_ definitions that describe specialized subagents (small, single-responsibility agents) used to assist in tasks.

Each skill should include a `SKILL.md` (or `skill.md`) with the following minimal structure:

```
name: <unique-skill-name>
description: Short description of what this skill does
inputs:
  - name: <input-name>
    type: <string|file|json|...>
    description: Short description
outputs:
  - name: <output-name>
    type: <string|file|json|...>
constraints:
  - time_limit: 300s
  - max_concurrency: 1
acceptance_criteria:
  - Short, testable statements the subagent must satisfy
security_considerations:
  - Any secrets handling or env requirements
examples:
  - example invocation and expected output
```

Validation: If a `scripts/validate_skill.py` or similar exists for a skill, run the validator before invoking the skill.

Invocation pattern (recommended):
1. Read `SKILL.md` to understand contract and constraints.
2. Validate with the skill validator (if present).
3. Call `runSubagent({ prompt, description, agentName })` using the exact `name` from `SKILL.md`.
4. Verify returned results with unit/integration tests and lint before merging any code changes.

