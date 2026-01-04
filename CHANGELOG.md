# Changelog

## [1.0.0] - 2025-01-01

### Rebranding: Copper & Code
- **Company Identity**: Renamed from "Thompson Systems" to "Copper & Code".
- **Metadata**: Updated site title, description, and OpenGraph tags to reflect "Digital Alchemy" positioning.
- **Copy**: Updated footer, trust center, and audit modals with new brand voice.

### Design System Overhaul
- **Token Architecture**: Migrated to an HSL-based token system in `globals.css`.
  - Added `--brand-copper`, `--brand-patina`, `--brand-brass` palette.
  - Re-mapped shadcn semantic tokens (`primary`, `secondary`, `accent`) to the new palette.
- **Interaction Design**:
  - Implemented `.copper-sheen` CSS utility for metallic hover effects.
  - Applied hover-only 3D tilt interactions to featured work cards.
  - Added reduced motion support via `@media (prefers-reduced-motion: reduce)`.
- **System Layer**: Updated route-specific ambient tones (Copper for Home, Patina for Work, Graphite for Contact).

### Performance & Architecture
- **Homepage**: Replaced heavy Canvas-based particle background with a lightweight CSS-only grid and gradient system.
- **Theme**: Implemented a 3-way theme switcher (Light / Dark / System) using standard Radix-compatible patterns.
- **Cleanup**: Removed unused `Squares.tsx` component to reduce bundle size.

### Security
- **CSP**: Implemented Strict Content Security Policy (CSP) in `middleware.ts`.
  - Enabled nonce-based script execution.
  - Removed `unsafe-inline` for scripts.
  - Configured `x-nonce` header passing in `layout.tsx`.

### Testing
- **E2E**: Updated Playwright tests (`e2e/app.spec.ts`) to match new branding assertions.
- **Verification**: Confirmed `npm run lint` and `npm run build` pass with zero errors.
