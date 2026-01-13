# Best Practices for UI Design System

This guide outlines proven patterns and anti-patterns for implementing the "Engineered Hardware" aesthetic in the Vantus Systems platform, ensuring visual precision, accessibility, and performance.

## 1. Component Implementation

### ✓ DO: Use Semantic Tailwind Classes

```tsx
// CORRECT: Using semantic variables for theming
<div className="bg-background text-foreground border-surface-200">
  <span className="text-muted-foreground font-mono uppercase tracking-widest">
    System Status
  </span>
</div>
```

**Why this matters:**
- **Theming**: Automatically supports light/dark mode transitions.
- **Consistency**: Ensures all components use the same color palette.
- **Maintainability**: Centralized color management in `tailwind.config.ts`.

### ✗ DON'T: Hardcode Hex Colors

```tsx
// VULNERABLE: Hardcoded colors break theming
<div className="bg-[#ffffff] text-[#333333] border-[#e5e5e5]">
  <span>System Status</span>
</div>
```

## 2. Typography & Hierarchy

### ✓ DO: Use Font Families Purposefully

*   **Inter**: Primary sans-serif for readability in body text and UI controls.
*   **JetBrains Mono**: Technical data, code snippets, and "system" labels to evoke an engineered feel.

```tsx
// CORRECT: Mixing fonts for hierarchy
<div>
  <h2 className="font-sans font-bold tracking-tight">Project Overview</h2>
  <p className="font-mono text-[10px] text-muted-foreground">ID: PRJ-772-X</p>
</div>
```

### ✗ DON'T: Overuse Monospace

Using monospace for long paragraphs reduces readability and dilutes the "technical accent" effect.

## 3. Motion & Interaction

### ✓ DO: Use Purposeful Transitions

```tsx
// CORRECT: Subtle, non-layout-shifting animation
<motion.div
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="p-4 border rounded-lg"
>
  Interactive Element
</motion.div>
```

**Why this matters:**
- **UX**: Provides immediate feedback without being distracting.
- **Performance**: `scale` and `opacity` are GPU-accelerated and don't trigger reflows.

### ✗ DON'T: Animate Layout Properties

Avoid animating `width`, `height`, `top`, or `left` as they cause expensive layout recalculations. Use `transform` (scale, translate) instead.

## 4. Accessibility (WCAG 2.2 AA)

### ✓ DO: Ensure Keyboard Operability

```tsx
// CORRECT: Visible focus states and semantic buttons
<button 
  className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
  aria-label="Close system panel"
>
  <XIcon />
</button>
```

### ✗ DON'T: Remove Focus Rings

Never use `outline: none` without providing a clear, high-contrast `focus-visible` alternative.

## 5. Error Handling in UI

### ✓ DO: Provide Clear Feedback

*   **Validation Errors**: Use `components/ui/form.tsx` to show inline errors.
*   **Global Errors**: Use `ErrorBoundary` to catch and display fallback UI for component crashes.
*   **Loading States**: Use `Skeleton` components that match the layout of the final content.

```tsx
// CORRECT: Skeleton loading pattern
if (isLoading) return <Skeleton className="h-[200px] w-full rounded-xl" />;
```

## 6. Integration with Workflows

### ✓ DO: Reflect System State

When performing background tasks (e.g., via `newTask` or `updateTodoList`), ensure the UI reflects the current progress and completion state.

```tsx
// Example: Reflecting task progress
const { toast } = useToast();

const handleTaskUpdate = async () => {
  try {
    await updateTodoList({ todos: "[x] UI Update Applied" });
    toast({ title: "Success", description: "System configuration updated." });
  } catch (error) {
    toast({ title: "Error", description: "Failed to update system.", variant: "destructive" });
  }
};
```

## Summary: UI Implementation Checklist

**Every new UI component must implement:**

- [ ] **Theming**: Uses `bg-background`, `text-foreground`, etc.
- [ ] **Typography**: Correct use of Inter vs. JetBrains Mono.
- [ ] **Precision**: 1px borders and consistent spacing.
- [ ] **Accessibility**: Contrast check and focus states.
- [ ] **Motion**: Subtle transitions using `framer-motion`.
- [ ] **Responsiveness**: Works across mobile, tablet, and desktop.
- [ ] **Error States**: Handles loading and failure gracefully.
