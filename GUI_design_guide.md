# GUI_design_guide.md

**An Apple‑caliber, mobile‑first, performance‑first design + motion system for a solo technical studio portfolio.**

This document is written so a **business owner** can understand what “premium” means (and what to expect), while also giving a developer a **granular implementation playbook**.

---

## 1) Executive Summary (what we’re building)

### Your positioning (already strong)

You’re not selling “websites.” You’re selling **production‑grade systems** + **premium interfaces**.

### The gap today (from the current repo)

The repo is technically solid (Next.js + Tailwind + shadcn + MDX + Motion). What makes it feel “plain‑jane” is:

- Placeholder brand (“Studio”, placeholder siteConfig values)
- Placeholder social proof (fake logos/names)
- Skill “percentages” (template smell)
- Work cards that don’t _show_ anything yet (letter placeholders)
- Pages that read like “sections stacked”, not a cinematic narrative

### The goal

A visitor should feel, immediately:

- “This is **rare**.”
- “Everything is deliberate.”
- “If they care this much about a portfolio, my product will be treated like a product—not a contract.”

---

## 2) The Quality Bar (Apple‑caliber rules)

### Rule A — Everything looks designed

- No placeholders
- No generic skill bars
- No “template” artifacts
- No gimmicks that don’t support the story

### Rule B — Motion is there to communicate, not entertain

Motion should provide:

- hierarchy (what to read first)
- continuity (what changed and where you went)
- polish (this is engineered)

### Rule C — Mobile is the primary product

Mobile is not “responsive.” Mobile is the **main** build.

- Thumb‑friendly targets
- Scrolling feels effortless
- No hover‑only effects
- No “desktop‑first” typography

### Rule D — Fast is part of the brand

Your copy promises rigor, performance, and systems thinking.  
If the site scrolls poorly, loads slowly, or feels inconsistent, the brand collapses.

---

## 3) Brand Starter Kit (starting from zero)

Pick one direction and commit. Consistency is what feels expensive.

### Option 1: “Carbon Glass” (recommended)

**Mood:** dark cinematic, glass surfaces, subtle glow, engineered precision  
**Best for:** “Engineering Rigor” positioning  
**Accent:** electric blue or violet (used sparingly)

### Option 2: “Paper & Precision”

**Mood:** bright, editorial, calm motion, white‑space authority  
**Best for:** enterprise trust, clarity, traditional credibility

### Option 3: “Studio Neon”

**Mood:** bolder gradients, more expressive  
**Risk:** easiest to overdo; requires restraint to stay luxury

**Recommendation:** Carbon Glass.

---

## 4) Design Tokens (the system behind the look)

### 4.1 Typography

**Primary:** Geist Sans or Inter (variable)  
**Mono:** Geist Mono (metadata + chips)

**Type rules**

- Headings: tight tracking, strong weights
- Body: line height ~1.6, never “too gray” on dark backgrounds
- Metadata: mono + small caps / tracking for “engineering” feel

**Mobile‑first type scale**
Use `clamp()` so it scales smoothly:

- Hero H1: `clamp(2.25rem, 6vw, 4.25rem)`
- H2: `clamp(1.75rem, 4vw, 2.5rem)`
- Body: 1rem–1.125rem on mobile

### 4.2 Color (Carbon Glass palette suggestion)

Use neutral foundations. Accent is seasoning.

**Core**

