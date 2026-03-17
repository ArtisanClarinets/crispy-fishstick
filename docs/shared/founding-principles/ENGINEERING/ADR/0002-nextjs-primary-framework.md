# ADR-0002: Next.js 16 as Primary Frontend Framework

**Document ID:** ADR-0002  
**Status:** Accepted  
**Date:** 2026-01-20  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus web applications  
**Stakeholders:** Frontend engineers, full-stack engineers  

---

## Summary

### Problem Statement
We need a frontend framework that supports our "Client-Owned Infrastructure" philosophy — self-hosted, high-performance, and maintainable long-term without vendor lock-in.

### Decision
We standardize on **Next.js 16** with React 19 as our primary frontend framework for all web applications.

### Impact
High — affects technology choices, hiring, training, and all frontend development.

---

## Context

### Background
Our clients need fast, secure, SEO-friendly websites they can host anywhere. We need a framework that supports server-side rendering, static generation, and API routes in a single codebase.

### Goals
- Excellent performance (Core Web Vitals).
- SEO-friendly (server-side rendering).
- Single codebase for frontend and API.
- Strong TypeScript support.
- Large talent pool for hiring.
- Self-hostable (no platform lock-in).

### Constraints
- Must work with FSD architecture.
- Must support our security baseline.
- Must allow self-hosting on standard VPS.
- Must have active maintenance and community.

---

## Decision

### What We Decided
All Vantus web applications use Next.js 16 with the App Router.

**Key Configuration:**
- App Router (not Pages Router).
- React Server Components by default.
- Server Actions for mutations.
- Static export or Node.js self-hosting.

### Why This Decision

| Factor | How Next.js Addresses It |
|--------|-------------------------|
| **Performance** | Server Components reduce client JS. |
| **SEO** | Server-side rendering out of the box. |
| **Developer Experience** | Excellent TypeScript support, fast refresh. |
| **Hiring** | Large talent pool knows React/Next.js. |
| **Self-hosting** | Can deploy to any Node.js host. |
| **Future-proof** | Backed by Vercel, actively developed. |

---

## Options Considered

### Option 1: Next.js 16

**Description:** React framework with App Router, Server Components, and API routes.

**Pros:**
- Industry standard for React apps.
- Excellent performance features.
- Strong ecosystem.
- Great documentation.

**Cons:**
- Vercel-specific features can create lock-in (we avoid these).
- Frequent updates require maintenance.
- Learning curve for Server Components.

**Verdict:** Selected

---

### Option 2: Astro

**Description:** Static site builder with partial hydration.

**Pros:**
- Excellent performance (zero JS by default).
- Great for content sites.
- Flexible framework support.

**Cons:**
- Smaller ecosystem.
- Less familiar to most developers.
- API routes less mature.

**Verdict:** Rejected — not as suitable for complex applications.

---

### Option 3: Remix

**Description:** Full-stack React framework focusing on web standards.

**Pros:**
- Excellent form handling.
- Strong on web standards.
- Now backed by Shopify.

**Cons:**
- Smaller community than Next.js.
- Fewer hosting options.
- Less mature Server Components support.

**Verdict:** Rejected — Next.js has stronger ecosystem and self-hosting options.

---

### Option 4: SvelteKit

**Description:** Full-stack framework using Svelte.

**Pros:**
- Excellent performance.
- Smaller bundle sizes.
- Great developer experience.

**Cons:**
- Smaller talent pool (harder to hire).
- Different paradigm from React.
- Less ecosystem maturity.

**Verdict:** Rejected — hiring pool too small for our growth plans.

---

## Consequences

### Positive
- Consistent framework across all projects.
- Access to latest React features (Server Components, Actions).
- Strong hiring pipeline.
- Excellent documentation for onboarding.

### Negative
- Must stay current with frequent updates.
- Need to train team on Server Components pattern.
- Some Vercel-specific features are tempting but off-limits.

### Neutral / Changes Required
- Update all projects to Next.js 16.
- Create internal Next.js best practices guide.
- Set up automated dependency updates.

---

## Implementation Plan

### Phase 1: New Projects
- **Deliverable:** All new web apps use Next.js 16.
- **Owner:** All frontend engineers.
- **Timeline:** Immediate (2026-01-20).

### Phase 2: Upgrade Existing Projects
- **Deliverable:** Legacy projects upgraded to Next.js 16.
- **Owner:** Project leads.
- **Timeline:** Complete by 2026-06-30.

### Phase 3: Tooling
- **Deliverable:** Standardized Next.js starter template.
- **Owner:** Platform team.
- **Timeline:** 2026-03-31.

---

## Rollback Plan

### When to Rollback
If Next.js changes direction fundamentally or becomes unstable.

### How to Rollback
1. Freeze new Next.js projects.
2. Evaluate alternative frameworks.
3. Create migration guide.
4. Migrate projects incrementally.

---

## Monitoring and Review

### Success Metrics
- All new projects use Next.js 16+.
- Lighthouse scores 95+ on all projects.
- Developer satisfaction remains high.

### Review Schedule
- **Initial review:** 2026-04-20 (90 days).
- **Regular review:** Annually.

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js 16 Announcement](https://nextjs.org/blog)
- [Next.js Self-Hosting](https://nextjs.org/docs/app/building-your-application/deploying#self-hosting)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-01-20 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-20 | Dylan Thompson | Initial acceptance |
| 1.1 | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |

[End of ADR-0002]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
