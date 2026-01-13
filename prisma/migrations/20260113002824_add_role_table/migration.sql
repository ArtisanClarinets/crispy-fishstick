-- CreateTable
CREATE TABLE IF NOT EXISTS "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "permissions" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Role_name_key" ON "Role"("name");
