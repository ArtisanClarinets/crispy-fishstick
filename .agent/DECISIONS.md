# Decision Log

**Project**: Vantus Admin Backend Fortune-500 Refactor
**Date Started**: 2026-01-09

---

## Architecture Decisions

### AD-001: Admin Route Wrapper Dual Signature Pattern
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Support both legacy and inline styles for adminRead/adminMutation
- Legacy: `export const GET = adminRead(options, handler)`
- Inline: `export async function GET(req) { return adminRead(req, options, handler) }`

**Rationale**: 
- Allows gradual migration without breaking existing routes
- Inline style provides better TypeScript inference
- Both patterns enforce same security guarantees

**Consequences**:
- Need to maintain both code paths in wrapper implementation
- Documentation must explain both patterns
- Pick one for new routes (recommend inline for clarity)

---

### AD-002: CSRF Double-Submit Pattern
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Use double-submit cookie pattern with HMAC signing

**Rationale**:
- Stateless (no server-side token storage)
- HMAC prevents token forgery
- Works with horizontal scaling
- Industry standard for SPAs

**Implementation**:
- Token in cookie (httpOnly, SameSite=Strict)
- Same token in X-CSRF-Token header
- Server validates both match and HMAC signature

---

### AD-003: Soft Delete as Default
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: All business records use soft delete (deletedAt, deletedBy, deleteReason)

**Rationale**:
- Regulatory compliance (audit trail)
- Accidental deletion recovery
- Data forensics capability
- Referential integrity maintenance

**Affected Models**: User, Lead, Project, Service, Incident, Proposal, Contract, Invoice, Content, MediaAsset, Tenant, ProposalComponent, TimeEntry

---

### AD-004: Cursor-Based Pagination
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Use cursor-based pagination with id as cursor

**Rationale**:
- Handles high-volume datasets efficiently
- No missing/duplicate items on concurrent inserts
- Scales better than offset pagination
- Standard for modern APIs

**Implementation**:
- Query param: `?cursor=xyz&take=20&direction=forward`
- Response includes nextCursor, prevCursor, hasMore

---

### AD-005: Scoped RBAC
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Extend RoleAssignment with scopeType/scopeId for PROJECT/TENANT/GLOBAL scopes

**Rationale**:
- Enables fine-grained access control
- Supports multi-tenant isolation
- Allows project-specific permissions
- Future-proofs for org hierarchy

**Implementation**:
- Unique constraint: userId_roleId_scopeType_scopeId
- Guards check scope when validating permissions

---

### AD-006: Job Queue Infrastructure
**Date**: 2026-01-09
**Status**: Mock → To Be Upgraded to BullMQ

**Decision**: Use BullMQ with Redis for async job processing

**Rationale**:
- Industry standard (based on Bull)
- Reliable job persistence
- Retry logic built-in
- Good observability

**Jobs to Implement**:
- Email sending
- PDF generation
- Data exports
- Webhook retries

---

### AD-007: E-Signature Integration Strategy
**Date**: 2026-01-09  
**Status**: Infrastructure Ready

**Decision**: Provider-agnostic abstraction supporting DocuSign/HelloSign

**Rationale**:
- Avoid vendor lock-in
- Support customer choice
- Standard webhook pattern works for both

**Implementation**:
- Contract has signatureProvider, signatureEnvelopeId, signatureStatus
- Webhook endpoint validates signature and updates status
- Provider SDKs called from job processors (rate limited)

---

### AD-008: Private Media Security Model
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: All MediaAsset downloads require authentication + audit

**Rationale**:
- Prevent data leaks
- Compliance with data protection regulations
- Attribution/forensics capability

**Implementation**:
- visibility enum: PUBLIC | PRIVATE | TENANT | PROJECT
- Download route checks user permission + tenant scope
- Every download creates audit log entry
- Files stored outside webroot

---

### AD-009: Invoice Sequencing Strategy
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Atomic sequence numbering with idempotency key

**Rationale**:
- Business requires gapless sequence
- Must handle concurrent creation
- Must prevent duplicate invoice on retry

**Implementation**:
- Database transaction with row lock
- IdempotencyKey table prevents retry duplicates
- Sequence column with unique constraint per tenant

---

### AD-010: Contract Optimistic Concurrency
**Date**: 2026-01-09
**Status**: Implemented

**Decision**: Version field with If-Match header for contract updates

**Rationale**:
- Prevent lost updates in approval workflows
- Standard HTTP pattern (ETags)
- Clear 409 Conflict response on mismatch

**Implementation**:
- Contract has version integer
- Client sends If-Match: version header
- Server returns 409 if mismatch, 200 with new version on success

---

## Technology Choices

### TC-001: Pagination Library
**Decision**: Custom implementation
**Rationale**: Simple enough; no need for dependency

### TC-002: CSRF Library  
**Decision**: Custom implementation
**Rationale**: Specific double-submit pattern; custom crypto needed

### TC-003: Audit Diff
**Decision**: Simple field-level JSON diff
**Rationale**: Good enough for current needs; can upgrade to jsondiffpatch later

### TC-004: Job Queue
**Decision**: BullMQ
**Rationale**: Industry standard, reliable, good docs

### TC-005: Test Framework
**Decision**: Vitest + Playwright (already in repo)
**Rationale**: Fast, modern, good TypeScript support

---

## Deferred Decisions (Future Consideration)

### DF-001: Advanced Audit Visualization
Currently using simple diff. Consider jsondiffpatch or custom visual diff UI in future.

### DF-002: Advanced Rate Limiting
Currently using simple in-memory rate limiter. Consider Redis-based sliding window for production.

### DF-003: Real-Time Notifications
WebSocket/SSE for live updates. Currently polling-based.

### DF-004: Advanced Search
Currently basic SQL LIKE. Consider Elasticsearch/MeiliSearch for full-text search at scale.

### DF-005: File Storage Strategy
Currently local filesystem. Consider S3/GCS for cloud deployment.
