import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(_req) {
    const response = NextResponse.next();
    
    // Security Headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https:;"
    );
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    response.headers.set("X-XSS-Protection", "1; mode=block");

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // Allow public admin routes
        if (
          pathname.startsWith("/admin/login") || 
          pathname.startsWith("/admin/error") ||
          pathname.startsWith("/admin/public")
        ) {
          return true;
        }
      } catch (_error) {
        console.error("[Proxy] Session validation error: [REDACTED]");
        const url = new URL("/admin/login", request.url);
        url.searchParams.set("error", "SESSION_VALIDATION_ERROR");
        return NextResponse.redirect(url);
      }
    }
  }

        // Require authentication for all other admin routes
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    // Protect admin routes
    "/admin/:path*",
    // Protect specific API routes if needed, but usually handled by route handlers
  ],
};
