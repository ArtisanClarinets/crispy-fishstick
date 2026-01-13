import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

/**
 * NextAuth route handler (App Router)
 *
 * IMPORTANT:
 * - `NextAuth(authOptions)` returns a single handler function in NextAuth v4.
 * - Next.js Route Handlers require named exports for each HTTP method.
 *
 * Prior implementation attempted to call `handler.GET`/`handler.POST`, which do
 * not exist in NextAuth v4 and caused all GET requests (e.g. /api/auth/error,
 * /api/auth/session, /api/auth/csrf) to return 405 "Method Not Allowed".
 */
const handler = NextAuth(authOptions);

// Ensure this route runs in the Node.js runtime (required for Prisma).
export const runtime = "nodejs";

export { handler as GET, handler as POST };
