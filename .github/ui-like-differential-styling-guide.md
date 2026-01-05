# UI-I-Like → Main Repo Styling Migration Guide (100% coverage)

Generated: 2026-01-05 09:44 UTC

This guide is a **complete, recursive, file-by-file differential analysis** between:

- **UI-I-Like reference**: `.github/UI-I-Like-crispy-fishstick/*`
- **Main repo**: `($pwd)`

It is written so a developer can refactor the main repo to match the UI-I-Like archive **with full coverage**.

---

## 0) Differential summary

- **Reference files:** 93
- **Main repo files:** 303
- **Common paths:** 79
  - **Identical:** 41
  - **Different:** 38
- **Only in UI-I-Like:** 14
- **Only in main repo:** 224

### What is already aligned

- `app/globals.css` is **identical** between the two repos.
- Most “core” motion/reveal/stagger/build-plan primitives are already identical.

### What is not aligned (highest impact)

1) **Header/Footer/HUD/Theme Toggle/System tones** were modified in main repo (signal-sheen, primary-rgb glow, “verified/degraded” audit styling).
2) **Shadcn Card + Dialog** were modified in main repo in ways that break the UI-I-Like baseline.
3) **Site pages** diverged: home/work/services/process/trust/insights/contact etc are not the same composition/rhythm as UI-I-Like.
4) **Work detail hero** got extra chrome/metadata pills that don’t exist in UI-I-Like.
5) **Revenue Leak Detector + Shopify MDX diagram** diverged (inline SVG removed).
6) **Admin UI** has no reference counterpart; it must be reskinned to match the same design system.

---

## 1) Ground rules for “UI-I-Like compliance”

If you do only one thing: **stop introducing custom styling layers** (signal-sheen, primary-rgb glows, bespoke glass-card utilities) and instead use the existing UI-I-Like primitives:

- Use `.system-layer` background (already in `globals.css`) for “wow”, not neon shadows.
- Cards must be: base Card styles **plus** `card-precision`.
- Buttons must be: Button primitive **plus** `btn-precision`.
- Inputs must be: Input primitive **plus** `input-precision`.
- Links in header/footer/nav must use `link-precision` underline.

---

## 2) UI-I-Like reference file coverage (93/93 files)

This table lists **every file in UI-I-Like** and how it maps into the main repo.

| UI-I-Like file | Target file | Status | Action |
| ---------------- | ------------- | -------- | -------- |
| `.eslintrc.js` | `.eslintrc.js` | **same** | No change required (already matches UI-I-Like). |
| `.eslintrc.json` | `` | **missing** | If feature is needed, add this file or port its patterns; otherwise ignore. |
| `.github/agents/general.agent.md` | `.github/agents/general.agent.md` | **same** | No change required (already matches UI-I-Like). |
| `.github/agents/gpt-5.agent.md` | `.github/agents/gpt-5.agent.md` | **same** | No change required (already matches UI-I-Like). |
| `.github/agents/test.agent.md` | `.github/agents/test.agent.md` | **same** | No change required (already matches UI-I-Like). |
| `.github/workflows/ci.yml` | `.github/workflows/ci.yml` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `.gitignore` | `.gitignore` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `GUI_design_guide.md` | `GUI_design_guide.md` | **same** | No change required (already matches UI-I-Like). |
| `README.md` | `README.md` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/about/page.tsx` | `app/(site)/about/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/api/contact/route.ts` | `app/api/contact/route.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/contact/page.tsx` | `app/(site)/contact/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/globals.css` | `app/globals.css` | **same** | No change required (already matches UI-I-Like). |
| `app/insights/[slug]/page.tsx` | `app/(site)/insights/[slug]/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/insights/page.tsx` | `app/(site)/insights/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/lab/revenue-leak/page.tsx` | `app/(site)/lab/revenue-leak/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/layout.tsx` | `app/layout.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/loading.tsx` | `app/loading.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/page.tsx` | `app/(site)/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/privacy/page.tsx` | `app/(site)/privacy/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/process/page.tsx` | `app/(site)/process/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/services/page.tsx` | `app/(site)/services/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/trust/page.tsx` | `app/(site)/trust/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/work/[slug]/page.tsx` | `app/(site)/work/[slug]/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `app/work/page.tsx` | `app/(site)/work/page.tsx` | **mapped-diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/audit-modal.tsx` | `components/audit-modal.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/build-plan-module.tsx` | `components/build-plan-module.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/calibration-headline.tsx` | `components/calibration-headline.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/case-architecture-diagram.tsx` | `components/case-architecture-diagram.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/case-failure-modes.tsx` | `components/case-failure-modes.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/case-kpis.tsx` | `components/case-kpis.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/case-mode-panel.tsx` | `components/case-mode-panel.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/case-mode-toggle.tsx` | `components/case-mode-toggle.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/console-hud.tsx` | `components/console-hud.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/cover-art.tsx` | `components/cover-art.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/footer.tsx` | `components/footer.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/header.tsx` | `components/header.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/hero-background.tsx` | `components/hero-background.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/mdx/callout.tsx` | `components/mdx/callout.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/mdx/figure.tsx` | `components/mdx/figure.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/mdx/metric.tsx` | `components/mdx/metric.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/motion-config.tsx` | `components/motion-config.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/page-transition.tsx` | `components/page-transition.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/reveal.tsx` | `components/reveal.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/revenue-leak-detector.tsx` | `components/revenue-leak-detector.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/route-transition-layer.tsx` | `components/route-transition-layer.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/skill-bars.tsx` | `components/skill-bars.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/stagger.tsx` | `components/stagger.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/system-layer.tsx` | `components/system-layer.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/theme-provider.tsx` | `components/theme-provider.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/theme-toggle.tsx` | `components/theme-toggle.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/ui/badge.tsx` | `components/ui/badge.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/ui/button.tsx` | `components/ui/button.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/ui/card.tsx` | `components/ui/card.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/ui/dialog.tsx` | `components/ui/dialog.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/ui/input.tsx` | `components/ui/input.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/ui/label.tsx` | `components/ui/label.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `components/ui/textarea.tsx` | `components/ui/textarea.tsx` | **same** | No change required (already matches UI-I-Like). |
| `components/work-detail-hero.tsx` | `components/work-detail-hero.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `content/insights/designing-for-trust.mdx` | `content/insights/designing-for-trust.mdx` | **same** | No change required (already matches UI-I-Like). |
| `content/insights/graphql-at-scale.mdx` | `content/insights/graphql-at-scale.mdx` | **same** | No change required (already matches UI-I-Like). |
| `content/insights/rigor-in-products.mdx` | `content/insights/rigor-in-products.mdx` | **same** | No change required (already matches UI-I-Like). |
| `content/work/fintech-dashboard.mdx` | `content/work/fintech-dashboard.mdx` | **same** | No change required (already matches UI-I-Like). |
| `content/work/healthtech-platform.mdx` | `content/work/healthtech-platform.mdx` | **same** | No change required (already matches UI-I-Like). |
| `content/work/shopify-admin-sync.mdx` | `content/work/shopify-admin-sync.mdx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `e2e/app.spec.ts` | `e2e/app.spec.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `lib/cover/generate.ts` | `lib/cover/generate.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `lib/cover/seed.ts` | `lib/cover/seed.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `lib/mdx.ts` | `lib/mdx.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `lib/revenue-leak/model.ts` | `lib/revenue-leak/model.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `lib/site.ts` | `lib/site.ts` | **same** | No change required (already matches UI-I-Like). |
| `lib/utils.ts` | `lib/utils.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `mdx-components.tsx` | `mdx-components.tsx` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `middleware.ts` | `middleware.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `next.config.mjs` | `next.config.mjs` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `package-lock.json` | `package-lock.json` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `package.json` | `package.json` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `playwright.config.ts` | `playwright.config.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `postcss.config.js` | `postcss.config.js` | **same** | No change required (already matches UI-I-Like). |
| `public/file.svg` | `public/file.svg` | **same** | No change required (already matches UI-I-Like). |
| `public/globe.svg` | `public/globe.svg` | **same** | No change required (already matches UI-I-Like). |
| `public/next.svg` | `public/next.svg` | **same** | No change required (already matches UI-I-Like). |
| `public/vercel.svg` | `public/vercel.svg` | **same** | No change required (already matches UI-I-Like). |
| `public/window.svg` | `public/window.svg` | **same** | No change required (already matches UI-I-Like). |
| `server.log` | `` | **missing** | If feature is needed, add this file or port its patterns; otherwise ignore. |
| `tailwind.config.ts` | `tailwind.config.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `tests/setup.ts` | `tests/setup.ts` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `tests/skill-bars.test.tsx` | `tests/skill-bars.test.tsx` | **same** | No change required (already matches UI-I-Like). |
| `tsconfig.json` | `tsconfig.json` | **same** | No change required (already matches UI-I-Like). |
| `verify_changes.py` | `verify_changes.py` | **same** | No change required (already matches UI-I-Like). |
| `verify_final.py` | `verify_final.py` | **same** | No change required (already matches UI-I-Like). |
| `verify_visuals.py` | `verify_visuals.py` | **diff** | Port UI-I-Like styling/content into target file (overwrite then re-merge target-only logic). |
| `vitest.config.ts` | `vitest.config.ts` | **same** | No change required (already matches UI-I-Like). |

---

## 3) Critical file-by-file refactor notes

These are the files where styling diverges most. For each: **overwrite from UI-I-Like** then re-apply only the minimal necessary target-only logic.

### `components/ui/card.tsx`

**UI-I-Like source:** `components/ui/card.tsx`
**What’s different:** `18→13` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
ref={ref}
     className={cn(
-      "rounded-lg border bg-card text-card-foreground shadow-sm card-precision",
+      "card-precision",
       className
```

### `components/ui/dialog.tsx`

**UI-I-Like source:** `components/ui/dialog.tsx`
**What’s different:** `61→59` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
ref={ref}
     className={cn(
-      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
+      "fixed inset-0 z-50 bg-[rgba(var(--foreground-rgb),0.8)]  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
       className
     )}
```

### `components/header.tsx`

**UI-I-Like source:** `components/header.tsx`
**What’s different:** `59→70` class tokens; `4` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
className={cn(
-        "fixed top-0 w-full z-50 transition-all duration-300",
+        "fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent",
         isScrolled
-          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
+          ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
           : "bg-transparent"
       )}
     >
-      <div className="container flex h-20 items-center justify-between">
-        <Link
+      <div className="container flex h-16 items-center justify-between">
+        <VTLink
             href="/"
-            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
+            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center gap-2"
         >
+          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]" />
           {siteConfig.company}
-        </Link>
               key={link.href}
               href={link.href}
-              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-precision"
+              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
             >
               {link.label}
           ))}
-          <ThemeToggle />
-          <Button asChild variant="default" className="rounded-full px-6">
-            <Link href={siteConfig.cta.primary.href}>
+          {/* Desktop toggle — use data-testid so tests can target this specific instance */}
+          <ThemeToggle data-testid="theme-toggle-desktop" />
+          <Button asChild variant="default" className="rounded-full px-5 h-9 text-sm signal-sheen shadow-lg shadow-primary/20">
+            <VTLink href={siteConfig.cta.primary.href}>
               {siteConfig.cta.primary.text}
       {/* Progress Line */}
-      <motion.div
-        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
-        style={{ scaleX }}
-      />
+      {prefersReducedMotion ? (
+        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/30" />
+      ) : (
+        <motion.div
+          className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
+          style={{ scaleX }}
+        />
       {/* Mobile Nav */}
       {isOpen && (
-        <div className="md:hidden fixed inset-0 top-20 bg-background border-t border-border z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 fade-in duration-200">
+        <div
+          id="mobile-nav"
+          className="md:hidden fixed inset-0 top-20 bg-background border-t border-border z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 fade-in duration-200"
+        >
           <nav className="flex flex-col gap-6">
```

