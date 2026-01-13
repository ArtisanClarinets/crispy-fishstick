# Design System — PRISM//CORE
**Codename:** PRISM//CORE  
**Applies to:** Public Experience + Admin Portal + Customer Portal  
**Status:** Draft v1.0  
**Last Updated:** 2026-01-03

PRISM//CORE is a token-driven system designed to create interfaces that feel:
- **Premium and quiet** (Apple-like restraint)
- **Fast and confident** (Google-like responsiveness)
- **Engineered and evidence-driven** (Tesla-like instrumentation)
- **Industrial-strength** (Amazon/Meta-level scalability cues)

This design system is deliberately written so an LLM (or any contributor) can generate **consistent, Fortune-500-grade UI** without drifting into “template SaaS.”

---

## 1) Visual philosophy

### 1.1 The non-negotiables
1. **No template artifacts**  
   Avoid generic “feature card” stacks. Prefer: diagrams, instrumentation, evidence modules, and structured narratives.
2. **Calm authority**  
   White space, tight typography, minimal color, and clear hierarchy.
3. **Motion as continuity**  
   Motion indicates state changes and navigation; it is never decorative noise.
4. **Proof over persuasion**  
   Use measurable signals and verification surfaces (e.g., Proof Panel) as first-class UI.

### 1.2 Three surface personalities (same DNA, different density)
- **Public Experience:** cinematic, spacious, editorial rhythm
- **Customer Portal:** product workspace, medium density, clear status signals
- **Admin Portal:** operator console, higher density, keyboard-first

---

## 2) Token system (single source of truth)

> Implementation target: CSS variables (shadcn-compatible), consumed via Tailwind.

### 2.1 Semantic color tokens (required)
These must exist in **light** and **dark** theme variants.

- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### 2.2 Extended “systems” tokens (PRISM layer)
These tokens power the signature “systems glow” and instrumentation styling.

- `--system-h`, `--system-s`, `--system-l`
- `--system-glow-a`
- `--hairline` (0.5px border standard)
- `--glass-bg` (translucent surface)
- `--noise-a` (grain overlay alpha)

