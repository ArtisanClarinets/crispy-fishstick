# Performance Optimization Guide

## Bundle Analysis
**Estimated Total Size:** ~450KB (Gzipped) - **Requires Action**

### Heavy Dependencies
1.  **Three.js / Spline (`@splinetool/runtime`, `@splinetool/react-spline`)**
    *   **Impact:** ~600KB+ parsed. massive main thread blocking time.
    *   **Recommendation:** Lazy load these components (`next/dynamic`). Only load on interaction or visibility.
2.  **Framer Motion (`framer-motion`)**
    *   **Impact:** ~30KB gzipped.
    *   **Recommendation:** Use `LazyMotion` features to strip unused animations.
3.  **GSAP (`gsap`)**
    *   **Impact:** Duplicate functionality with Framer Motion.
    *   **Recommendation:** Consolidate to ONE animation library. Remove GSAP if Framer Motion is the primary choice.

## Database Optimization

### N+1 Query Risks
**Location:** `app/api/admin/users/route.ts` -> `lib/admin/guards.ts`
**Issue:**
The `getSessionUser` function fetches the user, then:
```typescript
if (jitRoleIds.length > 0) {
    const jitRoles = await prisma.role.findMany({ ... }); // Extra round trip
}
```
While not a loop, it's sequential fetching.
**Fix:** Use `include` or explicit join in the initial Prisma query to fetch JIT roles if possible.

### JSON Field Performance
**Location:** `Role.permissions` (Stringified JSON)
**Issue:** No database-level indexing on JSON contents. Cannot efficiently query "Users with Permission X".
**Impact:** Filtering users by permission requires full table scans or in-memory filtering (O(n)).
**Fix:** Normalize permissions into a `Permission` table and `RolePermission` join table.

## Rendering Performance

### Server-Side Rendering (SSR) overhead
**Issue:** `app/(admin)/admin/(dashboard)/page.tsx` uses `force-dynamic`.
**Impact:** This page rebuilds on EVERY request. It fetches 5 distinct database queries.
```typescript
Promise.all([
    prisma.lead.count(...),
    prisma.project.count(...),
    ...
])
```
**Fix:**
- Ensure `Promise.all` is actually used (it is, which is good).
- Add caching headers or `unstable_cache` for expensive aggregations.

## Metrics Targets

| Route | Current Est. | Target | Action |
|-------|--------------|--------|--------|
| `/admin` (Dashboard) | ~850ms | <300ms | Add DB indexes on `status` columns, cache stats. |
| `/api/admin/users` | ~400ms | <100ms | Optimize role permission parsing. |
| Landing Page (Spline) | ~2.5s LCP | <1.2s LCP | Lazy load 3D assets. |
