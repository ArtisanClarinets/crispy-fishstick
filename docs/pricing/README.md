# Vantus Systems Pricing Source of Truth

**Strategy:** Gulf Coast Leader (Option A)  
**Year 3 Target:** $2.2M (Projects + Care ARR)  
**Scope:** Local service business pricing — NOT platform/SaaS/national  
**Geographic Lock:** Gulf Coast only (Ft. Walton Beach, Pensacola, Mobile, Destin, Niceville)

---

This folder is the canonical pricing reference.

- `pricing_public.yaml` — Public anchors / starting prices and ranges
- `pricing_ops.yaml` — Internal quoting rules and guardrails
- `FINALIZED_PRICING_STRATEGY_NO_CARE.md` — Package pricing strategy (projects only)
- `PRICING_STRATEGY_VALIDATION.md` — Validation report (Option A aligned)
- `ENTERPRISE_SERVICE_LIST_NO_CARE.md` — Enterprise service taxonomy
- `SERVICE_CATALOG_BUILD.md` — Detailed service catalog
- `COMPLEXITY_SCORING_MODEL.md` — Project complexity framework
- `PROJECT_SCOPING_TEMPLATE.md` — Standardized scoping template

**Rule:** No public doc should contain placeholder pricing tokens.

**Revenue Model:**

- **Year 1:** $500K (20 projects @ $25K avg)
- **Year 2:** $1.36M (40 projects @ $29K + $240K Care ARR)
- **Year 3:** $2.22M (50 projects @ $30K + $720K Care ARR)

**Care Integration:**  
Recurring Care revenue scales from $0 → $240K → $720K through local managed service contracts. See `../care/pricing/CARE_TIER_DEFINITIONS.yaml` for Care tier structure.

**⚠️ IMPORTANT:**  
This pricing strategy is validated **ONLY for Gulf Coast local market dominance** (Option A).

- For $500M platform/national strategies → See separate repository (NOT HERE)
- For SaaS/automated scaling approaches → NOT SUPPORTED by this pricing model
- For AWS Marketplace or self-serve → NOT APPLICABLE to this local service model

If any pricing in docs conflicts with YAML files, update the YAML first, then update the docs.
