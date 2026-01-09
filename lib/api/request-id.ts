/**
 * Request ID generation and propagation
 * @module lib/api/request-id
 */

import { headers } from "next/headers";
import { randomBytes } from "crypto";

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${randomBytes(8).toString("hex")}`;
}

/**
 * Get or generate request ID from headers
 */
export function getRequestId(): string {
  const headersList = headers();
  const existing = headersList.get("x-request-id");
  return existing || generateRequestId();
}

/**
 * Extract request metadata for logging/audit
 */
export interface RequestMetadata {
  requestId: string;
  ip: string;
  userAgent: string;
  origin: string | null;
  referer: string | null;
  method: string;
  path: string;
}

export function getRequestMetadata(req: Request): RequestMetadata {
  const headersList = headers();
  const url = new URL(req.url);
  
  return {
    requestId: getRequestId(),
    ip: (headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown").split(',')[0].trim(),
    userAgent: headersList.get("user-agent") || "unknown",
    origin: headersList.get("origin"),
    referer: headersList.get("referer"),
    method: req.method,
    path: url.pathname,
  };
}
