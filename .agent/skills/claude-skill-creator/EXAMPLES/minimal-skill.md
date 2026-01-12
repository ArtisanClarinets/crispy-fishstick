---
name: hello-world-skill
description: A minimal example Skill demonstrating the required YAML frontmatter and basic structure. Use to learn Skill fundamentals.
---

# Hello World Skill

The smallest valid Claude Skill consists of just this file with YAML frontmatter.

## Quick Start

This is the minimal structure needed:

```yaml
---
name: skill-name
description: Brief description including what and when to use
---
# Skill Name

Your instructions here.
```

## How to Use This Example

1. Copy this file to your Skills directory
2. Modify the YAML frontmatter:
   - Change `name` to your skill name
   - Update `description` with your skill purpose
3. Replace the content with your instructions
4. Test by asking Claude about your skill

## Key Rules

✓ **YAML frontmatter**: Required for all Skills
✓ **Name format**: lowercase-with-hyphens, max 64 characters
✓ **Description**: Explain what + when to use, max 1024 characters
✓ **No reserved words**: Cannot use "anthropic" or "claude"
✓ **Markdown body**: Any markdown content after frontmatter

## Next Steps

Review the main SKILL.md in the parent directory for comprehensive guidance on:

- Writing effective instructions
- Adding supporting files
- Creating working examples
- Best practices for production Skills
