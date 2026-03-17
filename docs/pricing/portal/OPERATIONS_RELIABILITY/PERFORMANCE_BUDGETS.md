# Vantus Client Portal - Performance Budgets

**Document Version:** 1.0.0  
**Last Updated:** 2026-02-22  
**Owner:** Engineering Team  
**Status:** IMPLEMENTATION-READY

---

## Executive Summary

This document defines the performance budgets for the Vantus Client Portal. All metrics are **non-negotiable** quality gates that must be met before any feature can be deployed to production. Performance is a feature, not an optimization.

### Performance Philosophy
- **User-centric:** Every budget maps to user experience
- **Measurable:** All targets are quantifiable and testable
- **Enforceable:** CI/CD gates prevent budget violations
- **Progressive:** Graceful degradation for constrained environments

---

## 1) Core Web Vitals Targets

### 1.1 Largest Contentful Paint (LCP) Budgets

| Page Type | Target | Maximum | Measurement Point |
|-----------|--------|---------|-------------------|
| **Landing/Login Page** | ≤ 1.2s | 1.8s | Hero image or form element |
| **Dashboard Overview** | ≤ 1.5s | 2.2s | Chart canvas or KPI card |
| **Ticket List** | ≤ 1.8s | 2.5s | First ticket card |
| **Ticket Detail** | ≤ 1.5s | 2.0s | Ticket header |
| **Document Library** | ≤ 2.0s | 2.8s | First document thumbnail |
| **Document Viewer** | ≤ 1.8s | 2.5s | Document preview |
| **Search Results** | ≤ 1.5s | 2.0s | First result item |
| **Report Generator** | ≤ 2.0s | 3.0s | Report canvas |
| **Export Page** | ≤ 1.5s | 2.0s | Export form |
| **User Settings** | ≤ 1.2s | 1.8s | Settings form |
| **Admin Panel** | ≤ 2.0s | 3.0s | Admin dashboard |

**LCP Calculation Requirements:**
- Measured on 75th percentile of real-user monitoring (RUM) data
- Tested on simulated Fast 3G connection
- Image optimization: WebP format, lazy loading beyond fold
- Font display: `font-display: swap` mandatory

### 1.2 Interaction to Next Paint (INP) Targets

| Interaction Type | Target | Maximum | Context |
|-----------------|--------|---------|---------|
| **Button Clicks** | ≤ 100ms | 200ms | All primary actions |
| **Form Submissions** | ≤ 150ms | 300ms | Login, create ticket, etc. |
| **Navigation Clicks** | ≤ 80ms | 150ms | Sidebar, tabs, breadcrumbs |
| **Search Input** | ≤ 50ms | 100ms | Real-time search debounced |
| **Dropdown Selection** | ≤ 60ms | 120ms | Filter dropdowns |
| **Checkbox Toggle** | ≤ 40ms | 80ms | Bulk actions, filters |
| **Modal Open** | ≤ 120ms | 200ms | Create ticket, preview |
| **Accordion Expand** | ≤ 60ms | 120ms | FAQ, document sections |
| **Drag Operations** | ≤ 80ms | 150ms | File uploads, reordering |
| **Infinite Scroll** | ≤ 150ms | 250ms | Ticket list, documents |
| **Chart Interaction** | ≤ 100ms | 200ms | Hover, zoom, filter |

**INP Optimization Requirements:**
- Main thread blocking ≤ 50ms per task
- Input handlers must yield within 100ms
- React concurrent features enabled
- Web Workers for heavy computations

### 1.3 Cumulative Layout Shift (CLS) Maximums

| Page State | Target | Maximum | Notes |
|------------|--------|---------|-------|
| **Initial Load** | ≤ 0.05 | 0.10 | Above-fold content |
| **Content Injection** | ≤ 0.02 | 0.05 | Dynamic content loading |
| **Image Loading** | ≤ 0.01 | 0.03 | All images must have dimensions |
| **Font Loading** | ≤ 0.02 | 0.05 | Fallback font metrics matching |
| **Ad/Widget Injection** | ≤ 0.05 | 0.10 | Chat widgets, announcements |
| **User Interaction** | ≤ 0.01 | 0.05 | Click-triggered changes |

**CLS Prevention Requirements:**
- All images: explicit `width` and `height` attributes
- Fonts: `size-adjust` in `@font-face` for metrics matching
- Dynamic content: reserved space with skeleton loaders
- Iframes: aspect-ratio containers

### 1.4 First Contentful Paint (FCP) Targets

| Page Type | Target | Maximum | Notes |
|-----------|--------|---------|-------|
| **All Pages** | ≤ 0.8s | 1.2s | First text or image render |
| **Login Page** | ≤ 0.6s | 1.0s | Critical path optimized |
| **Dashboard** | ≤ 0.9s | 1.3s | Includes chart skeletons |

**FCP Optimization:**
- Inline critical CSS (< 14KB gzipped)
- Preload key fonts
- DNS prefetch for API domain
- Preconnect to CDN origins

### 1.5 Time to First Byte (TTFB) Targets

| Endpoint Type | Target | Maximum | Location |
|---------------|--------|---------|----------|
| **HTML Pages** | ≤ 200ms | 400ms | Edge location |
| **API (US East)** | ≤ 100ms | 200ms | Origin server |
| **API (US West)** | ≤ 150ms | 300ms | Origin server |
| **API (EU)** | ≤ 200ms | 400ms | Origin server |
| **Static Assets** | ≤ 50ms | 100ms | CDN edge |
| **API (Mobile)** | ≤ 300ms | 600ms | High-latency networks |

