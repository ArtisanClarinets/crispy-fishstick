# Vantus Admin Portal Performance Budgets

**Document ID:** ADMIN-PERF-001  
**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2026-02-22  
**Owner:** Engineering Team  
**Review Cycle:** Quarterly  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-22 | Engineering Team | Initial specification |

---

## 1. Executive Summary

This document defines comprehensive performance budgets for the Vantus Admin Portal, addressing the unique challenges of enterprise administration interfaces: large dataset handling, complex multi-step forms, real-time collaborative updates, and data-intensive reporting. These budgets establish quantitative thresholds that must be met for all production deployments.

### Performance Philosophy

The Vantus Admin Portal follows a **"Responsive Under Load"** philosophy:
- UI remains interactive during data operations
- Progressive loading for large datasets
- Predictable performance at scale (1000+ records)
- Graceful degradation under stress

---

## 2. Core Web Vitals Targets

### 2.1 Global Targets (All Admin Pages)

| Metric | Target | Maximum | Measurement |
|--------|--------|---------|-------------|
| **LCP** (Largest Contentful Paint) | ≤ 1.8s | 2.5s | 75th percentile |
| **INP** (Interaction to Next Paint) | ≤ 150ms | 200ms | 75th percentile |
| **CLS** (Cumulative Layout Shift) | ≤ 0.05 | 0.1 | 75th percentile |
| **FCP** (First Contentful Paint) | ≤ 1.0s | 1.8s | 75th percentile |
| **TTFB** (Time to First Byte) | ≤ 300ms | 600ms | 75th percentile |
| **TBT** (Total Blocking Time) | ≤ 200ms | 350ms | 75th percentile |
| **FIP** (First Input Delay legacy) | ≤ 50ms | 100ms | 95th percentile |

### 2.2 Page-Type Specific Targets

#### 2.2.1 Dashboard Pages

Dashboard pages prioritize immediate visual feedback and progressive data loading.

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| LCP | ≤ 1.5s | 2.0s | Critical for perceived performance |
| INP | ≤ 100ms | 150ms | Widget interactions must feel instant |
| FCP | ≤ 800ms | 1.2s | Skeleton loaders acceptable |
| TTFB | ≤ 250ms | 400ms | Initial dashboard config |

**Dashboard-Specific Rules:**
- Widgets must render skeleton state within 300ms
- First meaningful data within 1.5s (can be partial)
- Real-time widget updates must not block UI thread

#### 2.2.2 Data Table Pages

Data tables balance initial load speed with scrolling performance.

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| LCP | ≤ 1.8s | 2.5s | Table header + first 25 rows |
| INP | ≤ 80ms | 120ms | Critical for scroll/click responsiveness |
| FCP | ≤ 900ms | 1.5s | Header and filters first |
| TTFB | ≤ 200ms | 400ms | Query optimization required |

**Data Table Rules:**
- Initial render: 25 rows maximum
- Virtual scrolling required for >50 rows
- Filter/sort operations: ≤ 100ms INP
- Column resize: 60fps maintained

#### 2.2.3 Form Pages

Form pages prioritize input responsiveness over initial load.

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| LCP | ≤ 1.2s | 2.0s | First form field visible |
| INP | ≤ 50ms | 100ms | Input latency critical |
| FCP | ≤ 800ms | 1.2s | Form framework loaded |
| TTFB | ≤ 200ms | 400ms | Form configuration data |

**Form-Specific Rules:**
- Field validation: ≤ 16ms (single frame)
- Conditional field shows: ≤ 50ms
- Auto-save operations: background, non-blocking
- Multi-step forms: step transition ≤ 200ms

#### 2.2.4 Report/Analytics Pages

Report pages accept longer initial load for data accuracy.

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| LCP | ≤ 3.0s | 5.0s | Progress indicators required |
| INP | ≤ 200ms | 400ms | Chart interactions |
| FCP | ≤ 1.0s | 1.5s | Report framework |
| TTFB | ≤ 500ms | 1.0s | Complex queries acceptable |

**Report-Specific Rules:**
- Progress indicators mandatory for >2s operations
- Cancel operation must be available
- Background refresh must not interrupt viewing
- Export operations: async with notification

#### 2.2.5 Settings/Configuration Pages

Settings pages prioritize stability and clear feedback.

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| LCP | ≤ 1.5s | 2.5s | All settings visible |
| INP | ≤ 100ms | 200ms | Toggle/save actions |
| FCP | ≤ 900ms | 1.5s | Navigation and structure |
| TTFB | ≤ 300ms | 500ms | Settings data |

---

## 3. Bundle Size Budgets

### 3.1 Entry Point Budgets

| Bundle | Gzipped Limit | Uncompressed Limit | Notes |
|--------|---------------|-------------------|-------|
| **Main Entry** (index) | 120 KB | 350 KB | Core framework + auth |
| **App Shell** | 80 KB | 220 KB | Layout, navigation, common UI |
| **Vendor Core** | 150 KB | 450 KB | React, TanStack, utilities |
| **Initial CSS** | 25 KB | 80 KB | Critical CSS only |

**Entry Point Rules:**
- Total initial JS: ≤ 350 KB gzipped
- Code splitting required for all routes
- Tree-shaking verification in CI/CD
- Dynamic imports for heavy libraries (charts, editors)

### 3.2 Route-Specific Chunk Budgets

