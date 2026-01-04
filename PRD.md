# Vantus System — Public Website PRD
**Project:** Vantus System (vantus.systems)  
**Codename:** Project LATTICE  
**Document Type:** Product Requirements Document (Public-Facing Front End Only)  
**Status:** Draft v1.0  
**Last Updated:** 2026-01-03  
**Owner:** Product (TBD)  
**Approvers:** Brand, Legal/Privacy, Security, Engineering, Executive Sponsor (TBD)

---

## 0. Executive summary

Vantus System requires an enterprise-grade public website that communicates credibility, clarity, and technical excellence while delivering best-in-class performance and accessibility. The website will function as a product-quality “front door” for prospective customers, partners, candidates, and press—optimized for trust, speed, and conversion.

This PRD defines **front-end scope only**: page architecture, UX/UI, content surfaces, interaction standards, performance/security constraints, analytics, and delivery criteria. Back-end systems (CMS, form handling services, CRM integrations) are treated as dependencies and are intentionally not specified beyond contract requirements.

---

## 1. Goals

### 1.1 Business goals
1. Establish **Fortune-500-level credibility** via premium design, clear positioning, and strong trust signals.
2. Convert high-intent visitors into **qualified leads** (Contact Sales / Request Demo / Partnership).
3. Create a scalable content foundation for thought leadership (Insights / Case Studies / Updates).
4. Support recruiting with a high-quality Careers surface that reflects engineering standards.
5. Maintain “always-on” reliability: graceful failure modes, consistent navigation, and strong SEO fundamentals.

### 1.2 User goals
1. Understand “What Vantus System does” in < 10 seconds on first load.
2. Find relevant offerings quickly (by industry, outcomes, or capability).
3. Verify legitimacy: proof, security posture, and operational maturity.
4. Take action: contact, subscribe, follow, apply.

### 1.3 Success metrics (KPIs)
**Acquisition & engagement**
- Organic search growth (sessions, impressions, branded search lift)
- Engagement rate by page type (Home, Solutions, Resources)
- Scroll depth completion rate on key narratives (Home & primary Solution pages)

**Conversion**
- Lead conversion rate (Contact / Demo) by traffic source
- CTA click-through rate (primary & secondary CTAs)
- Form completion rate and abandonment rate

**Quality**
- Core Web Vitals pass rates in field data:
  - LCP ≤ 2.5s (75th percentile)
  - CLS ≤ 0.1 (75th percentile)
  - INP ≤ 200ms (75th percentile)
- Accessibility: WCAG 2.2 Level AA compliance (sitewide baseline)

---

## 2. Non-goals (explicitly out of scope)

1. Admin dashboards, authenticated portals, billing, or customer logins.
2. CMS selection/implementation, CRM configuration, or backend data model design.
3. Sales pipeline automation beyond front-end event emission and payload contracts.
4. Multi-language localization beyond ensuring the architecture can support it (unless otherwise prioritized).

---

## 3. Target audiences and primary use cases

### 3.1 Primary audiences
1. **Enterprise buyers** (Executives, CIO/CTO, Security leadership)
2. **Technical evaluators** (Staff+ engineers, architects)
3. **Partners** (platform/implementation partners, vendors)
4. **Talent** (engineering, design, product, operations)
5. **Press / analysts** (background, brand assets, announcements)

### 3.2 Primary user journeys (happy paths)
1. **Discovery → Clarity → Proof → Contact**
   - Land on Home → understand positioning → explore Solutions → view Proof/Case Studies → submit Contact Sales

2. **Technical due diligence**
   - Home → Product/Platform overview → Security/Trust page → Architecture/Approach content → contact

3. **Recruiting**
   - Careers → role details → company principles → apply (redirect or embedded ATS)

4. **Press**
   - Company → Press/News → brand kit → contact PR

### 3.3 Secondary journeys
- Newsletter subscription
- Resource download (whitepaper / report) capture
- Event/webinar registration (if applicable)

---

## 4. Brand & messaging requirements

> **Note:** Specific value proposition text is expected to be finalized by Brand/Leadership. This PRD defines *structure* and *requirements* to support that messaging.

### 4.1 Messaging pillars (front-end structure)
The website must support 3–5 core pillars, each with:
- **Short headline** (≤ 8 words)
- **Subheading** (≤ 180 chars)
- **3 proof points** (bullets)
- **1 supporting artifact** (metric, logo, certification, quote, case study)

Recommended pillar types:
- Outcomes / Business impact
- Technical excellence / Architecture
- Security / Reliability
- Partnership / Support model
- Velocity / Delivery

### 4.2 Trust signals requirements
The website must provide layered trust signals across the funnel:
- **Awareness:** logo wall (customers/partners), press mentions, “by the numbers”
- **Consideration:** case studies, testimonials, technical explainers
- **Decision:** security posture, compliance statements (if applicable), clear contact pathways, response expectations

---

## 5. Information architecture (IA)

### 5.1 Global navigation (top-level)
- Home
- Offerings (Solutions / Platform / Services — labels TBD)
- Industries (optional)
- Resources
- Company
- Careers
- Contact

