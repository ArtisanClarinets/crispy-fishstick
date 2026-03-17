---
trigger: always_on
---

# 21_ADMIN_GLOB_RULE — Admin Portal Only
**Activation:** Glob  
**Glob:** docs/admin/**/*.md

## Scope Lock
These documents must ONLY cover the Admin Portal.
Forbidden topics:
- client portal UX promises unless backed by admin-operable controls
- public marketing language
- SEO goals

## Required Emphasis
- MFA enforced
- audit log for all sensitive actions
- draft/review/publish/rollback workflows
- pricing governance: SKU + last verified + audit
- org/user provisioning + session resets

## Required Sections (where relevant)
- Threat model summary
- RBAC matrix reference
- Audit logging requirements
- Stop-ship gates