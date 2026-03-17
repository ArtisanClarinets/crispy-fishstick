---
description: Apply the audit outputs to eliminate drift. Reorganize docs into canonical structure, quarantine outdated/duplicate/trash files into `.trash/`, regenerate missing canonical docs, and then trigger /docs-release-preflight to validate the final state.
---

# docs-sync-patch
**Description:** Apply the audit outputs to eliminate drift. Reorganize docs into canonical structure, quarantine outdated/duplicate/trash files into `.trash/`, regenerate missing canonical docs, and then trigger /docs-release-preflight to validate the final state.

## Step 0 — Guardrails
- Follow workspace rules: security-first, zero-deviation, scope firewalls.
- Do NOT delete files. Only move to `.trash/` with a manifest.
- Do NOT change meaning silently: any semantic change must be documented in Sync Notes + CHANGELOG.
- If contradictions require a decision, mark as BLOCKER and stop patching beyond safe mechanical fixes.

## Step 1 — Load audit artifacts
Read the latest (or create if missing by calling /docs-recursive-alignment-audit):
- docs/audits/INVENTORY.md
- docs/audits/CANONICAL_MAP.md
- docs/audits/SCOPE_FIREWALL_REPORT.md
- docs/audits/ALIGNMENT_MATRIX.md
- docs/audits/INDUSTRY_STANDARDS_CHECKLIST.md
- docs/audits/MISSION_ALIGNMENT_REPORT.md
- docs/audits/PATCH_PLAN.md

If any are missing: call **/docs-recursive-alignment-audit** now, then continue.

## Step 2 — Establish canonical docs structure
Enforce this canonical structure (create folders if missing):

docs/
  public/
  portal/
  admin/
  care/
  research/
  shared/
  templates/
  audits/

Create or update indexes:
- docs/README.md (top-level)
- docs/public/README.md
- docs/portal/README.md
- docs/admin/README.md
- docs/care/README.md
- docs/research/README.md
- docs/shared/README.md
- docs/templates/README.md

## Step 3 — Quarantine: move outdated/trash/duplicates to `.trash/`
Create:
- .trash/
  - 2026-02-25/
    - moved/...
    - manifest.md
    - manifest.csv (optional)

Move files into `.trash/2026-02-25/moved/...` when they meet ANY criteria:

### 3.1 Duplicate rule
If file is byte-for-byte duplicate of a canonical file, move the non-canonical copy.

### 3.2 Outdated rule
If file is an older version superseded by canonical doc set (per CANONICAL_MAP), move it.
- Keep only one canonical copy.

### 3.3 Trash rule
Move anything that is:
- extracted `.git/` directories, pack files, or repo metadata inside docs bundles
- build artifacts, temp exports, or random dumps not referenced by indexes
- nested archives that duplicate extracted content (keep one form: archive OR extracted)

### 3.4 Scope-violation quarantine (temporary)
If a doc mixes admin/portal/public scope and cannot be cleanly patched safely:
- Move the mixed doc to `.trash/...`
- Replace it with a corrected canonical doc in proper surface folder.

**Manifest requirements (must be produced):**
For each moved file record:
- original path
- new path
- reason code: DUPLICATE | OUTDATED | TRASH | SCOPE_VIOLATION | OTHER
- canonical replacement (if any)

## Step 4 — Apply PATCH_PLAN deterministically
For each PATCH_PLAN item (BLOCKER/HIGH/MED/LOW):
- Patch canonical docs first (docs/**)
- Then patch dependent artifacts (SITE_MAP/DIRECTORY_TREE/FEATURE_LIST/CONTENT_MAP/RBAC/DATA_MODEL)
- Add “Sync Notes” section to each modified doc (what changed + why)
- Update CHANGELOG (Unreleased) with summary

## Step 5 — Regenerate missing canonical docs (portal/admin/public separation)
If any canonical documents are missing, create them using the latest content:
- Ensure portal docs never describe admin workflows
- Ensure admin docs never describe portal UX promises unless operable
- Ensure public docs avoid authenticated behaviors

## Step 6 — Re-run alignment audit (must pass)
Call **/docs-recursive-alignment-audit** again.
If new drift is detected:
- Patch it (repeat Steps 4–5)
- Re-run audit until there are no contradictions or scope overlaps.

## Step 7 — Trigger release preflight
Call **/docs-release-preflight**.

## Outputs (required)
- Updated docs tree under /docs
- .trash/2026-02-25/manifest.md
- Updated docs/audits/* reports
- Updated CHANGELOG entries

## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
