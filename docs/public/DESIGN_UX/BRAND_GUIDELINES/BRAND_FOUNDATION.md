# Brand Foundation (Vantus Public App)

Version: 1.0
Last updated: 2026-03-06
Scope: brand behavior and visual direction for `apps/public`

## Brand intent

Vantus should feel like calm technical control: precise, transparent, and ownership-first.

The public app should communicate:

- confidence without hype,
- clarity without oversimplification,
- authority backed by proof,
- modern execution without visual noise.

## Core brand principles

1. Ownership first
   - Show control, portability, and client independence in both copy and UI structure.
2. Proof over promise
   - Use measurable claims, evidence blocks, and explicit definitions.
3. Plain-language clarity
   - Explain technical ideas with direct language and clear next actions.
4. Security by default
   - Present secure, stable, trustworthy visual signals.
5. Operational discipline
   - Keep patterns consistent across routes and components.

## Visual direction (logo-aligned)

Logo analysis from `public/VantusSystemsLogo/` shows a deep navy + steel-blue family.

Design direction:

- Base mood: deep navy and slate blues on high-contrast surfaces.
- Emphasis: focused and technical, not playful or decorative.
- Density: clean spacing, strong hierarchy, minimal clutter.
- Motion: restrained and purposeful.

Avoid:

- loud neon accents,
- generic purple gradients,
- excessive rounded "toy" UI,
- noisy background textures.

## Experience rules by route

- `/`
  - Lead with confidence and one primary CTA.
  - Keep hero visual simple and high-contrast.
- `/services` and `/services/[offerSlug]`
  - Use consistent card structures and proof-backed language.
  - Keep pricing labels and offer names canonical.
- `/pricing`
  - Use tokenized table and card styles.
  - Keep all values aligned to pricing YAML.
- `/proof` and case studies
  - Use evidence blocks with clear labels and consistent visual rhythm.
- `/contact` and `/start-audit`
  - Keep forms simple, clear, and visually consistent with trust-focused styling.

## Copy and voice alignment

Follow `VS-COM-201` from `../../../shared/founding-principles/COMPANY/BRAND_VOICE.md`:

- Precision over hype.
- Teach, do not preach.
- Plain words only.

Copy should always feel:

- direct,
- factual,
- helpful,
- accountable.

## Brand consistency contract

All public surfaces must use:

- `COLOR_AND_THEME_TOKENS.md` for color choices,
- `TYPOGRAPHY_AND_LAYOUT.md` for hierarchy and spacing,
- `LOGO_USAGE.md` for logo rendering,
- `BRAND_QA_CHECKLIST.md` before release.
