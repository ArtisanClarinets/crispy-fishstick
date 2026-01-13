# Breaking Changes

## Refactor: Vantus Systems UI Overhaul

### 1. Theme Variables
- **Removed**: Any legacy color tokens not present in the new `globals.css` (e.g., specific brand colors from the old system).
- **Changed**: The meaning of `--primary` and `--secondary` has shifted to specific HSL values defined in `VANTUS_THEME.md`.

### 2. Component Props
- **Button**: The `Button` component now includes a `premium` variant. Existing buttons using standard variants (`default`, `outline`, etc.) should remain compatible, but visual appearance will change significantly.

### 3. Homepage Structure
- **Complete Replacement**: The `app/page.tsx` file has been completely replaced. Any custom sections or logic in the previous homepage have been removed in favor of the new sections (Hero, Proof, Featured Work, Rigor, CTA).

### 4. Dependencies
- **Framer Motion**: The new UI relies heavily on `framer-motion`. If this was not previously a hard dependency, it is now required for core functionality.

### 5. Layout
- **Container Widths**: The container max-widths and padding have been adjusted in `globals.css` and `tailwind.config.ts` (implied) to match the new design system.