**Suspicious custom tokens to remove/replace in this file:** `bg-primary/30`, `shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]`, `shadow-primary/20`, `signal-sheen`

### `components/footer.tsx`

**UI-I-Like source:** `components/footer.tsx`
**What’s different:** `54→59` class tokens; `5` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
return (
-    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
+    <footer className="border-t border-border/40 bg-background">
       <div className="container py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
           <div className="md:col-span-2 space-y-6">
-            <h3 className="text-xl font-bold tracking-tight">Thompson Systems</h3>
+            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
+              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]" />
+              Vantus Systems
+            </h3>
             <ul className="space-y-3 text-sm">
               <li>
-                <Link href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
+                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                   Design Engineering
-                </Link>
               </li>
               <li>
-                <Link href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
+                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                   Frontend Architecture
-                </Link>
               </li>
               <li>
-                <Link href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
+                <VTLink href="/services" className="text-foreground/80 hover:text-foreground transition-colors">
                   Commerce Systems
-                </Link>
-                target="_blank"
-                rel="noreferrer"
-                className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
-                aria-label="GitHub"
-              >
-                <Github className="h-4 w-4" />
-              </a>
-              <a
-                target="_blank"
-                rel="noreferrer"
-                className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
-                aria-label="LinkedIn"
-              >
-                <Linkedin className="h-4 w-4" />
-              </a>
-              <a
-                target="_blank"
-                rel="noreferrer"
-                className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
-                aria-label="Twitter"
-              >
-                <Twitter className="h-4 w-4" />
-              </a>
+              {siteConfig.links.github ? (
+                  target="_blank"
+                  rel="noreferrer"
+                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
+                  aria-label="GitHub"
+                >
+                  <Github className="h-4 w-4" />
+                </a>
+              ) : null}
+                  target="_blank"
+                  rel="noreferrer"
+                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
+                  aria-label="LinkedIn"
+                >
+                  <Linkedin className="h-4 w-4" />
+                </a>
+              ) : null}
+                  target="_blank"
+                  rel="noreferrer"
+                  className="p-2 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-all duration-300"
+                  aria-label="Twitter"
+                >
+                  <Twitter className="h-4 w-4" />
+                </a>
+              ) : null}
           </p>
           <div className="flex gap-6 text-xs text-muted-foreground">
-            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
-            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
+            <VTLink href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</VTLink>
+            <VTLink href="/terms" className="hover:text-foreground transition-colors">Terms of Service</VTLink>
           </div>
           <div className="flex items-center gap-2 text-xs text-muted-foreground">
-             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
-             <span>Systems Operational</span>
+            <span
+              className={cn(
+                "w-2 h-2 rounded-full",
+                proofStatus === "verified" ? "bg-emerald-500" : proofStatus === "degraded" ? "bg-amber-500" : "bg-primary/60"
+              )}
+            ></span>
```

**Suspicious custom tokens to remove/replace in this file:** `bg-primary`, `bg-primary/60`, `degraded`, `shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]`, `verified`

### `components/console-hud.tsx`

**UI-I-Like source:** `components/console-hud.tsx`
**What’s different:** `51→54` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
return (
-    <div className="fixed inset-0 pointer-events-none z-[9999] text-[10px] font-mono tracking-wider text-muted-foreground select-none overflow-hidden">
+    <div
+      className="console-hud fixed inset-0 pointer-events-none z-[9999] text-[10px] font-mono tracking-wider text-muted-foreground select-none overflow-hidden"
+      data-sync={syncing ? "1" : "0"}
+    >
             {/* Top Right Pill */}
             <div className="absolute top-6 right-6 flex items-center gap-2 bg-background/80 backdrop-blur border border-border/40 px-3 py-1 rounded-full shadow-sm">
-               <span className={cn("w-1.5 h-1.5 rounded-full bg-green-500", syncing && "animate-pulse")} />
-               <span className="text-foreground/80">OPERATIONAL</span>
+              <span className={cn("w-1.5 h-1.5 rounded-full", audit.auditOk ? "bg-green-500" : "bg-amber-500", syncing && "animate-pulse")} />
+              <span className="text-foreground/80">{audit.auditOk ? "VERIFIED" : "DEGRADED"}</span>
             </div>
 
             {/* Bottom Bar */}
             <div
-              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-1.5 rounded-full bg-background/50 backdrop-blur border border-white/5 shadow-sm whitespace-nowrap"
-              data-sync={syncing ? "1" : "0"}
+              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-1.5 rounded-full bg-background/50 backdrop-blur border border-border/5 shadow-sm whitespace-nowrap"
             >
-               <span>BUILD: HARDENED</span>
-               <span className="text-border">|</span>
-               <span>CSP: STRICT</span>
-               <span className="text-border">|</span>
-               <span className={cn("transition-colors duration-300", syncing ? "text-primary" : "")}>LATENCY: &lt;50ms</span>
+              <span>BUILD: {audit.buildOk ? "VERIFIED" : "UNVERIFIED"}</span>
+              <span className="text-border">|</span>
+              <span>HEADERS: {audit.headersOk ? "VERIFIED" : "DEGRADED"}</span>
+              <span className="text-border">|</span>
+              <span>{auditLabel}</span>
+              <span className="text-border">|</span>
+              <span className={cn("hud-sync transition-colors duration-300", syncing ? "text-primary" : "")}
+              >
+                {ttfb === null ? "TTFB: --" : `TTFB: ${ttfb}ms`}
```

### `components/system-layer.tsx`

**UI-I-Like source:** `components/system-layer.tsx`
**What’s different:** `5→5` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
const TONES: Record<ToneKey, { h: number; s: number; l: number; glowA: number }> = {
-  home:    { h: 210, s: 90, l: 60, glowA: 0.10 },
-  work:    { h: 265, s: 85, l: 62, glowA: 0.11 },
-  insights:{ h: 190, s: 80, l: 58, glowA: 0.10 },
-  contact: { h: 140, s: 75, l: 55, glowA: 0.09 },
-  about:   { h:  30, s: 85, l: 60, glowA: 0.09 },
-  default: { h: 220, s: 70, l: 60, glowA: 0.08 },
+  home:    { h: 16,  s: 60, l: 55, glowA: 0.12 }, // Copper
+  work:    { h: 170, s: 65, l: 40, glowA: 0.12 }, // Patina
+  insights:{ h: 35,  s: 60, l: 55, glowA: 0.12 }, // Brass
+  contact: { h: 220, s: 20, l: 20, glowA: 0.15 }, // Graphite
+  about:   { h: 220, s: 20, l: 20, glowA: 0.15 }, // Graphite
+  default: { h: 16,  s: 50, l: 50, glowA: 0.08 },
 };
```

### `components/theme-toggle.tsx`

**UI-I-Like source:** `components/theme-toggle.tsx`
**What’s different:** `10→53` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
import { cn } from "@/lib/utils";
 
-export function ThemeToggle({ className }: { className?: string }) {
-  const { theme, setTheme } = useTheme();
-  const [mounted, setMounted] = React.useState(false);
+export function ThemeToggle({
+  className,
+  ...props
+}: React.HTMLAttributes<HTMLDivElement>) {
-    return (
-      <button
-        className={cn(
-          "inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-accent transition-colors",
-          className
-        )}
-        aria-label="Toggle theme"
+  return (
+    <div className={cn("relative", className)} ref={ref} {...props}>
+      <Button 
+        variant="ghost" 
+        size="icon" 
+        onClick={() => setOpen(!open)}
+        className="rounded-full w-10 h-10 hover:bg-accent transition-colors"
       >
-        <Sun className="h-5 w-5" />
-      </button>
-    );
-    <button
-      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
-      className={cn(
-        "inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-accent transition-colors",
-        className
+        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
+        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
+        <span className="sr-only">Toggle theme</span>
+      </Button>
+      
+      {open && (
+        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-popover p-1 shadow-lg animate-in fade-in zoom-in-95 duration-200 z-50">
+          <div className="flex flex-col gap-1">
+            <button
+              onClick={() => { setTheme("light"); setOpen(false); }}
+              className={cn(
+                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
+                theme === "light" ? "bg-accent text-accent-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
+              )}
+            >
+              <Sun className="h-4 w-4" /> Light
+            </button>
+            <button
+              onClick={() => { setTheme("dark"); setOpen(false); }}
+              className={cn(
+                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
+                theme === "dark" ? "bg-accent text-accent-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
+              )}
+            >
+              <Moon className="h-4 w-4" /> Dark
+            </button>
+            <button
+              onClick={() => { setTheme("system"); setOpen(false); }}
+              className={cn(
+                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
+                theme === "system" ? "bg-accent text-accent-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"
+              )}
+            >
+              <Laptop className="h-4 w-4" /> System
+            </button>
+          </div>
-    >
-      {theme === "dark" ? (
-        <Sun className="h-5 w-5" />
-      ) : (
-        <Moon className="h-5 w-5" />
-      )}
-    </button>
```

### `components/work-detail-hero.tsx`