| Route Category | Gzipped Limit | Load Strategy |
|---------------|---------------|---------------|
| **Dashboard** | 100 KB | Eager (priority load) |
| **Data Tables** | 80 KB | Route-level split |
| **Forms** | 60 KB | Route-level split |
| **Reports** | 150 KB | Lazy + prefetch on hover |
| **Settings** | 50 KB | Lazy |
| **User Management** | 70 KB | Lazy |
| **CRM** | 90 KB | Lazy |
| **Content Management** | 85 KB | Lazy |
| **Analytics** | 120 KB | Lazy + worker thread |
| **File Manager** | 40 KB | Lazy |

**Chunk Loading Rules:**
- Route transition: ≤ 100ms (cached), ≤ 500ms (fresh)
- Prefetch on link hover (where appropriate)
- Preload critical routes after initial load
- Webpack magic comments for chunk naming

### 3.3 Feature Module Budgets

| Feature | Gzipped Budget | Notes |
|---------|----------------|-------|
| **Charts & Graphs** | 80 KB | D3/Chart.js dynamically loaded |
| **Data Grid** | 60 KB | TanStack Table + virtualization |
| **Rich Text Editor** | 100 KB | TipTap/ProseMirror lazy loaded |
| **Date/Time Pickers** | 25 KB | Including localization |
| **File Upload** | 30 KB | Drag-drop, progress, validation |
| **Maps** | 50 KB | Leaflet dynamically loaded |
| **Spreadsheet** | 120 KB | SheetJS or similar (rare use) |
| **PDF Viewer** | 80 KB | PDF.js worker-based |
| **Code Editor** | 150 KB | Monaco (settings only) |

### 3.4 Third-Party Script Budgets

| Script Category | Gzipped Budget | Loading Strategy |
|-----------------|----------------|------------------|
| **Analytics** | 15 KB | Async, non-blocking |
| **Error Tracking** | 10 KB | Async, deferred |
| **Authentication** | 20 KB | Eager (BetterAuth) |
| **Payment** | 30 KB | Lazy (settings only) |
| **Communication** | 25 KB | Async (Intercom/Drift) |
| **Monitoring** | 15 KB | Async (Sentry/Datadog) |

**Third-Party Rules:**
- All third-party scripts: async or defer
- Total third-party JS: ≤ 100 KB gzipped
- Subresource Integrity (SRI) required
- Fallback for script load failures
- Cookie consent before loading tracking scripts

### 3.5 CSS Budgets

| Category | Gzipped Limit | Uncompressed | Notes |
|----------|---------------|--------------|-------|
| **Critical CSS** | 15 KB | 45 KB | Inline in `<head>` |
| **Component CSS** | 25 KB | 75 KB | Lazy loaded per route |
| **Utility Classes** | 20 KB | 60 KB | Tailwind purged |
| **Animation CSS** | 10 KB | 30 KB | GPU-accelerated only |
| **Print Styles** | 5 KB | 15 KB | Separate file |

**CSS Rules:**
- Unused CSS: < 20% of total (PurgedCSS verification)
- No render-blocking CSS after initial paint
- CSS containment for complex components
- CSS custom properties for theming (no runtime CSS-in-JS)

---

## 4. API Response Time Budgets

### 4.1 Authentication Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `POST /auth/login` | 150ms | 300ms | 500ms | Including bcrypt |
| `POST /auth/logout` | 50ms | 100ms | 200ms | Token revocation |
| `POST /auth/refresh` | 100ms | 200ms | 400ms | Token rotation |
| `POST /auth/mfa/verify` | 200ms | 400ms | 600ms | MFA challenge |
| `GET /auth/session` | 50ms | 100ms | 200ms | Session validation |
| `POST /auth/password-reset` | 300ms | 600ms | 1.0s | Email + token |
| `GET /auth/permissions` | 50ms | 100ms | 200ms | RBAC cache hit |

**Auth Rules:**
- Token validation: < 10ms (Redis cache)
- Permission checks: < 50ms per request
- Rate limiting: Enforced at edge

### 4.2 User & Organization Management

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /users` | 100ms | 300ms | 500ms | Paginated, 25 items |
| `GET /users/:id` | 50ms | 150ms | 300ms | Single user |
| `POST /users` | 200ms | 500ms | 1.0s | With validation |
| `PUT /users/:id` | 150ms | 400ms | 800ms | Update operations |
| `DELETE /users/:id` | 100ms | 300ms | 500ms | Soft delete |
| `GET /orgs` | 80ms | 200ms | 400ms | Org list |
| `GET /orgs/:id` | 50ms | 150ms | 300ms | Org details |
| `GET /orgs/:id/members` | 100ms | 300ms | 500ms | With roles |
| `PUT /orgs/:id/members` | 150ms | 400ms | 800ms | Bulk updates |

**User/Org Rules:**
- List endpoints: Always paginated
- Search: ≤ 300ms for 100k records
- Bulk operations: Async with job queue
- Audit logging: Async, non-blocking

### 4.3 Content Management Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /content` | 150ms | 400ms | 800ms | With filters |
| `GET /content/:id` | 50ms | 150ms | 300ms | Single item |
| `POST /content` | 200ms | 600ms | 1.2s | With validation |
| `PUT /content/:id` | 150ms | 500ms | 1.0s | Versioning |
| `DELETE /content/:id` | 100ms | 300ms | 500ms | Soft delete |
| `GET /content/:id/versions` | 100ms | 300ms | 500ms | Version history |
| `POST /content/:id/publish` | 300ms | 800ms | 1.5s | Cache invalidation |
| `GET /content/search` | 200ms | 600ms | 1.2s | Full-text |

