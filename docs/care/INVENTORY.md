# INVENTORY - Vantus Care Documentation Suite

**Version:** 1.2.0
**Last updated:** 2026-03-07
**Classification:** Internal - operational inventory
**Publication rule:** Internal reference only.
**Status:** Active baseline inventory

## Purpose

This file is the authoritative high-level inventory for the Vantus Care suite.
Use it for package counts, canonical document references, and navigation.

## Current package composition

| Area                               | Count | Notes                                                                                                                  |
| ---------------------------------- | ----: | ---------------------------------------------------------------------------------------------------------------------- |
| Root governance and overview files |    15 | README, indexes, inventory, analysis, benchmarks, manifests, crosswalk, public catalog, client one-pager, handoff note |
| SOP files                          |    32 | 31 numbered SOPs plus `sops/SOP-CARE-SYSTEM-INDEX.md`                                                                       |
| Template files                     |    19 | 19 numbered templates                                                                                                  |
| Checklist files                    |    22 | 20 numbered checklists plus master index and usage guide                                                               |
| Example files                      |     2 | Sanitized examples                                                                                                     |
| Pricing files                      |     4 | tier definitions, public pricing, add-on matrix, catalog JSON                                                          |
| Commercial files                   |     8 | SLA, MSA, service order, proposal, authorization, assumptions, discount governance, assembly workflow                  |
| Core specifications                |     1 | Care site PRD                                                                                                          |

## Canonical documents by function

### Overview and governance

- `README.md`
- `MASTER_INDEX.md`
- `MASTER_INDEX_EXECUTIVE.md`
- `CARE_ONE_PAGER_CLIENT.md`
- `INVENTORY.md`
- `CARE_DOCS_HANDOFF.md`
- `GAP_ANALYSIS.md`
- `FINAL_COMPLETION_REPORT.md`
- `SOP-CARE-MANIFEST.json`
- `sops/SOP-CARE-SYSTEM-INDEX.md`

### Public offer and positioning

- `CARE_SERVICE_CATALOG_PUBLIC.md`
- `CARE_ONE_PAGER_CLIENT.md`
- `CARE_BUILD_TO_CARE_CROSSWALK.md`
- `POLICY-BLOCKS.md`
- `INDUSTRY_BENCHMARKS.md`

### Pricing and packaging

- `pricing/CARE_TIER_DEFINITIONS.yaml`
- `pricing/CARE_PRICING_PUBLIC.md`
- `pricing/CARE_ADDON_MATRIX.md`
- `pricing/catalogs/pricing_catalog_v3.json`

### Commercial controls

- `commercial/TPL-CARE-SLA-SCHEDULE.md`
- `commercial/TPL-CARE-MSA.md`
- `commercial/TPL-CARE-SERVICE-ORDER.md`
- `commercial/TPL-CARE-PROPOSAL.md`
- `commercial/TPL-CARE-AUTHORIZATION-FORM.md`
- `commercial/CARE_QUOTE_ASSUMPTIONS_LIBRARY.md`
- `commercial/CARE_DISCOUNT_GOVERNANCE.md`
- `commercial/CARE_PROPOSAL_ASSEMBLY_WORKFLOW.md`

## Canonical care tiers

- `Foundation`
- `Advanced`
- `Sovereign`

These are the only active tier names for Care packaging and pricing.

## Scope note

Vantus Care is the recurring support and governance layer that follows project delivery.
It does not replace the primary Vantus build offer ladder defined in `vantus_enterprise_docs/enterprise_pack/03_offers/`.

## Inventory rules

- Update this file when counts, canonical docs, or information architecture change.
- Do not claim a file count or completion state that conflicts with the live directory tree.
- Keep pricing references local to `care/pricing/` for Care-specific commercial documents.
- Treat numbered SOPs, templates, and checklists as controlled documents; treat supporting docs as navigation and governance artifacts.
