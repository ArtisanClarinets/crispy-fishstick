---
description: Run release-quality checks on the canonical documentation set. Verify industry standards, enforce stop-ship gates, produce release artifacts, and then call /docs-recursive-alignment-audit one final time to ensure 100% recursive alignment.
---

# docs-release-preflight
**Description:** Run release-quality checks on the canonical documentation set. Verify industry standards, enforce stop-ship gates, produce release artifacts, and then call /docs-recursive-alignment-audit one final time to ensure 100% recursive alignment.

## Step 0 — Guardrails
- Stop-ship on security, scope overlap, contradiction, or missing canonical docs.
- No deletions. Trash stays quarantined.
- If failures exist, produce a fix list and then call /docs-sync-patch.

## Step 1 — Confirm canonical structure exists
Require:
docs/
  public/ portal/ admin/ care/ research/ shared/ templates/ audits/
and docs/README.md indexes pointing to each section.

If missing: call **/docs-sync-patch**.

## Step 2 — Industry standards checklist validation
Review:
- SECURITY posture docs (threat model present, controls described, auditability)
- Accessibility: WCAG AA+ expectations documented, audit template referenced
- Performance: targets + budgets + measurement method documented
- Governance: SemVer + changelog + traceability matrix required

If any are missing: create a STOP-SHIP list and call **/docs-sync-patch**.

## Step 3 — Generate release artifacts (docs/templates)
Using templates, generate these run artifacts into:
docs/audits/release/2026-02-25/

- PREFLIGHT_REPORT.md
- TRACEABILITY_MATRIX.md
- SECURITY_REVIEW.md (required if portal/admin auth, RBAC, pricing, publishing, exports are involved)
- PERFORMANCE_BUDGET.md
- ACCESSIBILITY_AUDIT.md
- RELEASE_NOTES.md (even if internal)
- (optional) THREAT_MODEL.md (if major scope change)

Each artifact must reference the canonical docs and include pass/fail for gates.

## Step 4 — Gate verdict
Produce a final verdict:
- ACCEPTABLE (ship docs)
- NOT ACCEPTABLE (list exact blockers + required patches)

If NOT ACCEPTABLE: call **/docs-sync-patch**.

## Step 5 — Final recursive audit (must pass)
Call **/docs-recursive-alignment-audit**.
If any drift remains:
- call **/docs-sync-patch** automatically.

## Outputs (required)
- docs/audits/release/2026-02-25/* artifacts
- Final verdict summary in docs/audits/release/2026-02-25/FINAL_VERDICT.md

## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