**Content Rules:**
- Media uploads: Direct to S3 (presigned URLs)
- Rich text: Processed async
- Publishing: Cache warming required
- Search: Elasticsearch integration

### 4.4 CRM Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /contacts` | 150ms | 400ms | 800ms | Paginated |
| `GET /contacts/:id` | 50ms | 150ms | 300ms | Full history |
| `POST /contacts` | 200ms | 500ms | 1.0s | Duplicate check |
| `GET /deals` | 150ms | 400ms | 800ms | Pipeline view |
| `GET /deals/:id` | 50ms | 150ms | 300ms | With activities |
| `POST /activities` | 150ms | 400ms | 800ms | Log interaction |
| `GET /crm/dashboard` | 300ms | 800ms | 1.5s | Aggregated |

**CRM Rules:**
- Duplicate detection: Async background
- Email integration: Webhook-based
- Pipeline updates: Optimistic UI
- Activity timeline: Paginated, lazy load

### 4.5 Pricing & Quoting Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /pricing/models` | 100ms | 300ms | 500ms | All models |
| `GET /pricing/calculate` | 200ms | 600ms | 1.0s | Real-time calc |
| `POST /quotes` | 300ms | 800ms | 1.5s | Generation |
| `GET /quotes/:id` | 50ms | 150ms | 300ms | Quote details |
| `PUT /quotes/:id` | 200ms | 600ms | 1.0s | Recalculation |
| `POST /quotes/:id/approve` | 300ms | 800ms | 1.5s | Workflow |

**Pricing Rules:**
- Calculations: Cached for 5 minutes
- Quote generation: PDF async
- Approval workflow: State machine
- Historical rates: Immutable

### 4.6 Report & Analytics Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /reports` | 100ms | 300ms | 500ms | Report list |
| `GET /reports/:id` | 500ms | 2.0s | 5.0s | Generate report |
| `GET /reports/:id/data` | 300ms | 1.0s | 2.0s | Raw data |
| `POST /reports/scheduled` | 200ms | 600ms | 1.0s | Schedule |
| `GET /analytics/dashboard` | 400ms | 1.2s | 2.5s | Aggregated |
| `GET /analytics/export` | 1.0s | 3.0s | 10.0s | CSV/Excel |

**Report Rules:**
- Report generation: Async with polling
- Caching: 1-hour TTL for standard reports
- Real-time: 5-minute delay acceptable
- Exports: Streamed, not buffered

### 4.7 File & Media Endpoints

| Endpoint | p50 Target | p95 Target | p99 Target | Notes |
|----------|------------|------------|------------|-------|
| `GET /files` | 150ms | 400ms | 800ms | List with metadata |
| `POST /files/upload` | 500ms | 2.0s | 5.0s | Presigned URL |
| `GET /files/:id/download` | 100ms | 300ms | 500ms | Redirect to CDN |
| `DELETE /files/:id` | 100ms | 300ms | 500ms | Soft delete |
| `POST /files/bulk` | 1.0s | 3.0s | 10.0s | Async processing |

**File Rules:**
- Uploads: Direct to S3 (no proxy)
- Large files: Chunked upload (resumable)
- Images: Auto-optimize on upload
- Virus scan: Async, quarantine pattern

---

## 5. Database Query Budgets

### 5.1 Query Time Limits by Operation Type

| Operation Type | p50 Target | p95 Target | p99 Target | Max Timeout |
|----------------|------------|------------|------------|-------------|
| **Simple SELECT** (single row) | 5ms | 15ms | 30ms | 1s |
| **List SELECT** (paginated) | 20ms | 50ms | 100ms | 2s |
| **Search SELECT** (indexed) | 30ms | 100ms | 300ms | 3s |
| **Search SELECT** (full-text) | 50ms | 200ms | 500ms | 5s |
| **INSERT** (single) | 10ms | 30ms | 50ms | 1s |
| **INSERT** (batch 100) | 50ms | 150ms | 300ms | 5s |
| **UPDATE** (single) | 10ms | 30ms | 50ms | 1s |
| **UPDATE** (batch) | 30ms | 100ms | 200ms | 3s |
| **DELETE** (soft) | 10ms | 30ms | 50ms | 1s |
| **DELETE** (hard) | 20ms | 50ms | 100ms | 2s |
| **JOIN** (2 tables) | 20ms | 60ms | 150ms | 2s |
| **JOIN** (3+ tables) | 50ms | 200ms | 500ms | 5s |
| **Aggregation** (simple) | 30ms | 100ms | 300ms | 3s |
| **Aggregation** (complex) | 100ms | 500ms | 1.5s | 10s |
| **Report Query** | 500ms | 2.0s | 5.0s | 30s |

### 5.2 Connection Pool Sizing

| Pool Type | Min Connections | Max Connections | Queue Size | Notes |
|-----------|-----------------|-----------------|------------|-------|
| **Primary Pool** | 10 | 50 | 100 | General operations |
| **Reporting Pool** | 5 | 20 | 50 | Long-running queries |
| **Migration Pool** | 1 | 5 | 10 | Schema changes |
| **Admin Pool** | 2 | 10 | 20 | Emergency access |

**Pool Rules:**
- Connection timeout: 30 seconds
- Query timeout: See section 5.1
- Idle timeout: 10 minutes
- Health check: Every 30 seconds
- Circuit breaker: After 50% failure rate

### 5.3 Query Complexity Limits

