import fs from "node:fs";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

let commit = "unknown";

try {
  commit =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    execSync("git rev-parse HEAD").toString().trim();
} catch (e) {
  console.warn("Could not determine git commit hash");
}

const builtAt = new Date().toISOString();

const pkgLock = fs.existsSync("package-lock.json")
  ? fs.readFileSync("package-lock.json")
  : Buffer.from("");

const depsSha256 = crypto
  .createHash("sha256")
  .update(pkgLock)
  .digest("hex");

const gatesConfigured = [
  "TypeScript strict",
  "ESLint enforced",
  "Vitest unit suite",
  "Playwright e2e suite",
  "Security headers active",
];

const gatesRan = gatesConfigured.map((name) => ({
  name,
  ran: false,
}));

const payload = {
  commit: commit.slice(0, 12),
  builtAt,
  depsSha256,
  generated: true,
  gatesConfigured,
  gatesRan,
};

fs.mkdirSync("public/proof", { recursive: true });
fs.writeFileSync("public/proof/build.json", JSON.stringify(payload, null, 2));
console.log("Wrote public/proof/build.json with commit:", payload.commit);
