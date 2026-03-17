# care/ - Vantus Care Documentation Suite

**Package:** Vantus Care
**Version:** 1.2.0
**Last updated:** 2026-03-07
**Primary audience:** Vantus leadership, sales, delivery, and security operations
**Classification:** Internal - canonical suite guide
**Publication rule:** Do not publish externally; use the public and client-facing Care docs for outside distribution.
**Status:** Canonical suite baseline aligned to `enterprise_pack/`

## What this is

This directory is the canonical operating, pricing, and commercial documentation set for `Vantus Care`.

It defines how Care is positioned, priced, sold, delivered, measured, and offboarded.
It also documents how Care connects to the broader Vantus offer ladder in `vantus_enterprise_docs/enterprise_pack/`.

## Governing principles

- Client owns accounts, data, hardware, and credentials.
- Proof beats promises; all claims need definitions and evidence.
- Security is standard, not an add-on.
- Plain language is mandatory.
- Care is a recurring support layer, not a substitute for project scoping.
- No hardware leasing, rental, or hidden lock-in.

## Where Care fits in the business

Per `../enterprise_pack/00_overview/FOUNDER_CONTEXT.md`, Vantus leads with project work:

1. Website Rebuild
2. Website + CMS
3. Website + Business Portal
4. Optional recurring support through Vantus Care

Use `CARE_BUILD_TO_CARE_CROSSWALK.md` for the conversion path from build delivery into recurring Care.

## Canonical commercial structure

### Care tiers
- `Foundation` - essential managed support and operational hygiene
- `Advanced` - stronger security, reporting, and planning depth
- `Sovereign` - highest-governance tier with strategic and specialized support

### Canonical pricing documents
- `pricing/CARE_TIER_DEFINITIONS.yaml`
- `pricing/CARE_PRICING_PUBLIC.md`
- `pricing/CARE_ADDON_MATRIX.md`
- `pricing/catalogs/pricing_catalog_v3.json`

### Canonical offer and alignment documents
- `CARE_SERVICE_CATALOG_PUBLIC.md`
- `CARE_ONE_PAGER_CLIENT.md`
- `CARE_BUILD_TO_CARE_CROSSWALK.md`
- `commercial/TPL-CARE-SLA-SCHEDULE.md`
- `commercial/CARE_PROPOSAL_ASSEMBLY_WORKFLOW.md`

## Directory structure

- `sops/` - operating procedures and governance controls
- `templates/` - reusable delivery templates
- `checklists/` - execution and QA checklists
- `examples/` - sanitized example outputs
- `pricing/` - Care pricing architecture and catalogs
- `commercial/` - commercial schedules and client-facing contractual templates
- `CORE_SPECIFICATIONS/` - Care-site and publishing requirements

## Current suite baseline

- 31 numbered care SOPs plus system index
- 19 numbered templates
- 20 numbered operational checklists plus checklist index and usage guide
- 2 example packs
- Canonical public service catalog, client one-pager, pricing, commercial pack, SLA, and build-to-care alignment docs

## Publishing rules

- Use `Foundation / Advanced / Sovereign` as the only active tier names.
- Do not reference deprecated tier names such as `Premier`, `Professional`, or `Enterprise` in Care offer language.
- Do not publish unsupported market-superlative claims.
- Keep public pricing and internal catalog logic aligned.
- Treat `enterprise_pack/` as the governing strategy layer for sequencing and positioning.

## Related documents

- `MASTER_INDEX.md`
- `MASTER_INDEX_EXECUTIVE.md`
- `CARE_ONE_PAGER_CLIENT.md`
- `INVENTORY.md`
- `GAP_ANALYSIS.md`
- `FINAL_COMPLETION_REPORT.md`
- `INDUSTRY_BENCHMARKS.md`
- `POLICY-BLOCKS.md`
