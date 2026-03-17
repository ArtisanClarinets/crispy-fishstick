# Phase 20 Prompt - Architecture and Foundation

## Objective

Establish implementation architecture for the public site in `apps/web`.

## Required tasks

1. Define route filesystem plan for all required routes.
2. Enforce content adapter boundary and CMS abstraction.
3. Define server/client boundaries and caching behavior per route.
4. Define metadata contract for each route and dynamic route.
5. Establish secure form boundary strategy for conversion flows.

## Constraints

- No direct CMS SDK coupling in route components.
- No implementation in portal/admin/care apps.
- Keep public-safe boundary for content and security detail.

## Deliverables

- Architecture execution plan
- Route-to-component mapping baseline
- Content adapter and metadata contract notes

## Acceptance criteria

- Required routes are architected with clear rendering strategy.
- Dynamic routes have static/dynamic rationale.
- Foundation is ready for phased implementation without re-architecture.

## Verification commands

```bash
npm run lint --workspace web
npm run check-types --workspace web
```
