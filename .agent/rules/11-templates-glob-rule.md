---
trigger: manual
---

# 11_TEMPLATES_GLOB_RULE — Run Artifact Templates
**Activation:** Glob  
**Glob:** docs/templates/**/*.template.md

## Template Rules
- Placeholders (2026-02-25) are allowed and expected.
- Must include clear sections for: Summary, Evidence, Risks, Decision.
- Templates must be surface-aware (public/admin/portal) OR explicitly “shared”.

## Required Template Set (minimum)
- PREFLIGHT_REPORT
- TRACEABILITY_MATRIX
- SECURITY_REVIEW
- THREAT_MODEL
- ESCALATION_PACKET
- CHANGE_REQUEST
- PERFORMANCE_BUDGET
- ACCESSIBILITY_AUDIT
- RELEASE_NOTES
- INCIDENT_TIMELINE
- POSTMORTEM

## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
