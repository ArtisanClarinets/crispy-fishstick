# Vantus Systems — Public Website PRD

**Project:** Vantus Systems Engineering Studio
**Codename:** Project CRISPY FISHSTICK
**Document Type:** Product Requirements Document (Public-Facing Front End)
**Status:** Live v2.0
**Owner:** Dylan Thompson

---

## 0. Executive Summary
Vantus Systems is a specialized engineering studio for founders who demand production-grade quality. The public website serves as a high-trust entry point for enterprise clients, demonstrating technical rigor through its own implementation. The site emphasizes clarity, performance, and engineering precision.

---

## 1. Goals

### 1.1 Business Goals
1.  **High-Ticket Conversion**: Qualify and convert high-value leads for engineering consultations.
2.  **Brand Authority**: Demonstrate "Apple-caliber" engineering quality through the site's own UX/UI.
3.  **Trust Building**: Use transparent pricing/process models (e.g., "Build Plan Module") to reduce sales friction.

### 1.2 User Goals
1.  **Immediate Understanding**: "What do you do?" answered in < 5 seconds via the Hero section.
2.  **Verification**: Confirm technical capability through detailed case studies and "Engineering Rigor" sections.
3.  **Action**: Easily book a consultation or request a "60-second audit".

---

## 2. Core Features & Functionality

### 2.1 Homepage Hero
-   **Interactive Background**: Mouse-tracking grid effect (`HeroBackground`) to suggest precision and technical depth.
-   **Value Proposition**: Clear tagline "Transparent. Predictable. Done." with calibration animation.
-   **Primary CTA**: "Get a 60-second audit" modal trigger.
-   **Secondary CTA**: "See real outcomes" link to work.

### 2.2 60-Second Audit Modal (`AuditModal`)
-   **Interactive Questionnaire**: Multi-step wizard asking about goals, current site status, pain points, and timeline.
-   **Real-time Analysis**: Simulated analysis step with loading animation.
-   **Dynamic Recommendations**: Generates tailored advice based on inputs (e.g., "Likely Conversion Leak", "First Best Fix").
-   **Engagement Suggestion**: Proposes specific engagement types (e.g., "High-Performance Rebuild").

### 2.3 Build Plan Module (`BuildPlanModule`)
-   **Process Visualization**: Interactive tabs showing the engineering phases.
-   **Step-by-Step Transparency**: Demystifies the engagement process for non-technical founders.

### 2.4 Featured Work (`CoverArt`)
-   **Generative Art**: Unique, procedurally generated cover art for case studies.
-   **Staggered Animation**: List items reveal sequentially (`Stagger`, `StaggerItem`).
-   **Detailed Metrics**: Focus on quantitative outcomes (e.g., "100% data integrity").

---

## 3. Technical Requirements

### 3.1 Stack
-   **Framework**: Next.js App Router
-   **Styling**: Tailwind CSS with custom "Vantus" theme tokens.
-   **Animation**: Framer Motion (heavy use of `useInView`, `useScroll`, `AnimatePresence`).
-   **Icons**: Lucide React.
-   **UI Primitives**: Radix UI (Dialog, Slot).

### 3.2 Performance
-   **Lighthouse Score**: Target 95+ on Performance, Accessibility, Best Practices, SEO.
-   **Optimizations**:
    -   `useMemo` for expensive generative art calculations.
    -   `will-change` properties for smooth animations.
    -   Dynamic imports for heavy components if needed.

---

## 4. Theme & Design System

### 4.1 Visual Identity
-   **Typography**: Clean, sans-serif system font stack.
-   **Colors**: High-contrast monochrome (Slate/Zinc) with subtle primary accents.
-   **Radius**: Consistent `0.75rem` border radius.

### 4.2 Motion Design
-   **"Ease Precision"**: Custom cubic-bezier for snappy yet smooth interactions.
-   **Micro-interactions**: Hover lifts, glow effects, staggered reveals.

---

## 5. Migration Guide
Refer to `MIGRATION.md` for details on updating from the legacy Vantus System to the new Vantus Systems identity.