### 2.3 Status tokens
Use these tokens consistently across Admin/Portal:
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--info`, `--info-foreground`

**Rule:** never introduce ad-hoc hex colors in components. Extend tokens first.

---

## 3) Typography

### 3.1 Font families
- **Sans:** modern grotesk (Inter/Geist/System UI)
- **Mono:** engineering accent (Geist Mono/JetBrains Mono)

### 3.2 Type scale (mobile-first with clamp)
Use `clamp()` so scale feels native on every display.

- Display: `clamp(2.5rem, 6vw, 4.5rem)`
- H1: `clamp(2.0rem, 4.5vw, 3.25rem)`
- H2: `clamp(1.5rem, 3.5vw, 2.5rem)`
- H3: `clamp(1.25rem, 2.5vw, 1.75rem)`
- Body: `1rem` (mobile) → `1.0625rem` (desktop)
- Small: `0.875rem`
- Micro: `0.75rem`

### 3.3 Typography rules
- Max readable width for long-form: **65–80 characters**.
- Dark mode text must never be “too gray” to read.
- Use mono for:
  - metadata
  - hashes
  - audit signals
  - inline system specs

---

## 4) Layout & spacing

### 4.1 Spacing scale
Base unit: **4px**  
Allowed spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

### 4.2 Containers
- `container` max widths: 640 / 768 / 1024 / 1280 / 1440
- Public Experience uses larger vertical rhythm:
  - section spacing 64–96 (desktop), 40–64 (mobile)
- Admin/Portal uses tighter rhythm:
  - section spacing 32–48 (desktop), 24–32 (mobile)

### 4.3 Grid
- Public: 12-column on desktop, 4-column on mobile
- Admin/Portal: 12-column with persistent sidebar patterns

---

## 5) Shape, borders, elevation

### 5.1 Radius scale
- `sm`: 10px (chips, small cards)
- `md`: 14px (standard cards, inputs)
- `lg`: 18px (feature panels)
- `xl`: 24px (hero modules, major surfaces)

### 5.2 Borders
- Default border is **hairline** (0.5px) where supported.
- Use borders + background contrast instead of heavy shadows.

### 5.3 Elevation
Use elevation to communicate layering (menus, dialogs, drawers).
- Base: border + subtle shadow
- Popover/Dialog: stronger shadow + blur backdrop (where appropriate)

---

## 6) Motion system

### 6.1 Durations
- `fast`: 120–160ms (hover, small toggles)
- `base`: 200–260ms (dialogs, drawers)
- `slow`: 320–420ms (page transitions, hero reveals)

### 6.2 Easing
Default: “tight premium” cubic-bezier (no bounce by default).
- Avoid playful spring unless it communicates a mechanical control (e.g., mode toggle highlight).

### 6.3 Reduced motion policy
If `prefers-reduced-motion: reduce`:
- disable parallax and scroll-bound transforms
- replace sweeps with opacity transitions
- keep state changes visible without movement

---

## 7) Component library

PRISM//CORE components are divided into:
- **Primitives** (shadcn/radix-level)
- **System Modules** (signature blocks)
- **Portal Modules** (tables, timelines, evidence)

### 7.1 Primitives (required)
- Button (variants: primary, secondary, outline, ghost, destructive)
- Link (text link + “precision underline”)
- Input / Textarea / Select
- Checkbox / Radio / Switch
- Badge (status + taxonomy)
- Card / Surface
- Tabs
- Accordion
- Tooltip / Popover
- Dialog / Drawer
- Toast
- Skeleton

**Component states (mandatory)**
- default / hover / active
- focus-visible (ring)
- disabled
- loading (spinner or skeleton)

### 7.2 System Modules (signature, not SaaS)
These are the “proof-of-skill” blocks.

1. **Proof Panel**  
   - verifies security headers presence
   - displays build provenance (commit, deps hash)
   - shows third-party request counts

2. **Build Plan Module**  
   - steps with deliverables and evidence
   - smooth transition between steps
   - mobile progress indicator

3. **Case Mode System**  
   - mode toggle (Normal / Scale / Incident)
   - mode-aware KPI and failure mode rendering

4. **Generative Cover Art**  
   - deterministic cover generation from slug
   - optional image override

5. **Console HUD (optional)**  
   - status indicators, sync pulses, “system” vibes
   - must remain subtle and not distract reading

### 7.3 Portal Modules (Admin + Customer)
- Data Table
  - sticky header
  - density toggle (comfortable/compact)
- Timeline / Milestones
  - vertical timeline (mobile)
  - horizontal timeline (desktop)
- Evidence Drop Card
  - artifact type (perf/a11y/security)
  - timestamp
  - download controls
- Deliverable Vault Item
  - versioning
  - checksum display (optional)
  - permission badge
- Audit Log Row
  - actor
  - action
  - object
  - timestamp
  - metadata popover

---

## 8) Interaction patterns

### 8.1 Buttons (pressure + highlight)
- Subtle lift on hover (≤ 2px)
- Slight compression on press (scale ≤ 0.98)
- Optional sweep highlight on premium CTAs (disabled in reduced motion)

### 8.2 Inputs (focus beam)
- Focus should be unmistakable and elegant.
- Validation:
  - message is specific
  - anchored to field
  - announced to screen readers

### 8.3 Navigation
**Public**
- sticky header
- clean IA
- minimal nav items

**Admin/Portal**
- persistent sidebar
- top bar with search + quick actions
- command palette (optional)

### 8.4 Empty states
Empty states must be:
- instructional (“what to do next”)
- not cute or jokey
- include a primary action

---

## 9) Accessibility standards (must-haves)

- WCAG 2.2 AA baseline.
- All interactive targets ≥ 24×24 CSS px (prefer 44×44 in portals).
- Visible focus rings for keyboard users.
- Dialogs manage focus correctly; ESC closes; return focus to trigger.
- No hover-only affordances on mobile.

---

## 10) Content design rules

### 10.1 Voice
- Calm, precise, evidence-backed.
- Avoid hype unless you can show proof.

### 10.2 Structure
For every major claim:
- **Outcome** (what changed)
- **Constraint** (what made it hard)
- **Decision** (what you chose)
- **Evidence** (how it’s verified)

---

## 11) Implementation guardrails (for coding agents)

### 11.1 Token discipline
- Never hardcode colors, spacing, radius.
- Add tokens first; then consume them through Tailwind/CVA.

### 11.2 Server-first rendering
- Prefer Server Components for content pages.
- Use Client Components only for:
  - interactive modules (Proof Panel, Lab tools)
  - theme toggles
  - animations where needed

### 11.3 Security guardrails
- No `dangerouslySetInnerHTML` for untrusted content.
- Sanitize/allowlist MDX components.
- Keep CSP strict; avoid introducing new third-party scripts.

### 11.4 Performance guardrails
- Avoid large client bundles by default.
- Avoid animation-induced layout shift (CLS).
- Use next/image for all imagery; reserve space.

---

## Appendix A — Recommended “density modes”

To prevent Admin/Portal feeling like a template:
- **Comfortable (default):** more spacing, calmer typography
- **Compact:** higher density tables for power users

Density mode changes spacing tokens and table row height only (not colors).

---

## Appendix B — Page archetypes (quick reference)

### Public archetypes
- Narrative Home
- Work Index
- Work Detail (Case Modes)
- Insight Article
- Tool Page (Lab)
- Trust Center

### Admin archetypes
- Dashboard
- Table + Detail (content, leads)
- Editor (MDX + preview)
- Audit Log Viewer
- Settings

### Customer portal archetypes
- Dashboard
- Project workspace
- Deliverable vault
- Change request tracker

---

## 12) Sample token values (reference implementation)

> Use HSL values so tone shifts are easy. This is a *reference palette*; adjust to brand needs while preserving contrast requirements.

### 12.1 Light theme (example)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 40%;

  --border: 214 32% 91%;
  --input: 214 32% 91%;

  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;

  --ring: 221 83% 53%;

  /* PRISM layer */
  --system-h: 221;
  --system-s: 83%;
  --system-l: 53%;
  --system-glow-a: 0.18;
  --hairline: 0.5px;
  --glass-bg: rgba(255,255,255,0.6);
  --noise-a: 0.04;
}
```

