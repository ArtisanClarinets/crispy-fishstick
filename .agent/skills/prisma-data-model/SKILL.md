---
name: prisma-data-model
description: Understand the specific data model, entities, and database operations for Project SENTINEL.
---

# Prisma Data Model

This skill provides context on the database schema defined in `prisma/schema.prisma`.
Use this skill when writing database queries, creating migrations, or explaining the data architecture.

## 1. Core Entities

*   **Tenant**: The top-level organization unit. Everything belongs to a Tenant (directly or indirectly).
    *   Has: `Environments`, `Projects`, `Contracts`, `Invoices`.
    *   Identified by `slug`.
*   **Project**: A specific engagement or scope of work within a Tenant.
    *   Has: `Assignments` (Users), `TimeEntries`.
*   **User**: A global user entity.
    *   Can have `RoleAssignments` (RBAC) scoped to Global, Tenant, or Project levels.
    *   Has `mfaSecret` for security.
*   **Contract**: Legal agreements.
    *   Supports versioning (`ContractVersion`).
    *   Supports e-signature workflows (`signatureStatus`, `signatureEnvelopeId`).
*   **Invoice**: Financial records.
    *   Linked to `Tenant`.
    *   Has `InvoiceItem`s.
*   **Lead**: Sales prospects (Inbox).
*   **AuditLog**: Immutable record of all privileged actions.
    *   Fields: `actorId`, `action`, `resource`, `diff`.

## 2. Key Relationships & Logic

*   **Multi-tenancy**: Most operational entities (`Project`, `Invoice`, `Lead`) are explicitly scoped to a `tenantId`. Always include `tenantId` in queries where applicable to ensure isolation.
*   **RBAC**: Implemented via `RoleAssignment`. Users have roles (`Role`) which contain permissions. Scoping allows a user to be an Admin for one Tenant but a Viewer for another.
*   **Soft Deletes**:
    *   Many models (`Contract`, `Invoice`, `Lead`, `Project`, `User`, `Tenant`, `Service`) support soft deletes.
    *   **Fields**: `deletedAt`, `deletedBy`, `deleteReason`.
    *   **Rule**: Always filter `where: { deletedAt: null }` unless explicitly querying for archived data.

## 3. Database Operations

**Commands:**
*   **Generate Client**: `npm run prisma:generate` (updates `@prisma/client` after schema changes).
*   **Migrate**: `npm run prisma:migrate` (creates and applies SQL migrations).
    *   *Note*: In production/CI, use `npx prisma migrate deploy`.

**Constraints:**
*   **Invoice Sequence**: `InvoiceSequence` table manages unique invoice numbering per tenant per year.
*   **Audit Logging**: Any mutation to sensitive data (`Contract`, `User`, `Role`) **must** generate a corresponding `AuditLog` entry.

## 4. Special Fields
*   **`mfaSecret`** (User): Stores encrypted TOTP secret.
*   **`signatureEnvelopeId`** (Contract): External ID for e-signature providers (DocuSign/HelloSign).
*   **`visibility`** (MediaAsset): Controls access (`public`, `portal`, `private`).
