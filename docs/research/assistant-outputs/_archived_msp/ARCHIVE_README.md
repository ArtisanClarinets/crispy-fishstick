# MSP Legacy Files Archive

**Created:** 2026-03-07  
**Reason:** Archived due to pricing model migration from MSP (per-user) to Package-based (build) pricing

---

## Why These Files Are Archived

These files contained **legacy MSP (Managed Service Provider) pricing content** that was incompatible with Vantus Systems' current **package-based build pricing model**:

- **Old Model:** Per-user managed services ($99-$199/user/month)
- **New Model:** Package-based builds ($15K-$400K projects)

The archived files either:

1. Contained placeholder corruption ("See pricing/pricing_public.yaml" instead of actual values)
2. Used outdated MSP pricing models
3. Referenced deprecated Care content
4. Were replaced by new documentation (calculator_v2, SERVICE_CATALOG_BUILD.md, etc.)

---

## Files Archived

| File                                 | Reason                                             | Date Archived |
| ------------------------------------ | -------------------------------------------------- | ------------- |
| `pricing_model.csv`                  | MSP per-user pricing model                         | 2026-03-07    |
| `service_catalog.csv`                | MSP service catalog                                | 2026-03-07    |
| `service_catalog.md`                 | MSP service catalog + placeholder corruption       | 2026-03-07    |
| `pricing_margin_analysis.md`         | MSP margins + placeholder corruption               | 2026-03-07    |
| `pricing_assumptions.md`             | Cost assumptions + placeholder corruption          | 2026-03-07    |
| `cloud_pricing_model_v2_national.md` | Placeholder corruption                             | 2026-03-07    |
| `pricing_page_content.md`            | MSP messaging + placeholder corruption             | 2026-03-07    |
| `launch_marketing_assets.md`         | MSP messaging + Care refs + placeholder corruption | 2026-03-07    |
| `qa_report.md`                       | MSP pricing tests                                  | 2026-03-07    |

---

## Replacement Documentation

The following new documentation replaces the archived files:

| New File                                 | Purpose                    |
| ---------------------------------------- | -------------------------- |
| `pricing/calculator_v2/`                 | Package pricing calculator |
| `../../../pricing/SERVICE_CATALOG_BUILD.md`       | Build services catalog     |
| `../../../pricing/COMPLEXITY_SCORING_MODEL.md`    | Complexity scoring         |
| `../../../pricing/PROJECT_SCOPING_TEMPLATE.md`    | Project scoping            |
| `../../../pricing/PRICING_STRATEGY_VALIDATION.md` | Pricing validation         |

---

## Current Pricing Sources

### Build/Package Pricing (No-Care)

- `../../../pricing/pricing_public.yaml` - Public anchors and ranges
- `../../../pricing/pricing_ops.yaml` - Operational quoting rules
- `../../../pricing/FINALIZED_PRICING_STRATEGY_NO_CARE.md` - Strategy document
- `../../../pricing/ENTERPRISE_SERVICE_LIST_NO_CARE.md` - Service definitions
- `../../../pricing/SERVICE_CATALOG_BUILD.md` - Detailed service catalog

### Care/Managed Services Pricing

- `../../../care/pricing/CARE_TIER_DEFINITIONS.yaml` - Care tier definitions
- `../../../care/pricing/catalogs/pricing_catalog_v3.json` - Care add-on SKUs

---

## Accessing Archived Files

These files are kept for historical reference but should NOT be used for current pricing decisions. All current pricing information is available in the `pricing/` directory.

---

_Last updated: 2026-03-07_
