import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads");

console.log(`Checking permissions for: ${uploadsDir}`);

if (fs.existsSync(uploadsDir)) {
  const stats = fs.statSync(uploadsDir);
  const mode = stats.mode & 0o777;
  console.log(`Current mode: ${mode.toString(8)}`);

  // Check if world writable (0o002)
  if ((mode & 0o002) !== 0) {
    console.error("ERROR: uploads directory is world-writable! Permissions should be restrictive (e.g., 750 or 700).");
    process.exit(1);
  }

  console.log("✅ Uploads directory permissions check passed.");
} else {
  console.log("ℹ️ Uploads directory does not exist. Skipping check.");
}
