/**
 * Security helper functions for request handling
 */

/**
 * Determines if the request is secure (HTTPS)
 * Trusts X-Forwarded-Proto if present
 */
export function isSecureRequest(req: Request): boolean {
  // Check standard proxy header
  const proto = req.headers.get("x-forwarded-proto");
  if (proto === "https") return true;
  
  // Check URL scheme
  try {
    const url = new URL(req.url);
    if (url.protocol === "https:") return true;
  } catch {
    // Relative URL or invalid
  }
  
  return false;
}

/**
 * Gets the client IP address, trusting X-Forwarded-For
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // The first IP in the list is the original client
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  // Fallback to X-Real-IP if configured in Nginx
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  
  return "unknown";
}
