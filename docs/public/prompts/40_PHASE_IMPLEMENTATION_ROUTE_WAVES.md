# Phase 40 Prompt - Route Implementation Waves

## Objective

Implement full public route contract in controlled waves in `apps/web`.

## Wave plan

1. Wave A: `/`, `/services`, `/services/[offerSlug]`
2. Wave B: `/pricing`, `/proof`, `/proof/case-studies/[slug]`
3. Wave C: `/standards`, `/learn`, `/learn/[collection]/[slug]`
4. Wave D: `/about`, `/contact`, `/start-audit`, `/status`
5. Wave E: legal and system route finishing work

## Pricing route requirements

- Use canonical values only from `../../pricing/pricing_public.yaml`.
- Keep no-care scope for this release.
- Include required legal note and metadata footer.

## Deliverables per wave

- Implemented routes list
- Components completed
- Open issues and blockers
- Verification evidence

## Acceptance criteria

- All required routes render and link correctly.
- Offer slug contract is exact.
- Pricing data/copy integrity is exact.
- No scope spillover into non-public apps.

## Verification commands

```bash
npm run lint --workspace web
npm run check-types --workspace web
npm run build --workspace web
```
