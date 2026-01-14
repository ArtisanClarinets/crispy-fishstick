import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildCsp } from "@/lib/security/csp";
import { authConfig } from "@/lib/auth.config";

/**
 * middleware.ts (Proxy)
 *
 * Enforces security headers, CSP, and admin authentication.
 */

function applySecurityHeaders(res: NextResponse, nonce: string) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set("Content-Security-Policy", buildCsp(nonce));

  if (process.env.NODE_ENV === "production") {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
}

export default withAuth(
  function middleware(req: NextRequest) {
    const nonce = globalThis.crypto?.randomUUID?.().replace(/-/g, "") ?? Math.random().toString(36).slice(2);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-nonce", nonce);

    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });

    applySecurityHeaders(res, nonce);
    return res;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Admin Access Check
        if (pathname.startsWith("/admin")) {
          console.log("Proxy checking admin access for:", pathname, "Token:", token ? "YES" : "NO", "Roles:", token?.roles);
          // Public admin routes
          if (
            pathname.startsWith("/admin/login") ||
            pathname.startsWith("/admin/error") ||
            pathname.startsWith("/admin/public")
          ) {
            return true;
          }

          // Check if user has admin role
          const userRoles = (token?.roles as string[]) || [];
          const isAdmin = userRoles.includes("Admin") || userRoles.includes("Owner");

          return !!token && isAdmin;
        }

        // Allow other routes by default (protected pages handled by pages/layout logic or DAL)
        return true;
      },
    },
    pages: authConfig.pages,
    secret: authConfig.secret,
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - assets/uploads (uploaded files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/uploads|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)$).*)',
  ],
};
