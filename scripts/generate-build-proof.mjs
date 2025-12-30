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

const gateResults = {
  "ESLint enforced": process.env.PROOF_GATE_LINT,
  "Vitest unit suite": process.env.PROOF_GATE_TEST,
  "Playwright e2e suite": process.env.PROOF_GATE_E2E,
};

const gatesRan = gatesConfigured.map((name) => {
  const result = gateResults[name];
  const ran = typeof result === "string";
  const passed = result === "success" || result === "passed" || result === "true";
  return {
    name,
    ran,
    ...(ran ? { passed } : {}),
  };
});

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
