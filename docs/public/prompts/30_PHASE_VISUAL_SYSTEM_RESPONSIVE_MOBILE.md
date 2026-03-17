# Phase 30 Prompt - Visual System, Responsive UX, Mobile Native Feel

## Objective

Implement a high-end visual system and responsive interaction model in `apps/web`.

## Required tasks

1. Integrate global token styling conventions.
2. Implement route component styling patterns from brand guidelines.
3. Enforce responsive behavior for desktop, tablet, and mobile.
4. Deliver mobile-native feel:
   - touch-friendly controls
   - smooth interaction transitions
   - clear visual hierarchy on small screens
   - sticky action affordances where appropriate
5. Ensure reduced-motion-safe behavior and accessible focus states.

## Hard rules

- Use token-driven styles only for colors and typography.
- No hardcoded color or font-family drift.
- Avoid generic boilerplate visuals; build intentional page aesthetics.

## Deliverables

- Responsive behavior matrix by route
- Mobile interaction notes
- Visual consistency checklist completion evidence

## Acceptance criteria

- All key routes pass desktop/tablet/mobile review.
- Mobile UX feels app-like while preserving web performance and accessibility.
- Route component brand audit checklist can pass without exceptions.

## Verification commands

```bash
python docs/validate_alignment.py .
npm run lint --workspace web
```
