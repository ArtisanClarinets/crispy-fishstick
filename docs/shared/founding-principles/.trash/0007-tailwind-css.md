# ADR-0007: Tailwind CSS for Styling

**Document ID:** ADR-0007  
**Status:** Accepted  
**Date:** 2026-02-03  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus frontend applications  
**Stakeholders:** Frontend engineers, designers  

---

## Summary

### Problem Statement
CSS architecture can become messy and inconsistent. We need a styling approach that is maintainable, consistent, and fast to develop with.

### Decision
We use **Tailwind CSS** as our standard styling solution for all frontend applications.

### Impact
Medium-High — affects how all UI is built and maintained.

---

## Context

### Background
Styling approaches range from inline styles to CSS-in-JS to utility classes. We need an approach that:
- Maintains consistency across the application.
- Is fast to develop with.
- Produces small CSS bundles.
- Works with React/Next.js.
- Is easy to maintain.

### Goals
- Consistent design system implementation.
- Small CSS bundle sizes.
- Fast development iteration.
- No runtime CSS overhead.
- Easy to customize for client branding.

### Constraints
- Must work with Next.js.
- Must support theming (light/dark modes).
- Must be maintainable by small teams.

---

## Decision

### What We Decided
All Vantus applications use Tailwind CSS for styling.

**Configuration:**
- Default Tailwind configuration extended for our design system.
- Custom colors matching Vantus brand (Navy, Gold).
- Typography plugin for consistent fonts.
- Forms plugin for form element styling.

### Why This Decision

| Factor | How Tailwind Addresses It |
|--------|--------------------------|
| **Consistency** | Utility classes enforce design system. |
| **Bundle size** | PurgeCSS removes unused styles automatically. |
| **Development speed** | No switching between files for styles. |
| **Maintainability** | No CSS specificity wars. |
| **Customization** | Easy to override for client branding. |

---

## Options Considered

### Option 1: Tailwind CSS

**Description:** Utility-first CSS framework.

**Pros:**
- Rapid development.
- Small bundle sizes (tree-shaking).
- No runtime overhead.
- Excellent documentation.
- Huge ecosystem.

**Cons:**
- HTML can become verbose with many classes.
- Learning curve for utility class naming.
- Can be hard to read for complex components.

**Verdict:** Selected

---

### Option 2: CSS Modules

**Description:** Scoped CSS files co-located with components.

**Pros:**
- Native to CSS.
- Scoped to components.
- No build configuration needed.

**Cons:**
- No built-in design system.
- Class name collisions possible.
- Harder to maintain consistency.

**Verdict:** Rejected — Tailwind provides more value.

---

### Option 3: Styled Components / Emotion

**Description:** CSS-in-JS libraries.

**Pros:**
- Dynamic styles based on props.
- Scoped to components.
- Familiar to many React developers.

**Cons:**
- Runtime overhead (performance cost).
- Larger bundle sizes.
- Server rendering complexity.

**Verdict:** Rejected — runtime overhead unacceptable for performance targets.

---

### Option 4: Sass / SCSS

**Description:** CSS preprocessor with variables, nesting, mixins.

**Pros:**
- Mature and stable.
- Powerful features.
- Industry standard.

**Cons:**
- Requires build step configuration.
- No built-in utility classes.
- Can lead to bloated CSS if not careful.

**Verdict:** Rejected — Tailwind provides more out of the box.

---

## Consequences

### Positive
- Consistent styling across all projects.
- Faster development time.
- Smaller CSS bundles.
- Easy to customize for client branding.

### Negative
- HTML verbosity (mitigated by component extraction).
- Team must learn utility class conventions.
- Some designers prefer traditional CSS.

### Neutral / Changes Required
- Add Tailwind to all projects.
- Create component library with common patterns.
- Document Tailwind conventions.

---

## Implementation Plan

### Phase 1: New Projects
- **Deliverable:** All new projects use Tailwind.
- **Owner:** All frontend engineers.
- **Timeline:** Immediate (2026-02-03).

### Phase 2: Component Library
- **Deliverable:** Shared UI component library built with Tailwind.
- **Owner:** Platform team.
- **Timeline:** 2026-04-01.

### Phase 3: Customization
- **Deliverable:** Client theming system documented.
- **Owner:** Design team.
- **Timeline:** 2026-05-01.

---

## Rollback Plan

### When to Rollback
If Tailwind becomes unmaintained or significantly worse alternative emerges.

### How to Rollback
1. Document all custom classes used.
2. Generate CSS from Tailwind classes.
3. Refactor to alternative approach.

---

## Monitoring and Review

### Success Metrics
- All projects using Tailwind.
- CSS bundle sizes < 10KB (gzipped).
- Developer satisfaction with styling workflow.

### Review Schedule
- **Initial review:** 2026-05-03 (90 days).
- **Regular review:** Annually.

---

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Design System](/docs/design-system.md)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-02-03 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-03 | Dylan Thompson | Initial acceptance |

[End of ADR-0007]
