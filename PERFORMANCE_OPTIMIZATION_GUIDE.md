# PERFORMANCE OPTIMIZATION GUIDE

**DATE:** 2026-05-21
**STATUS:** NEEDS IMMEDIATE ATTENTION

---

## 1. Bundle Analysis & Bloat

**Critical Finding: Triplicate Animation Libraries**
The codebase imports three separate, heavy animation libraries, causing massive bundle fragmentation and bloat.

| Library | Estimated Size (Gzipped) | Status |
| :--- | :--- | :--- |
| `@splinetool/react-spline` (+ `three`) | ~600KB+ | **CRITICAL WASTE** |
| `gsap` | ~25KB | Redundant |
| `framer-motion` | ~30KB | Primary System |

**Impact:** Initial load time for `LivingBlueprintSection` (and thus the landing page) is unacceptable (>3s on 4G).
**Fix:**
1.  **Remove GSAP:** Refactor `components/living-blueprint-section.tsx` to use `framer-motion` (already present).
2.  **Lazy Load Spline:** Ensure `@splinetool` is strictly lazy-loaded and only for desktop users if possible.
3.  **Standardize:** Enforce `framer-motion` as the single source of truth for UI animations.

**Time to Fix:** 16 Hours

---

## 2. Database Performance Bottlenecks

**Critical Finding: SQLite in Production Schema**
**Location:** `prisma/schema.prisma`
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
**Impact:** SQLite supports only one writer at a time. This will cause `SQLITE_BUSY` errors immediately under concurrent load (e.g., >10 req/sec).
**Fix:** Migrate to PostgreSQL.
1.  Update `provider = "postgresql"`.
2.  Provision AWS RDS or generic Postgres instance.
3.  Update Prisma schema (handle Enum differences).

**Time to Fix:** 8 Hours

**Query Inefficiency:**
**Location:** `lib/admin/guards.ts`
The permission check fetches `user`, then `RoleAssignment`, then `Role`, then parses JSON in memory.
**Fix:** Normalize schema to allow `WHERE permission IN (...)` SQL queries.

---

## 3. Rendering & React Performance

**Issue: Dynamic Import Overuse / Misuse**
`app/globals.css` includes complex CSS animations (`system-layer`, `border-beam`) that trigger layout thrashing on low-end devices.

**Metric:**
- **LCP (Largest Contentful Paint):** Estimated > 2.5s due to client-side hydration of heavy Spline canvas on the fold.
- **TBT (Total Blocking Time):** High due to main-thread JSON parsing of permissions and hydration of multiple animation libs.

**Fix:**
- Extract critical CSS.
- Disable Spline on mobile (already partially done via CSS `lg:hidden` but JS still loads). Use `next/dynamic` with a `media` query check if possible, or conditional rendering based on `window.matchMedia`.

---

## 4. Infrastructure & Caching

**Issue: No Caching Strategy**
- `app/api/admin/users/route.ts` explicitly uses `jsonNoStore`. While good for security, aggressive "no-store" on *all* admin data without e-tags leads to unnecessary DB load.
- **Missing CDN:** No configuration for serving static assets via CloudFront/Vercel Edge.

**Fix:**
- Implement `stale-while-revalidate` for non-critical admin reads.
- Configure `next.config.mjs` `images` to use a dedicated CDN domain.

---

## 5. Specific Route Metrics (Estimated)

| Route | Est. Latency | Target | Bottleneck |
| :--- | :--- | :--- | :--- |
| `GET /` | 1200ms | <200ms | Spline JS Bundle, Font Loading |
| `POST /api/auth/signin` | 450ms | <100ms | SQLite Write Lock, bcrypt (CPU) |
| `GET /admin/users` | 300ms | <150ms | In-memory JSON parsing of permissions |
