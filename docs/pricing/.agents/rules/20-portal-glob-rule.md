---
trigger: manual
description: Client Portal
---

# 20_PORTAL_GLOB_RULE — Client Portal Only
**Activation:** Glob  
**Glob:** docs/portal/**/*.md

## Scope Lock
These documents must ONLY cover the Client Portal.
Forbidden topics:
- CMS/publishing workflows
- CRM pipeline stages
- SKU editing interfaces
- admin-only role definitions

## Required Emphasis
- client trust surface: transparency + auditability
- evidence exports + hash manifests
- org-scoped RBAC
- “no secrets stored” stance (store references + handoff manifests)

## Required Sections (where relevant)
- Threat model summary
- RBAC matrix reference
- Audit logging requirements
- Stop-ship gates