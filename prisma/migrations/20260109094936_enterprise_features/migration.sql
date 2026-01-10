/*
  Warnings:

  - A unique constraint covering the columns `[userId,roleId,scope]` on the table `RoleAssignment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RoleAssignment_userId_roleId_key";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "RoleAssignment" ADD COLUMN "scope" TEXT DEFAULT '*';

-- AlterTable
ALTER TABLE "Service" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "WebhookEndpoint" ADD COLUMN "deletedAt" DATETIME;

-- CreateTable
CREATE TABLE "InvoiceSequence" (
    "tenantId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "lastSeq" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("tenantId", "year")
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "tenantId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "value" REAL NOT NULL DEFAULT 0,
    "content" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "signedBy" TEXT,
    "signedAt" DATETIME,
    "signatureUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Contract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contract" ("content", "createdAt", "endDate", "id", "signatureUrl", "signedAt", "signedBy", "startDate", "status", "tenantId", "title", "updatedAt", "value") SELECT "content", "createdAt", "endDate", "id", "signatureUrl", "signedAt", "signedBy", "startDate", "status", "tenantId", "title", "updatedAt", "value" FROM "Contract";
DROP TABLE "Contract";
ALTER TABLE "new_Contract" RENAME TO "Contract";
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
    "year" INTEGER NOT NULL DEFAULT 2024,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Invoice_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("createdAt", "currency", "dueDate", "id", "issueDate", "notes", "number", "status", "tenantId", "totalAmount", "updatedAt") SELECT "createdAt", "currency", "dueDate", "id", "issueDate", "notes", "number", "status", "tenantId", "totalAmount", "updatedAt" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");
CREATE UNIQUE INDEX "Invoice_tenantId_year_sequence_key" ON "Invoice"("tenantId", "year", "sequence");
CREATE TABLE "new_MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT,
    "tenantId" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MediaAsset" ("createdAt", "id", "key", "mime", "size", "tenantId", "uploadedBy", "url") SELECT "createdAt", "id", "key", "mime", "size", "tenantId", "uploadedBy", "url" FROM "MediaAsset";
DROP TABLE "MediaAsset";
ALTER TABLE "new_MediaAsset" RENAME TO "MediaAsset";
CREATE UNIQUE INDEX "MediaAsset_key_key" ON "MediaAsset"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "RoleAssignment_userId_roleId_scope_key" ON "RoleAssignment"("userId", "roleId", "scope");
