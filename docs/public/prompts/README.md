# Public Build Prompt Package

Version: 1.0
Last updated: 2026-03-06
Scope: orchestration prompts to build the public site in `apps/web`

## Purpose

This directory contains complete prompts for a main orchestration agent to plan, delegate, implement, verify, and launch the public website with production-grade quality.

## Execution order

1. `00_MAIN_ORCHESTRATOR_SYSTEM_PROMPT.md`
2. `01_SUBAGENT_ROSTER_AND_PHASE_SKILLS.md`
3. `02_GLOBAL_GUARDRAILS_AND_ANTI_DRIFT.md`
4. `03_ROUTE_CONTRACT_AND_ROUTE_LEVEL_REQUIREMENTS.md`
5. `10_PHASE_DISCOVERY_ALIGNMENT.md`
6. `20_PHASE_ARCHITECTURE_FOUNDATION.md`
7. `30_PHASE_VISUAL_SYSTEM_RESPONSIVE_MOBILE.md`
8. `40_PHASE_IMPLEMENTATION_ROUTE_WAVES.md`
9. `50_PHASE_HARDENING_SECURITY_PERF_A11Y_SEO_OBSERVABILITY.md`
10. `60_PHASE_QA_RELEASE_READINESS.md`
11. `70_PHASE_LAUNCH_HANDOFF.md`
12. Appendices under `appendix/`

## Hard boundary

- Build target: `apps/web`
- Non-target apps: `apps/portal`, `apps/admin`, `apps/care`
- Shared package changes are allowed only when directly required by `apps/web` and must be justified in writing.

## Canonical source priority

1. `../CORE_SPECIFICATIONS/PUBLIC_WEBSITE_IMPLEMENTATION_SPEC.md`
2. `../CORE_SPECIFICATIONS/PUBLIC.PRD.md`
3. `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`
4. `../../pricing/pricing_public.yaml`
5. `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`
6. `../IMPLEMENTATION_GUIDES/APPS_PUBLIC_PRICING_PAGE_CONTENT.md`
7. `public/DESIGN_UX/BRAND_GUIDELINES/*`

## Completion definition

- Visually exceptional, not generic.
- Fully responsive desktop, tablet, mobile.
- Mobile feels native-app-like while remaining web-first.
- Security, performance, accessibility, SEO, observability, testing, and release checks pass.