**TTFB Optimization:**
- Edge caching: 95% hit ratio target
- Origin response: < 50ms processing time
- Database query: < 20ms for simple lookups
- TLS 1.3 with 0-RTT enabled

### 1.6 First Input Delay (FID) Targets

| Context | Target | Maximum | Notes |
|---------|--------|---------|-------|
| **First User Input** | ≤ 50ms | 100ms | Measured on first interaction |
| **Post-Load Input** | ≤ 20ms | 50ms | After initial load complete |
| **Heavy Operations** | ≤ 100ms | 200ms | During report generation |

**FID Optimization:**
- Long tasks < 50ms
- Yield to main thread every 50ms
- Code splitting for non-critical paths
- Web Workers for parsing/processing

---

## 2) Bundle Size Budgets

### 2.1 Entry Point Bundle Limits

| Bundle | Gzipped Limit | Uncompressed Limit | Contents |
|--------|---------------|-------------------|----------|
| **main.js** | 120 KB | 400 KB | React, ReactDOM, router, core utilities |
| **vendor.js** | 180 KB | 600 KB | Third-party libraries (lodash, date-fns, etc.) |
| **runtime.js** | 5 KB | 15 KB | Webpack runtime, module manifest |
| **Total Initial JS** | 305 KB | 1,015 KB | All entry chunks combined |
| **initial.css** | 35 KB | 120 KB | Critical + layout styles |
| **Total Initial** | 340 KB | 1,135 KB | JS + CSS combined |

**Bundle Enforcement:**
```javascript
// webpack.config.js
performance: {
  maxAssetSize: 305 * 1024, // 305 KB gzipped
  maxEntrypointSize: 340 * 1024, // 340 KB gzipped
  hints: 'error'
}
```

### 2.2 Route-Specific Chunk Budgets

| Route | JS Budget | CSS Budget | Lazy Loaded |
|-------|-----------|------------|-------------|
| `/login` | 40 KB | 8 KB | No (eager) |
| `/dashboard` | 80 KB | 15 KB | Charts (60 KB) |
| `/tickets` | 60 KB | 12 KB | Virtual scroll (25 KB) |
| `/tickets/[id]` | 50 KB | 10 KB | Comments (15 KB) |
| `/documents` | 70 KB | 14 KB | PDF viewer (120 KB) |
| `/documents/[id]` | 45 KB | 8 KB | Preview (80 KB) |
| `/search` | 55 KB | 10 KB | Highlighting (20 KB) |
| `/reports` | 90 KB | 18 KB | Chart types (100 KB) |
| `/exports` | 40 KB | 8 KB | XLSX library (150 KB) |
| `/settings` | 35 KB | 12 KB | No |
| `/admin/*` | 100 KB | 20 KB | Admin charts (80 KB) |

**Code Splitting Strategy:**
- Dynamic imports for routes > 50 KB
- Prefetch on hover for likely navigation
- Preload critical routes after initial load

### 2.3 Third-Party Script Budgets

| Script Category | Budget | Load Strategy | Priority |
|----------------|--------|---------------|----------|
| **Analytics (PostHog)** | 25 KB | Async, deferred | Low |
| **Error Tracking (Sentry)** | 15 KB | Async, preload | Medium |
| **Authentication (BetterAuth)** | 30 KB | Eager | High |
| **Monitoring (Vercel)** | 10 KB | Async | Low |
| **Chat Widget (Optional)** | 50 KB | User-triggered | Low |
| **Third-Party Total** | 130 KB | - | - |

**Script Loading Requirements:**
- All third-party scripts async or deferred
- Subresource Integrity (SRI) for all external scripts
- CSP-compliant loading only
- No render-blocking third-party scripts

### 2.4 Image Asset Budgets

| Image Type | Format | Max Size | Dimensions | Loading |
|------------|--------|----------|------------|---------|
| **Hero Images** | WebP/AVIF | 80 KB | 1920×1080 | Eager |
| **Card Thumbnails** | WebP | 15 KB | 400×300 | Lazy |
| **User Avatars** | WebP | 5 KB | 128×128 | Eager |
| **Document Icons** | SVG | 2 KB | Scalable | Inline |
| **Chart Images** | PNG (fallback) | 30 KB | 800×600 | On-demand |
| **Logo** | SVG | 5 KB | Scalable | Inline |
| **Icons** | SVG Sprite | 20 KB total | 24×24 | Inline |
| **Background Patterns** | CSS/SVG | 10 KB | Repeatable | CSS |

**Image Optimization Pipeline:**
- Automatic WebP/AVIF generation
- Responsive images with `srcset`
- Lazy loading: `loading="lazy"` below fold
- Priority hints: `fetchpriority="high"` for LCP

### 2.5 Font Loading Budgets

| Font Category | Formats | Budget | Strategy |
|--------------|---------|--------|----------|
| **Primary Font (Inter)** | WOFF2 | 35 KB | Preload |
| **Monospace (JetBrains Mono)** | WOFF2 | 25 KB | Swap |
| **Icon Font (Lucide)** | SVG/JS | 30 KB | Async |
| **Total Font Budget** | - | 90 KB | - |

