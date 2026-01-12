-- CreateTable
CREATE TABLE "InfraSku" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "basePriceMonthlyCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "specsJson" TEXT NOT NULL,
    "lifecycle" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InfraOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "skuId" TEXT NOT NULL,
    "groupKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "priceDeltaCents" INTEGER NOT NULL,
    "constraintsJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InfraOption_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "InfraSku" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InfraBuild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "skuSnapshotJson" TEXT NOT NULL,
    "optionsSnapshotJson" TEXT NOT NULL,
    "computedTotalsJson" TEXT NOT NULL,
    "leadId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InfraReservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InfraReservation_buildId_fkey" FOREIGN KEY ("buildId") REFERENCES "InfraBuild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "InfraSku_slug_key" ON "InfraSku"("slug");

-- CreateIndex
CREATE INDEX "InfraOption_skuId_idx" ON "InfraOption"("skuId");

-- CreateIndex
CREATE UNIQUE INDEX "InfraBuild_code_key" ON "InfraBuild"("code");

-- CreateIndex
CREATE INDEX "InfraBuild_code_idx" ON "InfraBuild"("code");

-- CreateIndex
CREATE INDEX "InfraBuild_expiresAt_idx" ON "InfraBuild"("expiresAt");

-- CreateIndex
CREATE INDEX "InfraReservation_buildId_idx" ON "InfraReservation"("buildId");

-- CreateIndex
CREATE INDEX "InfraReservation_expiresAt_idx" ON "InfraReservation"("expiresAt");
