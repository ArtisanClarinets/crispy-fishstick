/**
 * Vantus Systems - Environment Setup (Hardened)
 * - Supports env.example OR .env.example templates
 * - Safe env parsing + stable writing
 * - Production mode auto-generates required secrets if missing
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const readline = require("readline");

const envPath = path.join(process.cwd(), ".env");

const exampleCandidates = [
  path.join(process.cwd(), ".env.example"),
  path.join(process.cwd(), "env.example"),
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((resolve) => rl.question(q, resolve));

const isRootUser = typeof process.getuid === "function" ? process.getuid() === 0 : false;
const defaultDatabaseUrl = isRootUser ? "file:/var/lib/vantus/prod.db" : "file:./prisma/dev.db";
const defaultDatabaseInfo = isRootUser
  ? "Production default: file:/var/lib/vantus/prod.db (ensure /var/lib/vantus is writable by the vantus user)."
  : "Development default: file:./prisma/dev.db (relative to this repo). Switch to file:/var/lib/vantus/prod.db or your Postgres DSN when deploying.";

// base64url helper (safer than base64 for env usage)
function base64url(buf) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function generateSecret(bytes = 32) {
  return base64url(crypto.randomBytes(bytes));
}

function generateMFAKey() {
  // 32-byte hex key for libsodium encryption
  return crypto.randomBytes(32).toString("hex");
}

function parseEnv(content) {
  // Handles KEY=VALUE, export KEY=VALUE, quoted strings, ignores comments/blank lines.
  const out = {};
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const normalized = line.startsWith("export ") ? line.slice(7).trim() : line;
    const idx = normalized.indexOf("=");
    if (idx === -1) continue;

    const key = normalized.slice(0, idx).trim();
    let value = normalized.slice(idx + 1).trim();

    // Strip surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }
  return out;
}

function escapeEnvValue(v) {
  return String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n");
}

function upsertEnvLine(content, key, value) {
  const safe = `${key}="${escapeEnvValue(value)}"`;
  const lines = content.split(/\r?\n/);
  const re = new RegExp(`^(export\\s+)?${key}\\s*=`, "i");

  let replaced = false;
  const next = lines.map((line) => {
    if (re.test(line)) {
      replaced = true;
      return safe;
    }
    return line;
  });

  if (!replaced) {
    if (next.length && next[next.length - 1].trim() !== "") next.push("");
    next.push(safe);
  }

  return next.join("\n");
}

async function askYesNo(query, defaultYes = true) {
  const suffix = defaultYes ? " (Y/n)" : " (y/N)";
  const response = (await question(query + suffix + " ")).trim().toLowerCase();
  if (!response) return defaultYes;
  if (defaultYes) return response !== "n";
  return response === "y";
}

function pickExamplePath() {
  for (const p of exampleCandidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  console.log("🚀 Vantus Systems - Production Environment Setup\n");
  console.log("This interactive setup will configure all environment variables for production.\n");

  let envContent = "";
  let currentEnv = {};

  const prodEnvPath = "/etc/default/vantus";
  const checkPath = fs.existsSync(prodEnvPath) ? prodEnvPath : envPath;

  if (fs.existsSync(checkPath)) {
    console.log(`✅ Found existing environment file: ${checkPath}`);
    const shouldLoad = await askYesNo("Load existing values?", true);
    if (shouldLoad) {
      envContent = fs.readFileSync(checkPath, "utf8");
      currentEnv = parseEnv(envContent);
    }
  } else {
    console.log("⚠️  No existing .env file found. Creating new configuration...");
    const examplePath = pickExamplePath();
    if (examplePath) {
      envContent = fs.readFileSync(examplePath, "utf8");
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("                    REQUIRED CONFIGURATION");
  console.log("═══════════════════════════════════════════════════════════════\n");

  const requiredKeys = [
    {
      key: "NODE_ENV",
      description: "Environment mode",
      default: "production",
      options: ["production", "development"],
    },
    {
      key: "PORT",
      description: "Port for Next.js server",
      default: "3005",
      validate: (val) => (/^\d+$/.test(val) ? null : "PORT must be numeric"),
    },
    {
      key: "DEPLOY_DOMAIN",
      description: "Primary domain (without www)",
      default: "vantus.systems",
      validate: (val) => {
        if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(val)) {
          return "Please enter a valid domain (e.g., vantus.systems)";
        }
        return null;
      },
    },
    {
      key: "NEXTAUTH_URL",
      description: "Full canonical URL of your site",
      default: "https://vantus.systems",
      derived: (env) => {
        const domain = env["DEPLOY_DOMAIN"] || "vantus.systems";
        return `https://${domain}`;
      },
    },
    {
      key: "DATABASE_URL",
      description: "Database connection string",
      default: defaultDatabaseUrl,
      info: `${defaultDatabaseInfo}\nFor PostgreSQL: postgresql://user:pass@localhost:5432/dbname`,
    },
  ];

  console.log("📋 Core Application Settings:\n");

  let newEnvContent = envContent;

  for (const item of requiredKeys) {
    let value = currentEnv[item.key];

    if (value && value !== "generate-me-in-production" && value !== "generate-me-in-production-must-be-secure") {
      console.log(`   ✓ ${item.key}: ${String(value).substring(0, 50)}${String(value).length > 50 ? "..." : ""}`);
      continue;
    }

    console.log(`\n📝 ${item.key}:`);
    console.log(`   ${item.description}`);
    if (item.info) console.log(`   ℹ️  ${item.info}`);

    if (item.derived) {
      const derivedValue = item.derived(currentEnv);
      const useDerived = await askYesNo(`   Use derived value: ${derivedValue}?`, true);
      if (useDerived) value = derivedValue;
    }

    if (!value) {
      if (item.options) console.log(`   Options: ${item.options.join(", ")}`);
      const userValue = await question(`   👉 Enter value (default: ${item.default}): `);
      value = userValue.trim() || item.default;
    }

    if (item.validate) {
      const err = item.validate(value);
      if (err) {
        console.log(`   ❌ ${err}`);
        const retry = await question("   👉 Enter value again: ");
        value = retry.trim() || item.default;
      }
    }

    currentEnv[item.key] = value;
    newEnvContent = upsertEnvLine(newEnvContent, item.key, value);
  }

  const productionMode = currentEnv["NODE_ENV"] === "production";

  // Production defaults (non-interactive hardening)
  if (productionMode) {
    if (!currentEnv["LOG_LEVEL"]) {
      currentEnv["LOG_LEVEL"] = "error";
      newEnvContent = upsertEnvLine(newEnvContent, "LOG_LEVEL", "error");
    }

    const criticalSecrets = [
      { key: "NEXTAUTH_SECRET", gen: () => generateSecret(32) },
      { key: "MFA_ENCRYPTION_KEY", gen: () => generateMFAKey() },
      { key: "CSRF_SECRET", gen: () => generateSecret(32) },
      { key: "CRON_SECRET", gen: () => generateSecret(32) },
      { key: "SESSION_ENCRYPTION_KEY", gen: () => generateSecret(32) },
    ];

    for (const s of criticalSecrets) {
      const existing = currentEnv[s.key];
      if (!existing || existing === "generate-me-in-production" || existing === "generate-me-in-production-must-be-secure") {
        console.log(`Generating secure secret for ${s.key}...`);
        const generated = s.gen();
        currentEnv[s.key] = generated;
        newEnvContent = upsertEnvLine(newEnvContent, s.key, generated);
      }
    }

    // Strong admin bootstrap password if missing/weak
    const pw = currentEnv["ADMIN_BOOTSTRAP_PASSWORD"];
    if (!pw || pw === "admin") {
      const strongPassword = generateSecret(24);
      currentEnv["ADMIN_BOOTSTRAP_PASSWORD"] = strongPassword;
      console.log(`Generated strong initial ADMIN_BOOTSTRAP_PASSWORD for production: ${strongPassword}`);
      newEnvContent = upsertEnvLine(newEnvContent, "ADMIN_BOOTSTRAP_PASSWORD", strongPassword);
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("                 ADMIN ACCOUNT CONFIGURATION");
  console.log("═══════════════════════════════════════════════════════════════\n");

  const adminKeys = [
    {
      key: "ADMIN_BOOTSTRAP_EMAIL",
      description: "Admin user email for initial setup",
      default: "admin@vantus.systems",
      required: true,
    },
    {
      key: "ADMIN_BOOTSTRAP_PASSWORD",
      description: "Admin user password (change after first login!)",
      default: "",
      required: true,
      secure: true,
    },
  ];

  for (const item of adminKeys) {
    let value = currentEnv[item.key];

    // If prod mode auto-generated password already, don't prompt again.
    const shouldPrompt =
      !value ||
      (!productionMode && (value === "admin" || value === "admin@vantus.com")) ||
      (item.key === "ADMIN_BOOTSTRAP_EMAIL" && value === "admin@vantus.com");

    if (shouldPrompt) {
      console.log(`\n👤 ${item.key}:`);
      console.log(`   ${item.description}`);
      if (item.secure) console.log("   ⚠️  Use a strong password - you can change it after first login");

      const userValue = await question(
        `   👉 Enter ${item.key} ${item.default ? `(default: ${item.default})` : ""}: `
      );
      value = userValue.trim() || item.default;

      if (!value && item.required) {
        console.log("   ❌ This field is required!");
        value = (await question("   👉 Enter value: ")).trim();
      }
    } else {
      console.log(`   ✓ ${item.key}: ${item.secure ? "[set]" : value}`);
    }

    currentEnv[item.key] = value;
    newEnvContent = upsertEnvLine(newEnvContent, item.key, value);
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("              OPTIONAL FEATURES (Press Enter to skip)");
  console.log("═══════════════════════════════════════════════════════════════\n");

  const optionalKeys = [
    { key: "REDIS_URL", description: "Redis connection for caching/rate limiting", info: "Example: redis://localhost:6379" },
    { key: "AWS_REGION", description: "AWS region for S3 media uploads", info: "Example: us-east-1" },
    { key: "AWS_ACCESS_KEY_ID", description: "AWS access key for S3" },
    { key: "AWS_SECRET_ACCESS_KEY", description: "AWS secret key for S3", secure: true },
    { key: "S3_BUCKET_NAME", description: "S3 bucket name for media storage" },
  ];

  for (const item of optionalKeys) {
    let value = currentEnv[item.key];

    if (!value) {
      const shouldConfigure = await askYesNo(`\nConfigure ${item.key}?`, false);
      if (shouldConfigure) {
        console.log(`   ${item.description}`);
        if (item.info) console.log(`   ℹ️  ${item.info}`);
        value = (await question("   👉 Enter value: ")).trim();
      }
    } else {
      console.log(`   ✓ ${item.key}: ${item.secure ? "[set]" : value}`);
    }

    if (value) {
      currentEnv[item.key] = value;
      newEnvContent = upsertEnvLine(newEnvContent, item.key, value);
    }
  }

  console.log("\n═══════════════════════════════════════════════════════════════");
  console.log("                    SAVING CONFIGURATION");
  console.log("═══════════════════════════════════════════════════════════════\n");

  fs.writeFileSync(envPath, newEnvContent.trim() + "\n", { mode: 0o600 });
  try { fs.chmodSync(envPath, 0o600); } catch {}
  console.log(`✅ Environment configuration saved to: ${envPath}`);

  console.log("\n📊 Configuration Summary:");
  console.log(`   Domain: ${currentEnv["DEPLOY_DOMAIN"]}`);
  console.log(`   URL: ${currentEnv["NEXTAUTH_URL"]}`);
  console.log(`   Database: ${currentEnv["DATABASE_URL"]}`);
  console.log(`   Admin Email: ${currentEnv["ADMIN_BOOTSTRAP_EMAIL"]}`);
  console.log(`   Port: ${currentEnv["PORT"]}`);

  if (currentEnv["DATABASE_URL"] && String(currentEnv["DATABASE_URL"]).startsWith("file:")) {
    console.log("\n⚠️  Using SQLite database. Make sure to:");
    console.log("   1. Run database migrations: npx prisma migrate deploy");
    console.log("   2. Seed admin user: npx prisma db seed");
  }

  console.log("\n✅ Setup complete! Next steps:");
  console.log("   1. Review the generated .env file");
  console.log("   2. Run: npm install");
  console.log("   3. Run: npx prisma generate");
  console.log("   4. Run: npx prisma migrate deploy");
  console.log("   5. Run: npx prisma db seed");
  console.log("   6. Run: npm run build");
  console.log("   7. Start the server: npm start\n");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  try { rl.close(); } catch {}
  process.exit(1);
});
