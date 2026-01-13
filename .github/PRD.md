# PRD — Premium Portfolio + Ops Suite Web App
**Codename:** Project SENTINEL  
**Scope:** Public front end + Admin Portal + Customer Portal  
**Document Type:** Product Requirements Document  
**Status:** Draft v1.0  
**Last Updated:** 2026-01-03  

> This PRD is based on a review of the current codebase structure (Next.js App Router, MDX content pipeline, motion system, “Proof Panel”, security middleware, and interactive “Lab” tooling). It intentionally ignores any existing PRD/design docs in the repo.

---

## 0) Product thesis

This app is not “a marketing site.” It is a **public demonstration of engineering maturity**:
- **Evidence-first storytelling** (audit artifacts, measurable outcomes, failure modes).
- **Product-quality UX** (Apple-caliber interaction polish, Google-level performance discipline).
- **Security-forward posture** (hardened defaults, minimal third-party exposure, visible verification).

The end state is a **three-surface system**:
1. **Public Experience** — cinematic, proof-driven portfolio + labs + journal.
2. **Admin Portal** — operator console to manage content, proof artifacts, leads, and releases.
3. **Customer Portal** — secure workspace for active engagements: milestones, deliverables, evidence drops, and status.

---

## 1) Goals and success criteria

### 1.1 Goals
1. Deliver a website that feels like a **premium product**—not a theme, template, or a SaaS landing page.
2. Demonstrate elite capability in:
   - System design
   - Performance engineering
   - Accessibility
   - Security hardening
   - Information architecture + content design
3. Provide real operational utility through Admin + Customer portals.

### 1.2 Success criteria (launch)
**Public Experience**
- Visitors can understand the “engineering narrative” within 10 seconds.
- “Proof Panel” verifies security posture and build provenance live.
- Case studies are rich, structured, and interactive (modes, diagrams, KPIs, failure modes).

**Admin Portal**
- A single operator can:
  - create/edit/publish content
  - manage leads
  - manage proof artifacts
  - manage portal users/projects
  - view audit logs of all privileged actions

**Customer Portal**
- A customer can:
  - sign in securely
  - view project timeline, milestones, deliverables, and evidence drops
  - download artifacts from a protected vault
  - submit change requests and see status updates

### 1.3 Non-functional success criteria
- Security headers enforced on all routes.
- Core Web Vitals meet “Good” thresholds (field data target):
  - LCP ≤ 2.5s
  - CLS ≤ 0.1
  - INP ≤ 200ms
- WCAG 2.2 AA baseline across all surfaces.

---

## 2) Scope

### 2.1 In scope
- Public routes, templates, and interactive modules (Work, Insights, Lab, Trust, Contact, Legal).
- Admin Portal (authenticated):
  - Content Management
  - Lead Inbox
  - Media Library
  - Proof Artifacts
  - Release Notes + Build Provenance
  - Role-based access control (RBAC)
  - Audit log viewer
  - Settings and feature flags
- Customer Portal (authenticated):
  - Project dashboard
  - Milestones & timeline
  - Deliverables vault
  - Evidence drops (performance, accessibility, security)
  - Change requests
  - Basic messaging (optional MVP: comment threads per deliverable)

### 2.2 Out of scope (for this PRD)
- Native mobile apps
- Billing and payments (can link out)
- Deep real-time collaboration (live cursors, etc.)
- Multi-language localization (design must be localization-ready)

---

## 3) Primary user roles

### 3.1 Public Experience roles
- **Visitor (anonymous)** — explores Work, Insights, Lab, Trust.
- **Returning visitor** — bookmarks, subscribes, shares.

### 3.2 Admin Portal roles (RBAC)
- **Owner (super-admin)** — full access, user management.
- **Admin** — publish content, manage portals/projects, view logs.
- **Editor** — draft/edit content, request publish.
- **Analyst** — view-only metrics, proof artifacts, and logs.
- **Support** (optional) — limited access to lead inbox and project updates.

### 3.3 Customer Portal roles (per customer org)
- **Customer Admin** — manages org users, can view all projects.
- **Customer Member** — can view assigned projects.
- **Customer Viewer** — read-only.

---

## 4) Information architecture

