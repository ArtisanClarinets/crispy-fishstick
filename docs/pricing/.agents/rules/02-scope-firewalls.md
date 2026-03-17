---
trigger: always_on
---

# 02_SCOPE_FIREWALLS — Prevent Admin/Portal/Public Overlap
**Activation:** Always On

## Surface Definitions
### Public Site
- anonymous marketing + education + conversion
- no authenticated client data
- SEO-indexable (except limited sensitive pages)

### Client Portal
- authenticated, org-scoped
- tickets, docs vault, billing visibility, change control, transparency
- no CMS/CRM/publishing interfaces
- should be noindex by default

### Admin Portal
- staff-only operations
- CMS, CRM, pricing governance, org/user management, publishing, audit log UI
- MFA enforced; optionally IP-restricted

## Hard No-Overlap Rules
- Client Portal docs MUST NOT describe admin workflows (publishing, pipeline, SKU editing).
- Admin docs MUST NOT contain client-facing marketing claims unless backed by operable features.
- Any shared capability must live in “Shared” docs and be referenced by surface docs, not duplicated with conflicting wording.

## Change Control
If a change affects multiple surfaces, explicitly document:
- what changes for each surface
- what remains isolated
- how RBAC differs

## Security Boundary
- Admin: highest privilege; assume hostile environment; stricter controls
- Portal: client confidentiality; auditability and evidence exports
- Public: abuse/spam protection is primary; no private data