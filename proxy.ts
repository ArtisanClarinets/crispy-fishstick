import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { validateSession, updateSessionActivity } from "@/lib/security/session";
import { checkAdminAccess } from "@/lib/security/admin-protection";
import { getSecurityConfig } from "@/config/security";

const SECURITY_HEADERS = [
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()"],
];

// Centralized secret resolution function (same as lib/auth.ts)
function getAuthSecret(): string {
  // Try NEXTAUTH_SECRET first, then fall back to AUTH_SECRET for compatibility
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;

  if (process.env.NODE_ENV === "production" && !secret) {
    throw new Error(
      "Auth secret is required in production. Please set NEXTAUTH_SECRET or AUTH_SECRET in your environment variables."
    );
  }

  if (!secret) {
    // In development, provide a fallback secret for convenience
    console.warn("No auth secret found. Using a development fallback secret.");
    return "dev-secret-fallback-for-development-only";
  }

  return secret;
}

export async function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Note: 'unsafe-eval' is often required for development (HMR) and some libraries.
  // We remove 'unsafe-inline' for scripts to strictly enforce nonce usage.
  // In production, we allow 'unsafe-eval' for Next.js client modules.
  const isDev = process.env.NODE_ENV === "development";
  const isProd = process.env.NODE_ENV === "production";
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' ${(isDev || isProd) ? "'unsafe-eval'" : ""}`;

  // Environment-specific CSP configuration
  const connectSrc = isDev 
    ? "connect-src 'self' ws: wss: http://localhost:* https://localhost:*" 
    : "connect-src 'self'";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'", // 'unsafe-inline' required for CSS-in-JS/Framer Motion style attributes
    "img-src 'self' data:",
    "font-src 'self' data:",
    connectSrc,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join(" ; ");

  // AUTHENTICATION LOGIC
  const pathname = request.nextUrl.pathname;
  const config = getSecurityConfig();
  
  // Check if this is an admin route that needs protection
  const isAdminRoute = config.adminRoutes.protectedPaths.some(path => pathname.startsWith(path));
  const isLoginRoute = pathname.startsWith(config.adminRoutes.loginPath);
  const isErrorRoute = pathname.startsWith(config.adminRoutes.errorPath);
  
  if (isAdminRoute && !isLoginRoute && !isErrorRoute) {
    // First, check admin access restrictions (IP, geo, time)
    const adminAccessCheck = await checkAdminAccess(request);
    
    if (!adminAccessCheck.allowed) {
      console.log("[Proxy] Admin access denied: [REDACTED]");
      const url = new URL(config.adminRoutes.errorPath, request.url);
      url.searchParams.set("error", adminAccessCheck.reason || "ACCESS_DENIED");
      return NextResponse.redirect(url);
    }

    // Use the same secret resolution as lib/auth.ts
    const secret = getAuthSecret();
    console.log("[Proxy] Processing request for:", pathname);

    const token = await getToken({
      req: request,
      secret
    });

    if (!token) {
      const url = new URL("/admin/login", request.url);
      const callbackUrl = pathname + request.nextUrl.search;
      url.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(url);
    }

    // Validate session if token has session information
    if (token.sessionToken) {
      try {
        const validationResult = await validateSession(token.sessionToken);
        
        if (!validationResult.valid) {
          const url = new URL("/admin/login", request.url);
          url.searchParams.set("error", validationResult.error || "SESSION_INVALID");
          return NextResponse.redirect(url);
        }
        
        // Update session activity timestamp
        if (validationResult.session) {
          await updateSessionActivity(token.sessionToken);
        }
      } catch (error) {
        console.error("[Proxy] Session validation error: [REDACTED]");
        const url = new URL("/admin/login", request.url);
        url.searchParams.set("error", "SESSION_VALIDATION_ERROR");
        return NextResponse.redirect(url);
      }
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", csp);
  SECURITY_HEADERS.forEach(([key, value]) => response.headers.set(key, value));

  // Only apply HSTS in production environment
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
