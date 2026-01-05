# Migration Guide: Vantus System to Thompson Systems

## Overview
This guide details the steps and changes involved in migrating from the legacy Vantus System codebase to the new Thompson Systems identity (Project CRISPY FISHSTICK).

## Key Changes

### 1. Branding & Identity
- **Name Change**: "Vantus System" -> "Thompson Systems".
- **Tagline**: Updated to "Engineering for High-Trust Products".
- **Visuals**: Replaced generic placeholders with procedural "Cover Art" and interactive hero backgrounds.

### 2. Styling & Theme
- **Global CSS**: Complete overhaul of `app/globals.css`.
- **Colors**: Shifted to a high-contrast Slate/Zinc palette.
- **Typography**: Standardized on system fonts with specific weight distributions.
- **Animations**: Introduced `ease-precision` cubic-bezier and custom keyframes.

### 3. Component Architecture
- **New Components**:
  - `HeroBackground`: Interactive mouse-tracking grid.
  - `AuditModal`: Interactive lead qualification wizard.
  - `BuildPlanModule`: Tabbed process visualization.
  - `CoverArt`: SVG-based generative art.
  - `Reveal` & `Stagger`: Reusable animation wrappers.
  - `CalibrationHeadline`: Text reveal effect.
- **Updated Components**:
  - `Button`: Added `premium` variant and micro-interactions.
  - `Dialog`: Integrated with `AuditModal`.

### 4. Configuration
- **Site Config**: `lib/site.ts` updated with new metadata, links, and feature flags.

## Migration Steps

1.  **Update Global Styles**: Replace `app/globals.css` with the new definition.
2.  **Install Dependencies**: Ensure `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge` are installed.
3.  **Copy Components**: Move new components into `components/`.
4.  **Update UI Library**: Update `components/ui/button.tsx` and ensure Radix primitives are present.
5.  **Replace Homepage**: Overwrite `app/page.tsx` with the new layout.
6.  **Verify Assets**: Ensure no missing images or static assets.

## Verification
- Run `npm run dev` and check the homepage.
- Verify the "60-second audit" modal opens and functions.
- Check hover states on buttons and cards.
- Ensure the hero background tracks mouse movement.
