# Best Practices for Prisma Data Model

This guide outlines proven patterns and anti-patterns for working with the Prisma data layer in Project SENTINEL, ensuring data integrity, security, and performance.

## 1. Multi-Tenant Data Isolation

### ✓ DO: Enforce Tenant Scoping in Every Query

```typescript
// CORRECT: Explicitly scoping by tenantId
const projects = await prisma.project.findMany({
  where: {
    tenantId: user.tenantId,
    deletedAt: null,
  },
});
```

**Why this matters:**
- **Security**: Prevents users from accessing data belonging to other tenants.
- **Compliance**: Meets strict data isolation requirements for enterprise clients.

### ✗ DON'T: Query Without Tenant Context

```typescript
// VULNERABLE: Cross-tenant data leakage
const projects = await prisma.project.findMany({
  where: { deletedAt: null }
});
```

## 2. Soft Delete Management

### ✓ DO: Filter for Active Records by Default

```typescript
// CORRECT: Always checking for deletedAt: null
const activeUsers = await prisma.user.findMany({
  where: {
    tenantId: user.tenantId,
    deletedAt: null,
  },
});
```

### ✗ DON'T: Forget the Soft Delete Filter

Failing to filter for `deletedAt: null` will include archived or "deleted" records in your UI, leading to data inconsistency and user confusion.

## 3. Secure Field Selection

### ✓ DO: Use Explicit Field Selection

```typescript
// CORRECT: Selecting only necessary, non-sensitive fields
const users = await prisma.user.findMany({
  where: { tenantId: user.tenantId, deletedAt: null },
  select: {
    id: true,
    name: true,
    email: true,
    roleAssignments: true,
  },
});
```

**Why this matters:**
- **Security**: Prevents accidental exposure of sensitive fields like `passwordHash` or `mfaSecret`.
- **Performance**: Reduces the amount of data transferred from the database.

### ✗ DON'T: Use Default Selection for Sensitive Models

Avoid `prisma.user.findUnique({ where: { id } })` without a `select` or `include` block, as it returns all fields by default.

## 4. Transactional Integrity

### ✓ DO: Use Transactions for Atomic Operations

```typescript
// CORRECT: Ensuring both operations succeed or fail together
await prisma.$transaction(async (tx) => {
  const sequence = await tx.invoiceSequence.update({
    where: { id: sequenceId },
    data: { current: { increment: 1 } },
  });

  await tx.invoice.create({
    data: {
      number: `INV-${sequence.current}`,
      tenantId: user.tenantId,
      // ...
    },
  });
});
```

## 5. Error Handling & Validation

### ✓ DO: Validate Data Before Database Insertion

Always use Zod schemas to validate input before it reaches the Prisma client.

```typescript
// CORRECT: Validation layer before DB call
const validatedData = projectSchema.parse(body);
await prisma.project.create({
  data: { ...validatedData, tenantId: user.tenantId }
});
```

### ✗ DON'T: Rely Solely on Database Constraints

Database constraints are a last line of defense. Application-level validation provides better error messages and prevents unnecessary database hits.

## 6. Integration with Workflows

### ✓ DO: Audit All Mutations

Ensure every `create`, `update`, or `delete` operation is recorded in the `AuditLog`.

```typescript
// Example: Auditing a project update
const updatedProject = await prisma.project.update({
  where: { id: projectId, tenantId: user.tenantId },
  data: validatedData,
});

await createAuditLog({
  action: "update_project",
  resource: "project",
  resourceId: updatedProject.id,
  actorId: user.id,
  before: previousState,
  after: updatedProject,
});
```

## Summary: Data Implementation Checklist

**Every database interaction must implement:**

- [ ] **Tenant Isolation**: Scoped by `tenantId`.
- [ ] **Soft Delete**: Filtered by `deletedAt: null`.
- [ ] **Safe Selection**: Explicit `select` block for sensitive models.
- [ ] **Validation**: Input validated via Zod.
- [ ] **Audit Logging**: Mutations recorded in `AuditLog`.
- [ ] **Performance**: Minimal fields selected, efficient relations.
- [ ] **Error Handling**: Graceful handling of unique constraint violations or connection issues.
