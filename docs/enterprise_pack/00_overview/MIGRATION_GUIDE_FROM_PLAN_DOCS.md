# Migration Guide — From `vantus.systems.plan.docs.zip` to this Suite

**Date:** 2026-03-05

## What to keep from the plan docs (strong assets)

Keep these as-is (they reflect your standards well):

- `../../shared/founding-principles/FOUNDING_PRINCIPLES.md` (principles; remove placeholder math later)
- `shared/founding-principles/ENGINEERING/*` (architecture rules, quality bar)
- `shared/sops/*` (engineering/ops SOP depth)

## What to replace or rewrite (execution killers)

1. **Strategic roadmap math**

- Plan doc has Phase 2 revenue $500M+ then Phase 3 $50M–$200M (incoherent).
- Replace with `../01_strategy/ROADMAP_12_24_MONTHS.md` for bootstrapped sequencing.

2. **Service catalog placeholders**

- Plan doc contains placeholder text pointing to `../../pricing/pricing_public.yaml` and inverted Care tier pricing.
- Replace public-facing offer content with `../03_offers/SERVICE_CATALOG_PUBLIC.md`.

3. **GTM focus mismatch**

- Plan doc 90-day plan emphasizes MSP lead magnets.
- Replace with `../02_go_to_market/90_DAY_EXECUTION_PLAN.md` and Reality Check outbound.

## What was missing from plan docs (now added)

- A product PRD for the webapp you need to build next (VSP).
- A tight offer ladder for website + CMS + portal packaging.
- Templates that enforce “no content, no launch.”

## How to use both together

- Keep the plan docs as the deep policy library.
- Use this suite as the **day-to-day execution pack** for sales + delivery + product build.
