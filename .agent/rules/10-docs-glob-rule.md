---
trigger: always_on
---

# 10_DOCS_GLOB_RULE — Documentation Quality Requirements
**Activation:** Glob  
**Glob:** **/*.md

## Required Header (first ~30 lines)
All non-template docs must include:
- Title
- Version
- Date
- Scope
- Owner (optional but preferred)

Templates may include placeholder dates; non-templates must not.

## Writing Standards
- Plain language; avoid jargon without definition.
- Every section must end with “Next actions” when relevant.
- Use lists/tables for clarity; avoid dense paragraphs.

## Claims Rule
- No unmeasured claims.
- If you use targets, label them as targets and provide measurement method.

## Consistency Rule
If a doc references routes, features, roles, or entities:
- ensure it matches the canonical SITE_MAP / FEATURE_LIST / RBAC / DATA_MODEL.