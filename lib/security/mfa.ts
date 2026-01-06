import { randomBytes, createCipheriv, createDecipheriv, createHash } from "crypto";

const ALGORITHM = "aes-256-gcm";

// Get encryption key from env; fail in production if not set
function getMFAEncryptionKey(): string {
  const key = process.env.MFA_ENCRYPTION_KEY || process.env.NEXTAUTH_SECRET;
  
  if (process.env.NODE_ENV === "production" && !key) {
    throw new Error(
      "MFA_ENCRYPTION_KEY or NEXTAUTH_SECRET is required in production. Please set MFA_ENCRYPTION_KEY in your environment variables."
    );
  }
  
  if (!key) {
    console.warn("WARNING: No MFA encryption key configured. MFA will not work reliably.");
  }
  
  return key || "default-insecure-key-change-in-dev";
}

// Ensure key is 32 bytes
const key = createHash("sha256").update(String(getMFAEncryptionKey())).digest();

export async function encryptSecret(text: string): Promise<string> {
  const iv = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag();
  
  // Format: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

export async function decryptSecret(cipherText: string): Promise<string | null> {
  try {
    const parts = cipherText.split(":");
    if (parts.length !== 3) return null;
    
    const [ivHex, authTagHex, encryptedHex] = parts;
    
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    console.error("MFA Decryption failed:", error);
    return null;
  }
}