**Font Loading Requirements:**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
  font-weight: 400 700;
  ascent-override: 90%;
  descent-override: 20%;
}
```
- `font-display: swap` mandatory
- Preload critical font weights only (400, 600)
- Subset fonts for used character ranges
- Size-adjust for reduced CLS

### 2.6 CSS Budget Limits

| CSS Category | Gzipped | Uncompressed | Notes |
|-------------|---------|--------------|-------|
| **Critical CSS** | 14 KB | 45 KB | Inline in `<head>` |
| **Layout CSS** | 20 KB | 65 KB | Loaded via `<link>` |
| **Component CSS** | 30 KB | 100 KB | Lazy loaded per route |
| **Utility Classes** | 15 KB | 50 KB | Tailwind purge unused |
| **Animations** | 10 KB | 35 KB | Separate chunk |
| **Total CSS Budget** | 75 KB | 250 KB | All combined |

**CSS Optimization:**
- PurgeCSS for Tailwind: < 15 KB utility CSS
- Critical CSS extraction for above-fold
- CSS containment for components
- `content-visibility` for off-screen content

---

## 3) API Response Time Budgets

### 3.1 Authentication Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Rate Limit |
|----------|--------|------------|------------|-------------|------------|
| `POST /api/auth/login` | POST | 80ms | 200ms | 500ms | 5/min |
| `POST /api/auth/logout` | POST | 30ms | 80ms | 200ms | 10/min |
| `POST /api/auth/refresh` | POST | 40ms | 100ms | 250ms | 60/min |
| `POST /api/auth/mfa/verify` | POST | 60ms | 150ms | 400ms | 3/min |
| `POST /api/auth/password/reset` | POST | 100ms | 300ms | 800ms | 3/min |
| `GET /api/auth/session` | GET | 20ms | 50ms | 150ms | 120/min |
| `POST /api/auth/sso/saml` | POST | 150ms | 400ms | 1000ms | 10/min |
| `POST /api/auth/sso/oauth` | POST | 120ms | 350ms | 800ms | 10/min |

**Auth Optimization:**
- JWT validation: < 5ms
- Session lookup: < 20ms (Redis)
- Password hash: Argon2id, tuned to 100ms
- MFA verification: < 50ms

### 3.2 Dashboard Data Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Cache TTL |
|----------|--------|------------|------------|-------------|-----------|
| `GET /api/dashboard/metrics` | GET | 60ms | 150ms | 400ms | 30s |
| `GET /api/dashboard/activity` | GET | 80ms | 200ms | 500ms | 60s |
| `GET /api/dashboard/tickets/summary` | GET | 50ms | 120ms | 300ms | 30s |
| `GET /api/dashboard/alerts` | GET | 40ms | 100ms | 250ms | 15s |
| `GET /api/dashboard/usage` | GET | 70ms | 180ms | 450ms | 5min |
| `GET /api/dashboard/notifications` | GET | 30ms | 80ms | 200ms | 0s (real-time) |
| `POST /api/dashboard/widgets/configure` | POST | 100ms | 250ms | 600ms | - |

**Dashboard Optimization:**
- Aggregated data pre-computed
- Materialized views for complex metrics
- Edge caching for public dashboard data
- Incremental cache warming

### 3.3 Ticket Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Notes |
|----------|--------|------------|------------|-------------|-------|
| `GET /api/tickets` | GET | 100ms | 250ms | 600ms | List with filters |
| `GET /api/tickets/[id]` | GET | 60ms | 150ms | 400ms | Single ticket |
| `POST /api/tickets` | POST | 120ms | 300ms | 800ms | Create ticket |
| `PUT /api/tickets/[id]` | PUT | 80ms | 200ms | 500ms | Update ticket |
| `POST /api/tickets/[id]/comments` | POST | 100ms | 250ms | 600ms | Add comment |
| `GET /api/tickets/[id]/comments` | GET | 80ms | 200ms | 500ms | List comments |
| `POST /api/tickets/[id]/attachments` | POST | 200ms | 500ms | 1200ms | File upload |
| `GET /api/tickets/search` | GET | 150ms | 400ms | 1000ms | Full-text search |
| `POST /api/tickets/bulk` | POST | 300ms | 800ms | 2000ms | Bulk operations |

**Ticket Optimization:**
- Database indexes: status, priority, created_at, assignee
- Full-text search: PostgreSQL trigram or Elasticsearch
- File uploads: Direct-to-S3 with presigned URLs
- Pagination: Cursor-based for large lists

### 3.4 Document Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Notes |
|----------|--------|------------|------------|-------------|-------|
| `GET /api/documents` | GET | 120ms | 300ms | 700ms | List documents |
| `GET /api/documents/[id]` | GET | 80ms | 200ms | 500ms | Metadata only |
| `GET /api/documents/[id]/download` | GET | 50ms* | 100ms* | 300ms* | *TTFB only |
| `POST /api/documents` | POST | 150ms | 400ms | 1000ms | Upload init |
| `PUT /api/documents/[id]/upload` | PUT | - | - | - | Direct S3 |
| `DELETE /api/documents/[id]` | DELETE | 100ms | 250ms | 600ms | Soft delete |
| `GET /api/documents/[id]/preview` | GET | 200ms | 500ms | 1200ms | Generate preview |
| `GET /api/documents/shared` | GET | 100ms | 250ms | 600ms | Shared docs |
| `POST /api/documents/[id]/share` | POST | 80ms | 200ms | 500ms | Create share link |

**Document Optimization:**
- Storage: S3 with CloudFront CDN
- Large files: Multipart upload (100MB+)
- Preview generation: Async job queue
- Metadata separate from content

### 3.5 Search Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Notes |
|----------|--------|------------|------------|-------------|-------|
| `GET /api/search` | GET | 80ms | 200ms | 500ms | Global search |
| `GET /api/search/tickets` | GET | 60ms | 150ms | 400ms | Ticket search |
| `GET /api/search/documents` | GET | 100ms | 250ms | 600ms | Document search |
| `GET /api/search/suggestions` | GET | 30ms | 80ms | 200ms | Autocomplete |
| `POST /api/search/advanced` | POST | 150ms | 400ms | 1000ms | Complex queries |
| `GET /api/search/recent` | GET | 40ms | 100ms | 250ms | Recent searches |

**Search Optimization:**
- Elasticsearch/PostgreSQL FTS
- Query result caching: 5 minutes
- Suggestion index: Edge-cached
- Search analytics: Async logging

### 3.6 Report Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Notes |
|----------|--------|------------|------------|-------------|-------|
| `GET /api/reports` | GET | 60ms | 150ms | 400ms | List reports |
| `POST /api/reports` | POST | 200ms | 500ms | 1500ms | Generate report |
| `GET /api/reports/[id]` | GET | 50ms | 120ms | 300ms | Report metadata |
| `GET /api/reports/[id]/data` | GET | 300ms | 800ms | 2000ms | Report data |
| `POST /api/reports/scheduled` | POST | 100ms | 250ms | 600ms | Schedule report |
| `GET /api/reports/templates` | GET | 40ms | 100ms | 250ms | Report templates |

**Report Optimization:**
- Report generation: Background job
- Data aggregation: Materialized views
- Caching: Report results cached 1 hour
- Pagination: Large reports chunked

### 3.7 Export Endpoints

| Endpoint | Method | p50 Target | p95 Target | p99 Maximum | Notes |
|----------|--------|------------|------------|-------------|-------|
| `POST /api/exports/tickets` | POST | 150ms | 400ms | 1000ms | Init export |
| `GET /api/exports/[id]/status` | GET | 30ms | 80ms | 200ms | Check status |
| `GET /api/exports/[id]/download` | GET | 50ms* | 100ms* | 300ms* | *TTFB only |
| `POST /api/exports/documents` | POST | 200ms | 500ms | 1200ms | Bulk export |
| `POST /api/exports/reports` | POST | 300ms | 800ms | 2000ms | Report export |

**Export Optimization:**
- Streaming generation for large exports
- Background processing for exports > 10MB
- S3 presigned URLs for download
- Progress tracking via WebSocket

---

## 4) Database Query Budgets

### 4.1 Query Time Limits per Operation Type

| Operation Type | Simple (1-2 tables) | Moderate (3-5 tables) | Complex (5+ tables) |
|----------------|---------------------|----------------------|---------------------|
| **SELECT (Single Row)** | 5ms | 15ms | 30ms |
| **SELECT (List, < 100 rows)** | 10ms | 25ms | 50ms |
| **SELECT (List, < 1000 rows)** | 20ms | 50ms | 100ms |
| **SELECT (Count)** | 15ms | 40ms | 80ms |
| **INSERT (Single)** | 8ms | 20ms | 40ms |
| **INSERT (Bulk, 100 rows)** | 30ms | 80ms | 200ms |
| **UPDATE (Single)** | 10ms | 25ms | 50ms |
| **UPDATE (Bulk)** | 25ms | 60ms | 150ms |
| **DELETE (Single)** | 8ms | 20ms | 40ms |
| **DELETE (Bulk)** | 20ms | 50ms | 120ms |
| **JOIN (2 tables)** | 15ms | 35ms | 70ms |
| **JOIN (3+ tables)** | 30ms | 75ms | 150ms |
| **Aggregation (SUM/COUNT)** | 20ms | 50ms | 100ms |
| **Full-Text Search** | 50ms | 150ms | 300ms |

**Query Monitoring:**
- Slow query log threshold: 50ms
- Query plan analysis for all > 30ms queries
- Index usage monitoring
- Query timeout: 5 seconds (kill long queries)

### 4.2 Connection Pool Sizing

| Pool Type | Min Connections | Max Connections | Timeout | Queue Limit |
|-----------|-----------------|-----------------|---------|-------------|
| **Primary Pool (API)** | 10 | 50 | 30s | 100 |
| **Read Replica Pool** | 5 | 30 | 30s | 50 |
| **Reporting Pool** | 2 | 10 | 60s | 20 |
| **Admin/Maintenance** | 1 | 5 | 300s | 5 |
| **Background Jobs** | 5 | 20 | 60s | 30 |
| **WebSocket Pool** | 5 | 15 | 30s | 25 |

**Pool Configuration:**
```javascript
// Connection pool settings
const poolConfig = {
  min: 10,
  max: 50,
  acquire: 30000,      // 30s
  idle: 10000,         // 10s
  evict: 1000,         // 1s check interval
  maxUses: 7500,       // Recycle after 7500 queries
  statementTimeout: 5000,  // 5s query timeout
  queryTimeout: 5000,
  connectionTimeoutMillis: 5000
};
```

### 4.3 Query Complexity Limits

| Complexity Metric | Limit | Enforcement |
|------------------|-------|-------------|
| **Max JOINs per query** | 5 | Query validator |
| **Max SELECT columns** | 50 | ORM configuration |
| **Max IN clause items** | 1000 | Batch processing required |
| **Max rows without LIMIT** | 1000 | Mandatory pagination |
| **Max recursion depth** | 10 | CTE restrictions |
| **Max subquery nesting** | 3 | Query review required |
| **Max query length** | 10,000 chars | Input validation |
| **Max query parameters** | 100 | Batch processing |

### 4.4 Pagination Limits

| List Type | Default Page Size | Max Page Size | Max Offset | Strategy |
|-----------|-------------------|---------------|------------|----------|
| **Tickets** | 25 | 100 | 10,000 | Cursor-based |
| **Documents** | 20 | 50 | 5,000 | Cursor-based |
| **Activities** | 50 | 200 | 20,000 | Cursor-based |
| **Users** | 50 | 100 | 5,000 | Offset-based |
| **Reports** | 10 | 50 | 1,000 | Offset-based |
| **Search Results** | 20 | 100 | 10,000 | Cursor-based |
| **Audit Logs** | 100 | 500 | 50,000 | Cursor-based |

**Pagination Requirements:**
- Cursor-based for user-facing lists > 1000 items
- `keyset pagination` for consistent ordering
- No `OFFSET` for large tables
- Include total count only when necessary

### 4.5 N+1 Query Prevention

| Prevention Method | Target | Detection |
|------------------|--------|-----------|
| **Eager Loading** | 100% of related data | ORM configuration |
| **DataLoader Pattern** | All GraphQL queries | Middleware check |
| **Query Batching** | Max 1 query per entity type | Query logger |
| **JOIN Optimization** | Prefer JOIN over separate queries | Query review |
| **Query Result Caching** | 80% cache hit rate | Monitoring |

**N+1 Detection:**
```javascript
// Query count assertion in tests
expect(queryCount).toBeLessThanOrEqual(expectedQueries);

