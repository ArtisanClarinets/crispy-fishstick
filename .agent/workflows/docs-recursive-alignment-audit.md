---
description: Recursively review ALL documentation and planning artifacts in this workspace, detect drift/contradictions, verify scope separation (public/admin/portal/care/research), and validate alignment to industry standards + Vantus mission. Produces a determi
---

# docs-recursive-alignment-audit
**Description:** Recursively review ALL documentation and planning artifacts in this workspace, detect drift/contradictions, verify scope separation (public/admin/portal/care/research), and validate alignment to industry standards + Vantus mission. Produces a deterministic report and an exact patch plan to eliminate deviations.

## Step 0 — Guardrails (always apply)
- Follow GLOBAL + WORKSPACE rules (mission, security-first, zero-deviation).
- Do not invent facts or metrics. Use “Targets” + measurement methods.
- If you find contradictions, resolve them by selecting a canonical source of truth OR propose a resolution and mark as BLOCKER until decided.

## Step 1 — Build the inventory (recursive)
1) Recursively list all files under:
   - docs/** (all surfaces)
   - any planning folders (e.g., planning/**, research/**, care/**)
   - templates (docs/templates/**)
2) Produce a file inventory table with:
   - path, type, size
   - surface classification: public | portal | admin | care | research | shared | template
<!-- RESOLVED PLACEHOLDER -->
3) Identify and list *non-canonical duplicates* (same content in multiple paths).

**Output:** `docs/audits/INVENTORY.md` (and optionally `docs/audits/INVENTORY.csv`)

## Step 2 — Identify canonical docs (source-of-truth map)
1) Determine the canonical docs root (prefer `/docs/`).
2) For each surface, identify canonical documents:
   - Public: PRD, SITE_MAP, FEATURE_LIST, CONTENT_MAP, DIRECTORY_TREE
   - Portal: PORTAL_PRD, PORTAL_SITE_MAP, PORTAL_FEATURE_LIST, PORTAL_CONTENT_MAP, PORTAL_DIRECTORY_TREE, PORTAL_RBAC_MATRIX, PORTAL_DATA_MODEL
   - Admin: ADMIN_PRD, ADMIN_SITE_MAP, ADMIN_FEATURE_LIST, ADMIN_CONTENT_MAP, ADMIN_DIRECTORY_TREE, ADMIN_RBAC_MATRIX, ADMIN_DATA_MODEL
   - Shared: SECURITY, GOVERNANCE, QUALITY_GATES, DEVELOPMENT, RELEASE_PROCESS, INCIDENT_RESPONSE, RUNBOOK, ENV_MANIFEST, AGENTS, TASK_SCHEMA, CHANGELOG
3) If multiple competing versions exist, choose one as canonical and mark the others as ARCHIVE, or produce a “Canonical Decision Needed” list.

**Output:** `docs/audits/CANONICAL_MAP.md`

## Step 3 — Scope firewall validation (zero overlap)
For each document, confirm it only covers its intended surface:
- Portal docs MUST NOT include CMS/CRM/publishing/pricing-SKU-editing UI.
- Admin docs MUST NOT contain client-facing marketing promises unless operable.
- Public docs MUST NOT include authenticated portal/admin behaviors.

Create a “Scope Firewall” report:
- Violations (exact file + section + fix)
- Proposed edits (what to remove/rewrite)
- Any missing surface docs that cause leakage (e.g., shared controls described in portal docs)

**Output:** `docs/audits/SCOPE_FIREWALL_REPORT.md`

## Step 4 — Internal alignment checks (recursive drift detection)
Perform these consistency checks and record findings:

### 4.1 Route alignment
- SITE_MAP ⇄ DIRECTORY_TREE ⇄ CONTENT_MAP must match for each surface.
- Every route must have:
  - auth requirement (anon/org-scoped/staff)
  - primary CTA/action
  - data sources (if any)

### 4.2 Feature alignment
- FEATURE_LIST ⇄ PRD scope ⇄ CONTENT_MAP must match.
- Each feature must map to:
  - owning surface
  - data model entity (if applicable)
  - acceptance criteria
  - test strategy entry

### 4.3 Role/RBAC alignment
- RBAC matrix must match:
  - route access
  - action permissions
  - audit requirements
- Deny-by-default must be explicit.

### 4.4 Pricing governance alignment (if referenced anywhere)
- No hardcoded pricing numbers in customer-facing docs.
- All pricing described as SKU-resolved + last-verified + auditable.

**Output:** `docs/audits/ALIGNMENT_MATRIX.md` (and optional CSV)

## Step 5 — Industry standards compliance review (plan + evidence)
Check documentation against these standards and produce a compliance checklist.

### 5.1 Security standards (doc-level)
- OWASP Top 10 awareness (threat model mentions common web risks)
- OWASP ASVS-style controls (validation, auth, access control, error handling, logging)
- NIST/CSF-style operational readiness (incident response, change control, audits)

Minimum doc evidence required:
- Threat model template used (or referenced)
- SECURITY_REVIEW template used for sensitive changes
- Incident response runbook with severities

### 5.2 Accessibility standards
- WCAG AA+ expectations documented (keyboard, focus, forms, reduced motion)
- Accessibility audit template present and referenced in QUALITY_GATES

### 5.3 Performance standards
- Core Web Vitals targets (as Targets + method)
- Performance budgets + measurement plan
- Third-party script policy (default none)

### 5.4 Governance/process standards
- SemVer + Keep a Changelog
- Deterministic build expectations
- Traceability matrix requirement
- Stop-ship gates explicitly defined

**Output:** `docs/audits/INDUSTRY_STANDARDS_CHECKLIST.md`

## Step 6 — Mission alignment pass (revenue + trust + leverage)
For each surface, confirm docs explicitly support:
- Trust: proof artifacts, verification, auditability
- Conversion: clear CTAs and qualification
- Retention: transparency, evidence exports, operational clarity
- Leverage: repeatable systems, not bespoke-only
- Owner-Controlled Systems: portability + exit plan stance

Flag any doc sections that are:
- hype without proof
- vague claims without measurement
- features that don’t increase leverage/defensibility

**Output:** `docs/audits/MISSION_ALIGNMENT_REPORT.md`

## Step 7 — Produce a deterministic patch plan (no drift left)
Create a prioritized patch plan with:
- BLOCKERS (contradictions, scope overlap, missing canonical doc)
- HIGH (security/a11y/perf governance gaps)
- MED (consistency/structure)
- LOW (wording polish)

For each item:
- file path
- exact section
- proposed replacement text or bullet changes
- acceptance criteria (“how we know it’s fixed”)

**Output:** `docs/audits/PATCH_PLAN.md`

## Step 8 — Apply changes (only if user requested)
If the user asks you to fix documents:
- Apply edits in canonical docs first
- Then update dependent docs per the Dependency Map Rule
- Update docs/README indexes
- Add a short “Sync Notes” section to patched files describing what changed and why

Generate run artifacts using templates:
- PREFLIGHT_REPORT
- TRACEABILITY_MATRIX
- SECURITY_REVIEW (if security-sensitive)
- PERFORMANCE_BUDGET / ACCESSIBILITY_AUDIT (if relevant)

**Output:** `docs/audits/FINAL_REPORT.md` + updated docs

## Completion Criteria (workflow success)
- No scope overlap between public/admin/portal/care/research docs
- No contradictions between SITE_MAP/DIRECTORY_TREE/FEATURE_LIST/CONTENT_MAP per surface
- Industry standards checklist is complete with evidence references
- Patch plan exists and is actionable with exact edits
- Mission alignment issues are identified and corrected or escalated as decisions

## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
