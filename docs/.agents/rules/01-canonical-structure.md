---
trigger: manual
---

# 01_CANONICAL_STRUCTURE — Single Source of Truth for Planning
**Activation:** Always On

## Canonical Document Set (Authoritative)
The following are the canonical documents for each surface and must stay consistent:

### Public Site (web)
- PRD (public)
- SITE_MAP (public)
- FEATURE_LIST (public)
- CONTENT_MAP (public)
- DIRECTORY_TREE (web)

### Client Portal
- PORTAL_PRD
- PORTAL_SITE_MAP
- PORTAL_FEATURE_LIST
- PORTAL_CONTENT_MAP
- PORTAL_DIRECTORY_TREE
- PORTAL_RBAC_MATRIX
- PORTAL_DATA_MODEL
- PORTAL_SECURITY / PORTAL_NFR

### Admin Portal
- ADMIN_PRD
- ADMIN_SITE_MAP
- ADMIN_FEATURE_LIST
- ADMIN_CONTENT_MAP
- ADMIN_DIRECTORY_TREE
- ADMIN_RBAC_MATRIX
- ADMIN_DATA_MODEL
- ADMIN_SECURITY / ADMIN_NFR

### Shared (cross-surface, but must NOT blur UX scope)
- SECURITY (baseline)
- GOVERNANCE
- QUALITY_GATES
- DEVELOPMENT
- RELEASE_PROCESS
- INCIDENT_RESPONSE
- RUNBOOK
- ENV_MANIFEST
- AGENTS
- TASK_SCHEMA
- CHANGELOG

## Canonical Location Rule
Choose ONE canonical docs root and treat it as source of truth:
- Recommended: /docs/ (root)
- Surface subfolders:
  - /docs/public/
  - /docs/portal/
  - /docs/admin/
  - /docs/care/
  - /docs/research/
  - /docs/templates/

If non-canonical duplicates exist elsewhere, mark them as:
- “ARCHIVE — non-authoritative” OR delete.

## Naming Rule (No Drift)
- Canonical docs use stable filenames exactly.
- No suffix variants like `.vantus.systems.md` unless you also maintain a redirect/index.

## Dependency Map Rule
When you change:
- SITE_MAP → must update DIRECTORY_TREE + FEATURE_LIST (and vice versa)
- FEATURE_LIST → must update PRD scope + CONTENT_MAP
- DATA_MODEL/RBAC → must update SECURITY + TEST_STRATEGY
- Templates → must update docs/README index if new/removed