| Complexity Metric | Warning | Critical | Enforced |
|-------------------|---------|----------|----------|
| **JOIN count** | 4 | 6 | 8 (hard limit) |
| **Subquery depth** | 2 | 3 | 4 (hard limit) |
| **Selected columns** | 30 | 50 | 100 |
| **WHERE conditions** | 10 | 20 | 50 |
| **Rows scanned** | 100k | 500k | 1M (query rewrite) |
| **Rows returned** | 1k | 5k | 10k (pagination) |
| **Query length** | 5KB | 10KB | 50KB |
| **Query cost** | 1000 | 5000 | 10000 (Postgres) |

**Complexity Enforcement:**
- Query analyzer in CI/CD
- Runtime query plan analysis
- Automatic pagination for large results
- Query rewrite suggestions in logs

### 5.4 Pagination Limits

| Pagination Type | Default | Maximum | Notes |
|-----------------|---------|---------|-------|
| **Standard List** | 25 | 100 | Most tables |
| **Data Grid** | 50 | 500 | With virtualization |
| **Export** | 1000 | 10000 | Streaming |
| **Search Results** | 20 | 100 | Relevance sorted |
| **Audit Log** | 50 | 500 | Time-based |
| **Activity Feed** | 20 | 100 | Infinite scroll |

**Pagination Rules:**
- Cursor-based for >100 items
- Offset-based allowed for <100 items
- Total count: Optional (expensive)
- Deep pagination: Cursor only (>1000 offset)

### 5.5 Index Requirements

| Table Size | Required Indexes | Notes |
|------------|------------------|-------|
| < 1,000 rows | Primary key only | Sequential scan acceptable |
| 1k - 100k rows | PK + 2-3 indexes | Foreign keys indexed |
| 100k - 1M rows | PK + 3-5 indexes | Query pattern analysis |
| 1M - 10M rows | PK + 5-8 indexes | Composite indexes preferred |
| > 10M rows | PK + custom indexes | Partitioning required |

**Index Rules:**
- All foreign keys must be indexed
- Search fields must be indexed
- Sort fields should be indexed
- Index bloat: < 30% overhead
- Unused indexes: Review quarterly

---

## 6. Feature-Specific Performance Budgets

### 6.1 Dashboard Loading

| Phase | Time Budget | Description |
|-------|-------------|-------------|
| **Skeleton Render** | ≤ 300ms | Layout structure visible |
| **Initial Data** | ≤ 800ms | First widget data loaded |
| **Critical Widgets** | ≤ 1.2s | Primary metrics visible |
| **Secondary Widgets** | ≤ 2.0s | Charts, lists populated |
| **Full Interactive** | ≤ 2.5s | All widgets interactive |
| **Background Refresh** | ≤ 5s | Real-time data updates |

**Dashboard Requirements:**
- Widget isolation: One slow widget cannot block others
- Progressive loading: Priority order defined
- Data staleness: Max 60 seconds for real-time widgets
- Refresh: Background polling, non-blocking

### 6.2 Data Table Rendering

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| **Initial Render** | ≤ 500ms | 1.0s | Header + 25 rows |
| **Scroll Performance** | 60fps | 30fps | Virtualized rendering |
| **Sort Operation** | ≤ 200ms | 500ms | Client or server |
| **Filter Operation** | ≤ 300ms | 800ms | Debounced input |
| **Column Resize** | 60fps | 30fps | Smooth drag |
| **Row Selection** | ≤ 50ms | 100ms | Checkbox/radio |
| **Bulk Action** | ≤ 100ms | 300ms | Per 100 items |
| **Export (1k rows)** | ≤ 3s | 10s | CSV generation |

**Data Table Requirements:**
- Virtualization: Required for >50 rows
- Row height: Fixed or variable with measurement
- Cell rendering: Memoized components
- Selection state: Optimistic updates

### 6.3 Form Submission

| Operation | Target | Maximum | Notes |
|-----------|--------|---------|-------|
| **Field Validation** | ≤ 16ms | 50ms | Per keystroke (debounced) |
| **Submit Validation** | ≤ 100ms | 300ms | All fields |
| **Submit to Response** | ≤ 500ms | 1.5s | Network + processing |
| **Success Feedback** | ≤ 50ms | 100ms | Toast/redirect |
| **Error Feedback** | ≤ 50ms | 100ms | Field-level errors |
| **Auto-save** | ≤ 300ms | 1s | Background |

**Form Requirements:**
- Validation: Async with debounce (300ms)
- Submit: Optimistic UI with rollback
- File uploads: Progress tracking required
- Draft saving: Every 30 seconds

### 6.4 File Upload

| Phase | Target | Maximum | Notes |
|-------|--------|---------|-------|
| **File Selection** | ≤ 100ms | 300ms | Dialog open |
| **Validation** | ≤ 50ms | 200ms | Type, size checks |
| **Presigned URL** | ≤ 200ms | 500ms | S3 preparation |
| **Upload Start** | ≤ 100ms | 300ms | First byte sent |
| **Progress Update** | 60fps | 10fps | Smooth progress |
| **Upload Complete** | Varies | Varies | Size-dependent |
| **Processing** | ≤ 2s | 10s | Thumbnails, scan |
| **Final Response** | ≤ 300ms | 1s | Confirmation |

**Upload Requirements:**
- Chunked upload: Required for >10MB
- Resumable: Required for >50MB
- Parallel chunks: 3-5 concurrent
- Progress: Visual indicator required

### 6.5 Report Generation

