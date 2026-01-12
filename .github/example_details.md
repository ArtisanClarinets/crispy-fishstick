# Copilot Instructions — Mary Esther Bingo (Nuxt 4 + Prisma)

These instructions are for GitHub Copilot (VS Code) working **inside this repository**.

## What this repo is
- Project name (package.json): `app`
- App title (README.md): **Mary Esther Bingo**
- Primary goal: a public website plus an authenticated admin portal for operations (pricing, schedule, jackpots, MIC tools).
- **Total source files**: ~153 TypeScript/Vue files (excluding node_modules, .output, coverage)

## Tech stack (grounded in this repo)
- **Framework**: Nuxt 4.2 (Vue 3) with TypeScript
- **Styling**: Tailwind CSS (@nuxtjs/tailwindcss)
- **State**: Pinia (@pinia/nuxt)
- **Server**: Nitro/H3 API routes under `server/api/**`
- **Validation**: Zod (server) + @vee-validate/zod (client)
- **Database**: Prisma 5.22 with SQLite (`med.db` in repo root)
- **Security**: nuxt-security (CSP, rate limiting), custom CSRF middleware, argon2 password hashing
- **Icons**: Lucide Vue Next
- **Animation**: VueUse Motion

## Directory map (complete structure)
### Core Application
- `app.vue` — App shell
- `nuxt.config.ts` — Framework configuration (modules, security headers, CSP)
- `package.json` — Dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind customization

