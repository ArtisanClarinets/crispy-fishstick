/**
 * Vantus Systems - Verify Admin Bootstrap State (read-only)
 *
 * Usage (recommended):
 *   npx tsx scripts/verify-admin.ts
 *   npx tsx scripts/verify-admin.ts --email=admin@vantus.systems --password='...'
 *
 * Behavior:
 *   - Loads .env from project root (minimal dotenv parser)
 *   - Verifies the user exists
 *   - Verifies role assignments include Owner + Admin (if those roles exist)
 *   - Optionally verifies password hash if a password is provided (CLI or ADMIN_BOOTSTRAP_PASSWORD)
 */

import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
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
  const out: { email?: string; password?: string } = {};
  for (const a of argv.slice(2)) {
    if (a.startsWith("--email=")) out.email = a.split("=", 2)[1];
    if (a.startsWith("--password=")) out.password = a.split("=", 2)[1];
  }
  return out;
}

async function main() {
  loadDotEnv();
  const args = parseArgs(process.argv);

  const email = args.email || process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@vantus.systems";
  const password = args.password || process.env.ADMIN_BOOTSTRAP_PASSWORD; // optional

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        RoleAssignment: {
          include: { Role: true },
        },
      },
    });

    if (!user) {
      console.error(`❌ Admin user not found: ${email}`);
      process.exit(2);
    }

    console.log("✅ Admin user exists:", user.email);

    const roles = user.RoleAssignment?.map((r: any) => r.Role?.name).filter(Boolean) as string[];
    console.log("✅ Assigned roles:", roles.join(", ") || "(none)");

    // Role checks (only if roles exist in DB)
    const knownRoles = await prisma.role.findMany({ select: { name: true } });
    const roleNames = new Set(knownRoles.map((r) => r.name));

    if (roleNames.has("Owner")) {
      const hasOwner = roles.includes("Owner");
      console.log(hasOwner ? "✅ Has Owner role" : "❌ Missing Owner role");
      if (!hasOwner) process.exitCode = 2;
    } else {
      console.log("ℹ Role 'Owner' not present in DB (skipping check)");
    }

    if (roleNames.has("Admin")) {
      const hasAdmin = roles.includes("Admin");
      console.log(hasAdmin ? "✅ Has Admin role" : "❌ Missing Admin role");
      if (!hasAdmin) process.exitCode = 2;
    } else {
      console.log("ℹ Role 'Admin' not present in DB (skipping check)");
    }

    // Optional: verify password hash
    if (password) {
      if (!user.passwordHash) {
        console.log("❌ User has no passwordHash field set");
        process.exitCode = 2;
      } else {
        const ok = await bcrypt.compare(password, user.passwordHash);
        console.log(ok ? "✅ Password hash matches provided password" : "❌ Password hash does NOT match provided password");
        if (!ok) process.exitCode = 2;
      }
    } else {
      console.log("ℹ No password provided; skipping password-hash check.");
      console.log("  Tip: pass --password=... if you want to verify the seeded password.");
    }

    // Bootstrap safety reminder
    const bootstrapEnabled = (process.env.BOOTSTRAP_ACCOUNT_ENABLED || "true").toLowerCase() === "true";
    if (bootstrapEnabled) {
      console.log("");
      console.log("⚠ BOOTSTRAP_ACCOUNT_ENABLED=true");
      console.log("  After first login, disable bootstrap account creation in .env and restart the service.");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("❌ verify-admin failed:", err?.message || err);
  process.exit(1);
});