// Production monitoring
if (queriesInRequest > 20) {
  alert('Potential N+1 detected');
}
```

---

## 5) Feature-Specific Budgets

### 5.1 Login/Auth Flows

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Page Load (Login)** | 0.8s | 1.2s | TTI |
| **Form Interaction Ready** | 1.0s | 1.5s | FID |
| **Submit to Response** | 200ms | 500ms | API call |
| **Redirect After Login** | 300ms | 800ms | Navigation |
| **Total Login Flow** | 1.5s | 3.0s | End-to-end |
| **Password Reset Flow** | 3.0s | 8.0s | End-to-end |
| **MFA Verification** | 2.0s | 5.0s | End-to-end |
| **Session Refresh** | 100ms | 300ms | Background |

**Auth Flow Optimization:**
- Preload dashboard assets after successful auth
- Optimistic UI updates
- Background token refresh
- Remember me: 30-day persistent session

### 5.2 Dashboard Loading

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Initial Render** | 0.9s | 1.4s | FCP |
| **Widgets Visible** | 1.5s | 2.5s | LCP |
| **Charts Rendered** | 2.0s | 3.5s | Visual complete |
| **Data Freshness** | 30s | 60s | Max staleness |
| **Auto-refresh Interval** | 30s | 60s | Polling |
| **Real-time Update Latency** | 500ms | 2s | WebSocket |

**Dashboard Optimization:**
- Skeleton loaders for all widgets
- Progressive data loading (critical first)
- Chart rendering: Canvas, not SVG for > 100 points
- Virtual scrolling for activity feeds

### 5.3 Ticket List and Detail

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **List Initial Load** | 1.5s | 2.5s | LCP |
| **List Filter Application** | 200ms | 500ms | UI update |
| **List Sort Change** | 150ms | 400ms | UI update |
| **Pagination Click** | 100ms | 300ms | New page render |
| **Detail Page Load** | 1.0s | 1.8s | LCP |
| **Comment Post** | 300ms | 800ms | Visible in list |
| **File Attachment Upload** | 3s/MB | 10s/MB | Per MB |
| **Ticket Search** | 500ms | 1.5s | Results display |

**Ticket Optimization:**
- Virtual scrolling for lists > 50 items
- Optimistic comment posting
- File upload progress indicators
- Background prefetch on hover

### 5.4 Document Upload/Download

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Upload Init Response** | 200ms | 500ms | API response |
| **Upload Progress Update** | 500ms | 2s | UI refresh |
| **Small File (< 5MB)** | 5s | 15s | Total upload |
| **Medium File (5-50MB)** | 15s | 45s | Total upload |
| **Large File (50-500MB)** | 60s | 180s | Total upload |
| **Download Start (TTFB)** | 100ms | 300ms | First byte |
| **Download Throughput** | 10MB/s | 2MB/s | Min throughput |
| **Preview Generation** | 2s | 5s | Display ready |
| **Bulk Download Prep** | 5s | 15s | Zip creation |

**Document Optimization:**
- Direct S3 multipart upload
- Resumable uploads for files > 10MB
- CDN delivery for downloads
- Async preview generation

### 5.5 Search Functionality

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Search Input Response** | 50ms | 100ms | Per keystroke |
| **Suggestion Display** | 100ms | 250ms | Dropdown render |
| **Full Search Results** | 300ms | 800ms | Results page |
| **Filter Application** | 150ms | 400ms | Results update |
| **Advanced Search** | 500ms | 1.5s | Complex query |
| **Search Result Click** | 200ms | 500ms | Navigation |
| **Search History Load** | 100ms | 300ms | Dropdown |

**Search Optimization:**
- Debounced input: 150ms
- Edge-cached suggestions
- Typo tolerance: 2 character edit distance
- Result highlighting: Web Worker

### 5.6 Report Generation

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Simple Report (< 1K rows)** | 2s | 5s | Generation time |
| **Medium Report (< 10K rows)** | 5s | 15s | Generation time |
| **Complex Report (< 100K rows)** | 15s | 45s | Generation time |
| **Report Preview** | 3s | 8s | First page |
| **Export to PDF** | 5s | 15s | Download ready |
| **Export to Excel** | 3s | 10s | Download ready |
| **Export to CSV** | 2s | 5s | Download ready |
| **Scheduled Report Queue** | 30s | 120s | Queue time |

**Report Optimization:**
- Async generation for reports > 5s
- Streaming for large exports
- Background job queue
- Incremental result caching

### 5.7 Export Operations

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **Export Init Response** | 200ms | 500ms | Job created |
| **Small Export (< 10MB)** | 3s | 10s | Total time |
| **Medium Export (10-100MB)** | 10s | 30s | Total time |
| **Large Export (100MB-1GB)** | 30s | 90s | Total time |
| **Progress Update Frequency** | 2s | 5s | UI refresh |
| **Download Link Generation** | 100ms | 300ms | Presigned URL |
| **Export Cancellation** | 500ms | 2s | Acknowledged |

### 5.8 Real-time Features

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **WebSocket Connection** | 500ms | 2s | Established |
| **Notification Latency** | 500ms | 2s | User receive |
| **Typing Indicator Delay** | 100ms | 300ms | Displayed |
| **Presence Update** | 2s | 5s | Status change |
| **Live Comment Sync** | 300ms | 1s | Visible to all |
| **Heartbeat Interval** | 30s | 60s | Keepalive |
| **Reconnect Time** | 1s | 5s | After disconnect |
| **Message History Load** | 500ms | 2s | On join |

**Real-time Optimization:**
- WebSocket with fallback to SSE
- Message batching for high frequency
- Connection pooling on server
- Regional WebSocket servers

---

## 6) Mobile Performance Budgets

### 6.1 3G Network Performance Targets

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| **Time to Interactive (TTI)** | 3.5s | 6.0s | Slow 3G |
| **Speed Index** | 2.5s | 4.5s | Visual completeness |
| **Total Page Weight** | 500 KB | 900 KB | All resources |
| **JavaScript Transfer** | 200 KB | 350 KB | Gzipped |
| **CSS Transfer** | 50 KB | 80 KB | Gzipped |
| **Image Transfer** | 200 KB | 400 KB | Optimized |
| **First Meaningful Paint** | 2.0s | 3.5s | Primary content |

**3G Optimization:**
- Adaptive loading based on connection speed
- Low-quality image placeholders
- Reduced animation complexity
- Essential JS only on slow connections

### 6.2 Low-End Device Targets

| Metric | Target | Maximum | Device Profile |
|--------|--------|---------|----------------|
| **First Contentful Paint** | 1.5s | 2.5s | Moto G4 / Galaxy A10 |
| **Time to Interactive** | 3.0s | 5.0s | 2GB RAM devices |
| **JavaScript Parse Time** | 500ms | 1.5s | CPU throttled |
| **Main Thread Idle** | 50% | 30% | Post-load |
| **Memory Usage** | 80 MB | 150 MB | Heap size |
| **DOM Nodes** | 1,500 | 3,000 | Max elements |
| **Event Listeners** | 200 | 500 | Max handlers |

**Low-End Optimization:**
- Conditional polyfills only
- Reduced chart complexity (sampling)
- Pagination instead of infinite scroll
- Reduced animation frames

### 6.3 Battery Consumption Limits

| Activity | Background | Active Use | Measurement |
|----------|------------|------------|-------------|
| **Idle (Tab Background)** | 1%/hour | - | Battery drain |
| **Reading/Dashboard View** | - | 5%/hour | Light usage |
| **Active Ticket Management** | - | 8%/hour | Moderate usage |
| **Document Upload** | - | 15%/hour | Heavy network |
| **Video/Preview Playback** | - | 20%/hour | Media processing |
| **Report Generation** | - | 25%/hour | CPU intensive |
| **WebSocket Connected** | 2%/hour | 3%/hour | Persistent connection |

**Battery Optimization:**
- Page Visibility API to pause non-essential work
- Reduced polling frequency when hidden
- Efficient animation using `requestAnimationFrame`
- Throttled background sync

### 6.4 Memory Usage Limits

| Context | Target | Maximum | Action on Exceed |
|---------|--------|---------|------------------|
| **Initial Load** | 40 MB | 60 MB | - |
| **Dashboard Active** | 60 MB | 90 MB | Reduce chart data |
| **Ticket List (100 items)** | 50 MB | 80 MB | Virtual scroll |
| **Document Viewer** | 80 MB | 150 MB | PDF.js cleanup |
| **Search Results** | 45 MB | 70 MB | Result limiting |
| **Long Session (1 hour)** | 100 MB | 200 MB | Cache eviction |
| **Peak Usage** | 120 MB | 250 MB | Force reload warning |

**Memory Management:**
- Image lazy unloading when off-screen
- Chart data cleanup on unmount
- Pagination for large lists
- Aggressive cache TTLs

---

## 7) Monitoring Thresholds

### 7.1 Alert Thresholds by Metric

| Metric | Warning | Critical | Emergency | PagerDuty |
|--------|---------|----------|-----------|-----------|
| **LCP** | > 2.0s | > 2.5s | > 4.0s | > 4.0s |
| **INP** | > 200ms | > 500ms | > 1s | > 1s |
| **CLS** | > 0.1 | > 0.25 | > 0.5 | > 0.5 |
| **FCP** | > 1.2s | > 1.8s | > 3.0s | > 3.0s |
| **TTFB** | > 300ms | > 600ms | > 1s | > 1s |
| **API p95 Latency** | > 500ms | > 1s | > 2s | > 2s |
| **Error Rate** | > 0.1% | > 1% | > 5% | > 5% |
| **Bundle Size** | > 320 KB | > 350 KB | > 400 KB | > 400 KB |
| **Memory Usage** | > 100 MB | > 150 MB | > 250 MB | > 250 MB |
| **CPU Usage** | > 60% | > 80% | > 95% | > 95% |

**Alert Routing:**
- **Warning:** Slack #performance-alerts
- **Critical:** Slack #incidents + Email
- **Emergency:** PagerDuty on-call + Slack

### 7.2 SLO (Service Level Objective) Definitions

| SLO Category | Target | Measurement Window | Burn Rate |
|--------------|--------|-------------------|-----------|
| **Availability** | 99.9% | 30 days | 0.1% error budget |
| **LCP < 2.5s** | 95% | 7 days | 5% budget |
| **INP < 200ms** | 90% | 7 days | 10% budget |
| **CLS < 0.1** | 95% | 7 days | 5% budget |
| **API p95 < 500ms** | 99% | 7 days | 1% budget |
| **Error Rate < 0.1%** | 99.9% | 7 days | 0.1% budget |

**SLO Dashboard:**
- Real-time SLO compliance tracking
- Error budget burn-down charts
- Automatic alerts at 50%, 90%, 100% budget consumption
- Weekly SLO review meetings

### 7.3 SLA (Service Level Agreement) Commitments

| SLA Item | Commitment | Penalty | Measurement |
|----------|------------|---------|-------------|
| **Uptime** | 99.9% | 10% monthly credit | Per-minute availability |
| **Scheduled Maintenance** | < 4 hours/month | Credit for excess | Advance notice 72h |
| **Support Response (P1)** | 1 hour | Escalation credit | Time to acknowledge |
| **Support Response (P2)** | 4 hours | Escalation credit | Time to acknowledge |
| **Support Response (P3)** | 24 hours | - | Time to acknowledge |
| **Resolution (P1)** | 4 hours | Service credit | Time to resolve |
| **Data Durability** | 99.999999% | Full compensation | Backup verification |
| **RTO (Recovery Time)** | 4 hours | Service credit | Incident to restore |
| **RPO (Data Loss)** | 1 hour | Service credit | Max data loss window |

### 7.4 Error Rate Budgets

| Error Category | Budget | Alert Threshold | Action |
|----------------|--------|-----------------|--------|
| **5xx Server Errors** | 0.01% | 0.05% | Auto-rollback |
| **4xx Client Errors** | 1% | 5% | Review logs |
| **API Timeout** | 0.1% | 0.5% | Scale up |
| **JavaScript Errors** | 0.1% | 0.5% | Hotfix |
| **Resource Loading Failures** | 0.5% | 2% | CDN check |
| **Authentication Failures** | 5% | 10% | Security review |
| **Payment Failures** | 0.01% | 0.1% | Immediate escalation |

**Error Budget Policy:**
- Monthly error budget per category
- Freeze deployments when budget exhausted
- Post-mortem required for > 10% budget burn in 24h
- Quarterly error budget review

---

## 8) Performance Testing Requirements

### 8.1 Load Testing Specifications

| Test Scenario | Users | Duration | Ramp-up | Success Criteria |
|--------------|-------|----------|---------|------------------|
| **Normal Load** | 500 concurrent | 30 min | 5 min | p95 < 500ms |
| **Peak Load** | 2,000 concurrent | 15 min | 2 min | p95 < 1s |
| **Login Storm** | 1,000 logins/min | 10 min | 1 min | Success > 99% |
| **Dashboard Load** | 1,500 concurrent | 20 min | 5 min | LCP < 2s |
| **Ticket Creation** | 200 tickets/min | 15 min | 3 min | Success > 99.5% |
| **File Upload Mix** | 100 uploads/min | 20 min | 5 min | Throughput > 50MB/s |
| **Search Query Load** | 500 queries/min | 30 min | 5 min | p95 < 300ms |

**Load Testing Tools:**
- Primary: k6 or Artillery
- Monitoring: Grafana + Prometheus during test
- Baseline: Weekly automated load tests
- Pre-release: Mandatory before production deploy

### 8.2 Stress Testing Parameters

| Test Phase | Users | Duration | Goal |
|------------|-------|----------|------|
| **Baseline Stress** | 5,000 | 30 min | Identify first bottleneck |
| **Progressive Stress** | 10,000 | 15 min | Find breaking point |
| **Spike Recovery** | 15,000 | 5 min | Recovery time measurement |
| **Sustained Stress** | 8,000 | 2 hours | Stability validation |
| **Memory Pressure** | 3,000 + large payloads | 1 hour | Memory leak detection |

**Stress Testing Requirements:**
- Gradual ramp-up: 100 users/minute
- Monitoring: All system metrics
- Abort conditions: Error rate > 10%, Response time > 10s
- Recovery validation: Post-test 15 min monitoring

### 8.3 Endurance Testing Requirements

| Test Type | Duration | Load | Validation |
|-----------|----------|------|------------|
| **Standard Endurance** | 8 hours | 50% peak | Memory stability |
| **Extended Endurance** | 72 hours | 30% peak | Resource leaks |
| **Weekend Simulation** | 48 hours | Variable | Background job impact |
| **Database Stress** | 24 hours | High write load | Replication lag |

**Endurance Monitoring:**
- Memory growth: < 10% over test duration
- Connection pool: Stable utilization
- Disk usage: Predictable growth only
- Log rotation: Functioning correctly

### 8.4 Spike Testing Scenarios

| Scenario | Spike Size | Duration | Recovery Target |
|----------|------------|----------|-----------------|
| **Flash Sale/Announcement** | 10x normal | 5 min | 2 min |
| **Viral Content** | 50x normal | 15 min | 5 min |
| **DDoS Simulation** | 100x normal | 10 min | Auto-mitigation |
| **Login After Outage** | 20x normal | 3 min | 1 min |
| **Report Generation Queue** | 100 concurrent | 10 min | 10 min |
| **Bulk Import** | 1000 records/sec | 5 min | Queue drain |

**Spike Testing Requirements:**
- Auto-scaling trigger validation
- Circuit breaker activation
- Rate limiting effectiveness
- Queue overflow handling
- Graceful degradation validation

---

## 9) Implementation & Enforcement

### 9.1 CI/CD Performance Gates

```yaml
# .github/workflows/performance-gates.yml
performance_gates:
  lighthouse:
    - score: 90
      categories: [performance, accessibility, best-practices, seo]
    - metrics:
        lcp: 2500
        inp: 200
        cls: 0.1
        ttfb: 600
  
  bundle_size:
    - main.js: 120000
    - vendor.js: 180000
    - initial.css: 35000
    - total: 340000
  
  api_performance:
    - p50: 100
    - p95: 500
    - p99: 1000
  
  database:
    - query_time_95th: 50
    - n_plus_one: 0