## 4.1 Public Experience (routes)
- `/` Home (narrative hero + proof-first modules)
- `/work` Work index (filter + featured + archive)
- `/work/[slug]` Work detail (interactive “Case Modes”)
- `/insights` Insights index (MDX articles)
- `/insights/[slug]` Insight detail (TOC, related, subscribe)
- `/lab` Lab index (tools + experiments)
- `/lab/revenue-leak` Example tool (client-side computation, privacy-first)
- `/trust` Trust Center (definition of done + self-audit)
- `/process` Process (pipeline + evidence)
- `/about` About (principles + story)
- `/contact` Contact (hardened form)
- `/privacy`, `/terms` Legal

### 4.2 Admin Portal (routes)
All admin routes under `/admin/*` and require auth.
- `/admin/login`
- `/admin` Dashboard
- `/admin/content`
  - `/admin/content/work`
  - `/admin/content/work/[slug]`
  - `/admin/content/insights`
  - `/admin/content/insights/[slug]`
  - `/admin/content/pages` (Home, Trust, About, Process copy blocks)
- `/admin/media`
- `/admin/leads`
- `/admin/portal`
  - `/admin/portal/customers`
  - `/admin/portal/customers/[id]`
  - `/admin/portal/projects`
  - `/admin/portal/projects/[id]`
  - `/admin/portal/users`
- `/admin/proof`
  - `/admin/proof/headers`
  - `/admin/proof/builds`
  - `/admin/proof/artifacts`
- `/admin/audit-logs`
- `/admin/settings` (site config, nav, feature flags)

### 4.3 Customer Portal (routes)
All customer routes under `/portal/*` and require auth.
- `/portal/login`
- `/portal` Customer dashboard (projects summary)
- `/portal/projects`
- `/portal/projects/[id]`
  - Overview
  - Milestones
  - Deliverables
  - Evidence Drops
  - Change Requests
  - Messages (optional)
- `/portal/account` (profile, security)
- `/portal/org` (org settings; admin only)

---

## 5) Public Experience requirements (granular)

## 5.1 Global requirements
- **Theme:** Light/dark, follows system preference by default; user override persists.
- **Navigation:** Sticky header, fast transitions, clear IA.
- **Motion:** Subtle and purposeful; must honor `prefers-reduced-motion`.
- **Proof-first:** Every claim must have a measurable hook:
  - metrics
  - artifacts
  - failure-mode narratives
  - verification panels

## 5.2 Home (`/`)
**Purpose:** demonstrate “engineering rigor + premium UX” without sounding like a brochure.

**Required modules**
1. Cinematic Hero (system traces + calibration headline + two CTAs)
2. “Build Plan” interactive module (pipeline with deliverables/evidence)
3. Proof Panel embed (self-audit)
4. Selected Work grid (cover art + outcomes)
5. Rigor & Stack (principles + capability chips)
6. Footer with a “no-nonsense” CTA

**Required behaviors**
- Hero background must degrade to static if motion reduced or low-power.
- Avoid template “feature cards”; use system diagrams or evidence-based blocks.

## 5.3 Work index (`/work`)
**Purpose:** exploration and depth.

**Requirements**
- Filter by tags (frontend, backend, security, infra, etc.)
- “Signal” chips: outcome, constraints, role, timeline
- Cover art: image if present; otherwise deterministic generative cover
- Sorting: newest first

## 5.4 Work detail (`/work/[slug]`)
**Purpose:** demonstrate system design thinking.

**Required structure**
- Hero: title, one-line thesis, outcomes snapshot
- “Case Modes” toggle:
  - Normal
  - Scale (10×)
  - Incident
- Sections (mode-aware):
  - Architecture diagram
  - KPI panel
  - Failure modes and mitigation
  - What changed in the system and why
  - Tradeoffs and decisions
- Redaction support (for sensitive details)
- Footer CTA: “Discuss a similar problem” (not “buy now”)

**Acceptance criteria**
- Works fully without JS (readable baseline).
- Mode toggle enhances, but does not block reading.

## 5.5 Insights (`/insights`, `/insights/[slug]`)
**Purpose:** thought leadership via system narratives.

**Requirements**
- Article templates with:
  - TOC (desktop)
  - reading time + date
  - related posts
  - typography tuned for long-form
- Optional “SystemSpec” callouts (structured, consistent)

