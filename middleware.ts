import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

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
  // In production, we strictly forbid 'unsafe-eval'.
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = `script-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-eval'" : ""}`;

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
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
    console.log("[Middleware] Checking auth for:", pathname);
    console.log("[Middleware] Secret exists:", !!secret);
    
    if (!secret) {
      console.error("NEXTAUTH_SECRET is not set. Admin routes will not authenticate.");
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("callbackUrl", encodeURIComponent(encodeURIComponent(pathname + request.nextUrl.search)));
      return NextResponse.redirect(url);
    }
    
    const token = await getToken({ 
      req: request, 
      secret 
    });
    console.log("[Middleware] Token found:", !!token);

    if (!token) {
      console.log("[Middleware] No token, redirecting to login");
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("callbackUrl", encodeURIComponent(encodeURIComponent(pathname + request.nextUrl.search)));
      return NextResponse.redirect(url);
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