### 5.2 Sitemap (MVP)
**Home**
- /

**Offerings**
- /offerings (overview)
- /offerings/[slug] (detail template)

**Resources**
- /resources (index)
- /resources/case-studies
- /resources/insights (blog)
- /resources/[slug] (article detail)
- /resources/glossary (optional, SEO)

**Company**
- /company (about)
- /company/security (trust center — content-based)
- /company/press (optional)
- /company/contact (or shared Contact)

**Careers**
- /careers
- /careers/[role] (or outbound to ATS)

**Legal**
- /privacy
- /terms
- /cookies (if applicable)

### 5.3 Navigation behaviors
- Sticky header with adaptive contrast and blur material
- Clear “primary CTA” (e.g., **Contact Sales**) always visible on desktop and accessible on mobile
- Mobile navigation via drawer with:
  - searchable list (optional)
  - prominent primary CTA
  - secondary CTAs: careers, newsletter

---

## 6. Page requirements (granular)

> Each page must be composed of standardized “modules” to ensure consistency and maintainability.

### 6.1 Shared page modules (library)
- Hero (headline, subhead, CTA, secondary CTA, visual)
- Proof Strip (logos / stats)
- Feature Grid (3–6 items)
- Narrative Split (text + visual)
- Scrollytelling Section (optional)
- Case Study Carousel / Grid
- Testimonial Wall
- Security/Trust Block (badges + statements + link)
- CTA Banner (1 primary action)
- FAQ Accordion
- Footer: links, legal, social, newsletter

### 6.2 Home (/)
**Purpose:** explain Vantus System in one glance and route users to the best next step.

**Required modules**
1. Hero
2. Proof Strip
3. Offering Overview (3 cards)
4. Narrative Split (approach)
5. Case Studies preview (3)
6. Trust block
7. CTA banner (Contact)
8. Footer

**Optional “wow” modules (guarded by performance budgets)**
- Interactive 3D hero scene or scroll-bound vignette (see Section 9)

### 6.3 Offerings index (/offerings)
**Required**
- Hero (category positioning)
- Offering grid (cards)
- Comparison or “Who it’s for” block
- FAQ
- CTA banner

### 6.4 Offering detail (/offerings/[slug])
**Required**
- Hero with 1 primary CTA
- Outcomes (3–5)
- Capabilities (6–10 in groups)
- Implementation approach (phases)
- Proof (case study + testimonial)
- Security block (if relevant)
- FAQ (5–10)
- CTA banner

### 6.5 Resources index (/resources)
**Required**
- Filterable index: Case Studies, Insights, Updates (tags)
- Search input (client-side)
- Featured resources row
- Newsletter signup module

### 6.6 Case studies (/resources/case-studies)
**Required**
- Filterable case studies
- Each case study summary includes:
  - logo (or anonymized label)
  - industry
  - outcomes metrics (1–3)
  - time to value (if available)
  - CTA: “Read”

### 6.7 Article detail (/resources/[slug])
**Required**
- SEO: title, description, social card
- Sticky TOC for long-form content (desktop)
- Author block (optional)
- Related posts (3)
- Newsletter module
- CTA banner

### 6.8 Company (/company)
**Required**
- Mission / principles (3–7)
- Leadership (optional)
- Operating model (how you work)
- Brand assets link (optional)
- CTA banner

### 6.9 Security / Trust Center (/company/security)
**Required (content-based, not a portal)**
- Security principles
- Secure development lifecycle summary
- Data handling & privacy summary
- Vendor list disclosure policy (optional)
- Contact security email / reporting process (front-end only)

### 6.10 Careers (/careers)
**Required**
- Hero
- Why Vantus System (principles, benefits summary)
- Open roles list (source is dependency)
- Hiring process overview
- CTA: “View roles” / “Apply”

### 6.11 Contact (/contact or /company/contact)
**Required**
- Contact form (see Section 8)
- Alternative channels: email, social, optional booking link
- Response expectations statement (e.g., “We reply within 1–2 business days”)

### 6.12 Legal pages (/privacy, /terms, /cookies)
**Required**
- Accessible, readable formatting
- Table of contents
- Last updated timestamp
- Contact info for requests

---

## 7. Content requirements

### 7.1 Content style
- Clear, direct, confident.
- Avoid jargon unless defined.
- Use Features → Benefits → Outcomes framing for offerings content.

### 7.2 Content governance (front-end)
- All templates must support:
  - drafts vs published (dependency)
  - scheduled publish (dependency)
  - author attribution (optional)
  - taxonomy: tags, categories, industries
- Front-end must enforce:
  - consistent typographic hierarchy
  - consistent card layouts and spacing
  - responsive media constraints (aspect ratios)

### 7.3 Media requirements
- Images must be optimized with responsive sizing and modern formats.
- Videos must:
  - default muted
  - provide captions
  - respect reduced-motion preferences (no autoplay if reduced motion)

---

## 8. Functional requirements (front-end)

### 8.1 Forms
**Contact Sales**
- Fields (MVP): name, work email, company, role, topic, message
- Validation: inline, accessible error messages
- Spam controls: honeypot + rate limiting contract + optional CAPTCHA (dependency)
- Success state: confirmation + next steps

