import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * proxy.ts
 *
 * Canonical request interception layer for the application.
 *
 * Responsibilities:
 * - Generate a per-request CSP nonce and pass it to the App Router via the
 *   `x-nonce` request header.
 * - Apply a strict-but-compatible Content Security Policy (CSP) and standard
 *   security headers.
 * - Enforce authentication on all `/admin/*` routes (excluding public pages).
 *
 * IMPORTANT: This file is intentionally re-exported from `middleware.ts`.
 * Next.js only executes `middleware.ts`, but we keep this file to match the
 * repository's documented architecture.
 */

function buildCsp(nonce: string) {
  const isProd = process.env.NODE_ENV === "production";

  // NOTE:
  // - Next.js automatically extracts `nonce-...` from this header and applies it
  //   to Next/React scripts and inline styles/scripts.
  // - We allow inline *style attributes* because Radix UI and other libs rely on
  //   them for positioning/animation via CSS variables.
  // - Dev mode requires `unsafe-eval` for HMR tooling.
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' blob: data: https:",
    "font-src 'self' data:",
    `script-src 'self' 'nonce-${nonce}'${isProd ? "" : " 'unsafe-eval'"}`,
    // Allow inline style attributes (Radix/Popper/etc.). Restrict <style> tags
    // to the nonce so injected styles are blocked.
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    // Websockets are used by Next.js dev server. `https:` is allowed for any
    // first-party server-to-server calls.
    `connect-src 'self' https:${isProd ? "" : " ws: wss: http:"}`,
    "media-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    // Be explicit; inline event handlers are not allowed.
    "script-src-attr 'none'",
  ];

  if (isProd) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

function applySecurityHeaders(res: NextResponse, nonce: string) {
  // Security Headers
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("Content-Security-Policy", buildCsp(nonce));

  // HSTS should only be set in production over HTTPS.
  if (process.env.NODE_ENV === "production") {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

export default withAuth(
  function middleware(req: NextRequest) {
    // Nonce is used by CSP; ensure it is URL/header safe.
    const nonce = globalThis.crypto?.randomUUID?.().replace(/-/g, "") ?? "";

    // Extremely defensive fallback: should never happen in modern runtimes, but
    // guarantees we always send a nonce even if `crypto.randomUUID()` is absent.
    const safeNonce = nonce.length > 0 ? nonce : Math.random().toString(36).slice(2);

    // Pass nonce to the App Router (read via `headers()` in app/layout.tsx).
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-nonce", safeNonce);

    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });

    // Optional: expose nonce in response headers for debugging (not relied upon).
    res.headers.set("x-nonce", safeNonce);

    applySecurityHeaders(res, safeNonce);
    return res;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Public admin routes
        if (
          pathname.startsWith("/admin/login") ||
          pathname.startsWith("/admin/error") ||
          pathname.startsWith("/admin/public")
        ) {
          return true;
        }

        // Require authentication for all other admin routes
        return Boolean(token);
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    // Protect admin routes (and apply security headers/nonce on these paths)
    "/admin/:path*",
  ],
};
