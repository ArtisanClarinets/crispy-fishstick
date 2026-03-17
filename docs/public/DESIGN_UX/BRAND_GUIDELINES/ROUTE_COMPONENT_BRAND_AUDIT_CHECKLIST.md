# Route and Component Brand Audit Checklist

Version: 1.0
Last updated: 2026-03-06
Scope: component-level brand audit mapped to exact `apps/public` route contract

## Route source of truth

- `../../CORE_SPECIFICATIONS/PUBLIC_WEBSITE_IMPLEMENTATION_SPEC.md`
- `../../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`

## Global component checks (all routes)

- [ ] `AppShell`: uses `var(--vantus-bg-canvas)` and `var(--vantus-text-primary)`.
- [ ] `SiteHeader`: logo usage follows `LOGO_USAGE.md`; nav typography uses heading token.
- [ ] `SiteFooter`: tokenized colors and border values only.
- [ ] `PrimaryCTAButton`: brand primary background and accent focus state.
- [ ] `SecondaryCTAButton`: tokenized border/text only.
- [ ] `FormField`, `FormLabel`, `FormHelpText`: tokenized text/border/focus styles.
- [ ] `ProofMetricCard` and `EvidenceBlock`: tokenized surfaces with consistent hierarchy.

## Route-to-component audit matrix

| Route                        | Required route components                                                                                                                | Brand checks                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/`                          | `HomeHero`, `HomeOfferSummaryGrid`, `HomeProofStrip`, `HomeCtaCluster`                                                                   | Hero contrast, heading font, CTA colors, proof card consistency              |
| `/services`                  | `ServicesHero`, `ServicesOfferCardGrid`, `ServicesCtaPanel`                                                                              | Offer card token usage, canonical CTA styling                                |
| `/services/[offerSlug]`      | `OfferHero`, `OfferScopeList`, `OfferOutcomeGrid`, `OfferCtaPanel`                                                                       | Component spacing rhythm, evidence-first style, consistent heading hierarchy |
| `/pricing`                   | `PricingHero`, `PricingOfferCards`, `InfrastructureRangeTable`, `AddOnModuleGrid`, `PricingLegalNote`, `PricingMetadataFooter`           | Tokenized pricing cards/table, no ad-hoc colors, legal note readability      |
| `/proof`                     | `ProofHero`, `ProofSummaryCardGrid`, `CaseStudyIndexGrid`                                                                                | Evidence card consistency and contrast                                       |
| `/proof/case-studies/[slug]` | `CaseStudyHero`, `CaseStudyProblemBlock`, `CaseStudyChangeBlock`, `CaseStudyEvidenceBlock`, `CaseStudyOutcomeBlock`, `CaseStudyCtaPanel` | Section hierarchy and proof formatting consistency                           |
| `/standards`                 | `StandardsHero`, `StandardsPrincipleGrid`, `StandardsCtaPanel`                                                                           | Clear tokenized section separation and heading rhythm                        |
| `/learn`                     | `LearnHero`, `LearnCollectionGrid`, `LearnCtaPanel`                                                                                      | Card consistency, readable body typography                                   |
| `/learn/[collection]/[slug]` | `LearnArticleHeader`, `LearnArticleBody`, `LearnArticleMeta`, `LearnArticleCtaPanel`                                                     | Long-form readability and tokenized inline elements                          |
| `/about`                     | `AboutHero`, `AboutPrinciplesGrid`, `AboutCtaPanel`                                                                                      | Brand tone, typography hierarchy, spacing consistency                        |
| `/contact`                   | `ContactHero`, `ContactForm`, `ContactTrustNote`                                                                                         | Form focus states, contrast, token-only controls                             |
| `/start-audit`               | `StartAuditHero`, `StartAuditForm`, `StartAuditExpectationNote`                                                                          | Conversion form consistency with contact route                               |
| `/status`                    | `StatusHero`, `StatusSummary`, `StatusHistoryList`                                                                                       | Neutral token usage and readable status indicators                           |
| `/legal/privacy`             | `LegalDocumentShell`, `LegalSectionNav`                                                                                                  | Body readability and accessible headings                                     |
| `/legal/terms`               | `LegalDocumentShell`, `LegalSectionNav`                                                                                                  | Body readability and accessible headings                                     |
| `/legal/cookies`             | `LegalDocumentShell`, `LegalSectionNav`                                                                                                  | Body readability and accessible headings                                     |

## Per-component pass criteria

For each route component above:

- [ ] Uses `var(--vantus-...)` tokens only for color and font families.
- [ ] Uses heading/body font stacks from `VANTUS_BRAND_TOKENS.css`.
- [ ] Uses spacing/radius/motion token values consistently.
- [ ] Keeps copy tone aligned to `VS-COM-201` (plain, precise, proof-forward).
- [ ] Keeps CTA treatment consistent (primary vs secondary).

## Fail conditions

- Any hardcoded `#HEX` value in route component styling outside token source files.
- Any hardcoded font-family literal in route component styling outside token source files.
- Any route rendering with inconsistent logo treatment.
- Any route-level component drifting from defined CTA visual behavior.
