# Route Contract and Route-Level Requirements

## Required routes

- `/`
- `/services`
- `/services/[offerSlug]`
- `/pricing`
- `/proof`
- `/proof/case-studies/[slug]`
- `/standards`
- `/learn`
- `/learn/[collection]/[slug]`
- `/about`
- `/contact`
- `/start-audit`
- `/status`
- `/legal/privacy`
- `/legal/terms`
- `/legal/cookies`
- System routes for robots and sitemap

## Service slug contract

- `website-rebuild`
- `website-plus-cms`
- `website-plus-portal`

## Route-level component requirements

Follow `../DESIGN_UX/BRAND_GUIDELINES/ROUTE_COMPONENT_BRAND_AUDIT_CHECKLIST.md` for route-to-component mapping.

### Minimum route expectations

- Home: positioning hero, offer summary, proof strip, CTA cluster.
- Services hub: offer cards and canonical links.
- Offer detail pages: clear scope, outcomes, CTA, evidence-backed structure.
- Pricing: canonical values, legal note, metadata footer.
- Proof and case studies: problem, change, evidence, outcome pattern.
- Contact and start-audit: robust form UX, clear errors, anti-abuse controls.
- Legal routes: readable hierarchy and accessible document structure.

## Acceptance criteria

- Every required route renders and is linked properly.
- No required route is missing from sitemap and metadata workflows.
- No out-of-scope route is implemented as production feature work.
