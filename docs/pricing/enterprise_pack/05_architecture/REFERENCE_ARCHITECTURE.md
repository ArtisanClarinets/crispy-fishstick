# Reference Architecture — Vantus Seed (Reusable Baseline)

> **Strategy:** Option A — Gulf Coast Leader
> Purpose: Internal delivery platform, NOT a SaaS product

**Version:** 1.1
**Date:** 2026-03-15

## Goal

Ship “enterprise-grade for small business” repeatedly.

## Core idea

A single hardened baseline repo (Vantus Seed) with optional modules:

- CMS
- portal auth
- integrations
- deployment templates
- proof artifact generator

## Default stack

- Next.js 16 + TypeScript
- Tailwind + shadcn/ui
- Postgres + Prisma
- Auth (NextAuth or equivalent)
- Zod boundary validation
- NGINX reverse proxy
- Docker deployment

## Modules

1. Website module: pages, SEO scaffolding, analytics
2. CMS module: content types + editorial workflow
3. Portal module: auth + RBAC + audit log
4. Integrations module: webhook + queues
5. Ops module: health checks + monitoring hooks

## Reuse rules

- Every client starts from Seed.
- Client customizations happen via modules and configuration.
- One-off custom features must be promoted into a module or explicitly labeled “one-off.”

## Proof artifacts

Every build must produce:

- Lighthouse report
- accessibility report
- security headers report
- deployment runbook
