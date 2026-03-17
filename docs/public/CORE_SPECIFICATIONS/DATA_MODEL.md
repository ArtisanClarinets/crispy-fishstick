# Public Website Data Model

Version: 2.0
Last updated: 2026-03-06
Scope: public-site content and conversion data only

## Public content entities

- `Page`
  - `slug`, `title`, `summary`, `status`, `updatedAt`
- `Offer`
  - `slug`, `name`, `positioning`, `includes`, `cta`
- `CaseStudy`
  - `slug`, `industry`, `problem`, `approach`, `evidence`, `outcome`
- `LearningItem`
  - `collection`, `slug`, `title`, `summary`, `body`, `updatedAt`

## Public pricing entities

- `PublicOfferPrice`
  - `offerKey`, `startingAtUsd`, `typicalRangeUsd`
- `PublicInfrastructurePrice`
  - `itemKey`, `typicalRangeUsd`
- `PublicAddonPrice`
  - `itemKey`, `typicalRangeUsd`

Source of truth: `../../pricing/pricing_public.yaml` (v2.0).

## Conversion entities

- `LeadSubmission`
  - `name`, `email`, `company`, `message`, `sourcePath`, `submittedAt`
- `LeadQualification`
  - `needType`, `timeline`, `budgetBand`

These entities are validated server-side and stored through backend services.

## Public-safe constraints

- No secrets in public model docs.
- No admin-only or portal-only schema details.
- No internal credential or token field names.

For internal schema and operational fields, use internal engineering references.
