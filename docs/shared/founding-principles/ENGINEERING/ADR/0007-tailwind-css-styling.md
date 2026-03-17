# ADR-0007: Tailwind CSS as Styling Standard

**Document ID:** ADR-0007  
**Status:** Accepted  
**Date:** 2026-02-02  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus frontend applications  
**Stakeholders:** Frontend engineers, designers

---

## Summary

### Problem Statement

We need a consistent, maintainable approach to styling that scales with our team and supports rapid development without creating CSS maintenance nightmares.

### Decision

We standardize on **Tailwind CSS** as our styling solution for all frontend applications.

### Impact

Medium — affects how all UI is built and how designers collaborate with engineers.

---

## Context

### Background

CSS can become a maintenance burden without discipline. We need a system that:

- Prevents style conflicts and specificity wars
- Encourages consistency in design
- Enables rapid prototyping
- Works with component-based architecture

### Goals

- Consistent styling across all applications
- Reduced CSS bundle sizes
- Rapid development without writing custom CSS
- Easy to maintain and refactor
- Works with React/Next.js

### Constraints

- Must work with Next.js 16
- Must support dark mode
- Must be customizable for client branding
- Must have good developer experience

---

## Decision

### What We Decided

All Vantus applications use Tailwind CSS for styling.

**Configuration:**

- Tailwind CSS v4+
- Custom theme extending Vantus design system
- Dark mode support (class-based)
- PurgeCSS enabled for production

### Why This Decision

| Factor                | How Tailwind Addresses It                 |
| --------------------- | ----------------------------------------- |
| **Consistency**       | Utility classes enforce design system     |
| **Maintainability**   | No custom CSS to maintain                 |
| **Performance**       | PurgeCSS removes unused styles            |
| **Development speed** | Rapid styling without context switching   |
| **Refactoring**       | Easy to change styles globally via config |

---

## Options Considered

### Option 1: Tailwind CSS

**Description:** Utility-first CSS framework.

**Pros:**

- Rapid development
- Consistent design system
  n- Small bundle sizes (with purge)
- Great documentation
- Strong community

**Cons:**

- HTML can get verbose with many classes
- Learning curve for traditional CSS developers
- Can be misused (inline styles via classes)

**Verdict:** Selected

---

### Option 2: CSS Modules

**Description:** Scoped CSS files per component.

**Pros:**

- Standard CSS syntax
- No build step complexity
- Scoped by default (no conflicts)

**Cons:**

- Still requires discipline to maintain consistency
- Harder to enforce design system
- More context switching (CSS ↔ JS files)

**Verdict:** Rejected — harder to maintain consistency at scale.

---

### Option 3: Styled Components / Emotion

**Description:** CSS-in-JS libraries.

**Pros:**

- JavaScript logic in styles
- Scoped by default
- Popular in React ecosystem

**Cons:**

- Runtime overhead
- Larger bundle sizes
- More complex tooling
- Harder to extract critical CSS

**Verdict:** Rejected — prefer zero-runtime solutions.

---

### Option 4: Vanilla CSS / SCSS

**Description:** Traditional CSS with preprocessing.

**Pros:**

- No learning curve
- Maximum flexibility
- Full CSS feature set

**Cons:**

- Easy to create inconsistencies
- Specificity wars
- Hard to maintain at scale
- No built-in design system enforcement

**Verdict:** Rejected — too much maintenance burden.

---

## Consequences

### Positive

- Consistent styling across all projects
- Faster development
- Smaller CSS bundles
- Easy to implement design system

### Negative

- Engineers must learn Tailwind conventions
- HTML can become class-heavy
- Requires discipline to avoid anti-patterns

### Neutral / Changes Required

- Update project templates with Tailwind config
- Create design system tokens (colors, spacing, etc.)
- Document Tailwind usage guidelines

---

## Implementation Plan

### Phase 1: New Projects

- **Deliverable:** All new projects use Tailwind.
- **Owner:** All frontend engineers.
- **Timeline:** Immediate (2026-02-02).

### Phase 2: Design System

- **Deliverable:** Tailwind config with Vantus design tokens.
- **Owner:** Design + Engineering.
- **Timeline:** 2026-02-28.

### Phase 3: Documentation

- **Deliverable:** Tailwind usage guide.
- **Owner:** Engineering.
- **Timeline:** 2026-03-15.

---

## Rollback Plan

### When to Rollback

If Tailwind creates performance issues or team resistance is overwhelming.

### How to Rollback

1. Gradually migrate to alternative (CSS Modules likely).
2. Extract design tokens to shared variables.
3. Update components incrementally.

---

## Monitoring and Review

### Success Metrics

- All new projects on Tailwind.
- CSS bundle sizes < 10KB gzipped.
- Developer satisfaction with styling workflow.

### Review Schedule

- **Initial review:** 2026-05-02 (90 days).
- **Regular review:** Annually.

---

## References

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- Website experience guidance in the corresponding public design docs

---

## Approval

| Role               | Name           | Date       | Signature |
| ------------------ | -------------- | ---------- | --------- |
| **Decision Owner** | Dylan Thompson | 2026-02-02 | ✓         |

---

## Change Log

| Version | Date       | Author         | Changes            |
| ------- | ---------- | -------------- | ------------------ |
| 1.0     | 2026-02-02 | Dylan Thompson | Initial acceptance |

[End of ADR-0007]