### 12.2 Dark theme (example)
```css
.dark {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;

  --card: 222 47% 9%;
  --card-foreground: 210 40% 98%;

  --muted: 217 33% 16%;
  --muted-foreground: 215 20% 65%;

  --border: 217 33% 18%;
  --input: 217 33% 18%;

  --primary: 221 83% 63%;
  --primary-foreground: 222 47% 6%;

  --secondary: 217 33% 14%;
  --secondary-foreground: 210 40% 98%;

  --accent: 217 33% 14%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 210 40% 98%;

  --ring: 221 83% 63%;

  /* PRISM layer */
  --system-h: 221;
  --system-s: 83%;
  --system-l: 63%;
  --system-glow-a: 0.22;
  --hairline: 0.5px;
  --glass-bg: rgba(10,10,14,0.55);
  --noise-a: 0.07;
}
```

---

## 13) Tone system (section “systems glow”)

Tone is a semantic “accent hue” applied per section via `data-system-tone`.

### 13.1 Tone keys
- `default` — neutral blue
- `home` — primary brand hue
- `work` — slightly warmer (teal/green)
- `insights` — cooler (violet)
- `contact` — higher contrast / urgency (amber accent sparingly)
- `admin` — subdued, low-chroma (operator calm)
- `portal` — mid-chroma (workspace clarity)

### 13.2 Rules
- Tone affects: glow, rims, micro accents, charts.
- Tone must **not** reduce text contrast.
- Never use tone for body text.

---

## 14) Component specs (LLM-grade, unambiguous)

### 14.1 Button
**Props**
- `variant`: `default | secondary | outline | ghost | destructive | link`
- `size`: `sm | md | lg | icon`
- `loading`: boolean (shows spinner, disables)

**Rules**
- Always include visible focus ring.
- Loading state must preserve width (no layout shift).

### 14.2 Surface (Card)
**Variants**
- `surface`: solid background + border
- `glass`: translucent + blur + rim
- `inset`: subtle inset border/shadow

**Rules**
- Glass surfaces only on Public and selected Portal views.
- Admin uses surfaces more than glass for clarity.

### 14.3 Data Table
**Required behaviors**
- Accessible header semantics
- Sort indicators
- Row selection (optional)
- Empty state with primary action

**Density modes**
- Comfortable: 56px row height
- Compact: 44px row height

### 14.4 Form Field
**Parts**
- label
- description (optional)
- control
- error message

**Rules**
- Errors appear below control, never as placeholder text.
- Controls must be ≥ 24px target size.

---

## 15) Layout recipes

### 15.1 Public Experience
- Sticky top nav, minimal items
- Sections alternate: narrative → proof → content
- Avoid sidebar layouts on public pages (except TOC)

### 15.2 Admin Portal
- Left sidebar (collapsible)
- Top command bar with search
- Content area uses tables + detail panels

### 15.3 Customer Portal
- Sidebar with projects
- Project pages use tabbed workspace
- Evidence drops are first-class, not hidden

---

## 16) Data visualization style

- Default to minimal charts with clear labels.
- Prefer table + sparkline over complex dashboards.
- Use semantic colors for status only.
- Provide textual summaries for screen readers.

---

## 17) Microcopy rules

- Replace hype with certainty.
- Use short sentences.
- Every CTA describes the result, not the action:
  - Good: “View incident playbook”
  - Bad: “Click here”

---

## 18) Iconography

- Use a consistent set (e.g., Lucide) at 16/20/24 sizes.
- Icons always paired with labels in Admin/Portal unless space constrained.