| Report Type | Generation Target | Maximum | Format |
|-------------|-------------------|---------|--------|
| **Simple Table** | ≤ 1s | 3s | On-screen |
| **Chart Report** | ≤ 2s | 5s | On-screen |
| **PDF (1-10 pages)** | ≤ 5s | 15s | Download |
| **PDF (10-50 pages)** | ≤ 15s | 45s | Async + notify |
| **Excel Export** | ≤ 3s | 10s | Download |
| **CSV Export** | ≤ 2s | 5s | Streaming |
| **Large Dataset (100k+)** | ≤ 30s | 2min | Background job |

**Report Requirements:**
- Cancel capability: Always available
- Progress indication: For >2s operations
- Caching: 1-hour TTL for identical requests
- Queue management: Priority for on-demand

### 6.6 Bulk Operations

| Operation | Size | Time Budget | Notes |
|-----------|------|-------------|-------|
| **Bulk Update** | 10 items | ≤ 500ms | Synchronous |
| **Bulk Update** | 100 items | ≤ 2s | Synchronous |
| **Bulk Update** | 1,000 items | ≤ 10s | Async with progress |
| **Bulk Update** | 10,000+ items | ≤ 60s | Background job |
| **Bulk Delete** | 10 items | ≤ 300ms | Synchronous |
| **Bulk Delete** | 100 items | ≤ 1s | Synchronous |
| **Bulk Delete** | 1,000+ items | ≤ 5s | Async |
| **Bulk Import** | 100 rows | ≤ 3s | With validation |
| **Bulk Import** | 1,000 rows | ≤ 15s | Async |
| **Bulk Import** | 10,000+ rows | ≤ 2min | Background job |

**Bulk Operation Requirements:**
- Progress tracking: Percentage + ETA
- Error handling: Continue on error option
- Rollback: Available for 24 hours
- Notification: Email on completion

---

## 7. Admin-Specific Performance Considerations

### 7.1 Large Dataset Handling (1000+ Row Tables)

#### Virtualization Requirements

| Aspect | Specification |
|--------|--------------|
| **Library** | TanStack Virtual or react-window |
| **Overscan** | 5 rows (above and below viewport) |
| **Row Height** | Fixed (48px default) or dynamic measurement |
| **Scroll Performance** | 60fps maintained |
| **Memory Limit** | ≤ 100 DOM nodes for table body |
| **Initial Load** | 25 rows (first viewport + buffer) |

#### Data Loading Strategy

| Technique | When to Use | Implementation |
|-----------|-------------|----------------|
| **Client-side** | < 500 rows | Full dataset loaded |
| **Server-side** | 500 - 10,000 rows | Paginated with caching |
| **Virtual + Server** | > 10,000 rows | Infinite scroll + windowing |
| **Aggregation** | > 100k rows | Pre-aggregated views |

#### Large Dataset UX Patterns

```
User Experience Flow:
1. Show table header immediately (< 200ms)
2. Render first 25 rows with skeleton (< 500ms)
3. Load actual data progressively
4. Enable filters/search after initial load
5. Show "Loading more..." for infinite scroll
6. Display row count: "Showing 1-50 of 12,456"
```

### 7.2 Real-Time Updates (WebSocket Performance)

#### WebSocket Budgets

| Metric | Target | Maximum | Notes |
|--------|--------|---------|-------|
| **Connection Establish** | ≤ 200ms | 500ms | TLS handshake |
| **Reconnection** | ≤ 500ms | 2s | Exponential backoff |
| **Message Latency** | ≤ 100ms | 500ms | Server to client |
| **Heartbeat Interval** | 30s | 60s | Keep-alive |
| **Message Size** | ≤ 10KB | 50KB | Compression enabled |
| **Messages/Second** | 10/user | 50/user | Rate limit |

#### Update Types & Priorities

| Priority | Update Type | Delivery | Notes |
|----------|-------------|----------|-------|
| **Critical** | Data mutations | Immediate | User's own changes |
| **High** | Notifications | < 1s | Alerts, assignments |
| **Medium** | Presence | < 5s | User online/offline |
| **Low** | Analytics | < 30s | Dashboard updates |
| **Batch** | Sync operations | < 60s | Background refresh |

#### WebSocket Scalability

| Scenario | Specification |
|----------|--------------|
| **Connections/Server** | 10,000 concurrent |
| **Broadcast Fanout** | Max 1:1000 (use pub/sub for larger) |
| **Message Queue** | Redis Streams or RabbitMQ |
| **Connection Timeout** | 5 minutes idle |

### 7.3 Search Performance

#### Search Response Budgets

| Search Type | p50 | p95 | Implementation |
|-------------|-----|-----|----------------|
| **Instant (client)** | 50ms | 100ms | Fuse.js on cached data |
| **Typeahead** | 100ms | 300ms | Debounced (300ms) + cache |
| **Full-text** | 200ms | 600ms | PostgreSQL tsvector or Elasticsearch |
| **Fuzzy** | 300ms | 800ms | Levenshtein distance |
| **Cross-entity** | 400ms | 1.0s | Unified search index |
| **Advanced** | 500ms | 1.5s | Multiple filters + sort |

#### Search UX Requirements

| Feature | Specification |
|---------|--------------|
| **Debounce** | 300ms for typeahead |
| **Min Characters** | 3 for server search, 1 for client |
| **Results Limit** | 10 suggestions, 100 full results |
| **Highlighting** | Match highlighting (< 50ms render) |
| **Empty State** | < 200ms feedback |
| **Recent Searches** | Cached locally (last 20) |

### 7.4 Filter & Sort Performance

#### Client-Side Filter/Sort (Small Datasets)

