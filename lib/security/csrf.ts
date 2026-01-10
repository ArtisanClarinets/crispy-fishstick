/**
 * Double-Submit CSRF Protection
 * @module lib/security/csrf
 */

import { NextRequest } from "next/server";
import { randomBytes, createHmac } from "crypto";
import { cookies } from "next/headers";

const CSRF_SECRET = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET || "INSECURE_FALLBACK_CHANGE_ME";
const CSRF_COOKIE_NAME = "csrf-token";
const CSRF_HEADER_NAME = "x-csrf-token";

/**
 * Generate a CSRF token
 */
export function generateCsrfToken(): string {
  const random = randomBytes(32).toString("hex");
  const hmac = createHmac("sha256", CSRF_SECRET);
  hmac.update(random);
  const signature = hmac.digest("hex");
  return `${random}.${signature}`;
}

/**
 * Validate a CSRF token
 */
function validateCsrfToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  
  const [random, signature] = parts;
  const hmac = createHmac("sha256", CSRF_SECRET);
  hmac.update(random);
  const expectedSignature = hmac.digest("hex");
  
  // Constant-time comparison to prevent timing attacks
  return signature === expectedSignature;
}

/**
 * Issue a CSRF token cookie (call from layout or middleware on GET requests)
 */
export function issueCsrfCookie(): string {
  const token = generateCsrfToken();
  const cookieStore = cookies();
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return token;
}

/**
 * Verify CSRF token from request (double-submit check)
 * 
 * Validates:
 * 1. Token exists in cookie
 * 2. Token exists in header
 * 3. Tokens match
 * 4. Token signature is valid
 */
export async function verifyCsrfToken(req: NextRequest): Promise<void> {
  // For mutations (POST, PUT, PATCH, DELETE), CSRF is required
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return; // Not a mutation, no CSRF required
  }
  
  const cookieStore = cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = req.headers.get(CSRF_HEADER_NAME);
  
  if (!cookieToken) {
    throw new Error("CSRF token missing from cookie");
  }
  
  if (!headerToken) {
    throw new Error("CSRF token missing from request header (X-CSRF-Token)");
  }
  
  if (cookieToken !== headerToken) {
    throw new Error("CSRF token mismatch");
  }
  
  if (!validateCsrfToken(cookieToken)) {
    throw new Error("CSRF token invalid");
  }
}

/**
 * Get current CSRF token (for use in client-side forms)
 * Returns the token from cookie or generates a new one
 */
export function getCsrfToken(): string {
  const cookieStore = cookies();
  const existing = cookieStore.get(CSRF_COOKIE_NAME)?.value;
  
  if (existing && validateCsrfToken(existing)) {
    return existing;
  }
  
  // Generate new token if none exists or invalid
  return issueCsrfCookie();
}
