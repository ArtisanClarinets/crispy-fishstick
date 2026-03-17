# ADR-0001: CMS Choice for Vantus Seed
**Status:** Accepted
**Date:** 2026-03-05

## Decision
Use **Payload CMS (self-hosted, TypeScript-first)** as the default CMS for Vantus Seed.

We will implement the CMS behind an internal **Content Adapter** interface so we can:
- swap CMS providers later (including SaaS), and
- support different CMS choices per-client when enterprise constraints require it.

## Context
Vantus’s core promise is **ownership + proof**:
- clients must own content and data,
- editing must be usable by non-technical staff,
- publishing must support draft/review/rollback,
- the system must integrate cleanly with Next.js 16.

Bootstrapped constraint: we need a CMS that ships quickly **without vendor lock-in** and without “hand-rolled CMS” risk.

## Options considered
### 1) Git-based CMS (Markdown + Git-backed editor)
**When it’s good:** tiny sites, technical editors, low change frequency.

**Pros**
- simplest infra
- cheap
- portable content

**Cons (dealbreakers for your core offer)**
- non-technical editors struggle
- no robust workflows (draft/review)
- permissions are coarse

**Verdict:** keep as an **optional mode** for ultra-small clients, not the default.

### 2) Headless SaaS CMS (Sanity/Contentful/etc.)
**Pros**
- excellent editor UX
- enterprise features (collab, SLA, SSO) available

**Cons**
- vendor dependency and pricing drift risk
- harder “client owns everything” story

**Verdict:** allow as an **enterprise exception**, not your default.

### 3) Self-hosted headless CMS (Payload / Strapi / Directus)
**Pros**
- ownership aligned
- flexible
- predictable costs (hosting + labor)

**Cons**
- you must run updates/backups/security patches

**Verdict:** best match for Vantus.

## Why Payload specifically
Payload is a strong fit because:
- It is **TypeScript-first** and “code-defined,” matching your Next.js/TS stack.
- It supports drafts/versions and granular access controls.
- It integrates tightly with Next.js and can run alongside your app.

(Primary references: Payload GitHub docs and project description.)

## Implementation decision
### Default architecture (bootstrapped + scalable)
- **Monorepo** (turborepo):
  - `apps/public` (marketing site)
  - `apps/admin` (VSP-lite / internal ops)
  - `apps/portal` (client-facing view, later)
  - `apps/care` (care.vantus.systems, later)
  - `packages/content` (Content Adapter interface + shared types)
  - `packages/db` (Prisma schema shared where appropriate)

### Content Adapter interface (future-proofing)
Create a minimal interface that all frontends use:
- `getPage(slug)`
- `listPages(type)`
- `getGlobals()`
- `previewToken()` (optional)

Payload becomes one implementation (`payloadAdapter`).
A SaaS CMS becomes another (`sanityAdapter`, etc.)

### Operational guardrails
- Daily DB backups.
- Media stored in object storage (S3/R2) once you cross “single server” risk.
- “last verified” metadata for pricing and key marketing claims.

## Consequences
**Positive**
- You can sell “CMS + ownership” immediately.
- Your stack stays TypeScript-native.
- You avoid building a custom CMS.

**Negative**
- You accept CMS operations work (patches, backups, upgrades).

## When we will revisit this decision
Revisit if either becomes true:
1) a client requires SaaS CMS + SSO + SLA, or
2) your ops capacity becomes the bottleneck.
