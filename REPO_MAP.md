# Repository Map

## Core Structure
- **app/**: Next.js 16 App Router.
  - **(site)/**: Public marketing site.
  - **(admin)/**: Admin dashboard (protected).
  - **api/**: API routes (handlers).
- **components/**: React components.
  - **ui/**: Shadcn/radix primitives.
  - **admin/**: Admin-specific UI.
  - **infrastructure/**: Truth Engine components.
- **lib/**: Shared logic.
  - **security/**: Session, Origin, Admin guards.
  - **infrastructure/**: Estimator/Configurator logic.
  - **prisma**: DB client.
- **content/**: MDX content (Work, Insights, Academy).

## Key Boundaries
- **proxy.ts**: The REQUEST INTERCEPTION boundary. Handles CSP, Headers, Admin Auth checks.
- **middleware.ts**: DOES NOT EXIST. Replaced by `proxy.ts` + `next.config.mjs` routing.
- **lib/admin/guards.ts**: Enforces RBAC in Server Actions/API Routes.

## Data Layer
- **Prisma (SQLite)**: Main database.
- **InfraBuild**: Stores temporary configuration snapshots.