### Frontend (Nuxt)
- `pages/` — File-based routes (25 pages)
  - Public: `/`, `/about`, `/contact`, `/house-rules`, `/pricing`, `/privacy`, `/programs/**`, `/schedule`
  - Admin: `/admin/**` (login, homepage, charities, people, owner, progressives, mic/**, operations/**, pricing)
- `components/` — Vue SFC components (45 files)
  - `components/admin/` — Admin UI (25 components)
  - `components/public/` — Public components (12 components)
  - `components/ui/` — UI kit (8 components)
  - `components/bingo/`, `components/pricing/` — Domain-specific
- `layouts/` — Page layouts (`default.vue`, `blank.vue`)
- `middleware/` — Client routing guards (`auth.ts`, `role.ts`)
- `stores/` — Pinia state management (6 stores: homepage, jackpot, ops, pricing, schedule, user)
- `composables/` — Reusable logic (9 files: auth, autosave, business, csrf, permissions, schedule, shifts, toast)
- `utils/` — Utilities (10 files: cn, format, normalizeDay, pattern utils, roles, shift calculations)
- `types/` — TypeScript types (4 files: bing, shared types)
- `assets/` — Static assets (css, images, pdf, videos)
- `public/` — Public files (robots.txt, images)

### Backend (Nitro/H3)
- `server/api/` — API routes (57 endpoints)
  - Public: 14 endpoints (business, calendar, charities, contact, health, homepage, jackpot, next-session, pricing, programs, schedule, specials)
  - Auth: 3 endpoints (login, logout, user)
  - Admin: 40 endpoints (approval-requests, audit-logs, business, charities, holiday-rules, homepage, jackpot, messages, mic/incidents, mic/restricted-players, mic/shifts, patterns, pricing, programs, schedule, shift-records, specials, users)
- `server/middleware/` — H3 middleware (2 files: auth.ts, csrf.ts)
- `server/services/` — Business logic (8 services: audit, auth, contact, holidayRules, pricingCompiler, settings, shiftRecords, version)
- `server/schemas/` — Zod validation schemas (6 files: homepage, micIncident, micShift, restrictedPlayer, plus others)
- `server/utils/` — Server utilities (rateLimiter, storage, users, sessions)
- `server/db/` — Prisma client (`client.ts` singleton)

### Database & Migrations
- `prisma/` — Prisma configuration
  - `schema.prisma` — Database schema (User, Session, Shift, Incident, Program, Pricing, Settings)
  - `seed.js` — Initial data seeding (admin user, default config)
  - `migrations/` — Prisma migrations

### Scripts & Tooling
- `scripts/` — Automation (11 files)
  - `postinstall.js` — Auto DB setup + nuxt prepare
  - `setup-db.js` — Database provisioning
  - `start-server.js` — Production server launcher
  - `check-db.js` — DB connectivity test
  - `integration/` — Integration tests
- `verification/` — Playwright E2E tests (`verify_admin_console.py`)

### Documentation & Audit Artifacts
- `docs/` — Documentation (8 files: API endpoints, audit reports, deployment, runbook, verification)
- `.github/` — GitHub config (details.md, copilot-instructions.md, agents/)
- `.agent/` — Audit artifacts (API_INVENTORY, ARCHITECTURE_MAP, SECURITY_HARDENING, etc.)
- `README.md` — Project overview

## API Endpoints (57 total)

### Convention
File suffix controls HTTP verb: `.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`, `.patch.ts`.  
Files without suffix (e.g., `charities.ts`) handle multiple methods via `defineEventHandler`.

### Public Endpoints (14)
```
GET    /api/business
GET    /api/calendar/ics
GET    /api/charities
POST   /api/contact
GET    /api/health
GET    /api/homepage
GET    /api/jackpot
GET    /api/next-session
GET    /api/pricing
GET    /api/pricing/context
GET    /api/programs
GET    /api/programs/[slug]
GET    /api/schedule
GET    /api/specials
```

### Auth Endpoints (3)
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/user
```

### Admin Endpoints (40)
```
ANY    /api/admin/approval-requests
ANY    /api/admin/approval-requests/:id
GET    /api/admin/audit-logs
POST   /api/admin/business
ANY    /api/admin/charities
ANY    /api/admin/charities/:id
GET    /api/admin/holiday-rules
POST   /api/admin/holiday-rules
POST   /api/admin/homepage
POST   /api/admin/jackpot
GET    /api/admin/messages
GET    /api/admin/mic/incidents
POST   /api/admin/mic/incidents
PUT    /api/admin/mic/incidents/:id
GET    /api/admin/mic/restricted-players
POST   /api/admin/mic/restricted-players
GET    /api/admin/mic/restricted-players.search
DELETE /api/admin/mic/restricted-players/:id
POST   /api/admin/mic/shifts
DELETE /api/admin/patterns
GET    /api/admin/patterns
POST   /api/admin/patterns
POST   /api/admin/pricing
GET    /api/admin/pricing/draft
POST   /api/admin/pricing/draft
POST   /api/admin/pricing/publish
POST   /api/admin/pricing/rollback
GET    /api/admin/pricing/versions
GET    /api/admin/programs
POST   /api/admin/programs
DELETE /api/admin/programs
POST   /api/admin/schedule
GET    /api/admin/schedule/draft
POST   /api/admin/schedule/draft
POST   /api/admin/schedule/doors-open
POST   /api/admin/schedule/publish
POST   /api/admin/schedule/rollback
GET    /api/admin/schedule/versions
GET    /api/admin/shift-records
POST   /api/admin/shift-records
GET    /api/admin/shift-records/:id
PUT    /api/admin/shift-records/:id
DELETE /api/admin/shift-records/:id
POST   /api/admin/specials
GET    /api/admin/users
POST   /api/admin/users
DELETE /api/admin/users
PATCH  /api/admin/users/:id
```

## Environment Variables

### Documented in `.env.example`
```
APP_SECRET              # Required for production (CSRF, session signing)
DATABASE_URL            # SQLite: "file:./med.db" (default)
HEALTH_ALERT_WEBHOOK    # Optional: URL for health alerts
NODE_ENV                # "production" or "development"
SERVICE_NAME            # Application identifier
```

### Referenced in code/scripts (not in .env.example)
```
HEALTH_ALERT_TTL_MS     # Health check cache TTL (default: 1 hour)
NPM_CONFIG_PRODUCTION   # NPM install mode
SEED_ADMIN_PASSWORD     # Override default admin password during seed
SEED_ADMIN_USERNAME     # Override default admin username during seed
SKIP_DB_SETUP           # Skip postinstall DB provisioning
SKIP_SERVER             # Skip server startup in scripts
```

## Key Workflows

### Postinstall Flow (automatic on `npm install`)
1. Ensures `DATABASE_URL` exists (defaults to absolute `file:med.db` path)
2. Runs `prisma generate` (refresh Prisma client)
3. Runs `prisma db push --accept-data-loss` (sync schema to SQLite)
4. Runs `prisma db seed` (load admin user + config from `prisma/seed.js`)
5. Runs `nuxt prepare` (generate `.nuxt/` types)

### Development Workflow
```bash
npm install              # Initial setup (auto-runs postinstall)
npm run dev              # Start dev server (HMR + API routes on :3000)
npm run lint             # Type-check only (vue-tsc --noEmit)
npm run lint:fix         # ESLint auto-fix
npm run typecheck        # Same as lint
npm run build            # Production build → .output/
npm run preview          # Preview production build
npm run start:server     # Run built server (scripts/start-server.js)
npm run start:local      # HTTP dev mode (NODE_ENV=development, no Secure cookies)
```

### Database Management
```bash
npm run setup:db         # Provision database (same as postinstall)
npm run check:db         # Verify Prisma connectivity
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:migrate:dev  # Create migration
```

### Admin Verification
```bash
npm run verify:admin     # Run Playwright E2E tests (verification/verify_admin_console.py)
```

## Security Architecture

### Authentication
- **Session tokens**: Stored in `auth_token` cookie (httpOnly, secure in production)
- **CSRF tokens**: Stored in `csrf_token` cookie, sent as `x-csrf-token` header
- **Password hashing**: Argon2 (server/services/auth.service.ts)
- **Session storage**: In-memory + file-backed (`server/data/sessions.json`)

### Middleware
- **Auth middleware** (`server/middleware/auth.ts`): Validates session on protected routes
- **CSRF middleware** (`server/middleware/csrf.ts`): Enforces token on POST/PUT/PATCH/DELETE
- **Rate limiting**: nuxt-security (150 req/5min) + custom in-memory limiter for auth

### Client-Side
- `useCsrf().getHeaders()` → adds `x-csrf-token` header
- `credentials: "include"` → sends cookies
- `middleware/auth.ts` + `middleware/role.ts` → route guards

## Golden Rules for Copilot Changes

1. **Never guess API contracts** — If you change a server response, update ALL consumers
2. **Validate all external input** — Use Zod schemas on every handler
3. **Auth + RBAC required** — Server-side enforcement, never client-only
4. **CSRF on all mutations** — POST/PUT/PATCH/DELETE must pass CSRF checks
5. **Production clean** — No debug logs in hot paths, no console.log
6. **No placeholders** — Never output "TODO", "FIXME", "…" in production code
7. **Read before writing** — Confirm file paths, APIs, and patterns exist first

## Reference Files (Patterns to Follow)

### API Patterns
- `server/api/auth/login.post.ts` — Full auth flow with rate limiting
- `server/api/admin/users.post.ts` — Admin CRUD with validation
- `server/api/contact.post.ts` — Public form with rate limiting + honeypot

### Security Patterns
- `server/middleware/csrf.ts` — CSRF token generation/validation
- `server/middleware/auth.ts` — Session authentication
- `server/utils/rateLimiter.ts` — In-memory rate limiting

### Frontend Patterns
- `composables/useCsrf.ts` — CSRF token management
- `stores/ops.ts` — Pinia store with API integration
- `pages/admin/mic/shifts.vue` — Admin CRUD UI

### Database Patterns
- `prisma/schema.prisma` — Prisma schema definition
- `server/services/auth.service.ts` — Prisma queries + password hashing
- `prisma/seed.js` — Initial data seeding

## Where to Look First

### New to the codebase?
1. `README.md` — High-level overview
2. `nuxt.config.ts` — Security and module configuration
3. `server/api/auth/login.post.ts` — Complete endpoint example
4. `pages/admin/index.vue` — Admin dashboard entry point
5. `components/admin/` — Reusable admin UI patterns

### Debugging an issue?
1. Check `server/middleware/` for auth/CSRF blocks
2. Verify `package.json` scripts for correct commands
3. Run `npm run check:db` for database issues
4. Check `.agent/SECURITY_HARDENING.md` for known issues

### Adding a feature?
1. Read existing similar endpoints in `server/api/`
2. Check `server/schemas/` for validation patterns
3. Follow `components/admin/` patterns for UI
4. Update `docs/API_ENDPOINTS.md` if adding new routes

## Key routes you must not break
### Nuxt pages (from `pages/`)
- /
- /about
- /admin
- /admin/charities
- /admin/login
- /admin/mic
- /admin/mic/restricted-players
- /admin/mic/shifts
- /admin/mic/shifts/:id
- /admin/operations
- /admin/operations-enhanced
- /admin/operations/schedule/print
- /admin/operations/schedule/tv
- /admin/owner
- /admin/people
- /admin/progressives
- /contact
- /house-rules
- /pricing
- /privacy
- /programs
- /schedule

### API endpoints (from `server/api/`)
- Total endpoints found: **57**
- Convention: file name suffix controls HTTP verb: `.get.ts`, `.post.ts`, `.delete.ts`, etc.
- Spot-check list (first 25 by route):
- `ANY` /api/admin/approval-requests  ← server/api/admin/approval-requests.ts
- `ANY` /api/admin/approval-requests/:id  ← server/api/admin/approval-requests/[id].ts
- `GET` /api/admin/audit-logs  ← server/api/admin/audit-logs.get.ts
- `POST` /api/admin/business  ← server/api/admin/business.post.ts
- `ANY` /api/admin/charities  ← server/api/admin/charities.ts
- `ANY` /api/admin/charities/:id  ← server/api/admin/charities/[id].ts
- `GET` /api/admin/holiday-rules  ← server/api/admin/holiday-rules.get.ts
- `POST` /api/admin/holiday-rules  ← server/api/admin/holiday-rules.post.ts
- `POST` /api/admin/jackpot  ← server/api/admin/jackpot.post.ts
- `GET` /api/admin/messages  ← server/api/admin/messages.get.ts
- `GET` /api/admin/mic/incidents  ← server/api/admin/mic/incidents.get.ts
- `POST` /api/admin/mic/incidents  ← server/api/admin/mic/incidents.post.ts
- `PUT` /api/admin/mic/incidents/:id  ← server/api/admin/mic/incidents/[id].put.ts
- `GET` /api/admin/mic/restricted-players  ← server/api/admin/mic/restricted-players.get.ts
- `POST` /api/admin/mic/restricted-players  ← server/api/admin/mic/restricted-players.post.ts
- `GET` /api/admin/mic/restricted-players.search  ← server/api/admin/mic/restricted-players.search.get.ts
- `DELETE` /api/admin/mic/restricted-players/:id  ← server/api/admin/mic/restricted-players/[id].delete.ts
- `POST` /api/admin/mic/shifts  ← server/api/admin/mic/shifts.post.ts
- `GET` /api/admin/ops-schema  ← server/api/admin/ops-schema.get.ts
- `POST` /api/admin/ops-schema  ← server/api/admin/ops-schema.post.ts
- `POST` /api/admin/ops-schema.publish  ← server/api/admin/ops-schema.publish.post.ts
- `POST` /api/admin/ops-schema.rollback  ← server/api/admin/ops-schema.rollback.post.ts
- `POST` /api/admin/ops-schema/publish  ← server/api/admin/ops-schema/publish.post.ts
- `POST` /api/admin/ops-schema/rollback  ← server/api/admin/ops-schema/rollback.post.ts
- `DELETE` /api/admin/patterns  ← server/api/admin/patterns.delete.ts

## Environment variables (observed in source)
Documented in `.env.example`:
- APP_SECRET
- DATABASE_URL
- HEALTH_ALERT_WEBHOOK
- NODE_ENV
- SERVICE_NAME

Also referenced in code/scripts (not currently listed in `.env.example`):
- HEALTH_ALERT_TTL_MS
- NPM_CONFIG_PRODUCTION
- SEED_ADMIN_PASSWORD
- SEED_ADMIN_USERNAME
- SKIP_DB_SETUP
- SKIP_SERVER

## Golden rules for Copilot changes
1. **Do not guess API contracts.** If you change a server response shape, update every consumer in `pages/`, `components/`, `composables/`, `stores/`.
2. **All external input must be validated.** Use Zod on server handlers that parse body/query/params.
3. **Auth + RBAC are required for admin routes.**
   - UI: `middleware/auth.ts` and `middleware/role.ts` gate admin pages.
   - Server: use/extend server auth middleware patterns; do not rely on client-side checks.
4. **CSRF must cover mutating requests.** See `server/middleware/csrf.ts` and confirm it applies to all POST/PUT/PATCH/DELETE handlers.
5. **Keep production behavior clean.**
   - No debug logs in production hot paths.
   - Avoid introducing new `console.log` except in scripts/tests.
6. **No placeholders.** Never output “TODO”, “FIXME”, “…” or partial code in changed files.

## Standard workflow (commands defined in package.json)
```bash
# install
npm ci

# dev
npm run dev

# build + preview
npm run build
npm run preview

# quality gates
npm run lint
npm run typecheck

# database
npm run prisma:generate
npm run prisma:migrate:dev
npm run prisma:seed

# admin UI smoke check (Playwright)
npm run verify:admin
```

## Database change workflow (Prisma)
1. Edit `prisma/schema.prisma`.
2. Run:
   ```bash
   npm run prisma:migrate:dev
   npm run prisma:generate
   ```
3. Update any Zod schemas in `server/schemas/` that mirror DB shapes.
4. Update API handlers in `server/api/` and all UI consumers.
5. If seed data depends on the change, update `prisma/seed.js`.

## Where to look first (entry points)
- `nuxt.config.ts` — modules, security headers, runtime config.
- `app.vue` — app shell.
- `server/api/auth/*` + `server/services/auth.service.ts` — login/session.
- `server/api/admin/*` — admin surface area.
- `components/admin/` — admin UI components.