## 5.6 Lab (`/lab/*`)
**Purpose:** interactive tools that prove craft and privacy discipline.

**Requirements**
- Each tool page clearly states:
  - what it does
  - whether data leaves the browser (default: **no**)
  - performance cost (if any)
- Tools must be robust:
  - validation
  - empty states
  - shareable result snapshots (client-side)

## 5.7 Trust Center (`/trust`)
**Purpose:** replace vague promises with definitions + artifacts.

**Requirements**
- Definition of Done list mapped to evidence artifacts
- Security posture:
  - headers + CSP summary
  - dependency surface area signal
  - data handling statement
- Link to Proof Panel

## 5.8 Contact (`/contact`)
**Purpose:** high-trust intake flow.

**Requirements**
- Client-side validation + server validation
- Spam defenses:
  - honeypot
  - rate limiting
  - origin allowlist
- Privacy messaging:
  - what happens next
  - response expectations
- Success state: clear next steps

---

## 6) Admin Portal requirements (granular)

## 6.1 Global admin requirements
- Auth required (no public admin routes).
- RBAC enforced on server.
- Audit logging required for all privileged actions.
- “Operator speed” UX:
  - keyboard shortcuts
  - command palette (optional)
  - persistent left nav + top command bar
  - search everywhere

## 6.2 Admin dashboard (`/admin`)
**Widgets**
- Recent activity (audit log summary)
- Content status (drafts awaiting publish)
- Lead inbox summary (new, in progress, closed)
- Proof status summary:
  - header enforcement results
  - last build proof
  - dependency hash

## 6.3 Content management (`/admin/content/*`)
**Work + Insights**
- CRUD for entries with:
  - slug
  - title/description
  - tags
  - published status
  - publish date (scheduled)
  - cover image or generative option
  - body content (MDX)
- Preview workflow:
  - render draft preview in-frame
  - diff view (optional MVP2)
- Validation:
  - slug uniqueness
  - required frontmatter fields
  - no unsafe MDX component usage

**Pages**
- Editable content blocks for Home/Trust/About/Process (copy-only, structured)
- Module toggles (enable/disable sections)

## 6.4 Media library (`/admin/media`)
- Upload images and documents
- Automatic optimization pipeline (dependency)
- Attachment permissions:
  - public
  - customer-only (portal)
  - admin-only
- Signed URLs for downloads (dependency)

## 6.5 Lead inbox (`/admin/leads`)
- List view with:
  - date
  - name/email
  - company
  - topic/budget
  - status
- Lead detail:
  - message
  - internal notes
  - status changes
  - export (CSV)
- Anti-abuse:
  - never render untrusted HTML
  - display sanitization

## 6.6 Portal management (`/admin/portal/*`)
**Customers**
- create/edit customer org
- add users, assign roles
- security settings (SSO optional future)

**Projects**
- create project
- set timeline milestones
- attach deliverables
- publish evidence drops
- notify customer users (dependency: email)

## 6.7 Proof & artifacts (`/admin/proof/*`)
- View current security headers snapshot
- View build proofs (commit, build time, deps hash)
- Upload and publish artifacts:
  - Lighthouse report
  - Accessibility checklist PDF
  - Security review summary
- Artifact permissions:
  - public (rare)
  - customer-specific
  - internal-only

## 6.8 Audit logs (`/admin/audit-logs`)
- Immutable event stream:
  - who
  - what
  - when
  - IP/device fingerprint (privacy-respecting)
  - affected object
- Export for compliance (CSV/JSON)

---

## 7) Customer Portal requirements (granular)

## 7.1 Global portal requirements
- Auth required.
- Tenant isolation enforced server-side (no cross-customer access).
- UX should feel like:
  - Apple Settings meets Linear/Airtable restraint,
  - not “B2B SaaS template.”

## 7.2 Customer dashboard (`/portal`)
- Projects list:
  - status
  - next milestone
  - last update timestamp
- “Evidence Drop” highlights:
  - most recent performance / accessibility / security artifacts
- Quick links:
  - schedule call (external link)
  - submit change request

## 7.3 Project detail (`/portal/projects/[id]`)
**Tabs/sections**
1. Overview (one-page status)
2. Milestones (timeline, dates, completion)
3. Deliverables (files + links + notes)
4. Evidence Drops (audit artifacts, proofs)
5. Change Requests (list + detail)
6. Messages (optional MVP2)

