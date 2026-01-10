/*
  Warnings:

  - Added the required column `originalName` to the `MediaAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT,
    "tenantId" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
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
INSERT INTO "new_MediaAsset" ("checksum", "contentDisposition", "contentType", "createdAt", "deleteReason", "deletedAt", "deletedBy", "expiresAt", "id", "key", "mime", "size", "storageKey", "tenantId", "uploadedBy", "url", "visibility") SELECT "checksum", "contentDisposition", "contentType", "createdAt", "deleteReason", "deletedAt", "deletedBy", "expiresAt", "id", "key", "mime", "size", "storageKey", "tenantId", "uploadedBy", "url", "visibility" FROM "MediaAsset";
DROP TABLE "MediaAsset";
ALTER TABLE "new_MediaAsset" RENAME TO "MediaAsset";
CREATE UNIQUE INDEX "MediaAsset_key_key" ON "MediaAsset"("key");
CREATE INDEX "MediaAsset_deletedAt_idx" ON "MediaAsset"("deletedAt");
CREATE INDEX "MediaAsset_tenantId_idx" ON "MediaAsset"("tenantId");
CREATE INDEX "MediaAsset_visibility_idx" ON "MediaAsset"("visibility");
CREATE TABLE "new_Proposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "totalAmount" REAL NOT NULL DEFAULT 0,
    "clientEmail" TEXT,
    "content" TEXT,
    "validUntil" DATETIME,
    "deletedAt" DATETIME,
    "deletedBy" TEXT,
    "deleteReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Proposal_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposal" ("clientEmail", "content", "createdAt", "deleteReason", "deletedAt", "deletedBy", "id", "status", "title", "totalAmount", "updatedAt", "validUntil") SELECT "clientEmail", "content", "createdAt", "deleteReason", "deletedAt", "deletedBy", "id", "status", "title", "totalAmount", "updatedAt", "validUntil" FROM "Proposal";
DROP TABLE "Proposal";
ALTER TABLE "new_Proposal" RENAME TO "Proposal";
CREATE INDEX "Proposal_deletedAt_idx" ON "Proposal"("deletedAt");
CREATE INDEX "Proposal_status_idx" ON "Proposal"("status");
CREATE INDEX "Proposal_tenantId_idx" ON "Proposal"("tenantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