```

### 9.2 Performance Regression Detection

| Check | Threshold | Action |
|-------|-----------|--------|
| **Bundle Size Increase** | > 5% | Warning |
| **Bundle Size Increase** | > 10% | Block merge |
| **LCP Regression** | > 10% | Warning |
| **LCP Regression** | > 20% | Block merge |
| **API Latency Increase** | > 15% | Warning |
| **API Latency Increase** | > 30% | Block merge |
| **New N+1 Query** | Any | Block merge |

### 9.3 Performance Monitoring Stack

| Layer | Tool | Metrics | Retention |
|-------|------|---------|-----------|
| **RUM** | PostHog / Vercel Analytics | Web Vitals, Custom | 90 days |
| **APM** | Sentry / Datadog | Traces, Errors | 30 days |
| **Infrastructure** | Prometheus + Grafana | CPU, Memory, Disk | 1 year |
| **Database** | pg_stat_statements | Query performance | 30 days |
| **CDN** | CloudFront / Vercel | Cache hit ratio | 90 days |
| **Synthetic** | Pingdom / GTmetrix | Uptime, Synthetic | 1 year |

### 9.4 Performance Review Checklist

**Before Every Release:**
- [ ] Lighthouse CI passes all gates
- [ ] Bundle size within budget
- [ ] No new N+1 queries detected
- [ ] API p95 latency < 500ms
- [ ] All images optimized
- [ ] No render-blocking resources
- [ ] Error rate < 0.1%

**Weekly:**
- [ ] Review Web Vitals dashboard
- [ ] Analyze slow query log
- [ ] Check error budget burn
- [ ] Review performance regressions

**Monthly:**
- [ ] Full load test execution
- [ ] SLO compliance review
- [ ] Performance budget review
- [ ] Third-party script audit

---

## 10) Appendix

### 10.1 Performance Budget Calculation Methodology

**LCP Budget Derivation:**
```
Base: 1.0s (industry good)
Network overhead (3G): +400ms
Device overhead (low-end): +300ms
Third-party scripts: +200ms
Safety margin: +300ms
= Maximum LCP: 2.2s
```

**Bundle Size Budget Derivation:**
```
3G download speed: 400 KB/s
Target TTI: 3.5s
Available download: 1,400 KB
Gzip compression (3:1): 467 KB gzipped
- JS parse/compile overhead (30%): -140 KB
= JS Budget: ~327 KB gzipped
```

### 10.2 Tools & References

| Tool | Purpose | URL |
|------|---------|-----|
| Lighthouse | Web Vitals measurement | developers.google.com/web/tools/lighthouse |
| WebPageTest | Synthetic testing | webpagetest.org |
| k6 | Load testing | k6.io |
| Bundlephobia | Bundle analysis | bundlephobia.com |
| PostHog | Product analytics | posthog.com |
| Sentry | Error monitoring | sentry.io |

### 10.3 Glossary

| Term | Definition |
|------|------------|
| **LCP** | Largest Contentful Paint - time to render largest visible element |
| **INP** | Interaction to Next Paint - responsiveness metric |
| **CLS** | Cumulative Layout Shift - visual stability metric |
| **FCP** | First Contentful Paint - time to first content render |
| **TTFB** | Time to First Byte - server response time |
| **TTI** | Time to Interactive - time to full interactivity |
| **SLO** | Service Level Objective - internal reliability target |
| **SLA** | Service Level Agreement - contractual commitment |
| **RUM** | Real User Monitoring - actual user performance data |
| **p95** | 95th percentile - 95% of requests faster than this |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-22 | Engineering Team | Initial release |

**Review Schedule:** Quarterly  
**Next Review:** 2026-05-22  
**Approval:** CTO, VP Engineering, Product Lead

---

*This document is a living specification. All budgets are enforced through automated CI/CD gates. Violations require VP Engineering approval for override.*