| Operation | Dataset Size | Time Budget | Notes |
|-----------|--------------|-------------|-------|
| **Filter** | < 100 rows | ≤ 16ms | Synchronous |
| **Filter** | 100-500 rows | ≤ 50ms | Web Worker optional |
| **Sort** | < 100 rows | ≤ 16ms | Synchronous |
| **Sort** | 100-500 rows | ≤ 50ms | Web Worker recommended |
| **Combined** | < 500 rows | ≤ 100ms | With memoization |

#### Server-Side Filter/Sort (Large Datasets)

| Operation | Time Budget | Notes |
|-----------|-------------|-------|
| **Single Filter** | ≤ 200ms | Indexed column |
| **Multiple Filters** | ≤ 400ms | Combined index or bitmap |
| **Text Search** | ≤ 600ms | Full-text index |
| **Sort (indexed)** | ≤ 100ms | Pre-sorted index |
| **Sort (unindexed)** | ≤ 500ms | Temporary sort |
| **Filter + Sort** | ≤ 600ms | Combined query |

#### Filter UX Requirements

| Feature | Specification |
|---------|--------------|
| **Active Indicator** | Immediate (< 50ms) |
| **Result Count** | Update after filter (< 200ms) |
| **Clear All** | Reset in < 100ms |
| **URL Sync** | Debounced (500ms) |
| **Filter Chips** | Animate in < 200ms |

### 7.5 Export Performance

#### Export Time Budgets

| Export Type | Rows | Time Budget | Memory Limit |
|-------------|------|-------------|--------------|
| **CSV** | 1,000 | ≤ 1s | 10MB |
| **CSV** | 10,000 | ≤ 3s | 50MB |
| **CSV** | 100,000 | ≤ 15s | 200MB |
| **CSV** | 1,000,000 | ≤ 2min | Streamed |
| **Excel** | 1,000 | ≤ 2s | 20MB |
| **Excel** | 10,000 | ≤ 10s | 100MB |
| **Excel** | 100,000 | ≤ 60s | Streamed |
| **PDF** | 10 pages | ≤ 5s | 50MB |
| **PDF** | 100 pages | ≤ 30s | 200MB |

#### Export Architecture

| Rows | Strategy | Implementation |
|------|----------|----------------|
| < 10,000 | Synchronous | Direct response |
| 10k - 100k | Async Polling | Job queue + status endpoint |
| > 100k | Background + Notify | Email with download link |

#### Export UX Requirements

| Feature | Specification |
|---------|--------------|
| **Progress Bar** | For >3s operations |
| **Cancel Button** | Always available |
| **Download Start** | Immediate (streaming) or email notification |
| **Error Handling** | Retry option + support link |
| **Format Selection** | Before generation |

---

## 8. Monitoring Thresholds

### 8.1 Alert Thresholds by Metric

#### Core Web Vitals Alerts

| Metric | Warning | Critical | Emergency | Response Time |
|--------|---------|----------|-----------|---------------|
| **LCP** | > 2.0s | > 2.5s | > 4.0s | 30 min (Crit), 5 min (Emerg) |
| **INP** | > 150ms | > 200ms | > 500ms | 30 min (Crit), 5 min (Emerg) |
| **CLS** | > 0.05 | > 0.1 | > 0.25 | 60 min (Crit), 15 min (Emerg) |
| **FCP** | > 1.5s | > 2.0s | > 3.0s | 30 min (Crit), 5 min (Emerg) |
| **TTFB** | > 400ms | > 600ms | > 1.0s | 15 min (Crit), 5 min (Emerg) |

#### API Performance Alerts

| Metric | Warning | Critical | Emergency | Response Time |
|--------|---------|----------|-----------|---------------|
| **p95 Latency** | > 500ms | > 1s | > 3s | 30 min (Crit), 5 min (Emerg) |
| **p99 Latency** | > 1s | > 2s | > 5s | 30 min (Crit), 5 min (Emerg) |
| **Error Rate** | > 1% | > 5% | > 10% | 15 min (Crit), 5 min (Emerg) |
| **Throughput Drop** | > 20% | > 50% | > 80% | 15 min (Crit), 5 min (Emerg) |

#### Database Alerts

| Metric | Warning | Critical | Emergency | Response Time |
|--------|---------|----------|-----------|---------------|
| **Query Time p95** | > 100ms | > 500ms | > 2s | 30 min (Crit), 5 min (Emerg) |
| **Slow Queries/min** | > 10 | > 50 | > 100 | 30 min (Crit), 5 min (Emerg) |
| **Connection Pool** | > 70% | > 85% | > 95% | 15 min (Crit), 5 min (Emerg) |
| **Deadlocks/min** | > 1 | > 5 | > 10 | 15 min (Crit), Immediate (Emerg) |
| **Replication Lag** | > 1s | > 5s | > 30s | 15 min (Crit), 5 min (Emerg) |

#### Infrastructure Alerts

| Metric | Warning | Critical | Emergency | Response Time |
|--------|---------|----------|-----------|---------------|
| **CPU Usage** | > 70% | > 85% | > 95% | 30 min (Crit), 15 min (Emerg) |
| **Memory Usage** | > 75% | > 85% | > 95% | 30 min (Crit), 15 min (Emerg) |
| **Disk Usage** | > 75% | > 85% | > 90% | 60 min (Crit), 30 min (Emerg) |
| **Disk I/O Wait** | > 20% | > 40% | > 60% | 30 min (Crit), 15 min (Emerg) |
| **Network Errors** | > 1% | > 5% | > 10% | 15 min (Crit), 5 min (Emerg) |

