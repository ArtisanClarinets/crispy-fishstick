---
Document: CUTOVER_AND_ROLLBACK_PLAN
Doc ID: VS-TEMPLATE-OPS-010
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Release Manager
Status: Template
Version: 2.0.0
Last Updated: 2026-01-18
Confidentiality: Client Confidential
Source of Truth: [docs/07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md](docs/07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md)
---

## Purpose
Detailed procedure for transitioning from a legacy system or a major release to the new production version, with explicit failure triggers and recovery paths.

## Cutover Checklist (The "Procedure")
1.  **[ ] Freeze Window Start:** Notify stakeholders. No code changes.
2.  **[ ] Pre-flight Backup:** Database snapshot + Config backup.
3.  **[ ] Data Migration:** Run migration scripts (verify row counts).
4.  **[ ] DNS Swap:** Update CNAME/A records.
5.  **[ ] Confidence Testing:** Run "Smoke Tests" on the live Production URL.
6.  **[ ] Sign-off:** Release Lead approves "Go".

## Rollback Triggers (The "When")
- **T1:** Smoke tests fail consistently for >10 minutes post-cutover.
- **T2:** Customer report of P0 data loss or privacy breach.
- **T3:** Critical infrastructure failure that cannot be hotfixed within 30 minutes.

## Rollback Procedure (The "How")
1.  **DNS Revert:** Point DNS back to legacy/previous stable version.
2.  **State Reversion:** Restore DB from pre-flight backup (if migration was destructive).
3.  **Communication:** Update status page and notify stakeholders of rollback.
