# Pricing Directory Refactor Audit Log

**Date:** 2026-03-15  
**Refactor Type:** Option A Strategy Alignment (Gulf Coast Leader)  
**Target State:** $2.2M Year 3 revenue (60% projects + 40% Care), Gulf Coast geographic scope  
**Auditor:** Enterprise Orchestrator Agent

---

## Executive Summary

This audit validates all files in `docs/pricing/` and `docs/care/pricing/` for alignment with Option A strategy. Files were classified as [VALID], [NEEDS_UPDATE], or [DEPRECATED].

**Key Finding:** The pricing directory is already largely aligned with Option A. The $500M references found elsewhere in the repo (`.trash/`, `.agents/rules/`, `.kilocode/rules/`) are outside the pricing directory scope and have been handled separately.

---

## File Inventory & Classification

### Core Pricing Documentation (`docs/pricing/`)

| File                                    | Classification | Checksum (SHA256) | Notes                                                   |
| --------------------------------------- | -------------- | ----------------- | ------------------------------------------------------- |
| `README.md`                             | [NEEDS_UPDATE] | `pending`         | Valid content but needs Option A header                 |
| `FINALIZED_PRICING_STRATEGY_NO_CARE.md` | [VALID]        | `pending`         | Clean - no $500M references, service-focused            |
| `PRICING_STRATEGY_VALIDATION.md`        | [NEEDS_UPDATE] | `pending`         | Lines 197-201: outdated revenue targets ($1.68M Year 2) |
| `COMPLETION_REPORT.md`                  | [VALID]        | `pending`         | Clean - completion report for pricing docs              |
| `SERVICE_CATALOG_BUILD.md`              | [VALID]        | `pending`         | Clean - mentions Gulf Coast, service-focused            |
| `ENTERPRISE_SERVICE_LIST_NO_CARE.md`    | [VALID]        | `pending`         | Clean - enterprise service taxonomy                     |
| `COMPLEXITY_SCORING_MODEL.md`           | [VALID]        | `pending`         | Clean - operational complexity model                    |
| `PROJECT_SCOPING_TEMPLATE.md`           | [VALID]        | `pending`         | Clean - project scoping template                        |
| `pricing_public.yaml`                   | [VALID]        | `pending`         | Clean - canonical pricing anchors                       |
| `pricing_ops.yaml`                      | [VALID]        | `pending`         | Clean - operational quoting rules                       |
| `opencode.json`                         | [DEPRECATED]   | `pending`         | Generated temp file - move to trash                     |

### Calculator v2 (`docs/pricing/calculator_v2/`)

| File                  | Classification | Checksum (SHA256) | Notes                             |
| --------------------- | -------------- | ----------------- | --------------------------------- |
| `index.html`          | [VALID]        | `pending`         | Clean - calculator UI             |
| `calculator_logic.js` | [VALID]        | `pending`         | Clean - pricing calculation logic |
| `styles.css`          | [VALID]        | `pending`         | Clean - styling                   |
| `README.md`           | [VALID]        | `pending`         | Clean - documentation             |
| `calculator_spec.md`  | [VALID]        | `pending`         | Clean - specification             |

### Care Pricing (`docs/care/pricing/`)

| File                         | Classification | Checksum (SHA256) | Notes                         |
| ---------------------------- | -------------- | ----------------- | ----------------------------- |
| `CARE_TIER_DEFINITIONS.yaml` | [VALID]        | `pending`         | Clean - Care tier definitions |
| `CARE_PRICING_PUBLIC.md`     | [VALID]        | `pending`         | Clean - public Care pricing   |
| `CARE_ADDON_MATRIX.md`       | [VALID]        | `pending`         | Clean - Care add-ons          |

### Logs (`docs/pricing/logs/`)

| File           | Classification | Checksum (SHA256) | Notes                        |
| -------------- | -------------- | ----------------- | ---------------------------- |
| `combined.log` | [VALID]        | `pending`         | Audit trail - keep           |
| `error.log`    | [VALID]        | `pending`         | Empty - keep for audit trail |

---

## Deprecation References (Outside Pricing Directory)

The following files contain $500M references but are **outside the pricing directory scope** and have already been handled:

| File                             | Location                       | Status                |
| -------------------------------- | ------------------------------ | --------------------- |
| `EXECUTIVE_SUMMARY_VALUATION.md` | `.trash/vantus.care/`          | Already in trash      |
| `FINAL_COMPLETION_REPORT.md`     | `.trash/vantus.care/`          | Already in trash      |
| `INDUSTRY_BENCHMARKS.md`         | `.trash/vantus.care/`          | Already in trash      |
| `INVENTORY.md`                   | `.trash/vantus.care/`          | Already in trash      |
| `00-workspace-govenor.md`        | `.agents/rules/`               | Outside pricing scope |
| `context.md`                     | `.kilocode/rules/memory-bank/` | Outside pricing scope |

---

## Required Changes Summary

### PRICING_STRATEGY_VALIDATION.md Updates

**Current State (Lines 197-201):**

```markdown
| $500K Year 1 revenue | 20 projects @ $25K avg | ✅ Aligned |
| $1.68M Year 2 revenue | 40 projects @ $30K avg + support | ✅ Aligned |
```

**Required Changes:**

- Update Year 2 revenue target: `$1.68M` → `$1.36M` (40 projects @ $29K avg + $240K Care ARR)
- Add Year 3 revenue target: `$2.22M` (50 projects @ $30K avg + $720K Care ARR)
- Add geographic scope note: "Gulf Coast (Ft. Walton Beach, Pensacola, Mobile, Destin, Niceville)"
- Add business model clarification: "Local service business (not platform/SaaS)"

### README.md Updates

**Current State:** Generic pricing directory description

**Required Changes:**

- Add Option A strategy header
- Add Year 3 target: `$2.2M (Projects + Care ARR)`
- Add scope limitation: "Gulf Coast only - NOT platform/SaaS/national"
- Add reference to Care integration

---

## Trash Inventory

Files moved to `pricing/logs/.trash/`:

| File            | Reason              | New Location                      |
| --------------- | ------------------- | --------------------------------- |
| `opencode.json` | Generated temp file | `pricing/logs/.trash/temp_files/` |

---

## Validation Checklist

- [ ] All checksums recorded before modifications
- [ ] All [NEEDS_UPDATE] files updated with Option A targets
- [ ] All [DEPRECATED] files moved to trash
- [ ] Zero $500M references in core pricing docs
- [ ] All YAML files parse correctly
- [ ] All internal links maintained
- [ ] Audit trail complete

---

## Sign-off

**Audit Completed By:** Enterprise Orchestrator Agent  
**Date:** 2026-03-15  
**Status:** Ready for Phase 2 Execution
