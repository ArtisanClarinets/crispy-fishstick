# Typography and Layout Rules

Version: 1.0
Last updated: 2026-03-06
Scope: typography, spacing, component rhythm for `apps/public`

## Typography system

Based on the requested brand styling skill, use:

- Heading font: `Poppins`, `Arial`, `Helvetica`, `sans-serif`
- Body font: `Lora`, `Georgia`, `Times New Roman`, `serif`

### Type scale

| Role       | Size | Line height | Weight | Font    |
| ---------- | ---: | ----------: | -----: | ------- |
| Display    | 56px |        64px |    700 | Heading |
| H1         | 44px |        52px |    700 | Heading |
| H2         | 36px |        44px |    700 | Heading |
| H3         | 28px |        36px |    600 | Heading |
| H4         | 22px |        30px |    600 | Heading |
| Body L     | 20px |        32px |    400 | Body    |
| Body M     | 18px |        28px |    400 | Body    |
| Body S     | 16px |        24px |    400 | Body    |
| UI label   | 14px |        20px |    600 | Heading |
| Fine print | 13px |        18px |    400 | Body    |

## Content hierarchy rules

- Use one H1 per page.
- Keep section headers short and scannable.
- Keep paragraph width to readable line lengths.
- Favor short paragraphs and bullet structure for proof content.

## Spacing system

Use a 4px base scale.

- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-5`: 20px
- `space-6`: 24px
- `space-8`: 32px
- `space-10`: 40px
- `space-12`: 48px
- `space-16`: 64px

Section rhythm:

- Desktop section gap: 64-96px
- Mobile section gap: 40-56px

## Shape and depth

- Card radius: 12px
- Input radius: 10px
- Button radius: 10px
- Pill/badge radius: 999px

Shadow style:

- Keep shadows low-noise and subtle.
- Avoid heavy blur or high-opacity floating styles.

## Motion rules

- Base duration: 180ms
- Fast duration: 120ms
- Slow duration: 260ms
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`

Use motion for:

- hover/focus response,
- section entrance cues,
- disclosure transitions.

Do not use motion for decoration without user value.

## Component styling rules

### Buttons

- Primary: `navy-900` background + `cream-050` text.
- Primary hover: `blue-700`.
- Secondary: transparent with `navy-900` border and text.

### Links

- Default: `blue-700`.
- Hover/focus: `sky-500` + underline.

### Cards

- Light theme: white surfaces with slate borders.
- Dark theme: navy surfaces with steel borders.
- Keep card internals clean and copy-focused.

### Data visualization

- Use `blue-700`, `blue-600`, `sky-500`, and `steel-400` sequence.
- Avoid bright multi-color chart palettes unless semantically required.

## Mobile behavior

- Preserve hierarchy by reducing scale, not removing hierarchy levels.
- Keep CTA targets at least 44px high.
- Keep line lengths short and spacing breathable.

## Copy rendering rules

- Ensure body text remains readable against all surfaces.
- Respect `VS-COM-201` plain-language style.
- Avoid all-caps paragraphs and dense walls of text.
