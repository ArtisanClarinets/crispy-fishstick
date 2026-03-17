# Color and Theme Tokens (Logo-Aligned)

Version: 1.0
Last updated: 2026-03-06
Scope: color system for `apps/public`

## Palette source

Primary colors are derived from Vantus logo assets in `public/VantusSystemsLogo/`, with emphasis on the deep navy and steel-blue family found in:

- `VantusSystems_Final_Transparent.png`
- `logo.png`
- `vantus.systems.logo.color.webp`

## Core brand palette

| Token       | Hex       | Use                                             |
| ----------- | --------- | ----------------------------------------------- |
| `ink-950`   | `#0C131A` | Primary dark background, strong text            |
| `navy-900`  | `#10283B` | Brand primary, hero overlays, primary controls  |
| `navy-800`  | `#16334F` | Elevated dark surfaces                          |
| `blue-700`  | `#244A6D` | Hover/focus layer on dark UI                    |
| `blue-600`  | `#2E6B94` | Secondary emphasis, charts, interactive accents |
| `sky-500`   | `#50A5D0` | Highlight accent, active states, links          |
| `steel-400` | `#6C92A6` | Secondary text/icons on dark surfaces           |
| `cream-050` | `#F9F8F4` | Light canvas and inverse text                   |

## Neutral support palette

| Token       | Hex       | Use                                      |
| ----------- | --------- | ---------------------------------------- |
| `white`     | `#FFFFFF` | Cards and high-legibility blocks         |
| `slate-200` | `#D8DEE2` | Borders and separators on light surfaces |
| `slate-500` | `#4F6170` | Secondary text on light surfaces         |
| `slate-700` | `#334657` | Strong secondary text                    |

## Semantic colors

Use semantic colors sparingly; brand palette remains primary.

| Token     | Hex       | Use                              |
| --------- | --------- | -------------------------------- |
| `success` | `#2F7A63` | Success badges and confirmations |
| `warning` | `#B67A2A` | Warnings and caution banners     |
| `danger`  | `#B34747` | Errors, destructive actions      |
| `info`    | `#2E6B94` | Informational state              |

## Theme mapping

### Light theme (default)

- `bg-canvas`: `#F9F8F4`
- `bg-surface`: `#FFFFFF`
- `text-primary`: `#0C131A`
- `text-secondary`: `#4F6170`
- `border-default`: `#D8DEE2`
- `brand-primary`: `#10283B`
- `brand-secondary`: `#244A6D`
- `brand-accent`: `#50A5D0`

### Dark theme

- `bg-canvas`: `#0C131A`
- `bg-surface`: `#10283B`
- `text-primary`: `#F9F8F4`
- `text-secondary`: `#AFC1CC`
- `border-default`: `#244A6D`
- `brand-primary`: `#2E6B94`
- `brand-secondary`: `#6C92A6`
- `brand-accent`: `#50A5D0`

## Usage rules

- Use `navy-900` as the default branded action color.
- Reserve `sky-500` for targeted emphasis and active indicators.
- Keep large reading surfaces high-contrast and low-saturation.
- Avoid introducing new accents unless added to token files.

## Accessibility rules

- Body text must meet WCAG AA contrast minimum.
- Interactive focus states must be clearly visible in both themes.
- Never place logo-mark blue tones directly over similar dark backgrounds without contrast support.

## Implementation references

- `VANTUS_BRAND_TOKENS.css`
- `VANTUS_BRAND_TOKENS.json`
