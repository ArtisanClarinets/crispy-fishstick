/**
 * Vantus Systems - Permission Inspector (read-only)
 *
 * Usage (recommended):
 *   npx tsx scripts/check-permissions.ts --email admin@vantus.systems
 *   npx tsx scripts/check-permissions.ts --role Owner
 *
 * Notes:
 *  - Loads .env from project root (minimal dotenv parser) so DATABASE_URL works.
 */

import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

function loadDotEnv(dotenvPath = path.join(process.cwd(), ".env")): void {
  if (!fs.existsSync(dotenvPath)) return;
  const content = fs.readFileSync(dotenvPath, "utf8");
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const cleaned = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = cleaned.indexOf("=");
    if (eq === -1) continue;
    const key = cleaned.slice(0, eq).trim();
    let val = cleaned.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function parseArgs(argv: string[]) {
  const out: { email?: string; role?: string } = {};
  for (const a of argv.slice(2)) {
    if (a.startsWith("--email=")) out.email = a.split("=", 2)[1];
    if (a.startsWith("--role=")) out.role = a.split("=", 2)[1];
  }
  return out;
}

async function main() {
  loadDotEnv();

  const args = parseArgs(process.argv);

  const prisma = new PrismaClient();

  try {
    if (args.email) {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!user) {
        console.error(`❌ User not found: ${args.email}`);
        process.exitCode = 2;
        return;
      }

      console.log(`\nUser: ${user.email}`);
      console.log(`Roles: ${user.roles.map((r) => r.role.name).join(", ") || "(none)"}`);

      for (const assignment of user.roles) {
        const role = await prisma.role.findUnique({ where: { id: assignment.roleId } });
        if (!role) continue;
        let perms: unknown = role.permissions;

        // role.permissions may be stored as JSON string
        if (typeof perms === "string") {
          try {
            perms = JSON.parse(perms);
          } catch {
            perms = [];
          }
        }

        console.log(`\nRole: ${role.name}`);
        console.log("Permissions:", Array.isArray(perms) ? perms.join(", ") : "(unreadable)");
      }

      return;
    }

    const roleName = args.role || "Owner";
    const role = await prisma.role.findUnique({ where: { name: roleName } });

    if (!role) {
      console.error(`❌ Role not found: ${roleName}`);
      process.exitCode = 2;
      return;
    }

    let permissions: unknown = role.permissions;
    if (typeof permissions === "string") {
      try {
        permissions = JSON.parse(permissions);
      } catch {
        permissions = [];
      }
    }

    console.log(`\nRole: ${role.name}`);
    console.log("Permissions:", Array.isArray(permissions) ? permissions.join(", ") : "(unreadable)");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("❌ check-permissions failed:", err?.message || err);
  process.exit(1);
});
