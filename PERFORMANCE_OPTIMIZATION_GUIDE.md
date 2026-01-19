# 🚀 Performance Optimization Guide

**STATUS: NEEDS REMEDIATION**

The application suffers from significant performance bottlenecks due to incorrect rendering strategies, bloated bundles, and sub-optimal database usage.

## 📦 Bundle Analysis

**Total Estimated Bundle Size:** >500KB (gzip) initial load.

| Library | Size (Est.) | Status | Issue |
|---------|-------------|--------|-------|
| `three` (via spline) | ~600KB | 🔴 Critical | Huge dependency for background effects. |
| `framer-motion` | ~100KB | 🟡 Warning | Heavy animation library. |
| `gsap` | ~60KB | 🟡 Warning | **Duplicate** animation library. |
| `@splinetool/react-spline`| ~50KB | 🔴 Critical | Loads `three.js` and runtime. |
| `lucide-react` | Tree-shakable | ✅ OK | Good icon usage. |

**Recommendations:**
1.  **Eliminate Duplicates:** Choose **ONE** animation library. Remove `gsap` if `framer-motion` is the primary choice (or vice-versa).
2.  **Lazy Load Spline:** The 3D background is blocking the main thread. Lazy load `HeroBackground` or `SplineBlueprintCanvas`.
3.  **Optimize Fonts:** `Inter` is loaded via `next/font/google`, which is good, but check `display: swap`.

## ⚡ Rendering Performance

### 🔴 Force Dynamic Everywhere
**Location:** Multiple files (`app/layout.tsx`, `app/api/**/*.ts`)
- **Issue:** `export const dynamic = "force-dynamic"` is used extensively.
- **Impact:** This **disables** Next.js Static Site Generation (SSG) and Incremental Static Regeneration (ISR). Every request hits the server, increasing TTFB (Time To First Byte) and database load.
- **Fix:** Remove `force-dynamic`. Use `revalidate = 0` only where strictly necessary (e.g., specific admin dashboard data), but prefer granular revalidation tags.

### 🟡 Client-Side Bloat
**Location:** `app/layout.tsx`
- **Issue:** Heavy providers (`AppMotionConfig`, `PointerSignalProvider`) wrap the entire app.
- **Impact:** Increases TTI (Time To Interactive) as React hydrates the entire tree.
- **Fix:** Push providers down the tree. Only wrap components that actually need the context.

## 🗄️ Database & Backend

### 🔴 N+1 Query Issues
**Location:** `lib/auth.ts`
- **Code:**
  ```typescript
  // Fetches user, then roles, then parses permissions
  const user = await prisma.user.findUnique({ ... include: { RoleAssignment: ... } });
  ```
- **Impact:** While `include` prevents SQL N+1, the permission parsing logic inside the auth handler (which runs on every session check if not cached) is CPU intensive.
- **Fix:** Cache permissions in the session token (already partially done) or Redis.

### 🔴 SQLite Bottleneck
**Location:** Database
- **Issue:** SQLite writes lock the entire database file.
- **Impact:** Concurrent admin actions (e.g., one user updating a contract while another updates a user) will block each other, causing timeouts (HTTP 504).
- **Fix:** Switch to PostgreSQL with connection pooling (e.g., PgBouncer or Neon).

## 🌐 Infrastructure

### 🔴 No CDN Configuration
- **Issue:** No `next.config.js` `images` configuration for remote CDNs (AWS S3, Cloudinary).
- **Impact:** Images are served from the Next.js server (or local filesystem), consuming bandwidth and CPU for optimization.
- **Fix:** Configure `images.remotePatterns` and use a CDN for assets.

### 🔴 Missing Cache Headers
- **Issue:** API routes lack `Cache-Control` headers.
- **Impact:** Browsers re-fetch data on every navigation, even for static-like data (e.g., `services` list).
- **Fix:** Add `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` to `GET` routes.
