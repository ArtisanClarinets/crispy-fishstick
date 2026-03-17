# Public Site Map

**Version:** 2.1
**Last updated:** 2026-03-08
**Scope:** Anonymous public routes for `apps/web`

## System routes

- `/robots.txt`
- `/sitemap.xml`

## Core routes

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

## Legal routes

- `/legal/privacy`
- `/legal/terms`
- `/legal/cookies`

## Route policy

- This file is the public routing source of truth for docs under `public/`.
- No admin or portal routes are documented here.
- Offer slugs in `/services/[offerSlug]` must map to current public offer keys and pricing content.
- Care does not appear here as a primary service lane.

## Offer slug contract

- `website-rebuild` - Website Rebuild
- `website-plus-cms` - Website + CMS
- `website-plus-portal` - Website + Business Portal

## Cross-references

- Admin routes: `../../admin/CORE_SPECIFICATIONS/ADMIN_SITE_MAP.md`
- Portal routes: `../../portal/CORE_SPECIFICATIONS/PORTAL.SITE_MAP.md`
- Repo tree: `../../MASTER_DIRECTORY_TREE.md`
