---
name: tailwind-css
description: Implement premium Tailwind CSS styling in Next.js systems with custom design tokens, precision interactions, and carbon glass aesthetics. Use when building responsive, accessible UI components with enterprise-grade visual consistency.
---

# Tailwind CSS

A comprehensive skill for implementing premium Tailwind CSS styling in Next.js 16 + React 19 App Router systems, following Fortune-500 design standards with custom design tokens, precision interactions, and carbon glass aesthetics.

## Quick Start

Apply premium styling with custom design tokens and precision interactions:

1. **Component Styling** (`components/ui/button.tsx`):
   ```typescript
   const buttonVariants = cva(
     "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-precision",
     {
       variants: {
         variant: {
           premium: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20",
         },
       },
     }
   )
   ```

2. **Global Theme Variables** (`app/globals.css`):
   ```css
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 220 15% 10%;
       --primary: 220 15% 10%;
       --primary-foreground: 0 0% 98%;
       --radius: 0.75rem;
     }
   }
   ```

3. **Precision Interactions** (`app/globals.css`):
   ```css
   @layer components {
     .btn-precision {
       @apply relative overflow-hidden transition-transform duration-150 ease-precision;
     }
     .btn-precision:hover {
       transform: translateY(-2px);
     }
   }
   ```

## Core Concepts

### Design Token System

- **CSS Custom Properties**: HSL-based color tokens for light/dark mode switching
- **Semantic Naming**: Colors named by purpose (primary, secondary, destructive) not appearance
- **Surface Elevation**: Multi-level surface colors for depth and hierarchy
- **Typography Scale**: Consistent font sizes and weights with Inter font family

### Precision Interactions

- **Micro-Animations**: Subtle transforms and transitions for professional feel
- **Easing Functions**: Custom cubic-bezier curves for premium motion
- **State Feedback**: Visual responses for hover, focus, active, and disabled states
- **Reduced Motion**: Accessibility support for users who prefer reduced animation

### Carbon Glass Aesthetics

- **Backdrop Blur**: Glass morphism effects with backdrop-filter
- **Gradient Overlays**: Subtle color gradients for depth
- **Border Treatments**: Hairline borders and layered shadows
- **System Layers**: Grid patterns and signal glows for ambient design

## Workflows

### 1. Creating Premium UI Components

**Purpose**: Build reusable components with consistent styling and interactions.

**Steps**:
1. Use `cva` (class-variance-authority) for variant management
2. Include precision interaction classes (btn-precision, card-precision)
3. Apply semantic color tokens from the design system
4. Add proper focus states and accessibility attributes

**Example**: Premium Button Component
```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 btn-precision",
  {
    variants: {
      variant: {
        premium: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20",
        glass: "glass border border-border/50 hover:bg-background/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-12 rounded-md px-8 text-base",
      },
    },
  }
)
```

### 2. Implementing Dark Mode Theming

**Purpose**: Support seamless light/dark mode switching with CSS custom properties.

**Steps**:
1. Define color tokens in CSS custom properties for both themes
2. Use HSL color space for better interpolation
3. Apply `.dark` class to root element for theme switching
4. Test contrast ratios and accessibility in both modes

**Example**: Theme-Aware Card Component
```css
/* Light mode */
:root {
  --card: 0 0% 100%;
  --card-foreground: 220 15% 10%;
  --border: 220 15% 92%;
}

/* Dark mode */
.dark {
  --card: 224 20% 8%;
  --card-foreground: 210 20% 98%;
  --border: 224 15% 14%;
}
```

### 3. Adding Precision Interactions

**Purpose**: Enhance user experience with professional micro-interactions.

**Steps**:
1. Use custom easing functions (ease-precision, ease-premium)
2. Apply transform-based hover effects
3. Add focus beam animations for inputs
4. Include specular sweeps for cards and buttons

**Example**: Input Focus Beam
```css
.input-precision {
  @apply transition-all duration-200 bg-origin-border;
  background-clip: padding-box, border-box;
}

.input-precision:focus {
  @apply border-transparent;
  background-image: linear-gradient(var(--background), var(--background)),
                    linear-gradient(90deg, transparent, hsl(var(--primary)), transparent);
  background-size: 200% 100%;
  animation: beam-sweep 0.8s ease-out forwards;
}
```

### 4. System Layer Integration

**Purpose**: Add ambient design elements like grids and glows for premium feel.

**Steps**:
1. Include system-layer class on page containers
2. Position absolutely with pointer-events: none
3. Use CSS gradients for grid patterns and signal effects
4. Adjust opacity based on theme (lighter in dark mode)

**Example**: Living Grid System
```css
.system-layer {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(transparent 1px, rgba(var(--grid-rgb), var(--grid-opacity-light)) 1px),
    linear-gradient(90deg, transparent 1px, rgba(var(--grid-rgb), var(--grid-opacity-light)) 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

## Advanced Features

### Custom Animation Library

Advanced keyframe animations for complex interactions:

```css
@keyframes system-sweep {
  0% { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translateX(120%) skewX(-12deg); opacity: 0; }
}

.system-layer[data-sweep="1"]::after {
  animation: system-sweep 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

### Typography Plugin Integration

Enhanced typography with @tailwindcss/typography:

```typescript
// tailwind.config.ts
plugins: [tailwindcssAnimate, tailwindcssTypography]
```

Usage in components:
```tsx
<article className="prose prose-lg max-w-none">
  <h1>Content with enhanced typography</h1>
  <p>Automatic styling for headings, lists, and code blocks.</p>
</article>
```

### View Transition Support

Native view transitions with custom animations:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 220ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Troubleshooting

### Common Issues

**Styles not applying**: Ensure Tailwind directives are in globals.css and content paths include your files.

**Dark mode not working**: Check that `.dark` class is applied to html/root element and CSS variables are defined.

**Animations not smooth**: Use `transform` and `opacity` properties for GPU acceleration.

**Bundle size concerns**: Use PurgeCSS content paths and avoid unused utilities.

**Contrast issues**: Test with both light and dark themes, ensure WCAG compliance.

## Best Practices

- Always use design tokens instead of hardcoded colors
- Include precision interaction classes for professional feel
- Test components in both light and dark modes
- Use semantic color names (primary, secondary) not descriptive names
- Apply reduced motion support for accessibility
- Keep component variants manageable (avoid excessive combinations)
- Use CSS custom properties for themeable values
- Test focus states and keyboard navigation

## Examples

See the codebase for complete implementations:
- [`tailwind.config.ts`](tailwind.config.ts:1) - Configuration with custom theme and plugins
- [`app/globals.css`](app/globals.css:1) - Global styles and precision interactions
- [`app/vantus-theme.css`](app/vantus-theme.css:1) - Theme variables and utilities
- [`components/ui/button.tsx`](components/ui/button.tsx:1) - Premium button with variants
- [`components/ui/card.tsx`](components/ui/card.tsx:1) - Card component with precision styling