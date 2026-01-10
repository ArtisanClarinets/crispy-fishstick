import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

let prisma: PrismaClient | null = null;

async function ensureSqliteFileWritable() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !databaseUrl.startsWith("file:")) {
    return;
  }

  const sqlitePath = databaseUrl.replace(/^file:/, "");
  if (!sqlitePath) {
    throw new Error("DATABASE_URL must include a file path after the file: protocol.");
  }

  const resolvedPath = path.resolve(sqlitePath);
  const dir = path.dirname(resolvedPath);

  await fs.mkdir(dir, { recursive: true });

  try {
    const handle = await fs.open(resolvedPath, "a");
    await handle.close();
  } catch (error) {
    console.warn(`⚠️  Unable to open sqlite file at ${resolvedPath}: ${(error as Error).message}`);
    throw error;
  }
}

async function main() {
  await ensureSqliteFileWritable();
  prisma = new PrismaClient();

  if (!process.env.ADMIN_BOOTSTRAP_EMAIL || !process.env.ADMIN_BOOTSTRAP_PASSWORD) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing required environment variables for seeding in production: ADMIN_BOOTSTRAP_EMAIL, ADMIN_BOOTSTRAP_PASSWORD");
    }
    console.warn("WARNING: Using default insecure credentials for seeding. Do NOT use this in production.");
  }

  const email = process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@vantus.com";
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin";

  const passwordHash = await bcrypt.hash(password, 10);

  // 1. Create Roles
  const roles = [
    {
      name: "Owner",
      permissions: [
        "admin.access",
        "leads.read", "leads.write",
        "media.read", "media.write",
        "audit.read", "audit.export",
        "users.read", "users.write",
        "roles.read", "roles.write",
        "jit.approve",
        "proposals.read", "proposals.write", "proposals.approve",
        "contracts.read", "contracts.write",
        "projects.read", "projects.write",
        "services.read", "services.write",
        "incidents.read", "incidents.write",
        "invoices.read", "invoices.write",
        "content.read", "content.write",
        "analytics.read",
        "settings.read", "settings.write",
        "webhooks.read", "webhooks.write"
      ],
    },
    {
      name: "Admin",
      permissions: [
        "admin.access",
        "leads.read", "leads.write",
        "media.read", "media.write",
        "audit.read",
        "proposals.read", "proposals.write",
        "contracts.read", "contracts.write",
        "projects.read", "projects.write",
        "services.read", "services.write",
        "incidents.read", "incidents.write"
      ],
    },
    {
      name: "Editor",
      permissions: [
        "admin.access",
        "leads.read",
        "media.read", "media.write",
        "proposals.read",
        "projects.read"
      ],
    },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: { permissions: JSON.stringify(r.permissions) },
      create: { name: r.name, permissions: JSON.stringify(r.permissions) },
    });
  }

  // 2. Create Default Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      name: "Default Tenant",
      slug: "default",
    },
  });

  // 3. Create Super Admin User
  const ownerRole = await prisma.role.findUnique({ where: { name: "Owner" } });

  if (ownerRole) {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
      },
      create: {
        email,
        name: "Super Admin",
        passwordHash,
        tenantId: tenant.id,
      },
    });

    const assignment = await prisma.roleAssignment.findUnique({
        where: { 
          userId_roleId_scopeType_scopeId: { 
            userId: user.id, 
            roleId: ownerRole.id,
            scopeType: "GLOBAL",
            scopeId: "",
          } 
        }
    });
    if (!assignment) {
        await prisma.roleAssignment.create({
            data: { 
              userId: user.id, 
              roleId: ownerRole.id,
              scopeType: "GLOBAL",
            }
        });
    }
  }

  console.log({ user: email });
}

main()
  .then(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  })
  .catch(async (e) => {
    console.error(e);
    if (prisma) {
      await prisma.$disconnect();
    }
    process.exit(1);
  });