- Background: near‑black with hue (not pure #000)
- Surface 1: subtle elevation
- Surface 2: higher elevation for cards

**Accent**
Pick ONE: Blue OR Violet  
Use accent for:

- focus rings
- key highlights
- small glows
- links/primary buttons

### 4.3 Layout + spacing

Luxury = rhythm.

**Section spacing**

- Mobile: `py-16`
- Tablet: `py-20`
- Desktop: `py-28`

**Container**

- `px-4` mobile, `px-6` tablet, `px-8` desktop

**Grid**

- Mobile: 1 col
- Tablet: 2 col
- Desktop: 3–4 col (only when content supports it)

### 4.4 Surfaces (expensive “objects”)

Your cards should feel like “hardware”:

- hairline border (low opacity)
- soft shadow (subtle)
- optional glass blur (sparingly)
- hover lift on desktop, press feedback on mobile

---

## 5) Motion System (high fidelity without slowing the app)

### 5.1 Motion principles

- Default motion: **calm, short, intentional**
- No bounce for primary transitions
- Avoid continuous motion except atmospheric hero background
- Always respect Reduced Motion settings

### 5.2 Motion tokens (standardize everything)

Create tokens and reuse them:

- **Duration (fast):** 150–200ms (micro)
- **Duration (standard):** 250–400ms (most)
- **Duration (cinematic):** 600–900ms (1 hero moment only)
- **Easing:** a single curve (e.g. `[0.2, 0, 0, 1]`)

### 5.3 Motion Recipes (what to implement)

Choose 1–2 “signature” effects, then polish everything else.

**Signature effects (recommended)**

1. **Shared element transition** Work card → Work detail hero
2. **Scroll progress hairline** across the top (feels “product”)
3. **Data‑flow visualization** for integrations/sync engines (backend made visual)

**Baseline motion (required everywhere)**

- Staggered reveal for headings + cards
- Press feedback for buttons + cards (mobile)
- Smooth route transitions (you already have this)

---

## 6) Page Blueprints (what each page should do)

## Home (authority in 5 seconds)

**Structure**

1. Hero: positioning + one unmistakable signature line
2. Signature philosophy: “houses that don’t creak” (move to Home)
3. Selected Work (3 projects, visual covers)
4. Services (bento grid)
5. Principles you ship by (clarity, performance, accessibility, etc.)
6. CTA: book a call

**Remove**

- Any fake “Trusted by” logos or placeholder names.

## Work (index)

**Goal:** backend work looks cinematic.

- Each card gets a cover visual (not a letter)
- Include “Outcome” and “Constraints” right on the card

## Work (detail)

Make it read like a product launch:

- At‑a‑glance panel (role, stack, timeline)
- Problem / constraints / approach / results
- One diagram or animated system visualization
- “Tradeoffs” section (signals seniority)

## Services

Sell outcomes, not tools:

- Bento grid
- Each service has: outcome, deliverables, artifacts

## Process

Make the process feel like a pipeline:

- vertical line + progress fill
- sticky step number
- add “07 Evolution” (software is living)

## Insights

Editorial authority:

- one featured hero post
- metadata in monospace
- hover: underline + gentle lift

## About

Human + philosophy:

- split layout
- portrait OR signature abstract graphic
- “Principles” list that matches your engineering rigor

## Contact

Conversion without friction:

- big inputs
- instant validation
- loader → success check
- optional stepper (“Typeform style”)

---

## 7) Repo‑Specific Implementation Plan (granular)

This section maps improvements directly to your codebase.

### 7.1 Remove placeholders (brand integrity)

**Files**

- `lib/site.ts`: replace `YOUR_*` values with real brand details
- `app/layout.tsx`: update metadata title/template and description
- `app/page.tsx`: remove fake “Trusted by” block or replace with real proof

### 7.2 Kill skill percentages (premium positioning)

**Current**

- `siteConfig.skills` with `{ level: number }` and animated bars.

**Replace with**

- `siteConfig.stackPrimary` (chips)
- `siteConfig.stackSecondary` (chips)
- `siteConfig.principles` (bullet proof)

**UI**

- chips with mono font (feels engineered)

### 7.3 Replace Work card letter placeholders with real covers

**Current**

- Home “Featured Work” uses placeholder first letter.

**Upgrade**

- Use `next/image` covers from `public/images/*`
- Add subtle gradient overlay + title lockup
- Add hover tilt (desktop only) + press feedback (mobile)

### 7.4 Add a global Reduced Motion policy

You already use `useReducedMotion` in components—great.  
Upgrade to a global “safe by default” policy:

- Wrap the app in a Motion config that auto‑reduces transforms
- Then selectively re‑enable small non‑triggering opacity transitions

### 7.5 Add “signature” visuals (wow without bloat)

Create a new folder:

- `components/visuals/`

Add:

- `DataFlow.tsx` (SVG + motion dots)
- `BlueprintGrid.tsx` (subtle background)
- `GlowHalo.tsx` (gradient glow utilities)

Then:

- Use these visuals on Work cards and Work detail headers.

---

## 8) Developer Playbook (copy/paste recipes)

### 8.1 Global motion config (Reduced Motion)

Create `components/motion-config.tsx` and wrap your app.

```tsx
"use client";

import { MotionConfig } from "framer-motion";

export function AppMotionConfig({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Then in `app/layout.tsx`, wrap inside your ThemeProvider:

```tsx
<AppMotionConfig>
  <Header />
  <PageTransition>
    <main className="flex-1 pt-16">{children}</main>
  </PageTransition>
  <Footer />
</AppMotionConfig>
```

### 8.2 Stagger primitive (for grids)

```tsx
"use client";
import { motion } from "framer-motion";

export function Stagger({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### 8.3 Shared element transition (Work card → detail)

Use Motion `layoutId`:

- Put `layoutId={`work-card-${slug}`}` on the card media container
- Put the same `layoutId` on the detail hero media

This creates an Apple‑like continuity effect.

### 8.4 Scroll progress hairline (header)

- Measure scroll progress (0–1)
- Render a top bar that scales in X
- Disable for reduced motion

### 8.5 Abstract “Data Flow” visualization (backend made visual)

Use SVG (fast) + Motion:

- Two nodes (Shopify ↔ ERP)
- Dots travel along a path
- Node pulses on arrival

This is “wow” without heavy WebGL.

---

## 9) Performance & Technical Debt Rules (non‑negotiable)

### The fast-motion rule

Prefer animations that browsers can composite efficiently:

- transform
- opacity

Avoid animating properties that trigger layout/paint unless absolutely necessary (and even then, keep them rare).

### “will-change” rule

`will-change` can help, but overuse wastes resources. Use it only on small, short-lived interactions.

### Image rule

Every visible cover/hero must be:

- `next/image`
- correct `sizes`
- `priority` only when above the fold
  This keeps LCP and CLS in check.

### Avoid “heavy wow”

WebGL can be beautiful, but it’s easy to slow mobile devices.
Default to:

- SVG
- CSS gradients
- subtle noise
- Motion + transforms
  Only add WebGL when it’s essential—and keep it minimal.

### View Transitions API

It’s powerful, but treat as progressive enhancement.
If you want it:

- use it as an optional layer on top of Motion transitions
- ensure graceful fallback

---

## 10) Business Owner Expectations (what’s possible)

### What “premium” actually means

A premium portfolio is a **system**:

- a consistent visual language
- predictable motion patterns
- real proof (visual case studies)
- speed + accessibility

### What creates the “mind‑blowing” moment

It’s not one big trick.
It’s **50 small details**:

- typography rhythm
- hover/press feedback
- continuity on navigation
- visual proof of invisible systems
- performance that feels effortless

### What you should never accept

- fake client logos
- generic skill bars
- over-animated pages that feel slow
- effects that only work on desktop

---

# Implementation Checklist (print this)

## Must do (brand integrity)

- [ ] Replace all placeholders in `lib/site.ts`
- [ ] Replace metadata in `app/layout.tsx`
- [ ] Remove fake “Trusted by” block

## Must do (premium visuals)

- [ ] Work cards have real covers (next/image)
- [ ] Remove skill percentages; replace with chips + proof

## Must do (motion polish)

- [ ] Global reduced motion policy
- [ ] Stagger system for grids
- [ ] Shared element transition for Work

## Must do (conversion)

- [ ] Contact form polish (loader → success)
- [ ] Spam guard (honeypot)

## Optional “wow”

- [ ] Data‑flow visualization for integrations
- [ ] Scroll progress hairline
- [ ] View transitions (progressive enhancement)

---

## Notes

This guide intentionally favors:

- **SVG/CSS** “wow” (fast)
- **Motion** for continuity and layout transitions
- Mobile-first layouts and tap feedback

That combination gives you the “Apple vibe” without unnecessary technical debt.