**Deliverables**
- Each deliverable has:
  - title
  - type (doc/file/link)
  - version
  - checksum (optional)
  - notes
  - access controls
  - download via signed URL

**Change Requests**
- Form: title, description, priority, attachments
- States: submitted → triaged → approved → in progress → shipped → closed
- Each state change is logged.

## 7.4 Account & org (`/portal/account`, `/portal/org`)
- Profile: name, email, password reset
- Security:
  - 2FA (optional, recommended)
  - active sessions list (MVP2)
- Org:
  - users + roles (customer admin)
  - notification preferences

---

## 8) Data model (product-level; implementation-agnostic)

> Exact persistence is a dependency. This defines the minimum entities and relationships.

### 8.1 Core entities
- **ContentEntry**
  - type: work | insight | page
  - slug
  - title, description
  - body (MDX or rich blocks)
  - tags
  - status: draft | scheduled | published | archived
  - publishedAt
  - updatedAt

- **MediaAsset**
  - id
  - kind: image | pdf | file
  - storageKey
  - mime
  - size
  - checksum (sha256)
  - visibility: public | portal | admin
  - customerId? (optional)

- **Lead**
  - id
  - name, email, company, role
  - topic, budget
  - message
  - status: new | in_progress | closed
  - createdAt

- **CustomerOrg**
  - id
  - name
  - domain allowlist (optional)
  - settings

- **CustomerUser**
  - id
  - orgId
  - role: admin | member | viewer
  - auth identifiers

- **Project**
  - id
  - orgId
  - name
  - status
  - milestones[]
  - deliverables[]
  - evidenceDrops[]

- **AuditLogEvent**
  - id
  - actorId
  - action
  - objectType/objectId
  - ts
  - ip (hashed/partial)
  - metadata (safe)

---

## 9) Security requirements (hardening baseline)

### 9.1 Security posture principles
- Minimize attack surface.
- Validate all inputs (server + client).
- Zero trust for user content (render safely).
- No third-party scripts unless justified.

### 9.2 Required controls
**Transport & headers**
- HSTS enabled (preload where possible)
- CSP with nonce + strict-dynamic (no `unsafe-eval`)
- frame-ancestors none
- referrer-policy strict
- permissions-policy deny sensitive APIs by default

**Auth & sessions**
- Secure cookies: `HttpOnly`, `Secure`, `SameSite=Lax/Strict`
- CSRF protections for mutation endpoints
- Rate limit login, contact, and portal actions using durable store (not in-memory only)

**RBAC & tenancy**
- Authorization enforced on server for every admin/portal route
- Tenant isolation checks on all portal queries

**Uploads & downloads**
- Signed URLs for private assets
- Virus scanning (dependency, recommended)
- Content-type validation and size limits

**Logging**
- Never log secrets or raw tokens
- Structured logs for auth/admin actions
- Audit logs immutable

### 9.3 Threat model (MVP must address)
- Content injection (MDX / rich text) → allowlist components, sanitize, and escape
- Enumeration → opaque IDs, rate limiting, avoid leaking existence
- CSRF / session fixation → hardened sessions, CSRF tokens
- XSS → CSP + safe rendering + no dangerous HTML
- Supply chain → lockfile integrity + dependency monitoring
- Clickjacking → frame-ancestors none

---

## 10) Performance requirements

### 10.1 Budgets
- JS: keep critical route JS minimal; prefer server components by default.
- Images: next/image everywhere, responsive sizes, modern formats.
- Animation: avoid layout thrash; no CLS from motion.

### 10.2 Progressive enhancement
- Core content is readable without JS.
- Motion and tools enhance, but never block.

### 10.3 Reliability
- Error boundaries for interactive tools
- Graceful failures for missing content
- Custom 404 and 500 pages for each surface

---

## 11) Accessibility requirements
- WCAG 2.2 AA baseline.
- Keyboard-first for admin/portal.
- Focus-visible rings consistent.
- Minimum target sizes (24×24 CSS px minimum, prefer larger in portals).
- Reduced motion support sitewide.

---

## 12) Analytics & instrumentation

### 12.1 Public Experience events
- page_view
- cta_click
- work_filter_change
- work_open
- insight_open
- lab_tool_use (event per tool)
- contact_submit_success / error
- proof_audit_run

