/**
 * Vantus Systems - Reset MFA for a user (admin operation)
 *
 * Usage (recommended):
 *   npx tsx scripts/reset-mfa.ts --email=user@example.com --yes
 *
 * Safety:
 *   - Requires --yes to actually perform the reset (prevents accidental runs).
 *   - Loads .env from project root so DATABASE_URL works.
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
  const out: { email?: string; yes: boolean } = { yes: false };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--email=")) out.email = a.split("=", 2)[1];
    if (a === "--yes") out.yes = true;
  }
  return out;
}

async function main() {
  loadDotEnv();
  const args = parseArgs(process.argv);

  const email = args.email || process.env.ADMIN_BOOTSTRAP_EMAIL;
  if (!email) {
    console.error("❌ Missing --email=... and ADMIN_BOOTSTRAP_EMAIL not set");
    process.exit(2);
  }
  if (!args.yes) {
    console.error("❌ Refusing to reset MFA without --yes");
    process.exit(2);
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(2);
    }

    await prisma.user.update({
      where: { email },
      data: {
        mfaEnabled: false,
        mfaSecret: null,
        mfaRecoveryCodes: null,
        mfaSetupAt: null,
        mfaLastUsedAt: null,
      },
    });

    console.log(`✅ MFA reset for: ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("❌ reset-mfa failed:", err?.message || err);
  process.exit(1);
});
