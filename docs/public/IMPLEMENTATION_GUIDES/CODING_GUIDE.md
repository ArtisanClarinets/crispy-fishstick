# Coding Guide (Public Website)

Version: 2.1
Last updated: 2026-03-15
Scope: coding standards for `apps/public`

> **Strategic Context:** Option A — Gulf Coast Leader. This public site targets Gulf Coast SMBs. No platform/SaaS language. Service business model only.

## Core implementation rules

- Public route contract must match `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.
- Pricing components must consume data from `../../pricing/pricing_public.yaml` only.
- Offer framing must remain consistent with `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.
- CMS integration must follow Content Adapter boundaries from ADR-0001.
- Global stylesheet integration must follow `APPS_PUBLIC_GLOBAL_STYLES_CONVENTION.md`.

## Data and rendering rules

- Parse external data at boundaries and keep internal state typed.
- Prefer server components; use client components only when interaction requires it.
- Fail fast on invalid content data and return safe fallback UI.

## Security and quality rules

- Validate form input server-side.
- Enforce anti-abuse controls on submission routes.
- Keep accessibility and performance checks in release criteria.
- Never embed internal credentials, infrastructure internals, or sensitive ops details.
- Use `../../pricing/pricing_ops.yaml` for internal policy decisions, but do not expose its detailed controls in public route copy.
- Do not hardcode color hex values or font-family literals outside brand token source files.

## Required references before pricing edits

- `../../pricing/pricing_public.yaml`
- `APPS_PUBLIC_PRICING_PAGE_CONTENT.md`
- `APPS_PUBLIC_PRICING_COMPONENT_MODEL.ts`
- `APPS_PUBLIC_GLOBAL_STYLES_CONVENTION.md`

## Forbidden patterns (Option A alignment)

Do NOT include in public-facing code:

- ❌ "Platform," "SaaS," "self-serve," "AI-powered automation"
- ❌ National/global expansion language
- ❌ Multi-tenant architecture references
- ❌ Series A/B/C or VC narrative
- ✅ Use: "We deliver," "Our team implements," "Project-based"
