# Vantus Systems — Digital Experience & Website Standard

**Document ID:** VS-UI-201  
**Version:** 2.1.0  
**Effective Date:** February 2, 2026  
**Applies to:** All Vantus digital properties  

---

## Our Digital Promise

Our website is proof of our work. If we cannot build a fast, secure, accessible site for ourselves, why would you trust us to build one for you?

Every pixel, every interaction, every line of code demonstrates our standards.

---

## The Three Stories Every Page Must Tell

### Story 1: You Are in Control
We are the architects. You are the owner.

**How we tell it:**
- Clear explanations of ownership and control.
- Transparent pricing and process.
- No dark patterns or manipulative design.

### Story 2: This System Is Safe
Built with precision. Documented with care.

**How we tell it:**
- Security badges and certifications.
- Performance metrics displayed openly.
- Trust signals throughout.

### Story 3: This Works Better
Faster. Cheaper. Longer-lasting.

**How we tell it:**
- Case studies with real numbers.
- Before/after comparisons.
- Clear value propositions.

---

## Performance Standards

Our sites prove what we can do for you.

### Speed Targets
| Metric | Target | Minimum |
|--------|--------|---------|
| Largest Contentful Paint (LCP) | < 2.0s | < 2.5s |
| Interaction to Next Paint (INP) | < 150ms | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.05 | < 0.1 |
| Time to First Byte (TTFB) | < 600ms | < 800ms |

### Build Standards
- Lighthouse Performance Score: 95+ (Target: 100)
- Lighthouse Accessibility Score: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

### Payload Discipline
- Initial JavaScript: Under 250KB compressed
- Total page weight: Under 1MB for text-heavy pages
- Images: Optimized, WebP format, lazy-loaded below the fold

---

## Design Principles

### Visual Language: Industrial Warmth

We combine technical precision with approachable warmth.

**Colors:**
- **Workshop Navy (#0B1221):** Primary background. Trustworthy. Stable.
- **Brass Gold (#E0AA3E):** Accents and calls-to-action. Quality. Attention.
- **Signal Cyan:** Success states and live indicators.
- **Signal Orange:** Warnings and alerts.

**Typography:**
- **Fraunces (Serif):** Headings. Timeless. Crafted.
- **Geist Sans:** Body text. Clean. Modern.
- **Geist Mono:** Code and data. Technical. Precise.

**Textures:**
- Subtle wood grain patterns (craftsman heritage)
- Brushed metal accents (industrial quality)
- Paper textures for documentation references

### Motion and Animation

Animation serves a purpose. It never distracts.

**Allowed Uses:**
- Guiding attention to important elements.
- Providing feedback on user actions.
- Reducing perceived loading time.
- Revealing complexity in digestible steps.

**Forbidden Uses:**
- Auto-playing video or audio.
- Parallax that causes motion sickness.
- Animations longer than 500ms.
- Effects that cannot be disabled.

**Accessibility:**
- All animations respect `prefers-reduced-motion`.
- No flashing or strobing effects.
- Focus states are clearly visible.

---

## User Experience Standards

### Navigation
- Main navigation: 5 items or fewer.
- Every page reachable within 3 clicks.
- Breadcrumbs on deep pages.
- Search available on content-heavy sections.

### Forms
- Label every input clearly.
- Show inline validation (not just on submit).
- Explain errors in plain language.
- Never clear a form on error.

### Mobile Experience
- Touch targets: Minimum 44x44 pixels.
- No horizontal scrolling.
- Readable text without zoom (16px minimum).
- Fast loading even on 3G connections.

### Accessibility (WCAG 2.1 AA+)
- Keyboard navigation for all interactive elements.
- Screen reader announcements for dynamic content.
- Alt text for all informative images.
- Color contrast: 4.5:1 minimum for text.
- Focus indicators visible on all elements.

---

## Content Standards

### The "No Dead Ends" Rule

Every page must offer a clear next step:

| User Intent | Next Step |
|-------------|-----------|
| Just browsing | "Learn more about [topic]" |
| Comparing options | "See how we compare" or "Run the calculator" |
| Ready to engage | "Schedule a consultation" or "Start the audit" |
| Existing client | "Access your dashboard" or "View documentation" |

### Content Structure

**Homepage:**
1. Hero: What we do and why it matters.
2. Proof: Metrics and case studies.
3. Process: How we work (Client Independence Roadmap).
4. Tools: Self-service resources.
5. Trust: Security and quality signals.
6. CTA: Clear next step.

**Tool Pages:**
1. Purpose: What this tool does.
2. Input: Clear form or interface.
3. Output: Results with explanation.
4. Next Step: How to act on the results.

**Content Pages (Learn, Blog):**
1. Hook: Why this matters.
2. Explanation: What you need to know.
3. Application: How to use this information.
4. Related: Where to go next.

---

## Conversion Design

We convert through education, not manipulation.

### Ethical Conversion Principles
- No fake scarcity ("Only 2 spots left!").
- No hidden costs revealed at checkout.
- No dark patterns (roach motel subscriptions, tricky opt-outs).
- Clear value before any ask.

### Trust Builders
- Transparent pricing displayed openly.
- "View our security baseline" alongside "Contact us."
- Client logos and testimonials with full attribution.
- Team photos and bios (real people, real accountability).

### The Owner's Path
We highlight self-service options alongside direct contact:
- "Download the runbook" (free value).
- "Run the server planner" (self-service tool).
- "View the security checklist" (educational content).
- "Schedule a consultation" (expert help).

---

## Technical Implementation

### Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** Shadcn/Radix primitives
- **Animation:** Framer Motion (with reduced motion support)
- **Fonts:** Self-hosted via next/font

### Security Headers
All production sites include:
- Content Security Policy (CSP)
- Strict Transport Security (HSTS)
- X-Frame-Options (deny)
- X-Content-Type-Options (nosniff)
- Referrer-Policy (strict-origin-when-cross-origin)

### Monitoring
- Real User Monitoring (RUM) for performance.
- Error tracking with context.
- Uptime monitoring with public status page.
- Quarterly accessibility audits.

---

## Quality Checklist

Before any page goes live:

- [ ] Lighthouse scores 95+ across all categories.
- [ ] All images have alt text.
- [ ] Keyboard navigation works completely.
- [ ] Color contrast passes WCAG AA.
- [ ] Forms validate and show clear errors.
- [ ] Page has a clear next step (no dead ends).
- [ ] Mobile experience is excellent.
- [ ] Animations respect reduced motion preferences.
- [ ] Security headers are present.
- [ ] Content reads below 8th grade level.

---

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Feb 2, 2026 | Initial document |
| 2.1.0 | Feb 21, 2026 | Terminology update: Replaced "Owner-Controlled Systems Roadmap" with "Ownership Roadmap" |
| 2.2.0 | Mar 5, 2026 | Canonical alignment: "Ownership Roadmap" to "Client Independence Roadmap" per STYLE_GUIDE |

---

**Questions about digital experience?** Contact: design@vantus.systems

[End of Document VS-UI-201]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
