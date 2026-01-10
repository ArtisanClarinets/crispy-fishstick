/*
  Warnings:

  - Made the column `storageKey` on table `MediaAsset` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "originalName" TEXT,
    "url" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT,
    "tenantId" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'PRIVATE',
    "storageKey" TEXT NOT NULL,
    "checksum" TEXT,
    "contentType" TEXT,
    "contentDisposition" TEXT,
    "expiresAt" DATETIME,
    "deletedAt" DATETIME,
    "deletedBy" TEXT,
    "deleteReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MediaAsset" ("checksum", "contentDisposition", "contentType", "createdAt", "deleteReason", "deletedAt", "deletedBy", "expiresAt", "id", "key", "mime", "originalName", "size", "storageKey", "tenantId", "uploadedBy", "url", "visibility") SELECT "checksum", "contentDisposition", "contentType", "createdAt", "deleteReason", "deletedAt", "deletedBy", "expiresAt", "id", "key", "mime", "originalName", "size", "storageKey", "tenantId", "uploadedBy", "url", "visibility" FROM "MediaAsset";
DROP TABLE "MediaAsset";
ALTER TABLE "new_MediaAsset" RENAME TO "MediaAsset";
CREATE UNIQUE INDEX "MediaAsset_storageKey_key" ON "MediaAsset"("storageKey");
CREATE INDEX "MediaAsset_deletedAt_idx" ON "MediaAsset"("deletedAt");
CREATE INDEX "MediaAsset_tenantId_idx" ON "MediaAsset"("tenantId");
CREATE INDEX "MediaAsset_visibility_idx" ON "MediaAsset"("visibility");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
