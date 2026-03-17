---
trigger: manual
---

# 50_PRICING_GLOB_RULE — Pricing Governance (No Hardcoded Numbers)
**Activation:** Glob  
**Glob:** **/*pricing*.* **/*sku*.* **/*catalog*.*

## Rule
Pricing displayed anywhere must be:
- SKU-resolved
- auditable (who changed, when, why)
- includes “last verified”
- versioned and rollback-capable

Forbidden:
- hardcoded dollar amounts in UI copy, calculators, or docs (except internal planning spreadsheets explicitly labeled INTERNAL).
