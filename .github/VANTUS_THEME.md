# Vantus Theme — Source of Truth

This repository now uses the **Vantus Systems** visual identity ("Industrial Elegance"). Theme variables and core surface utilities are centralized in:

- `app/vantus-theme.css` — single source of truth for palette, RGB helpers, grid, and precision utilities.
- `app/globals.css` — imports the Vantus theme and contains site-wide base utilities.
- `tailwind.config.ts` — color tokens are mapped to CSS variables and support alpha utilities (e.g. `bg-background/50`, `selection:bg-primary/20`).

Quick rules for contributors:

- Use semantic utilities: `bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-card-foreground`, `bg-primary`, `text-primary-foreground`.
- Do NOT add hardcoded hex colors in components; add new tokens in `app/vantus-theme.css` if needed.
- For technical values (numbers, hashes, statuses), use `font-mono` or the `tech` variant on `Button` (`variant="tech"`).
- For input/button focus states, depend on `focus-visible:ring-2 focus-visible:ring-ring` (ring maps to `--primary`).
- Use `card-precision`, `btn-precision`, and `input-precision` for consistent primitives.

If you need a new semantic token (e.g., a new surface or accent), add it to `app/vantus-theme.css` and map it in `tailwind.config.ts`.

Thanks — the Vantus theme replaces the previous Copper/Patina palette. If you see any remnants (`brand-copper`, `brand-patina`), please open a small PR to migrate them to the Vantus tokens.