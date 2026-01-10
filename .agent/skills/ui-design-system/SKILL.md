---
name: ui-design-system
description: Guidelines for generating UI code that matches the "Engineered Hardware" aesthetic of Project SENTINEL.
---

# UI Design System

This skill defines the visual language and coding standards for the UI.
The aesthetic is "Engineered Hardware" / "Premium Interface".

## 1. Core Directives

*   **Component Library**: Use `components/ui/*.tsx` (shadcn/ui based) for all standard elements. Do not reinvent buttons, inputs, or cards.
*   **Font**: **JetBrains Mono** is used for technical data, code, and "system" feel. Inter (`var(--font-inter)`) is the primary sans-serif.
*   **Theme**: Support both Light and Dark modes. Use semantic colors (`bg-background`, `text-muted-foreground`).

## 2. Design Philosophy ("Engineered Hardware")

*   **Precision**: 1px borders, clear visual hierarchy.
*   **Glass**: Subtle transparency (`bg-background/80`, `backdrop-blur`) used for depth, not decoration.
*   **Grids**: Persistent background grids or distinct separators to evoke blueprints/schematics.
*   **Typography**: High contrast headers. Muted technical labels (uppercase, small tracking).

## 3. Motion (Framer Motion)

Animations must be "subtle and purposeful", avoiding layout thrash.

*   **Library**: `framer-motion`
*   **Timing Functions** (defined in `tailwind.config.ts`):
    *   `transition-precision`: `cubic-bezier(0.25, 1, 0.5, 1)`
    *   `transition-premium`: `cubic-bezier(0.22, 1, 0.36, 1)`
*   **Reduced Motion**: Always respect `prefers-reduced-motion`.

## 4. Accessibility (WCAG 2.2 AA)

*   **Contrast**: Ensure text meets contrast ratios (especially muted text).
*   **Focus**: Visible focus rings are mandatory for keyboard navigation.
*   **Targets**: Minimum touch target size (44x44px where possible).
*   **Semantic HTML**: Use proper heading levels and landmarks.

## 5. Tailwind Configuration

*   **Colors**: Use the extended palette in `tailwind.config.ts`:
    *   `surface-50`, `surface-100`, `surface-200` for depth.
    *   `hsl(var(--variable))` syntax is used.
*   **Spacing**: Standard Tailwind spacing.
*   **Animate**: `tailwindcss-animate` plugin is active.
