/**
 * Vantus Systems - Permission Manager (safe writes)
 *
 * Usage (recommended):
 *   npx tsx scripts/update-permissions.ts --role=Owner --add=users:read
 *   npx tsx scripts/update-permissions.ts --role=Owner --remove=users:delete
 *
 * Notes:
 *  - Loads .env from project root so DATABASE_URL works.
 *  - Stores role.permissions as a JSON string (array) if the column is string-based.
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
  const out: { role: string; add?: string; remove?: string } = { role: "Owner" };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--role=")) out.role = a.split("=", 2)[1];
    else if (a.startsWith("--add=")) out.add = a.split("=", 2)[1];
    else if (a.startsWith("--remove=")) out.remove = a.split("=", 2)[1];
  }
  return out;
}

function normalizePerm(p: string): string {
  return p.trim();
}

function parsePermissions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // Fall through: treat as comma-separated list
      return raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

async function main() {
  loadDotEnv();

  const args = parseArgs(process.argv);
  if (!!args.add === !!args.remove) {
    console.error("❌ You must specify exactly one of --add=PERM or --remove=PERM");
    process.exit(2);
  }

  const prisma = new PrismaClient();

  try {
    const role = await prisma.role.findUnique({ where: { name: args.role } });
    if (!role) {
      console.error(`❌ Role not found: ${args.role}`);
      process.exit(2);
    }

    const current = parsePermissions(role.permissions);
    const before = new Set(current.map(normalizePerm).filter(Boolean));

    if (args.add) {
      const perm = normalizePerm(args.add);
      if (!perm) {
        console.error("❌ Empty permission string");
        process.exit(2);
      }
      before.add(perm);
    }

    if (args.remove) {
      const perm = normalizePerm(args.remove);
      if (!perm) {
        console.error("❌ Empty permission string");
        process.exit(2);
      }
      before.delete(perm);
    }

    const updated = Array.from(before).sort((a, b) => a.localeCompare(b));

    // Preserve type of role.permissions (string vs json-like)
    const newValue = typeof role.permissions === "string" ? JSON.stringify(updated) : (updated as any);

    await prisma.role.update({
      where: { id: role.id },
      data: { permissions: newValue },
    });

    console.log(`✅ Updated role: ${role.name}`);
    console.log(`Permissions (${updated.length}): ${updated.join(", ")}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("❌ update-permissions failed:", err?.message || err);
  process.exit(1);
});