### 12.2 Admin/portal events
- auth_login_success / fail
- content_publish
- lead_status_change
- artifact_upload
- project_update
- deliverable_download
- change_request_submitted

### 12.3 Privacy-first defaults
- Avoid fingerprinting.
- Consent management only if required by jurisdiction (hosting dependent).

---

## 13) Release plan (recommended phases)

### Phase 1 — Public Experience polish (MVP)
- Stabilize IA and content templates
- Ensure proof panel + trust narrative
- Performance and accessibility baseline

### Phase 2 — Admin Portal (operator-grade)
- Auth + RBAC
- Content + media management
- Lead inbox + audit logs
- Proof artifacts

### Phase 3 — Customer Portal (workspace)
- Auth + tenancy
- Project dashboards
- Deliverables vault + evidence drops
- Change requests

### Phase 4 — “Elite polish”
- Command palette
- Diff + preview tools for content
- Advanced evidence drops (automated ingestion)

---

## 14) Acceptance criteria (Definition of Done)

### 14.1 Public Experience
- All routes render and are linked; no dead ends.
- Proof Panel runs successfully and shows header presence + build proof.
- Work detail pages support interactive modes and degrade gracefully.
- Contact flow passes security controls (origin allowlist, honeypot, rate limit).

### 14.2 Admin Portal
- Unauthorized access is impossible (server enforced).
- RBAC verified for each route and action.
- Audit log captures all privileged actions.
- Content publish flow supports draft → preview → publish.

### 14.3 Customer Portal
- Tenant isolation enforced.
- Deliverables are protected behind signed URLs.
- Change requests flow end-to-end with audit trail.
- Accessibility and keyboard navigation meet AA baseline.

---