**UI-I-Like source:** `components/work-detail-hero.tsx`
**What’s different:** `45→93` class tokens; `1` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
}: WorkDetailHeroProps) {
   return (
-    <div className={`relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-12 md:pb-24 overflow-hidden`}>
+    <div className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-12 md:pb-24 overflow-hidden">
       {/* Shared Element Background */}
       <motion.div
+        <CoverArt slug={slug} imageSrc={coverImage} priority sizes="100vw" />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
+        <div className="absolute inset-0 pointer-events-none">
+          <div className="absolute inset-6 border border-border/10 rounded-[32px]" />
+          <div className="absolute inset-6 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
+          <div className="absolute top-10 left-10 h-3 w-16 bg-white/60 blur-sm opacity-40" />
+          <div className="absolute top-12 right-16 h-2 w-10 bg-white/50 blur-sm opacity-40" />
+          <div className="absolute bottom-12 right-12 h-2 w-12 bg-white/40 blur-sm opacity-30" />
+        </div>
       </motion.div>
 
         {/* Shared Element Title */}
-        <div className="mb-6">
-           <motion.h1
-             layoutId={`title-${slug}`}
-             className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance inline-block"
-           >
-             {title}
-           </motion.h1>
+        <div className="mb-6 relative">
+          <motion.h1
+            layoutId={`title-${slug}`}
+            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance inline-block"
+          >
+            {title}
+          </motion.h1>
+          <span aria-hidden="true" className="absolute left-0 top-0 -z-10 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-card-foreground/10 blur-sm">
+            {title}
+          </span>
+
+        <Reveal delay={0.15}>
+          <div className="mt-6 inline-flex flex-wrap gap-3 rounded-2xl bg-background/70 border border-border/10 backdrop-blur-md px-5 py-4 text-sm text-foreground/90">
+            {role ? (
+              <div className="flex items-center gap-2">
+                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Role</span>
+                <span className="font-medium">{role}</span>
+              </div>
+            ) : null}
+            {timeline ? (
+              <div className="flex items-center gap-2">
+                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Timeline</span>
+                <span className="font-medium">{timeline}</span>
+              </div>
+            ) : null}
+            {outcome ? (
+              <div className="flex items-center gap-2">
+                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Outcome</span>
+                <span className="font-medium text-primary">{outcome}</span>
+              </div>
+            ) : null}
```

**Suspicious custom tokens to remove/replace in this file:** `text-primary`

### `components/revenue-leak-detector.tsx`

**UI-I-Like source:** `components/revenue-leak-detector.tsx`
**What’s different:** `81→123` class tokens; `3` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
+
+  return (
+    <div className="w-full h-full relative font-mono text-xs select-none">
+       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
+          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
+             <line
+             d={areaPath}
+             fill="currentColor"
+             className="text-destructive/10"
+             initial={{ opacity: 0 }}
+             animate={{ opacity: 1 }}
+             stroke="currentColor"
+             strokeWidth="2"
+             className="text-primary"
+             initial={{ pathLength: 0 }}
+             animate={{ pathLength: 1 }}
+             stroke="currentColor"
+             strokeWidth="2"
+             className="text-muted-foreground"
+             strokeDasharray="4 4"
+             initial={{ pathLength: 0 }}
+             transition={{ duration: 1.5, ease: "easeInOut" }}
+          />
+          <text x={getX(dataPoints - 1) + 10} y={getY(revenue * dataPoints)} fill="currentColor" className="text-primary font-bold">Optimized</text>
+          <text x={getX(dataPoints - 1) + 10} y={getY((revenue - monthlyLeak) * dataPoints)} fill="currentColor" className="text-muted-foreground">Current</text>
+       </svg>
+    </div>
+
   return (
-    <div className="w-full max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
-
-      {/* Left Panel: Inputs */}
-      <div className="flex-1 p-8 bg-secondary/10 border-r border-border/50">
+    <div className="w-full mx-auto bg-card border border-border rounded-none md:rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
+
+      {/* Left Panel: Inputs (Diagnostic Controls) */}
+      <div className="w-full lg:w-1/3 p-6 md:p-8 bg-muted/30 border-r border-border flex flex-col">
          <div className="mb-8">
-            <h2 className="text-xl font-bold font-mono uppercase tracking-tight flex items-center gap-2">
-               <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
-               Diagnostics Input
-            </h2>
-            <p className="text-sm text-muted-foreground mt-2">Adjust parameters to model system efficiency.</p>
-         </div>
-
-         <div className="space-y-8">
+            <div className="flex items-center gap-2 mb-2">
+                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
+                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Input Parameters</span>
+            </div>
+            <h2 className="text-lg font-bold tracking-tight">System Configuration</h2>
+         </div>
+
+         <div className="space-y-8 flex-1">
             {/* Revenue Input */}
-            <div className="space-y-4">
-               <div className="flex justify-between text-sm font-medium">
-                  <label>Monthly Revenue</label>
-                  <span className="font-mono text-primary">${revenue.toLocaleString()}</span>
-               </div>
-               <input
-                  value={revenue}
-                  onChange={(e) => setRevenue(Number(e.target.value))}
-                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
-               />
+            <div className="space-y-3 group">
+               <label htmlFor="revenue-input" className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Monthly Revenue ($)</label>
+               <div className="flex items-center gap-4">
+                  <input
+                     id="revenue-input"
+                     value={revenue}
+                     onChange={(e) => setRevenue(Number(e.target.value))}
+                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
+                  />
+                  <input
+                     value={revenue}
+                     onChange={(e) => setRevenue(Number(e.target.value))}
+                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
+                  />
+               </div>
 
              {/* Conversion Input */}
-             <div className="space-y-4">
-               <div className="flex justify-between text-sm font-medium">
-                  <label>Conversion Rate</label>
-                  <span className="font-mono text-primary">{conversion.toFixed(1)}%</span>
-               </div>
-               <input
-                  value={conversion}
-                  onChange={(e) => setConversion(Number(e.target.value))}
-                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
-               />
+             <div className="space-y-3 group">
+               <label htmlFor="conversion-input" className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Conversion Rate (%)</label>
+               <div className="flex items-center gap-4">
+                  <input
+                     id="conversion-input"
+                     value={conversion}
+                     onChange={(e) => setConversion(Number(e.target.value))}
+                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
+                  />
+                  <input
+                     value={conversion}
+                     onChange={(e) => setConversion(Number(e.target.value))}
+                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
+                  />
+               </div>
 
              {/* Response Time Input */}
-             <div className="space-y-4">
-               <div className="flex justify-between text-sm font-medium">
-                  <label>Lead Response Time</label>
-                  <span className="font-mono text-primary">{responseTime} min</span>
-               </div>
-               <input
-                  value={responseTime}
-                  onChange={(e) => setResponseTime(Number(e.target.value))}
-                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
-               />
-            </div>
+             <div className="space-y-3 group">
+               <label htmlFor="response-time-input" className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Lead Response Time (min)</label>
+               <div className="flex items-center gap-4">
+                  <input
+                     id="response-time-input"
+                     value={responseTime}
+                     onChange={(e) => setResponseTime(Number(e.target.value))}
+                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
+                  />
+                  <input
+                     value={responseTime}
+                     onChange={(e) => setResponseTime(Number(e.target.value))}
+                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
+                  />
+               </div>
+
+         {/* System Status Footer (Left) */}
+         <div className="mt-8 pt-6 border-t border-border/50">
+             <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground">
+                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
+                 System: Offline / Local Client
+             </div>
 
-      {/* Right Panel: Output */}
-      <div className="flex-1 p-8 bg-background relative flex flex-col justify-between">
-
-         {/* Status Bar */}
-         <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-8 border-b border-border/30 pb-4">
-            <span>Model: v1.0.4</span>
-            <span className={cn(
-                "font-bold",
-                result.band === "high" ? "text-destructive" :
-                result.band === "medium" ? "text-orange-500" : "text-green-500"
-            )}>
-               RISK: {result.band}
-
-         {/* Visual Gauge */}
-         <div className="relative h-48 w-full flex items-center justify-center mb-6">
-             <svg className="w-48 h-48 transform -rotate-90">
-                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-secondary" />
-                <motion.circle
-                   cx="96" cy="96" r="88"
-                   strokeWidth="12"
-                   fill="none"
-                   className={cn(
-                       result.band === "high" ? "text-destructive" :
-                       result.band === "medium" ? "text-orange-500" : "text-green-500"
-                   )}
-                   strokeDasharray={553} // 2*pi*88
-                />
-             </svg>
-             <div className="absolute inset-0 flex flex-col items-center justify-center">
-                 <span className="text-5xl font-bold tracking-tighter">{result.riskScore}</span>
-                 <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Risk Score</span>
+      {/* Right Panel: Telemetry & Results */}
+      <div className="w-full lg:w-2/3 p-6 md:p-8 bg-background flex flex-col">
+
+         {/* Header Telemetry */}
+         <div className="grid grid-cols-2 gap-8 mb-8">
+            <div>
+               <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Risk Assessment</div>
+               <div className={cn(
+                  "text-4xl font-mono font-bold tracking-tight",
+                  result.band === "high" ? "text-destructive" :
+                  result.band === "medium" ? "text-orange-500" : "text-green-500"
+               )}>
+                  {result.riskScore}/100
+            </div>
+            <div>
+               <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Est. 12-Mo Revenue Leak</div>
+               <div className="text-4xl font-mono font-bold tracking-tight text-foreground">
+                  ${(result.monthlyLeak * 12).toLocaleString()}
+               </div>
+               <div className="text-xs text-muted-foreground mt-1">
+                  Based on current trajectory vs. optimized state
+               </div>
+
+         {/* Chart Area */}
+         <div className="flex-1 min-h-[250px] bg-secondary/5 border border-border/50 rounded-sm mb-8 relative p-4">
+             <div className="absolute top-4 left-4 text-[10px] font-mono uppercase text-muted-foreground">
+                Projection Model: 12-Month Horizon
              </div>
-
-         {/* Financial Impact */}
-         <div className="text-center space-y-2 mb-8">
-            <p className="text-sm text-muted-foreground">Est. Monthly Revenue Leak</p>
-            <motion.div
-               className="text-3xl md:text-4xl font-bold font-mono text-foreground"
-               key={result.monthlyLeak}
-               initial={{ opacity: 0.5, scale: 0.95 }}
+
+         {/* Recommendations & Actions */}
+         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
+            <div>
+               <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
+                  <Activity className="w-4 h-4 text-primary" />
+                  Diagnostic Report
+               </h3>
+               <div className="space-y-4">
+                  {result.remediation.map((item, i) => (
+                      <div key={i} className="text-sm border-l-2 border-border pl-3 py-1">
+                          <div className={cn("font-medium mb-1", item.type === 'critical' ? 'text-destructive' : 'text-foreground')}>
+                             {item.issue}
+                          </div>
+                          <div className="text-muted-foreground text-xs leading-relaxed">
+                             {item.action}
+                          </div>
+                          {item.link && (
+                             <Link href={item.link.href} className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2 hover:underline">
+                                {item.link.label} <ArrowRight className="w-3 h-3" />
+                             </Link>
+                          )}
+            </div>
+
+            <div className="flex flex-col justify-end space-y-4">
+                <div className="bg-secondary/20 p-4 rounded-sm border border-border/50">
+                    <div className="text-xs font-mono uppercase text-muted-foreground mb-2">Action Required</div>
+                    <p className="text-sm text-foreground mb-4">
+                       {result.band === 'high'
+                          ? "Critical system inefficiencies detected. Immediate architectural review recommended."
+                          : "Optimization opportunities identified. Schedule a technical deep-dive."}
+                    </p>
+                    <Button className="w-full" asChild>
+                       <Link href="/contact">Book Technical Audit</Link>
+                    </Button>
+                </div>
+                <Button variant="outline" className="w-full font-mono text-xs" onClick={handleExport}>
+                   <Download className="w-3 h-3 mr-2" /> Export Report
+                </Button>
+            </div>
+
+         {/* Methodology Accordion (Simple Custom Implementation) */}
+         <div className="mt-8 pt-4 border-t border-border">
+            <button
+              onClick={() => setMethodologyOpen(!methodologyOpen)}
+              className="w-full flex items-center justify-between text-xs font-mono uppercase text-muted-foreground hover:text-foreground py-2 focus:outline-none"
             >
-               ${result.monthlyLeak.toLocaleString()}
-
-         {/* Remediation */}
-         <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 text-sm">
-            <div className="font-semibold mb-2 text-foreground">Recommended Actions:</div>
-            <ul className="list-disc list-inside text-muted-foreground space-y-1">
-               {result.remediation.map((item, i) => (
-                  <li key={i}>{item}</li>
-            </ul>
+               <span>[ + View Calculation Methodology ]</span>
+               <ChevronDown className={cn("w-4 h-4 transition-transform", methodologyOpen && "rotate-180")} />
+            </button>
+            <AnimatePresence>
+                  animate={{ height: "auto", opacity: 1 }}
+                  exit={{ height: 0, opacity: 0 }}
+                  className="overflow-hidden"
+                >
+                  <div className="text-sm text-muted-foreground space-y-4 pl-4 border-l border-primary/20 py-4">
+                     <div className="space-y-1">
+                        <strong className="text-foreground">Algorithmic Basis & Data Sources</strong>
+                        <p>This diagnostic instrument models <em>Latency-Induced Opportunity Cost</em>. The algorithm applies a non-linear decay function to your baseline <em>Conversion Rate</em>, correlated against the <em>Lead Response Time</em> delta.</p>
+                     </div>
+                     <div className="space-y-1">
+                        <strong className="text-foreground">Key Benchmarks</strong>
+                        <ul className="list-disc list-inside space-y-1">
+                           <li><strong>The 5-Minute Threshold:</strong> Based on data from the <em>Lead Response Management Study</em>, the odds of qualifying a lead decrease significantly if response time exceeds 5 minutes.</li>
+                           <li><strong>Decay Trajectory:</strong> Beyond the initial 5-minute window, lead viability follows a logarithmic decay curve. This model projects that decay against your <em>Monthly Revenue</em> to estimate the delta between <em>Optimized Performance</em> (T &lt; 5min) and <em>Current State</em>.</li>
+                        </ul>
+                     </div>
+                     <div className="space-y-1">
+                        <strong className="text-foreground">Privacy Protocol</strong>
+                        <p>All computations are executed locally within the client-side runtime environment. No financial inputs or telemetry data are transmitted to Thompson Systems servers.</p>
+                     </div>
```

**Suspicious custom tokens to remove/replace in this file:** `border-primary/20`, `focus:ring-primary`, `group-hover:text-primary`

### `components/case-mode-toggle.tsx`

**UI-I-Like source:** `components/case-mode-toggle.tsx`
**What’s different:** `10→10` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
(No class/style deltas detected; differences are structural/logic.)
```

### `components/case-mode-panel.tsx`

**UI-I-Like source:** `components/case-mode-panel.tsx`
**What’s different:** `43→44` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
<div className="my-12 rounded-2xl border border-border bg-card/50 overflow-hidden shadow-sm">
-        {/* Header / Controls */}
-        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-border/50 bg-secondary/20">
-            <div>
-               <h3 className="font-semibold text-lg">System Behavior Analysis</h3>
-               <p className="text-sm text-muted-foreground">Interactive architecture view</p>
-            </div>
-            <CaseModeToggle mode={mode} setMode={setMode} />
+      {/* Header / Controls */}
+      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-border/50 bg-secondary/20">
+        <div>
+          <h3 className="font-semibold text-lg">System Behavior Analysis</h3>
+          <p className="text-sm text-muted-foreground">Interactive architecture view</p>
+        </div>
+        <CaseModeToggle mode={mode} setMode={setMode} />
+
+      {/* Content Grid */}
+      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50 min-h-[400px]">
+        {/* Left: Diagram */}
+        <div className="lg:col-span-2 p-6 bg-background relative flex flex-col">
+          <div className="flex-1 min-h-[300px] flex items-center justify-center">
+            <CaseArchitectureDiagram mode={mode} />
+          </div>
+              exit={{ opacity: 0, y: -8 }}
+              transition={{ duration: 0.2 }}
+              className="mt-6 space-y-4"
+            >
+              <p className="text-sm text-muted-foreground">
+                {resolvedData.narratives[mode]}
+              </p>
 
-        {/* Content Grid */}
-        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50 min-h-[400px]">
-
-            {/* Left: Diagram */}
-            <div className="lg:col-span-2 p-6 bg-background relative flex flex-col">
-               <div className="flex-1 min-h-[300px] flex items-center justify-center">
-                  <CaseArchitectureDiagram mode={mode} />
-               </div>
-               {/* Contextual Failure Log Overlay */}
-               {mode !== "normal" && (
-                   <div className="mt-6">
-                      <CaseFailureModes mode={mode} failures={data.failures[mode as Exclude<Mode, "normal">] || []} />
-                   </div>
-
-            {/* Right: KPIs */}
-            <div className="p-6 bg-secondary/5 space-y-6">
-               <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Performance Metrics</div>
-               <CaseKpis mode={mode} data={data.kpis} />
-            </div>
-
+        {/* Right: KPIs */}
+        <div className="p-6 bg-secondary/5 space-y-6">
+          <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Performance Metrics</div>
+          <AnimatePresence mode="wait">
+            <motion.div
```

### `components/case-architecture-diagram.tsx`

**UI-I-Like source:** `components/case-architecture-diagram.tsx`
**What’s different:** `16→15` class tokens; `1` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
+  const accentClass =
+    mode === "incident"
+      ? "text-destructive"
+      : mode === "scale"
+        ? "text-primary"
+        : "text-foreground";
+
+  const railGlowClass =
+    mode === "incident" ? "text-destructive/60" : "text-primary/60";
 
   return (
-    <svg viewBox="0 0 400 200" className="w-full h-full text-sm font-mono select-none">
-       {/* Background Grid */}
-       <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
-         <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border opacity-20"/>
-       </pattern>
-       <rect width="400" height="200" fill="url(#grid)" />
+    <svg viewBox="0 0 520 300" className="w-full h-full text-sm font-mono select-none">
+      {/* Background Grid */}
+      <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
+        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.6" className="text-border/40" />
+      </pattern>
+      <rect width="520" height="300" fill={`url(#${gridId})`} />
-         fill="none"
-         stroke="currentColor"
-         className={mode === "scale" ? "text-primary" : "text-border"}
-         animate={{ strokeDasharray: mode === "scale" ? "4 2" : "0 0" }} // dashed moving line simulation if possible, or just style
-         strokeWidth={getStrokeWidth('web')}
-         fill="none"
-         stroke="currentColor"
-         className={mode === "incident" ? "text-destructive" : "text-border"}
-         strokeWidth={getStrokeWidth('db')}
-       />
+      {/* Layered surfaces */}
+      <rect x="40" y="50" width="440" height="190" rx="20" fill="currentColor" className="text-secondary/30" />
+      <rect x="70" y="70" width="380" height="150" rx="18" fill="currentColor" className="text-secondary/50" />
+      <rect x="100" y="90" width="320" height="110" rx="16" fill="currentColor" className="text-secondary" />
 
-       {/* Node: Client */}
-       <g transform="translate(30, 100)">
-          <circle r="20" fill="none" stroke="currentColor" className="text-foreground" />
-          <text textAnchor="middle" y="4" className="fill-foreground text-[10px]">USR</text>
-       </g>
+      {/* Rails */}
+        fill="none"
+        stroke="currentColor"
+        className={accentClass}
+        strokeWidth={2}
+        strokeLinecap="round"
+        fill="none"
+        stroke="currentColor"
+        className={mode === "incident" ? "text-destructive/40" : "text-primary/30"}
+        strokeWidth={1.4}
+        strokeLinecap="round"
+          fill="none"
+          stroke="currentColor"
+          className={railGlowClass}
+          strokeWidth={4}
+          strokeLinecap="round"
-       {/* Node: Web */}
-       <g transform="translate(170, 100)">
-          <rect x="-30" y="-20" width="60" height="40" rx="4" fill="currentColor" className="text-secondary" stroke="currentColor" strokeWidth="1" />
-          <text textAnchor="middle" y="4" className="fill-foreground text-[10px]">API GW</text>
+      {/* Nodes */}
+      <g className="text-foreground">
+        <circle cx="130" cy="155" r="14" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
+        <text x="130" y="158" textAnchor="middle" className="fill-foreground text-[9px]">EDGE</text>
 
-          {/* Scale indicators */}
-          {mode === "scale" && (
-            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
-               <rect x="-35" y="-25" width="70" height="50" rx="6" fill="none" stroke="currentColor" className="text-primary" strokeDasharray="4 2" />
-               <text x="0" y="-35" textAnchor="middle" className="fill-primary text-[8px]">AUTOSCALE</text>
-            </motion.g>
-          )}
-       </g>
+        <rect x="206" y="136" width="28" height="38" rx="6" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
+        <text x="220" y="158" textAnchor="middle" className="fill-foreground text-[9px]">QUEUE</text>
 
-       {/* Node: DB */}
-       <g transform="translate(310, 100)">
-          <path d="M -20 -15 C -20 -25 20 -25 20 -15 L 20 15 C 20 25 -20 25 -20 15 Z" fill="currentColor" className={mode === "incident" ? "text-destructive/20" : "text-secondary"} stroke="currentColor" strokeWidth="1" />
-          <text textAnchor="middle" y="4" className={`text-[10px] ${mode === "incident" ? "fill-destructive font-bold" : "fill-foreground"}`}>DB PRIMARY</text>
+        <rect x="286" y="136" width="28" height="38" rx="6" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
+        <text x="300" y="158" textAnchor="middle" className="fill-foreground text-[9px]">CORE</text>
 
-           {/* Incident indicators */}
-          {mode === "incident" && (
-            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
-               <text x="0" y="35" textAnchor="middle" className="fill-destructive text-[8px] animate-pulse">FAILOVER...</text>
-            </motion.g>
-          )}
-       </g>
+        <circle cx="390" cy="155" r="14" fill="currentColor" className="text-background" stroke="currentColor" strokeWidth="1" />
+        <text x="390" y="158" textAnchor="middle" className="fill-foreground text-[9px]">DATA</text>
+      </g>
 
+      {/* Mode badge */}
+      <g transform="translate(330, 60)">
+        <rect width="120" height="28" rx="14" fill="currentColor" className={mode === "incident" ? "text-destructive/15" : "text-primary/10"} />
+        <text x="60" y="18" textAnchor="middle" className={`text-[9px] tracking-[0.2em] ${accentClass}`}>
+          MODE: {mode.toUpperCase()}
+        </text>
+
+      {/* Legend */}
+      <g transform="translate(60, 232)" className="text-[9px]">
+        <text x="0" y="0" className="fill-muted-foreground" letterSpacing="2">LEGEND</text>
+        <g transform="translate(0, 12)">
+          <circle cx="6" cy="6" r="3" fill="currentColor" className="text-primary/70" />
+          <text x="16" y="9" className="fill-muted-foreground">Flow rail</text>
+        </g>
+        <g transform="translate(90, 12)">
+          <rect x="0" y="3" width="8" height="6" rx="2" fill="currentColor" className="text-secondary" />
+          <text x="14" y="9" className="fill-muted-foreground">Surface</text>
+        </g>
+      </g>
```

**Suspicious custom tokens to remove/replace in this file:** `text-primary/70`

### `content/work/shopify-admin-sync.mdx`

**UI-I-Like source:** `content/work/shopify-admin-sync.mdx`
**What’s different:** `28→0` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
The system uses a producer-consumer architecture with Redis queues to handle high throughput and ensure no data is lost during spikes.
 
-<div className="my-12 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
-<svg viewBox="0 0 800 320" className="w-full h-auto font-sans text-xs">
-  <defs>
-    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
-      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-zinc-400" />
-    </marker>
-  </defs>
 
-  {/* Shopify */}
-  <rect x="50" y="110" width="120" height="100" rx="8" fill="transparent" stroke="currentColor" className="text-green-500" strokeWidth="2" />
-  <text x="110" y="165" textAnchor="middle" fill="currentColor" className="text-foreground font-semibold text-sm">Shopify Plus</text>
-  <text x="110" y="185" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">GraphQL Admin API</text>
-
-  {/* Arrow 1 */}
-  <line x1="170" y1="160" x2="240" y2="160" stroke="currentColor" className="text-zinc-400" strokeWidth="2" markerEnd="url(#arrowhead)" />
-  <text x="205" y="150" textAnchor="middle" fill="currentColor" className="text-zinc-500 text-[10px]">Webhooks</text>
-
-  {/* Ingestion / Queue */}
-  <rect x="250" y="110" width="120" height="100" rx="8" fill="transparent" stroke="currentColor" className="text-blue-500" strokeWidth="2" />
-  <text x="310" y="155" textAnchor="middle" fill="currentColor" className="text-foreground font-semibold text-sm">Ingestion</text>
-  <text x="310" y="175" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">Redis Queue</text>
-  <text x="310" y="190" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">(BullMQ)</text>
-
-  {/* Arrow 2 */}
-  <line x1="370" y1="160" x2="440" y2="160" stroke="currentColor" className="text-zinc-400" strokeWidth="2" markerEnd="url(#arrowhead)" />
-  <text x="405" y="150" textAnchor="middle" fill="currentColor" className="text-zinc-500 text-[10px]">Process Jobs</text>
-
-  {/* Sync Engine */}
-  <rect x="450" y="60" width="140" height="200" rx="8" fill="transparent" stroke="currentColor" className="text-violet-500" strokeWidth="2" />
-  <text x="520" y="90" textAnchor="middle" fill="currentColor" className="text-foreground font-semibold text-sm">Sync Engine</text>
-  <line x1="470" y1="120" x2="610" y2="120" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="1" />
-
-  <text x="520" y="150" textAnchor="middle" fill="currentColor" className="text-foreground text-xs">Transformer</text>
-  <text x="520" y="170" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">YAML Mapping</text>
-
-  <rect x="470" y="190" width="100" height="40" rx="4" fill="transparent" stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" strokeWidth="1" transform="translate(20,0)"/>
-  <text x="520" y="215" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">Safety Gates</text>
-
-  {/* Arrow 3 */}
-  <line x1="590" y1="160" x2="660" y2="160" stroke="currentColor" className="text-zinc-400" strokeWidth="2" markerEnd="url(#arrowhead)" />
-  <text x="625" y="150" textAnchor="middle" fill="currentColor" className="text-zinc-500 text-[10px]">JSON API</text>
-
-  {/* ERPNext */}
-  <rect x="670" y="110" width="120" height="100" rx="8" fill="transparent" stroke="currentColor" className="text-orange-500" strokeWidth="2" />
-  <text x="730" y="165" textAnchor="middle" fill="currentColor" className="text-foreground font-semibold text-sm">ERPNext</text>
-  <text x="730" y="185" textAnchor="middle" fill="currentColor" className="text-muted-foreground text-[10px]">Frappe Framework</text>
-
-</svg>
```

### `app/(site)/page.tsx`

**UI-I-Like source:** `app/page.tsx`
**What’s different:** `162→135` class tokens; `2` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
-              <CalibrationHeadline
-                text={siteConfig.tagline}
-                className="mb-10"
-              />
+              <div className="mb-10">
+                <CalibrationHeadline text={siteConfig.tagline} />
+              </div>
             <Reveal delay={0.4}>
-              <BuildPlanModule />
+              <div className="card-precision rounded-2xl p-6 md:p-8 signal-sheen backdrop-blur-md bg-background/50">
+                <div className="flex items-start justify-between gap-6">
+                  <div>
+                    <p className="text-sm font-medium tracking-wider text-primary/90 uppercase">New</p>
+                    <h2 className="mt-2 text-2xl font-bold tracking-tight">The Living Blueprint</h2>
+                    <p className="mt-3 text-muted-foreground leading-relaxed">
+                      A scroll-driven assembly that turns the build plan into something you can inspect.
+                    </p>
+                </div>
+
+                <ul className="mt-6 space-y-3 text-sm">
+                  {["8-phase assembly (0→7)", "Sticky split-screen on desktop", "Mobile-safe simplified fallback"].map(
+                    (item) => (
+                      <li key={item} className="flex items-center gap-3 text-foreground/90">
+                        <CheckCircle2 className="h-4 w-4 text-primary" />
+                        <span>{item}</span>
+                      </li>
+                </ul>
+
+                <div className="mt-8 flex flex-col sm:flex-row gap-3">
+                  <Button asChild size="lg" className="rounded-full h-12 px-7 signal-sheen">
+                    <VTLink href="/living-blueprint">
+                      Explore the Blueprint <ArrowRight className="ml-2 h-4 w-4" />
+                    </VTLink>
+                  </Button>
+                  <Button asChild variant="ghost" size="lg" className="rounded-full h-12 px-7">
+                    <VTLink href="/process">
+                      See the full process <ArrowRight className="ml-2 h-4 w-4" />
+                    </VTLink>
+                  </Button>
-      {/* SOCIAL PROOF / METRICS */}
-      <section
-        className="py-12 border-b border-border/50 bg-background/50"
+      {/* SELF-AUDIT PROOF PANEL */}
+      <section
+        id="proof"
+        className="py-16 border-b border-border/50 bg-background/50"
         data-hud-section="Proof"
       >
         <div className="container">
-           <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
-             Delivering outcomes for high-growth companies
-           </p>
-           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
-              {/* Using text-based metrics/logos for premium feel if no logos available */}
-              <div className="text-center">
-                 <h4 className="text-3xl font-bold text-foreground">$50M+</h4>
-                 <p className="text-xs text-muted-foreground">Revenue Processed</p>
-              </div>
-              <div className="text-center">
-                 <h4 className="text-3xl font-bold text-foreground">99.99%</h4>
-                 <p className="text-xs text-muted-foreground">Uptime Delivered</p>
-              </div>
-              <div className="text-center">
-                 <h4 className="text-3xl font-bold text-foreground">1M+</h4>
-                 <p className="text-xs text-muted-foreground">Daily Active Users</p>
-              </div>
-              <div className="text-center">
-                 <h4 className="text-3xl font-bold text-foreground">SOC2</h4>
-                 <p className="text-xs text-muted-foreground">Compliance Ready</p>
-              </div>
-           </div>
             </div>
             <Button variant="ghost" className="hidden md:flex group" asChild>
-                <Link href="/work">View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
+                <VTLink href="/work">View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></VTLink>
             </Button>
           </div>
 
-          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
-            {siteConfig.featuredWork.map((project) => (
-              <StaggerItem key={project.slug}>
-                <Link href={`/work/${project.slug}`} className="group block h-full">
-                  <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3] mb-6 border border-border/50">
-                    <CoverArt slug={project.slug} className="transition-transform duration-700 group-hover:scale-105" />
-                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
-                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
-                      <div className="self-end p-2 bg-background/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
-                        <ArrowRight className="text-white h-5 w-5" />
-                      </div>
-                      <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
-                    </div>
-                  </div>
-                  <div className="space-y-3">
-                    <p className="text-sm font-medium text-primary/60 uppercase tracking-wider">Case Study</p>
-                    <p className="text-muted-foreground line-clamp-2">{project.description}</p>
-                    <div className="text-sm text-foreground/80">
-                      <span className="font-semibold text-foreground">Outcome:</span> {project.outcome}
-                    </div>
-                  </div>
```

**Suspicious custom tokens to remove/replace in this file:** `signal-sheen`, `text-primary/90`

### `app/(site)/work/page.tsx`

**UI-I-Like source:** `app/work/page.tsx`
**What’s different:** `76→16` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
export default function WorkPage() {
   return (
-    <div className="min-h-screen py-24 container px-4 md:px-6">
+    <div className="min-h-screen py-24 container px-4 md:px-6" data-system-tone="work">
       <div className="max-w-2xl mb-16 md:mb-24">
         <Reveal>
-          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Selected Work</h1>
+          <SplitText
+            text="Selected Work"
+            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
+            delay={0.1}
+          />
       </div>
 
-      <Stagger className="grid grid-cols-1 gap-12 md:gap-24">
-        {siteConfig.featuredWork.map((project, i) => (
-          <StaggerItem key={project.slug} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
-            {/* Image Column */}
-            <Link href={`/work/${project.slug}`} className="block w-full">
-              <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden card-precision">
-                <motion.div
-                  layoutId={`cover-${project.slug}`}
-                  className="relative aspect-[16/10] w-full overflow-hidden bg-secondary"
-                >
-                  <CoverArt slug={project.slug} className="transition-transform duration-700 group-hover:scale-105" />
-                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
-                </motion.div>
-              </div>
-
-            {/* Text Column */}
-            <div className="space-y-6">
-              <div className="flex items-center gap-4">
-                <span className="h-px w-12 bg-primary/20"></span>
-                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
-              </div>
-
-                <motion.h2
-                  layoutId={`title-${project.slug}`}
-                  className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors inline-block"
-                >
-                  {project.title}
-              </Link>
-
-              <p className="text-lg text-muted-foreground leading-relaxed">
-                {project.description}
-              </p>
-
-              <div className="space-y-2 text-sm text-muted-foreground">
-                <p>
-                  <span className="text-foreground font-semibold">Outcome:</span> {project.outcome}
-                </p>
-                <p>
-                  <span className="text-foreground font-semibold">Constraints:</span> {project.constraints}
-                </p>
-              </div>
-
-              <Link href={`/work/${project.slug}`} className="flex items-center text-primary font-medium group-hover:underline underline-offset-4">
-                Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
-              </Link>
-            </div>
```

### `app/(site)/services/page.tsx`

**UI-I-Like source:** `app/services/page.tsx`
**What’s different:** `68→67` class tokens; `2` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
export default function ServicesPage() {
   return (
-    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
+    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" data-system-tone="default">
       <div className="mx-auto max-w-7xl">
         {/* Header */}
         <div className="mb-20">
-          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
-            Technical Services
-          </h1>
-          <p className="text-xl text-muted-foreground max-w-2xl">
-            I don&apos;t just write code; I engineer systems. My services are designed for founders and companies who need production-grade quality from day one.
-          </p>
+            <SplitText
+              text="Technical Services"
+              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
+              delay={0.1}
+            />
+          </Reveal>
+          <Reveal delay={0.2}>
+            <p className="text-xl text-muted-foreground max-w-2xl">
+              I don&apos;t just write code; I engineer systems. Every engagement ships with evidence: audit logs, specs, and measurable outputs.
+            </p>
               <div
                 key={service.title}
-                className="group bg-card rounded-3xl p-8 sm:p-10 border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
+                className="group card-precision rounded-3xl p-8 sm:p-10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg-premium"
               >
                 <div className="mb-6">
         {/* CTA Section */}
         <div className="border-t border-border pt-24">
-            <div className="max-w-3xl">
-                <h2 className="text-3xl font-bold mb-6">
-                  Have a specific challenge?
-                </h2>
-                <p className="text-lg text-muted-foreground mb-8">
-                  I often take on custom engineering challenges that don&apos;t fit neatly into a bucket.
-                  If you need a reliable partner to solve a hard problem, let&apos;s talk.
-                <a
-                  href="/contact"
-                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-lg"
-                >
-                  Book a Consultation
-                </a>
-            </div>
+          <div className="max-w-3xl">
+            <h2 className="text-3xl font-bold mb-6">
+              Have a specific challenge?
+            </h2>
+            <p className="text-lg text-muted-foreground mb-8">
+              I take on custom engineering work that doesn&apos;t fit neatly into a bucket.
+              If you need a reliable partner to solve a hard problem, let&apos;s talk.
+            <VTLink
+              href="/contact"
+              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-lg"
+            >
+              Book a Consultation
```

**Suspicious custom tokens to remove/replace in this file:** `hover:border-primary/20`, `hover:shadow-lg-premium`

### `app/(site)/process/page.tsx`

**UI-I-Like source:** `app/process/page.tsx`
**What’s different:** `57→47` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
export default function ProcessPage() {
   return (
-    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
+    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8" data-system-tone="work">
       <div className="mx-auto max-w-7xl">
         {/* Header */}
-        <div className="mb-16 text-center">
-          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h1>
-          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
-            A proven methodology that ensures successful outcomes for every
-            project, from initial concept to final delivery.
-          </p>
+        <div className="mb-20 md:mb-32">
+          <div className="max-w-4xl">
+            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
+               <span className="font-mono text-emerald-500 mr-2">{">>"}</span>
+               <CalibrationHeadline text="EXECUTION_PROTOCOL" />
+            </h1>
+            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
+              Systematic engineering lifecycle. Every phase is gated by audit-grade artifacts.
+            </p>
 
-        {/* Process Steps */}
-        <div className="space-y-12">
-          {processSteps.map((step) => (
-            <div
-              key={step.number}
-              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
-            >
-              {/* Number */}
-              <div className="md:col-span-2">
-                <span className="text-6xl font-bold text-muted-foreground/20">
-                  {step.number}
-                </span>
-
-              {/* Content */}
-              <div className="md:col-span-10">
-                <div className="bg-background rounded-2xl p-8 border border-border">
-                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
-                  <p className="text-muted-foreground mb-6">
-                    {step.description}
-                  </p>
-
-                  <div>
-                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">
-                      Deliverables
-                    </h3>
-                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
-                      {step.deliverables.map((deliverable) => (
-                        <li
-                          key={deliverable}
-                          className="flex items-center gap-2 text-sm"
-                        >
-                          <CheckCircle className="h-4 w-4 text-green-500" />
-                          {deliverable}
-                        </li>
 
         {/* CTA */}
-        <div className="mt-20 text-center">
-          <h2 className="text-2xl font-bold mb-4">
-            Ready to get started?
+        <div className="mt-32 md:mt-48 text-center border-t border-border/5 pt-20">
+          <h2 className="text-2xl font-bold mb-4 tracking-tight">
+            Ready to initialize?
           </h2>
-          <p className="text-muted-foreground mb-8">
-            Let&apos;s discuss your project and how our process can help achieve your
-            goals.
+          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
+            Define your scope and build the proof trail from day one.
           </p>
+          <VTLink
             href="/contact"
-            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
+            className="btn-precision inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium text-lg tracking-wide"
           >
             Start a Project
```

### `app/(site)/trust/page.tsx`

**UI-I-Like source:** `app/trust/page.tsx`
**What’s different:** `68→77` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
export default function TrustCenterPage() {
   return (
-    <div className="container max-w-4xl py-24 space-y-24">
+    <div className="container max-w-4xl py-24 space-y-24" data-system-tone="default">
       {/* Header */}
       <section className="space-y-6 text-center">
-        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
-          <Shield className="w-4 h-4 mr-2" />
-          The Anti-Scam Shield
-        </div>
-        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
-          Trust Center
-        </h1>
-        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
-          The software industry is full of vague promises and vendor lock-in.
-          Here is exactly how I protect your business, your budget, and your sanity.
-        </p>
+        <Reveal>
+          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
+            <Shield className="w-4 h-4 mr-2" />
+            <ScrambleText text="The Anti-Scam Shield" />
+          </div>
+          <SplitText
+            text="Trust Center"
+            className="text-4xl md:text-6xl font-bold tracking-tight text-balance"
+            delay={0.2}
+          />
+        </Reveal>
+        <Reveal delay={0.2}>
+          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
+            The software industry is full of vague promises and vendor lock-in.
+            Here is exactly how I protect your business, your budget, and your sanity.
         <div className="grid gap-6 md:grid-cols-2">
           <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
-             <h3 className="font-semibold text-lg mb-2">Total IP Ownership</h3>
-             <p className="text-muted-foreground">
-               You keep your domain, accounts, assets, and code. I build in your repositories (or transfer them immediately). You are never locked out of your own business.
-             </p>
+            <h3 className="font-semibold text-lg mb-2">Total IP Ownership</h3>
+            <p className="text-muted-foreground">
+              You keep your domain, accounts, assets, and code. I build in your repositories (or transfer them immediately). You are never locked out of your own business.
+            </p>
           </div>
           <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
-             <h3 className="font-semibold text-lg mb-2">Zero Vendor Lock-in</h3>
-             <p className="text-muted-foreground">
-               I use standard, widely-supported technologies (React, Next.js, Postgres). Any competent engineer can pick up where I leave off. No proprietary &quot;black box&quot; CMS.
-             </p>
+            <h3 className="font-semibold text-lg mb-2">Zero Vendor Lock-in</h3>
+            <p className="text-muted-foreground">
+              I use standard, widely-supported technologies (React, Next.js, Frappe). Any competent engineer can pick up where I leave off. No proprietary &quot;black box&quot; CMS.
+            </p>
         </h2>
         <div className="space-y-4">
-           <div className="flex gap-4 items-start">
-              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
-                 <span className="font-bold text-primary">1</span>
-              </div>
-              <div>
-                 <h4 className="font-semibold text-lg">Clear Phases & Deliverables</h4>
-                 <p className="text-muted-foreground">Every project follows the Build Plan. You know exactly what is being delivered at each stage, from design mockups to the final line of code.</p>
-              </div>
-           </div>
-           <div className="flex gap-4 items-start">
-              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
-                 <span className="font-bold text-primary">2</span>
-              </div>
-              <div>
-                 <h4 className="font-semibold text-lg">Written Scope & Change Control</h4>
-                 <p className="text-muted-foreground">We agree on a scope in writing. If you want to add more, we pause, estimate the new work, and you approve it before I start. No surprise bills.</p>
-              </div>
-           </div>
-           <div className="flex gap-4 items-start">
-              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
-                 <span className="font-bold text-primary">3</span>
-              </div>
-              <div>
-                 <h4 className="font-semibold text-lg">Weekly Updates</h4>
-                 <p className="text-muted-foreground">You get a plain-English status update every week. What I did, what&apos;s next, and any blockers.</p>
-              </div>
-           </div>
+          <div className="flex gap-4 items-start">
+            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
+              <span className="font-bold text-primary">1</span>
+            </div>
+            <div>
+              <h4 className="font-semibold text-lg">Clear Phases & Deliverables</h4>
+              <p className="text-muted-foreground">Every project follows the Build Plan. You know exactly what is being delivered at each stage, from design mockups to the final line of code.</p>
+            </div>
+          </div>
+          <div className="flex gap-4 items-start">
+            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
+              <span className="font-bold text-primary">2</span>
+            </div>
+            <div>
+              <h4 className="font-semibold text-lg">Written Scope & Change Control</h4>
+              <p className="text-muted-foreground">We agree on a scope in writing. If you want to add more, we pause, estimate the new work, and you approve it before I start. No surprise bills.</p>
+            </div>
+          </div>
+          <div className="flex gap-4 items-start">
+            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
+              <span className="font-bold text-primary">3</span>
+            </div>
+            <div>
+              <h4 className="font-semibold text-lg">Weekly Evidence Drops</h4>
+              <p className="text-muted-foreground">You get a plain-English status update every week with a link to the current audit results, artifacts, and the next milestone.</p>
+            </div>
+          </div>
+          Definition of Done (What You Receive)
         </h2>
+        <p className="text-muted-foreground">
+          Every item below maps to a measurable artifact. Nothing is marked &quot;done&quot; without the proof.
+          See the live evidence in the <VTLink href="/#proof" className="underline">Proof Panel</VTLink> and delivered reports.
+        </p>
         <div className="grid gap-4 sm:grid-cols-2">
-             "Handoff Documentation Provided"
-           ].map((item) => (
-             <div key={item} className="flex items-center gap-3 p-4 border border-border/50 rounded-lg">
+          {definitionOfDone.map((item) => (
+            <div key={item.title} className="flex flex-col gap-2 p-4 border border-border/50 rounded-lg bg-background/60">
+              <div className="flex items-center gap-3">
                 <CheckCircle className="w-5 h-5 text-green-500" />
-                <span>{item}</span>
-             </div>
-           ))}
+                <span className="font-semibold">{item.title}</span>
+              </div>
+              <p className="text-sm text-muted-foreground">{item.detail}</p>
+              <p className="text-xs text-muted-foreground uppercase tracking-wider">Proof: {item.proof}</p>
+            </div>
+          ))}
+      </section>
+
+      <section className="space-y-6" id="trust-proof">
+        <div className="space-y-2 text-center">
+          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Runtime Proof Panel</p>
+          <h2 className="text-3xl font-bold">Live verification you can inspect.</h2>
+          <p className="text-muted-foreground">
+            This panel validates the real response headers, confirms the build fingerprint, and
+            reports the client runtime scan that backs the Definition of Done above.
         </p>
         <ul className="space-y-4">
-           <li className="flex gap-3">
-              <span className="text-red-500 font-bold">•</span>
-              <span className="text-foreground/80"><strong>No Admin Access:</strong> If a vendor won&apos;t give you full admin access to your own site or hosting, run. They are holding you hostage.</span>
-           </li>
-           <li className="flex gap-3">
-              <span className="text-red-500 font-bold">•</span>
-              <span className="text-foreground/80"><strong>Vague Pricing:</strong> &quot;It depends&quot; is fine for an estimate, but you need a fixed project fee or a clear hourly rate with a cap.</span>
-           </li>
-           <li className="flex gap-3">
-              <span className="text-red-500 font-bold">•</span>
-              <span className="text-foreground/80"><strong>No Deliverables List:</strong> If they can&apos;t list exactly what you are paying for (e.g., &quot;Home page, About page, Contact form&quot;), you will likely be disappointed.</span>
-           </li>
+          <li className="flex gap-3">
+            <span className="text-red-500 font-bold">•</span>
+            <span className="text-foreground/80"><strong>No Admin Access:</strong> If a vendor won&apos;t give you full admin access to your own site or hosting, run. They are holding you hostage.</span>
+          </li>
+          <li className="flex gap-3">
+            <span className="text-red-500 font-bold">•</span>
+            <span className="text-foreground/80"><strong>Vague Pricing:</strong> &quot;It depends&quot; is fine for an estimate, but you need a fixed project fee or a clear hourly rate with a cap.</span>
+          </li>
+          <li className="flex gap-3">
+            <span className="text-red-500 font-bold">•</span>
+            <span className="text-foreground/80"><strong>No Deliverables List:</strong> If they can&apos;t list exactly what you are paying for (e.g., &quot;Home page, About page, Contact form&quot;), you will likely be disappointed.</span>
+          </li>
         </ul>
```

### `app/(site)/insights/page.tsx`

**UI-I-Like source:** `app/insights/page.tsx`
**What’s different:** `35→35` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
return (
-    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
+    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8" data-system-tone="insights">
       <div className="mx-auto max-w-4xl">
         <Reveal>
```

### `app/(site)/contact/page.tsx`

**UI-I-Like source:** `app/contact/page.tsx`
**What’s different:** `69→72` class tokens; `0` suspicious custom tokens.

**Required action (styling):**

- Overwrite the target file with the UI-I-Like version, then re-apply only the *necessary* target-only logic (e.g., VTLink instead of Link, test ids) without changing markup/classes.

**Key styling deltas (from diff):**

```diff
return (
-    <div className="min-h-screen py-24 container px-4 flex flex-col items-center justify-center">
+    <div className="min-h-screen py-24 container px-4 flex flex-col items-center justify-center relative">
       <div className="max-w-2xl w-full">
          <div className="mb-12 text-center">
-            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let&apos;s talk engineering.</h1>
+            <SplitText text="Let's talk engineering." className="text-4xl md:text-5xl font-bold tracking-tight mb-4 justify-center" />
             <p className="text-xl text-muted-foreground">
                Tell me about the problem you&apos;re trying to solve.
          </div>
 
-        <Card className="border-border/50 shadow-2xl shadow-primary/5">
+        <Card className="card-precision border-border/50 shadow-2xl shadow-primary/5">
           <CardHeader className="space-y-1 pb-8 border-b border-border/50">
              <div className="flex gap-2 mb-4">
                     </Button>
                  )}
-                 <Button type="submit" size="lg" className="ml-auto rounded-full px-8" disabled={isSubmitting}>
+                 <Button
+                    type="submit"
+                    size="lg"
+                    className="ml-auto rounded-full px-8 relative z-50"
+                    disabled={isSubmitting}
+                 >
```

### `app/(admin)/admin/layout.tsx`

**UI-I-Like source:** (none — target-only file)

**Required action (styling):**

- Keep the file, but refactor its styles to conform to UI-I-Like primitives and utilities:
  - Cards: `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-precision`
  - Buttons: use `<Button>` variants; avoid bespoke shadows/glows
  - Links: use `link-precision` on inline nav links
  - Remove any `primary-rgb` / neon glows; rely on `SystemLayer` glow

- `className` occurrences: 4

### `components/admin/header.tsx`

**UI-I-Like source:** (none — target-only file)

**Required action (styling):**

- Keep the file, but refactor its styles to conform to UI-I-Like primitives and utilities:
  - Cards: `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-precision`
  - Buttons: use `<Button>` variants; avoid bespoke shadows/glows
  - Links: use `link-precision` on inline nav links
  - Remove any `primary-rgb` / neon glows; rely on `SystemLayer` glow

- `className` occurrences: 8

### `components/admin/sidebar.tsx`

**UI-I-Like source:** (none — target-only file)

**Required action (styling):**

- Keep the file, but refactor its styles to conform to UI-I-Like primitives and utilities:
  - Cards: `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-precision`
  - Buttons: use `<Button>` variants; avoid bespoke shadows/glows
  - Links: use `link-precision` on inline nav links
  - Remove any `primary-rgb` / neon glows; rely on `SystemLayer` glow

- `className` occurrences: 10

### `features/home-hero/components/SignalLinesField.tsx`

**UI-I-Like source:** (none — target-only file)

**Required action (styling):**

- Keep the file, but refactor its styles to conform to UI-I-Like primitives and utilities:
  - Cards: `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-precision`
  - Buttons: use `<Button>` variants; avoid bespoke shadows/glows
  - Links: use `link-precision` on inline nav links
  - Remove any `primary-rgb` / neon glows; rely on `SystemLayer` glow

**Found non-UI-I-Like styling hooks:** `primary-rgb`

- Replace/remove these effects. Prefer subtle border + blur + card/button precision shadows.

- `className` occurrences: 2

### `app/vantus-theme.css`

**UI-I-Like source:** (none — target-only file)

**Required action (styling):**

- Keep the file, but refactor its styles to conform to UI-I-Like primitives and utilities:
  - Cards: `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-precision`
  - Buttons: use `<Button>` variants; avoid bespoke shadows/glows
  - Links: use `link-precision` on inline nav links
  - Remove any `primary-rgb` / neon glows; rely on `SystemLayer` glow

- `className` occurrences: 0

---

## 4) Site pages mapping (UI-I-Like → route groups)

UI-I-Like uses `app/*` pages. Main repo uses route groups `app/(site)/*`.

**For each of the following, overwrite main repo with UI-I-Like page content** (then adapt imports like `VTLink` if you require it):

- `app/page.tsx` → `app/(site)/page.tsx`
- `app/work/page.tsx` → `app/(site)/work/page.tsx`
- `app/work/[slug]/page.tsx` → `app/(site)/work/[slug]/page.tsx`
- `app/services/page.tsx` → `app/(site)/services/page.tsx`
- `app/process/page.tsx` → `app/(site)/process/page.tsx`
- `app/trust/page.tsx` → `app/(site)/trust/page.tsx`
- `app/privacy/page.tsx` → `app/(site)/privacy/page.tsx`
- `app/contact/page.tsx` → `app/(site)/contact/page.tsx`
- `app/insights/page.tsx` → `app/(site)/insights/page.tsx`
- `app/insights/[slug]/page.tsx` → `app/(site)/insights/[slug]/page.tsx`
- `app/lab/revenue-leak/page.tsx` → `app/(site)/lab/revenue-leak/page.tsx`
- `app/about/page.tsx` → `app/(site)/about/page.tsx`

**Main repo pages that have no UI-I-Like equivalent**

- `app/(site)/living-blueprint/page.tsx`
- `app/(site)/terms/page.tsx`
- `app/(site)/lab/server-config/page.tsx`

For these, keep content but re-style to match UI-I-Like section rhythm:

- `section` spacing: `py-24 md:py-32`
- typography: `text-muted-foreground`, `tracking-tight`, `leading-relaxed`
- surfaces: `bg-card/50 backdrop-blur border-border/50 card-precision`
- remove `signal-sheen`/`primary-rgb`/neon glow effects

---

## 5) Admin reskin (no reference counterpart, but required for full consistency)

UI-I-Like doesn’t include admin pages, so the goal is: **make admin feel like it belongs** to the same site.

### Admin Surface Recipe (apply everywhere in admin)

- Page background: do **not** use `bg-muted/40` as the full-page background.
- Use `SystemLayer` behind admin too (same as site).
- Top header surface (sticky): `bg-background/80 backdrop-blur-md border-b border-border/40`
- Sidebar surface: `bg-card/50 backdrop-blur-sm border-r border-border/40 card-precision`
- Content surface: prefer cards (`<Card>`) instead of raw gray divs.

### Files that must be updated

- `app/(admin)/admin/layout.tsx` → remove full-page `bg-muted/40`, introduce glass surfaces + SystemLayer.
- `components/admin/header.tsx` → match site header surface language.
- `components/admin/sidebar.tsx` → use softer borders, `card-precision`, consistent spacing/typography.

### Admin pages (34 files)

- `app/(admin)/admin/analytics/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/audit/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/content/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/content/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/content/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/contracts/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/contracts/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/contracts/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/incidents/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/incidents/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/incidents/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/invoices/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/invoices/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/leads/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/leads/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/leads/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/login/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/media/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/projects/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/projects/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/projects/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/proposals/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/proposals/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/proposals/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/services/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/services/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/services/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/settings/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/settings/security/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/settings/users/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/users/[id]/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/users/new/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.
- `app/(admin)/admin/users/page.tsx` → Apply **Admin Page Surface Recipe** (Section “Admin reskin”), and remove `bg-muted/40`/flat gray panels.

### Admin shared components (20 files)

- `components/admin/audit/audit-list.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/content/content-actions.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/content/content-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/contracts/contract-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/header.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/incidents/incident-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/invoices/invoice-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/leads-table.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/leads/lead-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/media/media-item.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/media/media-manager.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/media/media-uploader.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/mfa-settings.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/projects/project-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/proposals/proposal-actions.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/proposals/proposal-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/services/service-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/sidebar.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/users/user-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).
- `components/admin/users/user-roles-form.tsx` → Apply **Admin Component Recipe** (Section “Admin reskin”).

---

## 6) Non-UI-I-Like hooks found in main repo (remove/replace)

These are the places where the main repo introduces **custom visual language** not present in UI-I-Like.

| File | Non-UI-I-Like hooks found |
|---|---|
| `app/(site)/page.tsx` | `signal-sheen` |
| `app/(site)/services/page.tsx` | `verified` |
| `app/(site)/trust/page.tsx` | `verified` |
| `components/execution-protocol.tsx` | `glass-card`, `surface-rim`, `bg-[rgba`, `rgba(var(--foreground-rgb)` |
| `components/footer.tsx` | `primary-rgb`, `degraded`, `verified`, `shadow-[0_0_8px_rgba(var(--primary-rgb)` |
| `components/header.tsx` | `signal-sheen`, `primary-rgb`, `shadow-[0_0_8px_rgba(var(--primary-rgb)` |
| `components/home-featured-work.tsx` | `signal-sheen` |
| `components/lab/server-config/intent-form.tsx` | `signal-sheen` |
| `components/lab/server-config/recommendation-view.tsx` | `signal-sheen` |
| `components/proof-panel.tsx` | `glass-card`, `surface-rim`, `verified` |
| `components/ui/dialog.tsx` | `bg-[rgba`, `rgba(var(--foreground-rgb)` |
| `features/home-hero/components/SignalLinesField.tsx` | `primary-rgb` |

---

## 7) Full main repo file-by-file action list (303/303 files)

<details>
<summary>Expand full inventory table</summary>

| Target file | Type | Styling? | Required action |
|---|---:|:---:|---|
| `.agent/CHANGELOG.md` | doc | no | No styling action (logic/config/content). |
| `.agent/INTENT_LOCK.md` | doc | no | No styling action (logic/config/content). |
| `.agent/NOTES.md` | doc | no | No styling action (logic/config/content). |
| `.agent/PLAN.md` | doc | no | No styling action (logic/config/content). |
| `.agent/TODO.md` | doc | no | No styling action (logic/config/content). |
| `.agent/VERIFY.md` | doc | no | No styling action (logic/config/content). |
| `.agent/build-log.txt` | other | no | No styling action (logic/config/content). |
| `.eslintrc.js` | code | no | KEEP (already UI-I-Like identical). |
| `.github/PRD.md` | doc | no | No styling action (logic/config/content). |
| `.github/VANTUS_THEME.md` | doc | no | No styling action (logic/config/content). |
| `.github/agents/general.agent.md` | doc | no | KEEP (already UI-I-Like identical). |
| `.github/agents/gpt-5.agent.md` | doc | no | KEEP (already UI-I-Like identical). |
| `.github/agents/test.agent.md` | doc | no | KEEP (already UI-I-Like identical). |
| `.github/agents/thinking-beast.agent.md` | doc | no | No styling action (logic/config/content). |
| `.github/aurora_design_system.md` | doc | no | No styling action (logic/config/content). |
| `.github/design_system.md` | doc | no | No styling action (logic/config/content). |
| `.github/workflows/ci.yml` | config | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `.gitignore` | other | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `.npmrc` | other | no | No styling action (logic/config/content). |
| `.serena/.gitignore` | other | no | No styling action (logic/config/content). |
| `.serena/project.yml` | config | no | No styling action (logic/config/content). |
| `.trae/.ignore` | other | no | No styling action (logic/config/content). |
| `ADMIN.md` | doc | no | No styling action (logic/config/content). |
| `BREAKING_CHANGES.md` | doc | no | No styling action (logic/config/content). |
| `CHANGELOG.md` | doc | no | No styling action (logic/config/content). |
| `GUI_design_guide.md` | doc | no | KEEP (already UI-I-Like identical). |
| `MIGRATION.md` | doc | no | No styling action (logic/config/content). |
| `PRD.md` | doc | no | No styling action (logic/config/content). |
| `README.md` | doc | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `VANTUS_THEME.md` | doc | no | No styling action (logic/config/content). |
| `app/(admin)/admin/analytics/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/audit/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/content/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/content/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/content/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/contracts/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/contracts/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/contracts/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/incidents/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/incidents/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/incidents/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/invoices/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/invoices/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/layout.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `app/(admin)/admin/leads/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/leads/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/leads/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/login/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/media/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/projects/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/projects/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/projects/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/proposals/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/proposals/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/proposals/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/services/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/services/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/services/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/settings/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/settings/security/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/settings/users/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/users/[id]/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/users/new/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(admin)/admin/users/page.tsx` | code | yes | ADMIN PAGE RESKIN: apply Admin recipe + ensure consistent section rhythm. |
| `app/(site)/about/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/contact/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/insights/[slug]/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/insights/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/lab/revenue-leak/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/lab/server-config/page.tsx` | code | yes | RESTYLE TO MATCH UI-I-Like (no ref page). Use same section spacing, typography, card/button primitives. |
| `app/(site)/layout.tsx` | code | yes | KEEP/VERIFY: must match UI-I-Like chrome order (SystemLayer, ConsoleHud, RouteTransitionLayer, Header, PageTransition, Footer). |
| `app/(site)/living-blueprint/page.tsx` | code | yes | RESTYLE TO MATCH UI-I-Like (no ref page). Use same section spacing, typography, card/button primitives. |
| `app/(site)/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/privacy/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/process/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/services/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/terms/page.tsx` | code | yes | RESTYLE TO MATCH UI-I-Like (no ref page). Use same section spacing, typography, card/button primitives. |
| `app/(site)/trust/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/work/[slug]/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/(site)/work/page.tsx` | code | yes | OVERWRITE WITH UI-I-Like PAGE (from ref app/...) and adapt imports (VTLink, route groups). |
| `app/api/admin/audit/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/auth/mfa/disable/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/auth/mfa/enable/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/auth/mfa/generate/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/content/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/content/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/contracts/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/contracts/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/incidents/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/incidents/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/invoices/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/leads/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/leads/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/media/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/media/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/projects/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/projects/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/proposals/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/proposals/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/services/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/services/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/users/[id]/roles/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/users/[id]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/admin/users/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/auth/[...nextauth]/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/contact/route.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `app/api/proof/headers/route.ts` | code | no | No styling action (logic/config/content). |
| `app/api/server-config/recommend/route.ts` | code | no | No styling action (logic/config/content). |
| `app/error.tsx` | code | yes | No styling action (logic/config/content). |
| `app/favicon.ico/route.ts` | code | no | No styling action (logic/config/content). |
| `app/global-error.tsx` | code | yes | No styling action (logic/config/content). |
| `app/globals.css` | css | yes | KEEP (already UI-I-Like identical). |
| `app/layout.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `app/loading.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `app/not-found.tsx` | code | yes | No styling action (logic/config/content). |
| `app/robots.ts` | code | no | No styling action (logic/config/content). |
| `app/sitemap.ts` | code | no | No styling action (logic/config/content). |
| `app/vantus-theme.css` | css | yes | No styling action (logic/config/content). |
| `components.json` | config | no | No styling action (logic/config/content). |
| `components/admin/audit/audit-list.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/content/content-actions.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/content/content-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/contracts/contract-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/header.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/incidents/incident-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/invoices/invoice-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/leads-table.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/leads/lead-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/media/media-item.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/media/media-manager.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/media/media-uploader.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/mfa-settings.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/projects/project-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/proposals/proposal-actions.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/proposals/proposal-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/services/service-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/sidebar.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/users/user-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/admin/users/user-roles-form.tsx` | code | yes | ADMIN RESKIN: apply UI-I-Like surfaces + primitives (see Admin recipe). |
| `components/audit-modal.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/auth-provider.tsx` | code | no | No styling action (logic/config/content). |
| `components/build-plan-module.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/calibration-headline.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/case-architecture-diagram.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/case-failure-modes.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/case-kpis.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/case-mode-panel.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/case-mode-toggle.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/console-hud.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/cover-art.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/error-boundary.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/execution-protocol.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/footer.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/header.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/hero-background.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/home-featured-work.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/lab/server-config/config-wizard.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/lab/server-config/intent-form.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/lab/server-config/recommendation-view.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/living-blueprint-section.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/mdx/RedactionNote.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/mdx/ShopifySyncDiagram.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/mdx/SystemSpec.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/mdx/callout.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/mdx/figure.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/mdx/metric.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/motion-config.tsx` | code | no | KEEP (already UI-I-Like identical). |
| `components/page-transition.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/pointer-signal-provider.tsx` | code | no | No styling action (logic/config/content). |
| `components/proof-context.tsx` | code | no | No styling action (logic/config/content). |
| `components/proof-panel.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/react-bits/SplitText.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/reveal.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/revenue-leak-detector.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/route-transition-layer.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/scramble-text.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/skill-bars.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/spline-blueprint-canvas.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/stagger.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/system-layer.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/theme-provider.tsx` | code | no | KEEP (already UI-I-Like identical). |
| `components/theme-toggle.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/ui/alert-dialog.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/badge.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/ui/button.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/ui/card.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/ui/checkbox.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/dialog.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/ui/dropdown-menu.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/form.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/input.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/ui/label.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/ui/select.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/sonner.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/table.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/tabs.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/textarea.tsx` | code | yes | KEEP (already UI-I-Like identical). |
| `components/ui/toast.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/toaster.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `components/ui/use-toast.ts` | code | no | No styling action (logic/config/content). |
| `components/visited-path-provider.tsx` | code | no | No styling action (logic/config/content). |
| `components/vt-link.tsx` | code | no | No styling action (logic/config/content). |
| `components/work-detail-hero.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `components/work-list.tsx` | code | yes | RESTYLE/ALIGN: use UI-I-Like primitives (btn-precision, card-precision, input-precision) and remove non-UI-I-Like effects. |
| `contact_submissions.json` | config | no | No styling action (logic/config/content). |
| `content/insights/designing-for-trust.mdx` | doc | no | KEEP (already UI-I-Like identical). |
| `content/insights/graphql-at-scale.mdx` | doc | no | KEEP (already UI-I-Like identical). |
| `content/insights/rigor-in-products.mdx` | doc | no | KEEP (already UI-I-Like identical). |
| `content/work/fintech-dashboard.mdx` | doc | no | KEEP (already UI-I-Like identical). |
| `content/work/healthtech-platform.mdx` | doc | no | KEEP (already UI-I-Like identical). |
| `content/work/shopify-admin-sync.mdx` | doc | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `docs/Admin Portal Requirements For Web App Company.md` | doc | no | No styling action (logic/config/content). |
| `docs/High-Impact Small Business Website Creation - Google Docs.pdf` | other | no | No styling action (logic/config/content). |
| `docs/LLM Animation PRD for React - Google Docs.pdf` | other | no | No styling action (logic/config/content). |
| `docs/React PRD For AI Development - Google Docs.pdf` | other | no | No styling action (logic/config/content). |
| `docs/Server Configurator Implementation Guide.pdf` | other | no | No styling action (logic/config/content). |
| `docs/Server Recommendation Logic.pdf` | other | no | No styling action (logic/config/content). |
| `docs/spline-attribution.md` | doc | no | No styling action (logic/config/content). |
| `e2e/admin-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/app.spec.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `e2e/content-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/contracts-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/incidents-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/invoices-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/leads-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/living-blueprint.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/media-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/mfa-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/projects-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/proposals-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/services-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/theme-visual.spec.ts` | code | no | No styling action (logic/config/content). |
| `e2e/users-flow.spec.ts` | code | no | No styling action (logic/config/content). |
| `features/home-hero/components/SignalLinesField.tsx` | code | yes | REMOVE OR RESTYLE: should not fight UI-I-Like. Prefer HeroBackground/SystemLayer patterns. |
| `hooks/use-tilt.ts` | code | no | No styling action (logic/config/content). |
| `lib/admin/audit.ts` | code | no | No styling action (logic/config/content). |
| `lib/admin/guards.test.ts` | code | no | No styling action (logic/config/content). |
| `lib/admin/guards.ts` | code | no | No styling action (logic/config/content). |
| `lib/auth.ts` | code | no | No styling action (logic/config/content). |
| `lib/case-modes/presets.ts` | code | no | No styling action (logic/config/content). |
| `lib/cover/generate.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `lib/cover/seed.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `lib/mdx.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `lib/motion-tokens.ts` | code | no | No styling action (logic/config/content). |
| `lib/prisma.ts` | code | no | No styling action (logic/config/content). |
| `lib/proof.ts` | code | no | No styling action (logic/config/content). |
| `lib/rate-limit.ts` | code | no | No styling action (logic/config/content). |
| `lib/revenue-leak/model.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `lib/server-config/engine.ts` | code | no | No styling action (logic/config/content). |
| `lib/server-config/schema.ts` | code | no | No styling action (logic/config/content). |
| `lib/server-config/types.ts` | code | no | No styling action (logic/config/content). |
| `lib/site.ts` | code | no | KEEP (already UI-I-Like identical). |
| `lib/storage.ts` | code | no | No styling action (logic/config/content). |
| `lib/utils.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `mdx-components.tsx` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `middleware.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `new_design_system.md` | doc | no | No styling action (logic/config/content). |
| `next.config.mjs` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `package-lock.json` | config | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `package.json` | config | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `playwright.config.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `postcss.config.js` | code | no | KEEP (already UI-I-Like identical). |
| `prisma/dev.db` | other | no | No styling action (logic/config/content). |
| `prisma/migrations/20260104094534_init/migration.sql` | other | no | No styling action (logic/config/content). |
| `prisma/migrations/20260104100321_add_invoice_model/migration.sql` | other | no | No styling action (logic/config/content). |
| `prisma/migrations/20260104112110_add_rate_limit/migration.sql` | other | no | No styling action (logic/config/content). |
| `prisma/migrations/migration_lock.toml` | other | no | No styling action (logic/config/content). |
| `prisma/schema.prisma` | other | no | No styling action (logic/config/content). |
| `prisma/seed.ts` | code | no | No styling action (logic/config/content). |
| `public/file.svg` | other | no | KEEP (already UI-I-Like identical). |
| `public/globe.svg` | other | no | KEEP (already UI-I-Like identical). |
| `public/next.svg` | other | no | KEEP (already UI-I-Like identical). |
| `public/proof/build.json` | config | no | No styling action (logic/config/content). |
| `public/spline/README.md` | doc | no | No styling action (logic/config/content). |
| `public/spline/living-blueprint.splinecode` | other | no | No styling action (logic/config/content). |
| `public/vercel.svg` | other | no | KEEP (already UI-I-Like identical). |
| `public/window.svg` | other | no | KEEP (already UI-I-Like identical). |
| `scripts/check-permissions.ts` | code | no | No styling action (logic/config/content). |
| `scripts/generate-build-proof.mjs` | code | no | No styling action (logic/config/content). |
| `scripts/reset-mfa.ts` | code | no | No styling action (logic/config/content). |
| `scripts/smoke-test.ts` | code | no | No styling action (logic/config/content). |
| `scripts/update-permissions.ts` | code | no | No styling action (logic/config/content). |
| `scripts/verify-admin.ts` | code | no | No styling action (logic/config/content). |
| `stores/usePointerSignalStore.ts` | code | no | No styling action (logic/config/content). |
| `tailwind.config.ts` | code | yes | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `tests/server-config.test.ts` | code | no | No styling action (logic/config/content). |
| `tests/setup.ts` | code | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `tests/skill-bars.test.tsx` | code | no | KEEP (already UI-I-Like identical). |
| `tsconfig.json` | config | no | KEEP (already UI-I-Like identical). |
| `verification/contact_page.png` | other | no | No styling action (logic/config/content). |
| `verification/home_page.png` | other | no | No styling action (logic/config/content). |
| `verification/verify_changes.py` | script | no | No styling action (logic/config/content). |
| `verification/verify_changes_v2.py` | script | no | No styling action (logic/config/content). |
| `verification/verify_changes_v3.py` | script | no | No styling action (logic/config/content). |
| `verification/verify_changes_v4.py` | script | no | No styling action (logic/config/content). |
| `verification/verify_fixes_final.py` | script | no | No styling action (logic/config/content). |
| `verification/verify_process.py` | script | no | No styling action (logic/config/content). |
| `verification/work_page.png` | other | no | No styling action (logic/config/content). |
| `verify_changes.py` | script | no | KEEP (already UI-I-Like identical). |
| `verify_final.py` | script | no | KEEP (already UI-I-Like identical). |
| `verify_visuals.py` | script | no | RECONCILE WITH UI-I-Like (ref file exists; see per-file section). |
| `vitest.config.ts` | code | no | KEEP (already UI-I-Like identical). |

</details>

---

## 8) Practical execution order (to avoid churn)

1) **Restore primitives first**
   - `components/ui/card.tsx`, `components/ui/dialog.tsx`, `components/ui/label.tsx`
2) **Restore system chrome**
   - `components/system-layer.tsx`, `components/header.tsx`, `components/footer.tsx`, `components/console-hud.tsx`, `components/theme-toggle.tsx`
3) **Overwrite site pages with UI-I-Like**
   - all mapped `app/(site)/*` pages listed above
4) **Fix MDX divergence**
   - restore inline SVG in `content/work/shopify-admin-sync.mdx` (UI-I-Like version)
5) **Admin reskin**
   - layout + sidebar + header, then verify pages inherit the primitives
6) **Repo-wide cleanup**
   - remove `signal-sheen` usages and any `primary-rgb` glow hacks
   - ensure no file still depends on `vantus-theme.css` tokens for runtime styling

---

## 9) Acceptance criteria

- `npm install` succeeds
- `npm run lint` has zero errors
- `npm run test` succeeds (if configured)
- `npm run build` succeeds
- UI at:
  - `/`, `/work`, `/work/[slug]`, `/services`, `/process`, `/trust`, `/insights`, `/contact`
  - `/admin` + a couple admin pages
  matches **UI-I-Like**:
  - consistent spacing rhythm
  - no “signal-sheen” / neon glow look
  - header height and behavior consistent
  - cards/buttons/inputs use precision utilities