### 8.2 SLO Definitions

#### Availability SLOs

| Service Tier | SLO | Error Budget (Monthly) | Measurement |
|--------------|-----|------------------------|-------------|
| **Admin Portal (Critical)** | 99.9% | 43.8 minutes | Uptime probe |
| **Admin Portal (Standard)** | 99.5% | 3.6 hours | Uptime probe |
| **API (Critical)** | 99.9% | 43.8 minutes | Request success rate |
| **API (Standard)** | 99.5% | 3.6 hours | Request success rate |
| **Database** | 99.99% | 4.4 minutes | Connection availability |
| **Background Jobs** | 99% | 7.2 hours | Job completion rate |

#### Performance SLOs

| Metric | SLO Target | Measurement Window | Consequence of Breach |
|--------|------------|-------------------|----------------------|
| **LCP < 2.5s** | 95% of page loads | 7 days | Performance review |
| **INP < 200ms** | 95% of interactions | 7 days | Optimization sprint |
| **API p95 < 500ms** | 99% of requests | 1 day | Auto-scaling trigger |
| **API p99 < 1s** | 99.9% of requests | 1 day | Incident review |
| **Search < 600ms** | 95% of queries | 7 days | Index optimization |
| **Export < 30s** | 99% of exports | 7 days | Queue scaling |

### 8.3 Error Rate Budgets

| Error Category | Budget | Action on Exceed |
|----------------|--------|------------------|
| **5xx Errors** | 0.1% | Immediate investigation |
| **4xx Errors (client)** | 5% | Review UX/validation |
| **Timeout Errors** | 0.5% | Capacity review |
| **Auth Failures** | 2% | Security review |
| **Validation Errors** | 10% | Form UX review |
| **Rate Limit Hits** | 1% | Limits review |

### 8.4 Error Budget Policy

```
Monthly Error Budget Calculation:
- Admin Portal Availability: 99.9% = 43.8 min/month budget
- API Latency p95 < 500ms: 99% = 0.72 hours budget
- Error Rate < 0.1%: 99.9% success rate

Budget Consumption Tracking:
- Real-time dashboard
- Weekly review meetings
- Automatic alerts at 50%, 75%, 90%
- Code freeze at 100% (emergency fixes only)

Budget Recovery:
- Unused budget does not roll over
- Post-incident reviews for >10% consumption
- Quarterly SLO review and adjustment
```

---

## 9. Performance Testing Requirements

### 9.1 Load Testing Scenarios

#### Scenario 1: Normal Business Hours

| Parameter | Value |
|-----------|-------|
| **Concurrent Users** | 100 - 500 |
| **Request Rate** | 50 - 200 req/sec |
| **Duration** | 8 hours |
| **Think Time** | 5-30 seconds |
| **Data Set** | Production-sized (anonymized) |

**Test Flow:**
1. Login (10% of users)
2. Dashboard view (80% of users)
3. Data table operations (60% of users)
4. Form submissions (30% of users)
5. Report generation (10% of users)
6. Search operations (40% of users)

**Success Criteria:**
- p95 latency < 500ms for all operations
- Error rate < 0.1%
- CPU < 70%, Memory < 80%
- No connection pool exhaustion

#### Scenario 2: Peak Usage

| Parameter | Value |
|-----------|-------|
| **Concurrent Users** | 500 - 1000 |
| **Request Rate** | 200 - 500 req/sec |
| **Duration** | 2 hours |
| **Ramp-up** | 15 minutes |
| **Data Set** | Production-sized |

**Test Flow:**
- Mix of all user journeys
- Emphasis on search and filtering
- Concurrent report generation (20 users)
- Bulk operations (10 concurrent)

**Success Criteria:**
- p95 latency < 1s
- p99 latency < 2s
- Error rate < 0.5%
- Auto-scaling triggers properly
- Degradation is graceful

#### Scenario 3: Monthly Report Generation

| Parameter | Value |
|-----------|-------|
| **Concurrent Reports** | 20 - 50 |
| **Report Types** | Mix of sizes (1-page to 100-page) |
| **Duration** | 4 hours |
| **Background Jobs** | 100 queued |

**Success Criteria:**
- All reports complete successfully
- Average generation time < SLO
- No impact on interactive operations
- Queue processing rate > generation rate

### 9.2 Stress Testing Parameters

#### Stress Test: Breaking Point

| Phase | Duration | Load |
|-------|----------|------|
| **Baseline** | 10 min | 100 users |
| **Ramp 1** | 10 min | 100 → 500 users |
| **Sustain 1** | 15 min | 500 users |
| **Ramp 2** | 10 min | 500 → 1000 users |
| **Sustain 2** | 15 min | 1000 users |
| **Ramp 3** | 10 min | 1000 → 2000 users |
| **Recovery** | 30 min | Return to baseline |

**Measurements:**
- Identify saturation point (where latency increases exponentially)
- Document resource exhaustion points
- Verify circuit breaker activation
- Measure recovery time

#### Stress Test: Resource Exhaustion

| Resource | Test | Target |
|----------|------|--------|
| **CPU** | 100% utilization | Graceful degradation, no crashes |
| **Memory** | Gradual increase | OOM handling, no data loss |
| **Connections** | Pool exhaustion | Queue management, no deadlocks |
| **Disk I/O** | Saturated | Async operations queue properly |

### 9.3 Large Dataset Testing

#### Dataset Sizes for Testing

