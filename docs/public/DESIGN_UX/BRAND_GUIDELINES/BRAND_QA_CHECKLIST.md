# Brand QA Checklist (Public App)

Version: 1.0
Last updated: 2026-03-06
Scope: pre-release and QA gate for brand consistency in `apps/public`

## Token and color checks

- [ ] Page uses tokenized colors only; no hardcoded one-off hex values.
- [ ] Primary CTA uses brand primary color.
- [ ] Link and focus colors match brand token set.
- [ ] Light and dark theme mappings are consistent with token files.
- [ ] Contrast is readable for all text and controls.

## Typography checks

- [ ] Heading font uses the heading stack.
- [ ] Body font uses the body stack.
- [ ] Type hierarchy is consistent with scale rules.
- [ ] Long-form text remains readable on mobile and desktop.
- [ ] Labels, captions, and utility text are visually consistent.

## Logo checks

- [ ] Logo loaded from approved assets in `public/VantusSystemsLogo/`.
- [ ] Logo aspect ratio is preserved.
- [ ] Minimum logo sizes are respected.
- [ ] Logo clear space is preserved.
- [ ] Logo has enough contrast against background.

## Component consistency checks

- [ ] Buttons follow primary/secondary styles from brand package.
- [ ] Cards, borders, and input states match token definitions.
- [ ] Spacing rhythm follows shared spacing scale.
- [ ] Motion timing and easing follow the motion token set.
- [ ] Decorative effects do not overpower content clarity.

## Copy and voice checks

- [ ] Copy is plain-language and proof-forward.
- [ ] Claims include measurable context where applicable.
- [ ] Buzzword-heavy or inflated language is removed.
- [ ] CTA copy is direct and specific.
- [ ] Route content respects `VS-COM-201` tone expectations.

## Route-level checks

- [ ] `/` hero and CTA align with brand tone.
- [ ] `/services` and detail pages use consistent card and heading patterns.
- [ ] `/pricing` uses canonical pricing names and values.
- [ ] `/proof` pages use evidence-first formatting.
- [ ] `/contact` and `/start-audit` forms match styling and trust tone.

## Accessibility and resilience checks

- [ ] Keyboard focus is visible and consistent.
- [ ] Reduced-motion users get safe transitions.
- [ ] Logo and key images include descriptive alt text.
- [ ] Text zoom to 200% keeps layouts usable.
- [ ] Core pages maintain readability on 320px width.

## Release gate

- [ ] Checklist completed by implementer.
- [ ] Checklist spot-reviewed by design/quality owner.
- [ ] Any deviation documented and approved before release.
