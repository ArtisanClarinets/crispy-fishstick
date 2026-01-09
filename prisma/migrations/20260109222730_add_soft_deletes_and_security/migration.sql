/*
  Warnings:

  - You are about to drop the column `sequence` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Invoice` table. All the data in the column will be lost.
  - The primary key for the `InvoiceSequence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `InvoiceSequence` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `MediaAsset` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `RoleAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `WebhookEndpoint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN "diff" TEXT;
ALTER TABLE "AuditLog" ADD COLUMN "origin" TEXT;
ALTER TABLE "AuditLog" ADD COLUMN "referer" TEXT;
ALTER TABLE "AuditLog" ADD COLUMN "requestId" TEXT;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Content" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Contract" ADD COLUMN "deletedBy" TEXT;
ALTER TABLE "Contract" ADD COLUMN "signatureCompletedAt" DATETIME;
ALTER TABLE "Contract" ADD COLUMN "signatureEnvelopeId" TEXT;
ALTER TABLE "Contract" ADD COLUMN "signatureProvider" TEXT;
ALTER TABLE "Contract" ADD COLUMN "signatureStatus" TEXT;

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Incident" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "Incident" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Lead" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Project" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Proposal" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "ProposalComponent" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "ProposalComponent" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "ProposalComponent" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Service" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "Tenant" ADD COLUMN "deletedBy" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "deleteReason" TEXT;
ALTER TABLE "User" ADD COLUMN "deletedBy" TEXT;

-- CreateTable
CREATE TABLE "IdempotencyKey" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    "responseBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "issueDate" DATETIME NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "totalAmount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "notes" TEXT,
    "deletedAt" DATETIME,
    "deletedBy" TEXT,
    "deleteReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Invoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("createdAt", "currency", "deletedAt", "dueDate", "id", "issueDate", "notes", "number", "status", "tenantId", "totalAmount", "updatedAt") SELECT "createdAt", "currency", "deletedAt", "dueDate", "id", "issueDate", "notes", "number", "status", "tenantId", "totalAmount", "updatedAt" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
CREATE INDEX "Invoice_deletedAt_idx" ON "Invoice"("deletedAt");
CREATE INDEX "Invoice_tenantId_idx" ON "Invoice"("tenantId");
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");
CREATE TABLE "new_InvoiceSequence" (
    "tenantId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "lastSeq" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "InvoiceSequence_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InvoiceSequence" ("lastSeq", "tenantId", "year") SELECT "lastSeq", "tenantId", "year" FROM "InvoiceSequence";
DROP TABLE "InvoiceSequence";
ALTER TABLE "new_InvoiceSequence" RENAME TO "InvoiceSequence";
CREATE UNIQUE INDEX "InvoiceSequence_tenantId_year_key" ON "InvoiceSequence"("tenantId", "year");
CREATE TABLE "new_MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT,
    "tenantId" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "storageKey" TEXT,
    "checksum" TEXT,
    "contentType" TEXT,
    "contentDisposition" TEXT,
    "expiresAt" DATETIME,
    "deletedAt" DATETIME,
    "deletedBy" TEXT,
    "deleteReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MediaAsset" ("createdAt", "id", "key", "mime", "size", "tenantId", "uploadedBy", "url") SELECT "createdAt", "id", "key", "mime", "size", "tenantId", "uploadedBy", "url" FROM "MediaAsset";
DROP TABLE "MediaAsset";
ALTER TABLE "new_MediaAsset" RENAME TO "MediaAsset";
CREATE UNIQUE INDEX "MediaAsset_key_key" ON "MediaAsset"("key");
CREATE INDEX "MediaAsset_deletedAt_idx" ON "MediaAsset"("deletedAt");
CREATE INDEX "MediaAsset_tenantId_idx" ON "MediaAsset"("tenantId");
CREATE INDEX "MediaAsset_visibility_idx" ON "MediaAsset"("visibility");
CREATE TABLE "new_RoleAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "scopeType" TEXT NOT NULL DEFAULT 'GLOBAL',
    "scopeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RoleAssignment_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RoleAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RoleAssignment" ("createdAt", "id", "roleId", "userId") SELECT "createdAt", "id", "roleId", "userId" FROM "RoleAssignment";
DROP TABLE "RoleAssignment";
ALTER TABLE "new_RoleAssignment" RENAME TO "RoleAssignment";
CREATE INDEX "RoleAssignment_scopeType_scopeId_idx" ON "RoleAssignment"("scopeType", "scopeId");
CREATE UNIQUE INDEX "RoleAssignment_userId_roleId_scopeType_scopeId_key" ON "RoleAssignment"("userId", "roleId", "scopeType", "scopeId");
CREATE TABLE "new_TimeEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "hours" REAL NOT NULL,
    "description" TEXT,
    "billable" BOOLEAN NOT NULL DEFAULT true,
    "invoiceId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "approvedBy" TEXT,
    "approvedAt" DATETIME,
    "deletedAt" DATETIME,
    "deletedBy" TEXT,
    "deleteReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TimeEntry_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TimeEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TimeEntry_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimeEntry" ("billable", "createdAt", "date", "description", "hours", "id", "invoiceId", "projectId", "userId") SELECT "billable", "createdAt", "date", "description", "hours", "id", "invoiceId", "projectId", "userId" FROM "TimeEntry";
DROP TABLE "TimeEntry";
ALTER TABLE "new_TimeEntry" RENAME TO "TimeEntry";
CREATE INDEX "TimeEntry_deletedAt_idx" ON "TimeEntry"("deletedAt");
CREATE INDEX "TimeEntry_status_idx" ON "TimeEntry"("status");
CREATE INDEX "TimeEntry_projectId_idx" ON "TimeEntry"("projectId");
CREATE INDEX "TimeEntry_userId_idx" ON "TimeEntry"("userId");
CREATE INDEX "TimeEntry_invoiceId_idx" ON "TimeEntry"("invoiceId");
CREATE TABLE "new_WebhookEndpoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secret" TEXT,
    "events" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WebhookEndpoint_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WebhookEndpoint" ("active", "createdAt", "events", "id", "secret", "tenantId", "url") SELECT "active", "createdAt", "events", "id", "secret", "tenantId", "url" FROM "WebhookEndpoint";
DROP TABLE "WebhookEndpoint";
ALTER TABLE "new_WebhookEndpoint" RENAME TO "WebhookEndpoint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "IdempotencyKey_userId_idx" ON "IdempotencyKey"("userId");

-- CreateIndex
CREATE INDEX "IdempotencyKey_expiresAt_idx" ON "IdempotencyKey"("expiresAt");

-- CreateIndex
CREATE INDEX "AuditLog_requestId_idx" ON "AuditLog"("requestId");

-- CreateIndex
CREATE INDEX "Content_deletedAt_idx" ON "Content"("deletedAt");

-- CreateIndex
CREATE INDEX "Contract_deletedAt_idx" ON "Contract"("deletedAt");

-- CreateIndex
CREATE INDEX "Contract_tenantId_idx" ON "Contract"("tenantId");

-- CreateIndex
CREATE INDEX "Incident_deletedAt_idx" ON "Incident"("deletedAt");

-- CreateIndex
CREATE INDEX "Incident_status_idx" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "Lead_deletedAt_idx" ON "Lead"("deletedAt");

-- CreateIndex
CREATE INDEX "Project_deletedAt_idx" ON "Project"("deletedAt");

-- CreateIndex
CREATE INDEX "Project_tenantId_idx" ON "Project"("tenantId");

-- CreateIndex
CREATE INDEX "Proposal_deletedAt_idx" ON "Proposal"("deletedAt");

-- CreateIndex
CREATE INDEX "Proposal_status_idx" ON "Proposal"("status");

-- CreateIndex
CREATE INDEX "ProposalComponent_deletedAt_idx" ON "ProposalComponent"("deletedAt");

-- CreateIndex
CREATE INDEX "Service_deletedAt_idx" ON "Service"("deletedAt");

-- CreateIndex
CREATE INDEX "Tenant_deletedAt_idx" ON "Tenant"("deletedAt");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");
