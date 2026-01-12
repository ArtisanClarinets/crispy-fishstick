## 📘 **PRD_DE1.md — Product Requirements Document: “Design Engineering” Page**

**Product Area:** Public Experience → `/design-engineering`
**Version:** 1.0 (2026-01-12)
**Owner:** Vantus Systems / Public Experience Squad

---

### 1. Purpose

The “Design Engineering” page extends the public narrative by translating the homepage’s technical philosophy into a dedicated surface focused on design system methodology.
Goal: demonstrate that *design at Vantus Systems is an engineering discipline*, not visual decoration.

---

### 2. Objectives

* Convey trust through **systemic design language** (atomic principles, accessibility, consistency).
* Showcase the technical rigor behind design decisions.
* Provide prospective clients a clear path to engage (“Book a Consultation”).
* Reinforce the Vantus Systems promise of measurable, verifiable outcomes.

---

### 3. Success Criteria

| Metric         | Target          |
| -------------- | --------------- |
| LCP            | ≤ 2.5 s         |
| INP            | ≤ 200 ms        |
| CLS            | ≤ 0.1           |
| WCAG           | AA compliant    |
| CTA Conversion | ≥ 5 % of visits |

---

### 4. Scope

**In scope**

* New route `/design-engineering` (Next.js App Router).
* Server component for SEO + structured data.
* Client modules for animations and interaction demos.
* MDX integration for case study text.
* Reuse existing motion and typography primitives.

**Out of scope**

* Admin editing UI (for future CMS hook).
* Multi-language localization (v2).

---

### 5. Architecture & Structure

```
/app/design-engineering/
 ├─ page.tsx                → top-level route
 ├─ components/
 │   ├─ HeroSection.tsx
 │   ├─ PhilosophySection.tsx
 │   ├─ StackSection.tsx
 │   ├─ ProcessSection.tsx
 │   ├─ CaseStudySection.tsx
 │   └─ InteractiveDemo.tsx
 ├─ data/
 │   └─ copy.design-engineering.json
 ├─ assets/
 │   ├─ figma-to-react.svg
 │   ├─ before-after-slider.mp4
 │   └─ fintech-dashboard.webp
 └─ styles/
     └─ design-engineering.module.css
```

---

### 6. Functional Requirements

| Section        | Behavior                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Hero**       | Dynamic motion graphic (Figma node → React component). Gracefully fallbacks to static SVG. |
| **Philosophy** | Three-column responsive layout; hover states reveal deeper copy.                           |
| **Stack**      | Animated tool logos (Figma, Storybook, Rive, Framer Motion).                               |
| **Process**    | Timeline animation using motion variants from `/lib/motion`.                               |
| **Case Study** | MDX import; before/after slider with accessible drag handle.                               |
| **CTA**        | Reuses global `<ContactCTA/>` component.                                                   |

---

### 7. Non-Functional Requirements

* Uses server components for text sections.
* Interactive elements hydrated via client boundaries.
* Honors `prefers-reduced-motion`.
* Zero third-party scripts.
* Deployed behind standard CSP and HSTS.

---

### 8. Dependencies

* Existing Design System tokens (`/lib/tokens.ts`).
* Motion variants (`/lib/motion/presets.ts`).
* Shared CTA (`components/cta/BookConsultation.tsx`).
* MDX compiler pipeline (see `next.config.mjs`).

---

### 9. Deliverables

* `/app/design-engineering/page.tsx`
* Component set (see details file)
* Asset bundle optimized via next/image
* Updated navigation link
* Documentation entry in `docs/site-map.md`

---

### 10. Acceptance Criteria

* Builds and lints with zero errors.
* All motion passes accessibility review.
* Copy matches `copy_DE1.md`.
* Verified proof artifact: `lighthouse-design-engineering-proof.json`.
