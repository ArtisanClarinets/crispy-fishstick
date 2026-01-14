import { randomBytes, createCipheriv, createDecipheriv, createHash, createHmac } from "crypto";

const ALGORITHM = "aes-256-gcm";
const BACKUP_CODE_LENGTH = 10;
const BACKUP_CODE_COUNT = 8;
const RECOVERY_CODE_LENGTH = 12;
const RECOVERY_CODE_EXPIRATION_DAYS = 7;

// Get encryption key from env; fail in production if not set
function getMFAEncryptionKey(): string {
  const key = process.env.MFA_ENCRYPTION_KEY;
  
  if (process.env.NODE_ENV === "production" && !key) {
    throw new Error(
      "MFA_ENCRYPTION_KEY is required in production. Please set a dedicated MFA_ENCRYPTION_KEY in your environment variables."
    );
  }

  if (!key) {
    console.warn("WARNING: No MFA encryption key configured. MFA will not work reliably.");
  }

  if (!key) {
    throw new Error(
      "MFA_ENCRYPTION_KEY is required. Please set a dedicated MFA_ENCRYPTION_KEY in your environment variables."
    );
  }

  return key;
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

/**
 * Generate secure backup codes for MFA recovery
 * @returns Array of backup codes and their hashed versions for storage
 */
export async function generateBackupCodes(): Promise<{ codes: string[]; hashedCodes: string[] }> {
  const codes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < BACKUP_CODE_COUNT; i++) {
    const code = generateSecureCode(BACKUP_CODE_LENGTH);
    codes.push(code);
    hashedCodes.push(hashCode(code));
  }

  return { codes, hashedCodes };
}

/**
 * Generate a secure recovery code with expiration
 * @returns Recovery code object with code, hashed version, and expiration
 */
export async function generateRecoveryCode(): Promise<{
  code: string;
  hashedCode: string;
  expiresAt: Date
}> {
  const code = generateSecureCode(RECOVERY_CODE_LENGTH);
  const hashedCode = hashCode(code);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + RECOVERY_CODE_EXPIRATION_DAYS);

  return { code, hashedCode, expiresAt };
}

/**
 * Generate device fingerprint from request headers
 * @param userAgent User agent string
 * @param ipAddress IP address
 * @returns Device fingerprint hash
 */
export function generateDeviceFingerprint(userAgent: string, ipAddress: string): string {
  const fingerprintData = `${userAgent}|${ipAddress}|${process.env.NEXTAUTH_SECRET || 'default-secret'}`;
  return createHash('sha256').update(fingerprintData).digest('hex');
}

/**
 * Verify a backup or recovery code
 * @param inputCode User-provided code
 * @param storedHash Stored hashed code
 * @returns True if code is valid
 */
export function verifyBackupCode(inputCode: string, storedHash: string): boolean {
  const inputHash = hashCode(inputCode);
  return inputHash === storedHash;
}

/**
 * Generate a secure random code
 * @param length Length of the code
 * @returns Secure random code
 */
function generateSecureCode(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar-looking characters
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

/**
 * Hash a code for secure storage
 * @param code Code to hash
 * @returns Hashed code
 */
function hashCode(code: string): string {
  const salt = process.env.NEXTAUTH_SECRET || 'default-salt';
  return createHmac('sha256', salt).update(code).digest('hex');
}
