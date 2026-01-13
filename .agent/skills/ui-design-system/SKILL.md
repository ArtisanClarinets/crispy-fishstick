---
name: ui-design-system
description: Guidelines for generating UI code that matches the "Engineered Hardware" aesthetic of Project SENTINEL. Use when creating new components, implementing layouts, or ensuring visual consistency across the platform.
---

# UI Design System

This skill defines the visual language and coding standards for the UI. The aesthetic is "Engineered Hardware" / "Premium Interface", emphasizing precision, technical clarity, and high-end manufacturing aesthetics.

## Quick Start

Implement a new UI element in 4 steps:

1.  **Check shadcn/ui**: Verify if the component exists in `components/ui/*.tsx`.
2.  **Apply "Engineered" Styling**: Use 1px borders, `JetBrains Mono` for technical data, and subtle glass effects.
3.  **Ensure Accessibility**: Verify contrast ratios and focus states (WCAG 2.2 AA).
4.  **Add Purposeful Motion**: Use `framer-motion` with defined timing functions for subtle transitions.

```tsx
// Example: Engineered Hardware Card
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function SystemCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <Card className="border-surface-200 bg-background/80 backdrop-blur-sm p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
          {title}
        </div>
        <div className="text-2xl font-semibold tracking-tight">
          {value}
        </div>
      </Card>
    </motion.div>
  );
}
```

## Core Concepts

### 1. Design Philosophy ("Engineered Hardware")

*   **Precision**: 1px borders, clear visual hierarchy, and strict alignment.
*   **Glass**: Subtle transparency (`bg-background/80`, `backdrop-blur`) used for depth and layering, not decoration.
*   **Grids**: Persistent background grids or distinct separators to evoke blueprints and technical schematics.
*   **Typography**: High contrast headers (Inter). Muted technical labels (JetBrains Mono, uppercase, small tracking).

### 2. Component Architecture

*   **Library**: Use `components/ui/*.tsx` (shadcn/ui based) for all standard elements.
*   **Composition**: Build complex interfaces by composing small, atomic components.
*   **Theme**: Native support for Light and Dark modes using semantic Tailwind classes (`bg-background`, `text-foreground`).

### 3. Motion & Interaction

Animations must be "subtle and purposeful", avoiding layout thrash or excessive movement.

*   **Library**: `framer-motion`
*   **Timing Functions**:
    *   `transition-precision`: `cubic-bezier(0.25, 1, 0.5, 1)` (Standard)
    *   `transition-premium`: `cubic-bezier(0.22, 1, 0.36, 1)` (Slow/Elegant)

## UI Implementation Workflows

### Creating a New Feature View

**Step 1: Layout Definition**
Use the standard grid system and spacing. Ensure the view respects the admin/site boundary.

**Step 2: Component Selection**
Prioritize existing components. If a new component is needed, document it in the design system.

**Step 3: State Management**
Use React state for local UI changes. For global state (like task management), integrate with the appropriate providers.

```tsx
// Integration with Task Management (Example)
const handleAction = async () => {
  // Update UI state to show progress
  setIsLoading(true);
  try {
    await updateTodoList({ todos: "[x] Completed UI Action" });
  } finally {
    setIsLoading(false);
  }
};
```

### Accessibility Compliance

**Contrast & Color**
*   Ensure text meets WCAG 2.2 AA contrast ratios.
*   Do not rely on color alone to convey information.

**Keyboard Navigation**
*   Visible focus rings are mandatory (`focus-visible:ring-2`).
*   Maintain a logical tab order.

## Advanced Patterns

### Responsive Technical Data
Use `JetBrains Mono` for tabular data and ensure it scales gracefully on mobile using overflow containers or responsive font sizes.

### Dynamic Theming
Leverage `hsl(var(--variable))` for all colors to allow for runtime theme adjustments without CSS overrides.
