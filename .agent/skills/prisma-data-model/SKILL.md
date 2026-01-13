---
name: prisma-data-model
description: Understand the specific data model, entities, and database operations for Project SENTINEL. Use when writing database queries, creating migrations, or explaining the data architecture.
---

# Prisma Data Model

This skill provides context on the database schema defined in `prisma/schema.prisma`. It ensures data integrity, multi-tenant isolation, and secure database operations across the platform.

## Quick Start

Implement a data change in 4 steps:

1.  **Update Schema**: Modify `prisma/schema.prisma` with new models or fields.
2.  **Generate Client**: Run `npm run prisma:generate` to update the types.
3.  **Create Migration**: Run `npm run prisma:migrate` to apply changes to the database.
4.  **Update Zod Schemas**: Ensure corresponding Zod schemas in `lib/validations/` are updated.

```typescript
// Example: Tenant-scoped query with soft-delete check
const projects = await prisma.project.findMany({
  where: {
    tenantId: user.tenantId,
    deletedAt: null,
  },
  select: {
    id: true,
    name: true,
    status: true,
  },
});
```

## Core Entities

*   **Tenant**: The top-level organization unit. Everything belongs to a Tenant (directly or indirectly).
    *   Identified by `slug`.
    *   Owns `Environments`, `Projects`, `Contracts`, `Invoices`.
*   **Project**: A specific engagement or scope of work within a Tenant.
    *   Has `Assignments` (Users) and `TimeEntries`.
*   **User**: A global user entity with `RoleAssignments` (RBAC) scoped to Global, Tenant, or Project levels.
    *   Includes `mfaSecret` for enhanced security.
*   **Contract**: Legal agreements with versioning (`ContractVersion`) and e-signature support.
*   **AuditLog**: Immutable record of all privileged actions (`actorId`, `action`, `resource`, `diff`).

## Key Logic & Constraints

### 1. Multi-tenancy & Isolation
Most operational entities are explicitly scoped to a `tenantId`. **Mandatory**: Always include `tenantId` in queries to prevent cross-tenant data leakage.

### 2. Soft Deletes
Models support soft deletes via `deletedAt`, `deletedBy`, and `deleteReason`.
*   **Rule**: Always filter `where: { deletedAt: null }` unless explicitly retrieving archived data.

### 3. RBAC Enforcement
Implemented via `RoleAssignment`. Permissions are checked at the API level but must be reflected in data access patterns.

## Database Operation Workflows

### Adding a New Model

**Step 1: Define the Model**
Ensure the model includes `tenantId` (if applicable) and soft-delete fields.

**Step 2: Establish Relationships**
Use Prisma's relation syntax to link models (e.g., `@relation(fields: [tenantId], references: [id])`).

**Step 3: Audit Integration**
Ensure any mutation to the new model is wrapped in an audit-logging mechanism (e.g., `adminMutation`).

```typescript
// Integration with Audit Logging
await prisma.auditLog.create({
  data: {
    action: "create_resource",
    resource: "new_model",
    actorId: user.id,
    diff: JSON.stringify({ after: newData }),
  },
});
```

### Handling Migrations

*   **Development**: Use `npm run prisma:migrate` for interactive migrations.
*   **Production**: Use `npx prisma migrate deploy` in CI/CD pipelines to apply pending migrations safely.

## Advanced Patterns

### Transactional Integrity
Use `prisma.$transaction` for operations involving multiple related models (e.g., creating an Invoice and updating InvoiceSequence).

### Performance Optimization
Use `select` to retrieve only necessary fields, avoiding `include` where possible to reduce query complexity and data transfer.
