# PERFORMANCE OPTIMIZATION GUIDE

## Bundle Analysis
- **Total Estimated Bundle Size**: >500KB (Critical)
- **Duplicate Animation Libraries**:
  - `framer-motion` (v12)
  - `gsap` (v3)
  - `@gsap/react`
  - `@splinetool/react-spline` (v4)
  - `@splinetool/runtime`
- **Impact**: The application loads three separate physics/animation engines. This triples the parse/compile time for the main thread.
- **Fix**: Standardize on **one** library (Recommendation: `framer-motion` for React ecosystem integration). Remove `gsap` and `spline` unless strictly necessary for specific isolated marketing pages (lazy load them).

## Database Bottlenecks
- **Issue**: SQLite in Production
- **Location**: `prisma/schema.prisma`
- **Metric**: Concurrent writes are blocked.
- **Impact**: In a Fortune 500 scenario, SQLite will lock the entire database file for every write operation. >10 concurrent users will cause timeouts.
- **Fix**: Migrate to PostgreSQL (`provider = "postgresql"`) and use connection pooling (PgBouncer or Supabase Transaction Mode).

## Rendering & Caching
- **CRITICAL**: Global Cache Disable
- **Location**: `app/layout.tsx`
- **Snippet**: `export const dynamic = "force-dynamic";`
- **Impact**: This forces Server-Side Rendering (SSR) for *every single request* to the website, including the homepage, marketing pages, and blog. This negates the benefits of Next.js and CDN edge caching.
- **Fix**: Remove this line from `app/layout.tsx`. Apply `force-dynamic` only to the specific API routes or Admin pages that actually require it.

## Client-Side Bloat
- **Component**: `Waves.tsx` (Canvas)
- **Component**: `SplineBlueprintCanvas.tsx` (WebGL)
- **Issue**: Heavy main-thread usage.
- **Recommendation**:
  1. Use `dynamic()` imports for these components with `ssr: false`.
  2. Implement `IntersectionObserver` to pause/unload the canvas when not in the viewport.

## Infrastructure
- **CDN**: Not configured (Relies on single VM Nginx).
- **Images**: `next/image` is used, but without a Vercel/Cloudflare image optimization service, the Node.js server will burn CPU resizing images on the fly.
