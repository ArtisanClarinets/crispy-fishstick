# API Documentation

This file is a recursively generated audit of all API endpoints in the application.

## `/api/cron/contract-reminders`

### GET

---

## `/api/cron/session-cleanup`

### GET
> Cron job to clean up expired sessions
> This should be called periodically (e.g., daily) to revoke expired sessions

### POST

---

## `/api/infrastructure/configurator/validate`

### POST

---

## `/api/infrastructure/cfo-pack`

### POST

---

## `/api/infrastructure/builds`

### POST

---

## `/api/infrastructure/builds/[code]/reserve`

### POST

---

## `/api/infrastructure/estimate`

### POST

---

## `/api/webhooks/esign`

### POST
> POST /api/webhooks/esign
> Receive e-signature provider webhooks
> Note: skipCsrf is enabled since this is a webhook from external service

---

## `/api/auth/[...nextauth]`

*No exported methods found (or using non-standard syntax)*

---

## `/api/csrf`

### GET

---

## `/api/contact`

### POST

---

## `/api/uploads/[filename]`

### GET

---

## `/api/admin/invoices`

### GET
> GET /api/admin/invoices
> List invoices with pagination, filtering, and tenant scoping

### POST
> GET /api/admin/invoices
> List invoices with pagination, filtering, and tenant scoping
> export const GET = adminRead(
> { permissions: ["invoices.read"] },
> async (req, { user }) => {
> const { searchParams } = req.nextUrl;
> // Parse pagination and filters
> const pagination = parsePaginationParams(searchParams);
> const filters = parseCommonFilters(searchParams);
> // Build where clause with tenant scoping
> const where: any = {
> ...tenantWhere(user, filters.tenantId || undefined),
> ...buildDeletedFilter(filters.includeDeleted),
> ...buildDateRangeFilter("createdAt", filters.dateFrom, filters.dateTo),
> };
> if (filters.status) {
> where.status = filters.status;
> }
> if (filters.q) {
> where.OR = [
> { number: { contains: filters.q, mode: "insensitive" } },
> { notes: { contains: filters.q, mode: "insensitive" } },
> ];
> }
> // Query with pagination
> const prismaParams = getPrismaParams(pagination);
> const invoices = await prisma.invoice.findMany({
> where,
> ...prismaParams,
> orderBy: { createdAt: "desc" },
> include: {
> Tenant: true,
> InvoiceItem: true,
> TimeEntry: true,
> },
> });
> const result = buildPaginationResult(invoices, pagination);
> return NextResponse.json(result);
> }
> );
> POST /api/admin/invoices
> Create invoice with atomic sequence numbering and idempotency

---

## `/api/admin/invoices/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/invoices/[id]/restore`

### POST
> POST /api/admin/invoices/[id]/restore
> Restore a soft-deleted invoice

---

## `/api/admin/invoices/draft-from-time`

### POST
> POST /api/admin/invoices/draft-from-time
> Generate draft invoice from approved, unbilled time entries

---

## `/api/admin/proposals`

### GET

### POST

---

## `/api/admin/proposals/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/proposals/[id]/submit`

### POST

---

## `/api/admin/proposals/[id]/restore`

### POST

---

## `/api/admin/proposals/[id]/reject`

### POST

---

## `/api/admin/proposals/[id]/convert-to-project`

### POST
> POST /api/admin/proposals/[id]/convert-to-project
> Convert accepted proposal to project with baseline budget

---

## `/api/admin/proposals/[id]/approve`

### POST

---

## `/api/admin/webhooks/deliveries`

### GET

---

## `/api/admin/webhooks/endpoints`

### GET

### POST

---

## `/api/admin/webhooks/endpoints/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/time-entries`

### GET

### POST

---

## `/api/admin/time-entries/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/time-entries/[id]/restore`

### POST

---

## `/api/admin/time-entries/[id]/reject`

### POST
> POST /api/admin/time-entries/[id]/reject
> Reject a submitted time entry

---

## `/api/admin/time-entries/[id]/approve`

### POST
> POST /api/admin/time-entries/[id]/approve
> Approve a submitted time entry

---

## `/api/admin/incidents`

### GET

### POST

---

## `/api/admin/incidents/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/incidents/[id]/restore`

### POST

---

## `/api/admin/media`

### GET

### POST

---

## `/api/admin/media/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/media/[id]/restore`

### POST

---

## `/api/admin/media/[id]/download`

### GET
> GET /api/admin/media/[id]/download
> Download private media artifact with authentication and audit

---

## `/api/admin/contracts`

### GET

### POST

---

## `/api/admin/contracts/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/contracts/[id]/restore`

### POST

---

## `/api/admin/contracts/[id]/sign`

### POST
> POST /api/admin/contracts/[id]/sign
> Initiate e-signature workflow

---

## `/api/admin/auth/mfa/disable`

### POST

---

