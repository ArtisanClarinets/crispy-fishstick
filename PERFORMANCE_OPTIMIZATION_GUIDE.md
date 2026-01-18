# PERFORMANCE OPTIMIZATION GUIDE

**DATE:** 2025-05-15
**SCOPE:** Frontend, Backend, Database, Infrastructure
**STATUS:** MAJOR OPTIMIZATION REQUIRED

## 1. Bundle Size & Dependency Bloat
**Severity:** HIGH
**Impact:** Slow Time-to-Interactive (TTI), high bandwidth costs.

The project currently loads **multiple overlapping animation libraries**, significantly inflating the initial bundle size.

| Library | Size (Est. Gzipped) | Usage | Recommendation |
| :--- | :--- | :--- | :--- |
| `gsap` | ~24KB | Used in `LivingBlueprint` | **REMOVE**. Migrate complex animations to Framer Motion. |
| `@splinetool/react-spline` | ~100KB+ (Runtime) | Used for 3D Canvas | **DEFER**. Lazy load strictly. |
| `framer-motion` | ~30KB | Global UI transitions | **KEEP**. Standardize on this. |
| `tailwindcss-animate` | <1KB | Simple CSS keyframes | **KEEP**. Lightweight. |
| `react-markdown` | ~15KB | Admin forms | **OPTIMIZE**. Import dynamically only when needed. |

**Action Plan:**
1.  Consolidate all UI animations to `framer-motion` and CSS.
2.  Remove `gsap` entirely.
3.  Implement `next/dynamic` for `@splinetool/react-spline`.

## 2. Rendering Strategy
**Severity:** CRITICAL
**Impact:** Server CPU exhaustion, slow TTFB (Time to First Byte).

**The "Force Dynamic" Global Kill-Switch:**
`app/layout.tsx` contains:
```typescript
export const dynamic = "force-dynamic";
```
This single line **disables Static Site Generation (SSG) and Incremental Static Regeneration (ISR)** for the *entire application*. Every single page request triggers a full server-side render, hitting the database and regenerating HTML.

**Fix:**
Remove this line immediately. Apply `force-dynamic` only to specific routes that require it (e.g., `/admin`, `/api/user`).

## 3. Component Performance: `Waves.tsx`
**Severity:** MEDIUM
**Impact:** Main thread blocking, battery drain on mobile.

The `Waves` component runs a 2D Canvas animation loop:
```typescript
lines.forEach((line) => {
  line.update(...); // Expensive loop over points
  line.draw(ctx!);
});
```
*   **Issue:** It runs on the main thread.
*   **Issue:** High point count (`width / xGap`) creates O(N) calculations per frame.
*   **Fix:**
    1.  Move animation logic to a Web Worker (OffscreenCanvas).
    2.  Use `requestAnimationFrame` with a frame limiter (e.g., skip frames or cap at 30fps for background elements).
    3.  Pause animation when not in viewport (`IntersectionObserver`).

## 4. Database & Infrastructure
**Severity:** HIGH
**Impact:** Concurrency bottlenecks.

*   **SQLite:** Cannot handle concurrent writes efficiently. A write operation locks the entire database file.
    *   **Recommendation:** Migrate to PostgreSQL (AWS RDS or equivalent).
*   **N+1 Queries:** `lib/auth.ts` calls `prisma.user.findUnique` with `include: { RoleAssignment: ... }`. If this pattern is repeated in lists (e.g., fetching users), it will kill performance.
*   **Connection Pooling:** Not available in SQLite. Essential for serverless/containerized environments.

## 5. Metrics & Targets

| Metric | Current Estimate | Target | Action |
| :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | 1.8s (due to bloat) | < 0.8s | Tree-shake GSAP, Lazy load Spline. |
| **Time to First Byte (TTFB)** | 400ms+ (Force Dynamic) | < 100ms | Enable SSG/ISR. |
| **API Response Time** | ~150ms | < 50ms | Add Redis Cache layer (don't rely on SQLite for reads). |
| **Lighthouse Performance** | ~65/100 | 95+/100 | Fix layout shifts from Canvas; Optimize images. |