| Tier | Row Count | Use Case |
|------|-----------|----------|
| **Small** | 1,000 | Development, unit tests |
| **Medium** | 100,000 | Integration testing |
| **Large** | 1,000,000 | Load testing |
| **Extra Large** | 10,000,000 | Stress testing |
| **Maximum** | 100,000,000 | Scale validation |

#### Large Dataset Test Scenarios

| Scenario | Dataset | Operation | Target |
|----------|---------|-----------|--------|
| **Table Render** | 1M rows | Virtual scroll | 60fps maintained |
| **Search** | 10M rows | Full-text | < 1s response |
| **Filter** | 1M rows | Multi-column | < 500ms |
| **Sort** | 1M rows | Unindexed | < 2s |
| **Export** | 1M rows | CSV | < 5min, streamed |
| **Aggregate** | 10M rows | Report | < 30s |
| **Bulk Update** | 100k rows | Batch | < 60s |

### 9.4 Real-Time Performance Testing

#### WebSocket Load Test

| Parameter | Value |
|-----------|-------|
| **Concurrent Connections** | 10,000 |
| **Messages/Second** | 1,000 |
| **Connection Duration** | 1 hour |
| **Reconnection Rate** | 10% random drop |

**Test Scenarios:**
1. Broadcast storm (1 message → 10,000 clients)
2. Subscribe/unsubscribe churn
3. Connection drops and recovery
4. Memory leak detection (24-hour test)

#### Real-Time Update Latency Test

| Update Type | Target Latency | Max Latency |
|-------------|----------------|-------------|
| **Data Mutation** | < 100ms | 500ms |
| **Presence** | < 500ms | 2s |
| **Notification** | < 1s | 5s |
| **Background Sync** | < 30s | 2min |

### 9.5 Test Automation Requirements

#### CI/CD Performance Gates

| Gate | Threshold | Action on Failure |
|------|-----------|-------------------|
| **Bundle Size** | No increase > 5% | Block merge |
| **Lighthouse CI** | Score ≥ 90 | Warning |
| **Lighthouse CI** | Score < 70 | Block merge |
| **Unit Test Time** | < 5 minutes | Block merge |
| **E2E Test Time** | < 15 minutes | Block merge |
| **New Dependencies** | < 100KB gzipped | Manual review |

#### Performance Regression Detection

| Metric | Detection Method | Alert Threshold |
|--------|------------------|-----------------|
| **Page Load Time** | Lighthouse CI comparison | > 10% regression |
| **Bundle Size** | Webpack stats comparison | > 5% increase |
| **API Latency** | Synthetic monitoring | > 20% regression |
| **Query Performance** | EXPLAIN plan analysis | New sequential scans |

---

## 10. Implementation Guidelines

### 10.1 Performance Budget Enforcement

```
Development Workflow:
1. Define budgets in webpack-bundle-analyzer config
2. CI/CD checks bundle size on every PR
3. Lighthouse CI runs on deploy preview
4. Performance tests run on staging
5. Production monitoring verifies budgets

Violation Handling:
- Warning: > 80% of budget
- Review Required: > 90% of budget  
- Blocked: > 100% of budget (requires override)
```

### 10.2 Performance Optimization Checklist

#### Before Release

- [ ] All Core Web Vitals meet targets
- [ ] Bundle sizes within budgets
- [ ] API p95 latency < 500ms
- [ ] Database queries < 100ms (p95)
- [ ] Load test passed (500 concurrent users)
- [ ] Large dataset test passed (1M rows)
- [ ] No new sequential scans detected
- [ ] Error rate < 0.1%

#### Monthly Review

- [ ] Review performance dashboards
- [ ] Analyze top 10 slowest queries
- [ ] Check bundle size trends
- [ ] Review error budget consumption
- [ ] Update performance tests if needed
- [ ] Document any SLO adjustments

### 10.3 Performance Tools

| Category | Tool | Purpose |
|----------|------|---------|
| **Monitoring** | Vercel Analytics | Core Web Vitals |
| **Monitoring** | Datadog / New Relic | APM, infrastructure |
| **Profiling** | Chrome DevTools | Client-side analysis |
| **Profiling** | React DevTools Profiler | Component performance |
| **Bundle Analysis** | webpack-bundle-analyzer | Size tracking |
| **Database** | pg_stat_statements | Query analysis |
| **Load Testing** | k6 / Artillery | Load simulation |
| **Lighthouse** | Lighthouse CI | Automated auditing |

---

## 11. Glossary

| Term | Definition |
|------|------------|
| **LCP** | Largest Contentful Paint - time until largest visible element renders |
| **INP** | Interaction to Next Paint - responsiveness to user interactions |
| **CLS** | Cumulative Layout Shift - visual stability metric |
| **FCP** | First Contentful Paint - time until first content renders |
| **TTFB** | Time to First Byte - server response time |
| **TBT** | Total Blocking Time - main thread blocked duration |
| **p50/p95/p99** | Percentile values (50th, 95th, 99th) |
| **SLO** | Service Level Objective - target reliability metric |
| **Error Budget** | Allowable downtime/error rate before action required |

---

## 12. References

- [Vantus Technical Architecture](../docs/app-documentation/02-ARCHITECTURE-SPEC.md)
- [Vantus Security Compliance](../docs/app-documentation/06-SECURITY-COMPLIANCE.md)
- [Web Vitals Documentation](https://web.dev/vitals/)
- [Google Performance Budgets](https://web.dev/performance-budgets-101/)

---

*End of Document*
