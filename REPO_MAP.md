# Repository Map: Crispy-Fishstick

## 1. Overview
**Crispy-Fishstick** is a comprehensive **Agency Admin Portal** and **Internal Developer Platform (IDP)**. It serves as the central nervous system for Vantus Systems, bridging commercial operations (CRM, Billing) with technical execution (DevOps, Project Management).

## 2. Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Production), SQLite (Dev)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v4 (JWT Strategy)
- **Styling**: Tailwind CSS, Shadcn UI, GSAP
- **Testing**: Vitest (Unit), Playwright (E2E)
- **Infrastructure**: Vercel (likely), AWS S3 (Media)

## 3. Directory Structure (Key Paths)
```text
/
├── .github/agents/       # AI Agent definitions (e.g., thinking-beast)
├── app/                  # Next.js App Router
│   ├── admin/            # Admin Portal Pages (Protected)
│   │   ├── layout.tsx    # Admin Shell & Nav
│   │   ├── leads/        # Lead Management
│   │   └── page.tsx      # Dashboard
│   ├── api/              # API Routes
│   │   └── admin/        # Admin API Endpoints (Guarded)
│   └── layout.tsx        # Root Layout
├── components/           # React Components
│   ├── admin/            # Admin-specific UI
│   ├── ui/               # Shadcn UI Primitives
│   └── mdx/              # MDX Components
├── lib/                  # Shared Utilities & Business Logic
│   ├── admin/            # Admin Core Logic
│   │   ├── audit.ts      # Audit Logging System
│   │   └── guards.ts     # RBAC & Tenant Isolation
│   ├── auth.ts           # NextAuth Configuration
│   ├── prisma.ts         # DB Client
│   └── utils.ts          # Helper functions
├── prisma/               # Database Schema & Migrations
│   └── schema.prisma     # Data Models
├── public/               # Static Assets
├── e2e/                  # Playwright End-to-End Tests
├── middleware.ts         # Edge Middleware (Auth & CSP)
├── instrumentation.ts    # Server Startup Checks
├── AGENT_GUIDE.md        # Critical Rules for AI Agents
└── ADMIN.md              # Detailed Requirements & Specs
```

## 4. Core Architecture

### A. Authentication & Security
- **Entry Point**: `middleware.ts` enforces Content Security Policy (CSP) and validates sessions for `/admin` routes.
- **RBAC**: Implemented in `lib/admin/guards.ts`.
    - `requireAdmin()`: Server-side gatekeeper.
    - `tenantWhere()`: Enforces multi-tenancy data isolation.
- **Session**: Stateless JWT sessions via NextAuth.js.

### B. Data & State
- **Database**: Relational model via Prisma.
- **Mutations**: All administrative writes must be wrapped in a transaction or accompanied by an audit log.
- **Validation**: Zod schemas used for all API inputs.

### C. Vital Systems

#### 1. Audit System (`lib/admin/audit.ts`)
*   **Purpose**: Immutable record of all admin actions.
*   **Trigger**: Must be called on every POST/PATCH/DELETE.
*   **Schema**: Records `actor`, `action`, `resource`, `diff` (before/after).

#### 2. Media Pipeline
*   **Flow**: Direct-to-S3 Uploads using Presigned URLs.
*   **Security**: Strict MIME type validation and size limits.
*   **Registration**: Assets are registered in DB immediately after upload.

#### 3. Tenant Isolation
*   **Strategy**: Row-Level Security (logical) via `tenantId` column.
*   **Enforcement**: `tenantWhere()` helper must be applied to all Prisma queries involving tenant data.

## 5. Data Models (Conceptual)
*See `prisma/schema.prisma` for exact definitions.*

- **User**: System users with Roles.
- **Role**: RBAC definitions (permissions).
- **Tenant**: Organization boundaries.
- **Lead**: CRM entries (Tenant-scoped).
- **AuditLog**: System-wide activity trail.
- **MediaAsset**: S3 object metadata.

## 6. Critical Workflows

### Admin Login
1. User visits `/admin`.
2. Middleware checks token.
3. If invalid, redirects to `/admin/login`.
4. On success, loads `app/admin/layout.tsx`.

### Lead Ingestion
1. `POST /api/admin/leads`
2. Validate Body (Zod).
3. Check Permissions (`requireAdmin`).
4. Write to DB (Prisma).
5. Log Audit (`createAuditLog`).

## 7. Development Guidelines
- **Linting**: ESLint with Next.js Core Vitals.
- **Testing**:
    - Unit: `npm test` (Vitest) for `lib/` logic.
    - E2E: `npm run test:e2e` (Playwright) for critical flows.
- **Env Vars**: Validated at runtime via `instrumentation.ts`.