## `/api/admin/auth/mfa/enable`

### POST

---

## `/api/admin/auth/mfa/recovery`

### POST

---

## `/api/admin/auth/mfa/generate`

### POST

---

## `/api/admin/auth/change-password`

### POST

---

## `/api/admin/jit/requests`

### GET

### POST

---

## `/api/admin/jit/requests/[id]`

### GET

---

## `/api/admin/jit/requests/[id]/approve`

### POST

---

## `/api/admin/jit/requests/[id]/deny`

### POST

---

## `/api/admin/services`

### GET

### POST

---

## `/api/admin/services/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/services/[id]/restore`

### POST

---

## `/api/admin/users`

### GET

### POST

---

## `/api/admin/users/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/users/[id]/restore`

### POST

---

## `/api/admin/users/[id]/roles`

### PATCH

---

## `/api/admin/role-assignments`

### GET

### POST

---

## `/api/admin/role-assignments/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/sessions`

### GET
> Get all active sessions for the current user

### DELETE
> Get all active sessions for the current user
> export async function GET(req: NextRequest) {
> try {
> // Phase 6: CSRF/Origin Enforcement
> // @ts-ignore - req type mismatch between next/server and built-in Request, but it works at runtime
> assertSameOrigin(req);
> const actor = await requireAdmin();
> const sessions = await getUserActiveSessions(actor.id);
> // Format sessions for response (remove sensitive data)
> const formattedSessions = sessions.map(session => ({
> id: session.id,
> deviceInfo: session.deviceInfo,
> ipAddress: session.ipAddress,
> userAgent: session.userAgent,
> createdAt: session.createdAt,
> lastActiveAt: session.lastActiveAt,
> expiresAt: session.expiresAt,
> isCurrent: false // This would need to be determined based on current session token
> }));
> return jsonNoStore({
> success: true,
> sessions: formattedSessions,
> sessionCount: formattedSessions.length
> });
> } catch (error) {
> console.error("Get sessions error:", error);
> return jsonNoStore({ error: "Internal Server Error" }, { status: 500 });
> }
> }
> Revoke a specific session

---

## `/api/admin/exports/audit-logs`

### GET
> Export audit logs as CSV
> GET /api/admin/exports/audit-logs?startDate=2024-01-01&endDate=2024-12-31

---

## `/api/admin/leads`

### GET

### POST

---

## `/api/admin/leads/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/leads/[id]/restore`

### POST

---

## `/api/admin/leads/bulk`

### POST
> Bulk actions on leads
> POST /api/admin/leads/bulk
> Body: { ids: string[], action: "delete"|"archive"|"assign", assignedTo?: string }

---

## `/api/admin/projects`

### GET

### POST

---

## `/api/admin/projects/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/projects/[id]/restore`

### POST

---

## `/api/admin/projects/bulk`

### POST
> Bulk actions on projects
> POST /api/admin/projects/bulk

---

## `/api/admin/assignments`

### GET

### POST

---

## `/api/admin/assignments/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/tenants`

### GET
> GET /api/admin/tenants
> List tenants with pagination

### POST
> GET /api/admin/tenants
> List tenants with pagination
> export const GET = adminRead(
> { permissions: ["tenants.read"] },
> async (req, { user }) => {
> const { searchParams } = req.nextUrl;
> const pagination = parsePaginationParams(searchParams);
> const filters = parseCommonFilters(searchParams);
> // Scoping: if user is tenant-scoped, they can only see their own tenant
> const where: any = {
> ...buildDeletedFilter(filters.includeDeleted),
> };
> if (user.tenantId) {
> where.id = user.tenantId;
> }
> if (filters.q) {
> where.OR = [
> { name: { contains: filters.q, mode: "insensitive" } },
> { slug: { contains: filters.q, mode: "insensitive" } },
> { contactEmail: { contains: filters.q, mode: "insensitive" } },
> ];
> }
> const prismaParams = getPrismaParams(pagination);
> const tenants = await prisma.tenant.findMany({
> where,
> ...prismaParams,
> orderBy: { createdAt: "desc" },
> include: {
> _count: {
> select: {
> Project: true,
> Invoice: true,
> Contract: true,
> },
> },
> },
> });
> const result = buildPaginationResult(tenants, pagination);
> return NextResponse.json(result);
> }
> );
> POST /api/admin/tenants
> Create new tenant

---

## `/api/admin/tenants/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/search`

### GET
> Global search across multiple entities
> GET /api/admin/search?q=searchterm&entities=projects,leads,users

---

## `/api/admin/audit`

### GET

---

## `/api/admin/content`

### GET

### POST

---

## `/api/admin/content/[id]`

### GET

### PATCH

### DELETE

---

## `/api/admin/content/[id]/restore`

### POST

---

## `/api/server-config/recommend`

### POST

---

## `/api/proof/headers`

*No exported methods found (or using non-standard syntax)*

---
