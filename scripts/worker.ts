#!/usr/bin/env node
/**
 * Job worker entrypoint
 * Run as a separate process: node scripts/worker.ts
 */

import { startWorker } from "../lib/jobs/worker";
import { initQueues, closeQueues } from "../lib/jobs/queue";

async function main() {
  console.log("[Worker] Initializing...");
  
  await initQueues();
  await startWorker();
  
  // Graceful shutdown handlers
  const shutdown = async () => {
    console.log("[Worker] Shutting down gracefully...");
    await closeQueues();
    process.exit(0);
  };
  
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((error) => {
  console.error("[Worker] Fatal error:", error);
  process.exit(1);
});
