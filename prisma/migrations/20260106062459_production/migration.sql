/*
  Warnings:

  - You are about to drop the `ContractObligation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenewalAlert` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN "clientEmail" TEXT;
ALTER TABLE "Proposal" ADD COLUMN "content" TEXT;
ALTER TABLE "Proposal" ADD COLUMN "validUntil" DATETIME;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContractObligation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RenewalAlert";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ContractVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contractId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "content" TEXT,
    "status" TEXT NOT NULL,
    "changeLog" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    CONSTRAINT "ContractVersion_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'post',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "content" TEXT,
    "excerpt" TEXT,
    "authorId" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "signedBy" TEXT,
    "signedAt" DATETIME,
    "signatureUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contract_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contract" ("createdAt", "endDate", "id", "startDate", "status", "tenantId", "title", "updatedAt", "value") SELECT "createdAt", "endDate", "id", "startDate", "status", "tenantId", "title", "updatedAt", coalesce("value", 0) AS "value" FROM "Contract";
DROP TABLE "Contract";
ALTER TABLE "new_Contract" RENAME TO "Contract";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_status_idx" ON "Content"("status");

-- CreateIndex
CREATE INDEX "Content_type_idx" ON "Content"("type");

-- CreateIndex
CREATE INDEX "Content_authorId_idx" ON "Content"("authorId");
