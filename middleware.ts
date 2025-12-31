import { NextResponse } from "next/server";

const SECURITY_HEADERS = [
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()"],
  ["Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload"],
];

export function middleware(request: Request) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-nonce", nonce); // Disabled to prevent Next.js from adding empty nonce

  const scriptSrc = "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

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
