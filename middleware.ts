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
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
];

export async function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Note: 'unsafe-eval' is often required for development (HMR) and some libraries.
  // We remove 'unsafe-inline' for scripts to strictly enforce nonce usage.
  // In production, we allow 'unsafe-eval' for Next.js client modules.
  const isDev = process.env.NODE_ENV === "development";
  const isProd = process.env.NODE_ENV === "production";
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' ${(isDev || isProd) ? "'unsafe-eval'" : ""}`;

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'", // 'unsafe-inline' required for CSS-in-JS/Framer Motion style attributes
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

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
      console.log(`[Middleware] Admin access denied: ${adminAccessCheck.reason}`);
      const url = new URL(config.adminRoutes.errorPath, request.url);
      url.searchParams.set("error", adminAccessCheck.reason || "ACCESS_DENIED");
      return NextResponse.redirect(url);
    }
    
    const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
    console.log("[Middleware] Checking auth for:", pathname);
    console.log("[Middleware] Secret exists:", !!secret);
    console.log("[Middleware] Request URL:", request.url);
    console.log("[Middleware] Request cookies:", request.cookies.getAll());
    
    if (!secret) {
      console.error("NEXTAUTH_SECRET is not set. Admin routes will not authenticate.");
      const url = new URL("/admin/error", request.url);
      return NextResponse.redirect(url);
    }
    
    const token = await getToken({
      req: request,
      secret
    });
    console.log("[Middleware] Token found:", !!token);
    console.log("[Middleware] Token details:", token ? { id: token.id, email: token.email } : null);
    console.log("[Middleware] Request has session cookie:", request.cookies.has('next-auth.session-token'));

    if (!token) {
      console.log("[Middleware] No token, redirecting to login");
      const url = new URL("/admin/login", request.url);
      const callbackUrl = pathname + request.nextUrl.search;
      console.log("[Middleware] Original callback URL:", callbackUrl);
      url.searchParams.set("callbackUrl", encodeURIComponent(encodeURIComponent(callbackUrl)));
      console.log("[Middleware] Encoded callback URL:", url.searchParams.get("callbackUrl"));
      return NextResponse.redirect(url);
    }

    // Validate session if token has session information
    if (token.sessionToken) {
      try {
        const validationResult = await validateSession(token.sessionToken);
        console.log("[Middleware] Session validation result:", validationResult);
        
        if (!validationResult.valid) {
          console.log("[Middleware] Invalid session:", validationResult.error);
          const url = new URL("/admin/login", request.url);
          url.searchParams.set("error", validationResult.error || "SESSION_INVALID");
          return NextResponse.redirect(url);
        }
        
        // Update session activity timestamp
        if (validationResult.session) {
          await updateSessionActivity(token.sessionToken);
        }
      } catch (error) {
        console.error("[Middleware] Session validation error:", error);
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

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