## Appendix A — Design system dependency
All surfaces must adhere to the accompanying design system document:
- `design_system.md` (Codename: PRISM//CORE)

---

## Appendix B — Content schemas (frontmatter contracts)

> The current codebase compiles MDX with `parseFrontmatter: true` and expects certain keys. This appendix formalizes those keys and extends them for Admin/Portal needs.

### B.1 Work entry (`content/work/*.mdx`)
**Required**
- `title` (string)
- `description` (string)
- `date` (ISO date string)

**Strongly recommended**
- `tags` (string[]) — e.g., `["frontend", "security", "infra"]`
- `role` (string) — e.g., `"Lead Engineer"`
- `timeline` (string) — e.g., `"8 weeks"`
- `outcome` (string) — one-line result statement
- `image` (string | null) — public cover image path
- `readTime` (string) — e.g., `"7 min"`

**Extended (for richer cases)**
- `kpis` (array of `{ label, before?, after?, delta?, note? }`)
- `constraints` (string[])
- `stack` (string[])
- `riskRegister` (array of `{ risk, severity, mitigation }`)
- `redactions` (array of `{ label, reason }`)

### B.2 Insight entry (`content/insights/*.mdx`)
**Required**
- `title`, `description`, `date`

**Recommended**
- `tags` (string[])
- `readTime` (string)
- `image` (string | null)

**Extended**
- `toc` (boolean) — allow disabling TOC on short posts
- `canonicalUrl` (string | null)

### B.3 Page content (Admin-managed blocks)
For pages like Home/Trust/About/Process, store structured blocks.

**Block types (minimum)**
- `hero`
- `section`
- `callout`
- `evidence`
- `cta`

Each block includes:
- `id` (uuid)
- `type`
- `title?`
- `body` (markdown string)
- `media?` (MediaAsset reference)
- `tone?` (system tone key)

---

## Appendix C — RBAC permission matrix

> RBAC must be enforced server-side. UI only *reflects* permissions; it must never be the control plane.

### C.1 Admin Portal RBAC
| Capability | Owner | Admin | Editor | Analyst | Support |
|---|---:|---:|---:|---:|---:|
| View dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage users & roles | ✅ | ✅ | ❌ | ❌ | ❌ |
| Publish content | ✅ | ✅ | ❌ (request only) | ❌ | ❌ |
| Create/edit drafts | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage media library | ✅ | ✅ | ✅ | ❌ | ❌ |
| View leads | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update lead status/notes | ✅ | ✅ | ✅ | ❌ | ✅ |
| Create customers/projects | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload proof artifacts | ✅ | ✅ | ❌ | ❌ | ❌ |
| View audit logs | ✅ | ✅ | ❌ | ✅ | ❌ |
| Export audit logs | ✅ | ✅ | ❌ | ✅ | ❌ |

### C.2 Customer Portal RBAC
| Capability | Customer Admin | Member | Viewer |
|---|---:|---:|---:|
| View org dashboard | ✅ | ✅ | ✅ |
| View all projects | ✅ | ❌ (assigned only) | ❌ (assigned only) |
| Manage org users | ✅ | ❌ | ❌ |
| Download deliverables | ✅ | ✅ | ✅ (if permitted) |
| Submit change requests | ✅ | ✅ | ❌ |
| Comment/message | ✅ | ✅ | ❌ |

---

## Appendix D — API contracts (front-end perspective)

> These are interface contracts for UI development. Implementations may use Route Handlers, Server Actions, or an external BFF—contracts remain stable.

### D.1 Public APIs
#### `POST /api/contact`
**Request**
- JSON: `{ name, email, company?, message, budget?, website? }`

**Response**
- `200`: `{ ok: true, requestId }`
- `400`: `{ ok: false, error, fields? }`
- `429`: `{ ok: false, error: "rate_limited" }`

**Front-end requirements**
- display field-level errors (`fields`) if present
- never leak anti-spam internals to user

#### `GET /api/proof/headers`
**Response**
- `200`: `{ ok: true, ts }` plus required security headers

**Front-end requirements**
- Proof Panel maps response headers to a required list and displays pass/fail

#### `GET /proof/build.json`
**Response**
- `{ commit, builtAt, depsSha256?, gatesConfigured[] }`

### D.2 Admin APIs (protected)
- `GET /api/admin/me`
- `GET /api/admin/content?type=work|insight|page`
- `POST /api/admin/content` (create)
- `PUT /api/admin/content/:id` (update)
- `POST /api/admin/content/:id/publish`
- `POST /api/admin/media` (upload)
- `GET /api/admin/leads`
- `PUT /api/admin/leads/:id`
- `GET /api/admin/audit-logs`

### D.3 Portal APIs (protected)
- `GET /api/portal/me`
- `GET /api/portal/projects`
- `GET /api/portal/projects/:id`
- `GET /api/portal/projects/:id/deliverables`
- `POST /api/portal/projects/:id/change-requests`
- `GET /api/portal/assets/:assetId/download` → returns signed URL redirect

---

## Appendix E — Security checklist (production hardening)

This checklist must be satisfied prior to public launch of Admin/Portal.

### E.1 OWASP-aligned controls (minimum)
- Input validation on all mutation endpoints (schema-based)
- Output encoding and safe rendering for all user-controlled strings
- Auth hardening (rate limiting, account lockout thresholds, MFA-ready)
- Session hardening (cookie flags, rotation)
- Access control enforcement per request (RBAC/tenancy)
- Secrets management (no secrets in client bundles)
- Dependency monitoring and lockfile integrity

### E.2 Platform hardening
- Strict CSP (nonce) + `frame-ancestors 'none'`
- HSTS with preload evaluation
- Disable directory listings and source map exposure in prod
- Ensure error pages do not leak stack traces or internal IDs

### E.3 Operational security
- Audit logs immutable and queryable
- Admin actions require re-auth for critical operations (optional MVP2)
- Upload scanning and content-type enforcement

---

## Appendix F — Performance budgets (per surface)

### F.1 Public Experience
- Home: keep interactive modules isolated; do not ship portal/admin code
- Work detail: pre-render MDX; client JS only for mode toggle enhancements
- Lab tools: isolate to tool routes; never globalize heavy client deps

### F.2 Admin/Portal
- Prefer server rendering for table shells and filters
- Use pagination or virtualization for large lists
- Avoid expensive animations; clarity over spectacle

---

## Appendix G — Deployment and environments

### G.1 Environments
- `development` (local)
- `preview` (per PR)
- `production`

### G.2 Secrets
- All secrets stored in platform secret manager
- Rotate auth secrets and signing keys

### G.3 Dependency currency
- Keep framework and runtime within supported versions (avoid EOL)
- Subscribe to security advisories for key dependencies
