# Logo Usage Standards

Version: 1.0
Last updated: 2026-03-06
Scope: logo handling for `apps/public`

## Logo source directory

All current logo assets are in:

- `public/VantusSystemsLogo/`

## Asset inventory and use

| File                                   | Recommended use                                     |
| -------------------------------------- | --------------------------------------------------- |
| `VantusSystems_Final_PixelPerfect.svg` | Source-of-truth master art for export workflows     |
| `VantusSystems_Final_Transparent.png`  | High-resolution transparent mark for web surfaces   |
| `vantus.systems.logo.color.webp`       | Optimized full-color logo for production rendering  |
| `logo.png`                             | General fallback logo                               |
| `logo.webp`                            | Optimized fallback logo                             |
| `sm_logo.png`                          | Small placements (compact nav, profile, meta cards) |
| `favicon.webp`                         | Favicon source                                      |
| `ICON_vantus.systems.logo.lossy.webp`  | Lightweight icon fallback                           |
| `favicon.psd`                          | Design source only (not runtime)                    |

## Placement rules

- Keep clear space equal to at least 12.5% of logo width on all sides.
- Minimum rendered widths:
  - Header/logo lockup: 120px
  - Footer/logo lockup: 96px
  - Compact logo placements: 40px
  - Favicon/app icon: 32px and 16px exports

## Background and contrast

- On light surfaces, use transparent logo assets directly.
- On dark surfaces, ensure visible contrast by using:
  - a light support container, or
  - a contrast-preserving logo variant.
- Do not place dark logo marks directly on dark navy surfaces without contrast treatment.

## Do not

- Do not stretch or skew logo proportions.
- Do not rotate the logo.
- Do not recolor logo elements outside approved palette rules.
- Do not add glows, heavy shadows, outlines, or gradients to the logo.
- Do not place logo over busy image regions that reduce legibility.

## Favicon and app icon guidance

- Build favicon exports from `favicon.webp` and `ICON_vantus.systems.logo.lossy.webp`.
- Include at minimum:
  - 16x16
  - 32x32
  - 48x48
  - 180x180 (touch icon)

## Implementation note

Use modern formats (`.webp`) for runtime where possible, with `.png` fallback if needed.
