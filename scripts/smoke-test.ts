/**
 * Vantus Systems - Production Smoke Test
 *
 * Usage:
 *   npx tsx scripts/smoke-test.ts --base=https://vantus.systems
 *   npx tsx scripts/smoke-test.ts --base=http://127.0.0.1:3000
 *
 * Exit codes:
 *   0 = pass
 *   2 = fail (one or more critical checks failed)
 */

import fs from "node:fs";
import path from "node:path";

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
  const out: { base?: string } = {};
  for (const a of argv.slice(2)) {
    if (a.startsWith("--base=")) out.base = a.split("=", 2)[1];
  }
  return out;
}

function isOkStatus(s: number) {
  return s >= 200 && s < 400;
}

async function fetchCheck(url: string, critical = true) {
  const res = await fetch(url, {
    method: "GET",
    redirect: "manual",
    headers: {
      "User-Agent": "vantus-smoke-test/1.0",
      Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
    },
  });

  const ok = isOkStatus(res.status);
  return { url, status: res.status, ok, critical };
}

async function main() {
  loadDotEnv();
  const args = parseArgs(process.argv);

  const base =
    args.base ||
    process.env.SMOKE_TEST_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    `http://127.0.0.1:${process.env.PORT || "3000"}`;

  const targets: Array<{ path: string; critical: boolean }> = [
    { path: "/", critical: true },
    { path: "/api/auth/session", critical: true }, // NextAuth baseline
    { path: "/api/health", critical: false }, // optional if implemented
  ];

  console.log(`Running smoke test against: ${base}`);

  const results = [];
  for (const t of targets) {
    const url = new URL(t.path, base).toString();
    try {
      const r = await fetchCheck(url, t.critical);
      results.push(r);
      const icon = r.ok ? "✅" : (t.critical ? "❌" : "⚠");
      console.log(`${icon} ${r.status} ${url}`);
    } catch (err: any) {
      const icon = t.critical ? "❌" : "⚠";
      console.log(`${icon} ERR ${url} -> ${err?.message || err}`);
      results.push({ url, status: 0, ok: false, critical: t.critical });
    }
  }

  const criticalFailures = results.filter((r) => r.critical && !r.ok);
  if (criticalFailures.length) {
    console.error(`\n❌ Smoke test failed (${criticalFailures.length} critical checks).`);
    process.exit(2);
  }

  console.log("\n✅ Smoke test passed.");
}

main().catch((err) => {
  console.error("❌ smoke-test failed:", err?.message || err);
  process.exit(1);
});
