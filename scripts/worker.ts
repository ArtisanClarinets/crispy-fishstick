/**
 * Vantus Systems - Background Worker Entrypoint
 *
 * Usage (recommended):
 *   npx tsx scripts/worker.ts
 *
 * Notes:
 *  - Loads .env from project root
 *  - Handles SIGTERM/SIGINT for clean shutdown
 *  - Logs unhandled exceptions and rejections
 */

import fs from "node:fs";
import path from "node:path";
import { startWorker } from "../lib/jobs/worker";

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

async function main() {
  loadDotEnv();

  process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled promise rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught exception:", err);
    process.exit(1);
  });

  console.log("🔧 Starting worker...");
  const worker = await startWorker();

  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down worker...`);
    try {
      await worker.close();
      console.log("✅ Worker stopped gracefully");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error during worker shutdown:", err);
      process.exit(1);
    }
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  console.log("✅ Worker started");
}

main().catch((err) => {
  console.error("❌ Worker failed to start:", err?.message || err);
  process.exit(1);
});
