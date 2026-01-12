#!/usr/bin/env node
/**
 * postinstall hook (production-safe)
 *
 * - Validates Node version range (warn only)
 * - Generates build proof artifact (non-fatal in CI if filesystem is read-only)
 */

const { execSync } = require("child_process");

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function semverMajor(v) {
  const m = String(v).match(/^v?(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]) };
}

try {
  const version = semverMajor(process.version);
  if (version && (version.major < 20 || (version.major === 20 && version.minor < 9))) {
    console.warn(`⚠ Node ${process.version} detected. Recommended Node 20.9+ for Next.js 16.`);
  }

  // Generate build proof if script exists (do not hard-fail install if missing)
  try {
    run("node scripts/generate-build-proof.mjs");
  } catch (e) {
    console.warn("⚠ build-proof generation failed (continuing):", e?.message || e);
  }
} catch (err) {
  console.error("postinstall failed:", err?.message || err);
  process.exit(1);
}
