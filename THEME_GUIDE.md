# Copper & Code Theme Extension Guide

## Core Philosophy
The "Copper & Code" design system is built on the concept of **Digital Alchemy**. It combines raw industrial materials (Copper, Patina, Graphite) with precise digital execution.

## Token System
We use HSL (Hue Saturation Lightness) variables for all color tokens to allow for precise opacity manipulation without breaking the color model.

### Key Variables (`globals.css`)
- `--brand-copper`: The primary brand color. Used for accents, buttons, and "hot" interactions.
- `--brand-patina`: The secondary/complementary color. Used for "Work" sections and cool accents.
- `--brand-graphite`: The deep background color for "Contact" and technical sections.

### Usage Example
```css
/* Using the copper token with 50% opacity */
.my-element {
  background-color: hsl(var(--brand-copper) / 0.5);
}
```

## Adding New Tones
To add a new route-specific tone (e.g., for a "Lab" section):

1. **Define the HSL values** in `components/system-layer.tsx`:
   ```typescript
   lab: { h: 280, s: 60, l: 40, glowA: 0.12 } // Purple
   ```
2. **Update the `routeToTone` function** to map the path:
   ```typescript
   if (pathname.startsWith("/lab")) return "lab";
   ```

## Interaction Effects
### Copper Sheen
Apply the `.copper-sheen` class to any container to give it a metallic, light-reactive hover effect.
```tsx
<div className="copper-sheen bg-secondary rounded-xl p-6">
  Content
</div>
```

### Reduced Motion
All animations must respect the user's motion preferences. We handle this globally in `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    /* ... */
  }
}
```
Ensure any new JS-driven animations (like Framer Motion) check `useReducedMotion()` or the global media query.
