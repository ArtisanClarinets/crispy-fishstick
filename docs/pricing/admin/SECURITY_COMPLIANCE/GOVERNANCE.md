# Admin Documentation - Governance

**Version:** 1.0.0
**Last updated:** 2026-03-08
**Applies to:** Admin code and admin operations

## Governance goals

- prevent security regressions in privileged workflows
- keep pricing and billing governance traceable
- preserve reversible releases and operational evidence
- keep admin docs synchronized with actual internal behavior

## Required approvals

- standard change: maintainer approval
- sensitive change: maintainer plus security review
- pricing or billing control changes: maintainer plus commercial owner review

## Documentation governance

When changing:

- routes -> update the admin site map
- features -> update the admin feature list and changelog
- operational behavior -> update runbook and incident notes
- access model -> update RBAC and security docs