**Newsletter**
- Email + consent text
- Double opt-in support (dependency)

### 8.2 Search (Resources)
- Client-side search for the currently loaded index
- Progressive enhancement: filters work without JS (where feasible)

### 8.3 Theming
- Must support light/dark theme tokens (per design system).
- Must respect system preference by default.

### 8.4 Accessibility features
- Skip-to-content link
- Keyboard navigation across all interactive elements
- Focus-visible rings that meet WCAG 2.2 focus appearance expectations
- Target sizes meet minimum requirements (see Section 10)

---

## 9. Motion, animation, and immersive experience (optional but recommended)

### 9.1 Principles
- Motion is functional: communicates hierarchy, continuity, and feedback.
- Motion must never compromise readability or performance.

### 9.2 Animation architecture (if 3D is included)
If the site includes hybrid DOM + WebGL (R3F/Spline) experiences, enforce a bimodal architecture:
- UI overlays: Motion (React)
- 3D orchestration: GSAP timelines
- Scroll normalization: Lenis
- Transient sync: Zustand (message bus), avoiding high-frequency React renders

### 9.3 Guardrails
- Respect prefers-reduced-motion:
  - disable parallax
  - replace timelines with instant states or subtle fades
- Progressive enhancement:
  - if WebGL fails, fallback to static media
- Performance budget:
  - no long tasks on main thread
  - animation should not induce layout shift (CLS)

---

## 10. Non-functional requirements

### 10.1 Performance (enterprise baseline)
- Meet Core Web Vitals “good” thresholds in field data.
- Avoid layout shifts (reserve space for media and dynamic blocks).
- Optimize for mobile-first performance (slow 4G assumptions).

### 10.2 Accessibility
- WCAG 2.2 Level AA baseline.
- Minimum interactive target size: 24×24 CSS pixels (or larger where possible).
- Color contrast: AA for body text.
- Full keyboard operability.

### 10.3 Security & privacy (front-end posture)
- Strict security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) per hosting capability (dependency).
- No third-party scripts without:
  - business justification
  - privacy review
  - performance budget sign-off
- Consent management when required by jurisdiction.

### 10.4 SEO & discoverability
- Metadata for every page:
  - title, description, canonical
  - OpenGraph + Twitter cards
- XML sitemap and robots.txt (dependency for generation, front-end must expose routes)
- Structured data where relevant:
  - Organization
  - Article
  - Breadcrumb
  - JobPosting (Careers)

### 10.5 Reliability & resilience
- Custom 404 page with helpful routes
- Graceful error UI for resource fetch failures
- Offline-ish friendliness:
  - show cached shell
  - retry controls for dynamic calls

---

## 11. Analytics & instrumentation

### 11.1 Event taxonomy (MVP)
- page_view (auto)
- cta_click (name, location, destination)
- form_start / form_submit / form_success / form_error
- resource_filter_change
- resource_search
- outbound_click (careers ATS, social)
- scroll_depth (25/50/75/100 on key pages)

### 11.2 Privacy-first defaults
- Prefer minimal, cookie-light analytics.
- Avoid fingerprinting behaviors.

---

## 12. Delivery requirements

### 12.1 Browser & device support
- Latest 2 versions of major browsers (Chrome, Safari, Firefox, Edge)
- iOS and Android evergreen
- Graceful degradation for low-power devices

### 12.2 Content readiness checklist
For launch, all pages must have:
- final copy OR approved placeholder copy
- imagery with rights cleared
- QA pass for accessibility basics
- metadata present

---

## 13. Launch plan (phased)

### Phase 0 — Discovery (1–2 weeks)
- finalize IA, messaging pillars, page inventory
- define brand tokens in design system
- build content spreadsheet (page → modules → copy owners)

### Phase 1 — Foundation (2–3 weeks)
- implement layout, navigation, footer
- implement core modules library
- implement SEO primitives and analytics plumbing

### Phase 2 — Content buildout (2–4 weeks)
- fill Home, Offerings, Company, Contact
- add Resources templates
- publish first 3–6 resources

### Phase 3 — Enterprise polish (1–3 weeks)
- motion polish + micro-interactions
- performance tuning to meet budgets
- accessibility remediation

### Phase 4 — Launch & iteration (ongoing)
- monitor field vitals
- iterate on conversion funnels
- add case studies and resources regularly

---

## 14. Acceptance criteria (definition of done)

1. All MVP routes in Section 5 render correctly and are linked in nav/footer.
2. All required modules exist and adhere to the design system (Axiom).
3. Core Web Vitals targets defined in Section 1.3 are met in representative audits.
4. WCAG AA baseline met for navigation, forms, headings, contrast, focus states, and target sizes.
5. Analytics events in Section 11.1 emit with correct payload schema.
6. Legal pages are present and accessible from footer.

---

## Appendix A — Dependencies (not implemented in this PRD)
- Content source (CMS or static content pipeline)
- Form submission service / email routing
- CRM / marketing automation
- ATS provider (Careers)
- Analytics provider
- Hosting/CDN and security headers configuration
