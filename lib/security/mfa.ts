import { randomBytes, createCipheriv, createDecipheriv, createHash, createHmac } from "crypto";

const ALGORITHM = "aes-256-gcm";
const BACKUP_CODE_LENGTH = 10;
const BACKUP_CODE_COUNT = 8;
const RECOVERY_CODE_LENGTH = 12;
const RECOVERY_CODE_EXPIRATION_DAYS = 7;

// Get encryption key from env; fail in production if not set
function getMFAEncryptionKey(): string {
  const key = process.env.MFA_ENCRYPTION_KEY;
  
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "MFA_ENCRYPTION_KEY is required in production. Please set a dedicated MFA_ENCRYPTION_KEY in your environment variables."
      );
    }
    // In development, warn but allow proceeding (will fail if used) or use a fixed dev key?
    // The previous code threw an error anyway, so we will stick to throwing to ensure safety.
    throw new Error(
      "MFA_ENCRYPTION_KEY is required. Please set a dedicated MFA_ENCRYPTION_KEY in your environment variables."
    );
  }

  return key;
}

// Cache derived key to avoid recomputing the SHA-256 hash on every call
let cachedKey: Buffer | null = null;

// Lazy-load key to avoid build-time errors
function getKey(): Buffer {
  if (cachedKey) {
    return cachedKey;
  }

  const derivedKey = createHash("sha256").update(String(getMFAEncryptionKey())).digest();
  cachedKey = derivedKey;
  return derivedKey;
 * Rationale:
 * - Accessing `process.env.MFA_ENCRYPTION_KEY` during module initialization can cause
 *   failures in environments where env vars are not yet available or are intentionally
 *   stubbed out (e.g. static analysis, test runners, or Next.js build/SSR analysis).
 * - By resolving the key only when encryption/decryption is actually performed, we
 *   avoid build-time initialization errors while still failing fast at runtime if the
 *   key is missing (via `getMFAEncryptionKey()`).
 *
 * Caching/performance:
 * - The key derivation uses a single SHA-256 hash over the env var and is inexpensive
 *   relative to network/IO, so recomputing it per call is acceptable for MFA flows.
 * - If future performance profiling shows this to be a hotspot, a safe in-process cache
 *   can be added, but care must be taken not to move env var access back into module
 *   top-level initialization, which would reintroduce build-time errors.
 */
function getKey(): Buffer {
  return createHash("sha256").update(String(getMFAEncryptionKey())).digest();
}

export async function encryptSecret(text: string): Promise<string> {
  const iv = randomBytes(12); // 96-bit IV for GCM
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  
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
    
    const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
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
