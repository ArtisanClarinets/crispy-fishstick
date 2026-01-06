import { NextRequest } from "next/server";

export function assertSameOrigin(req: NextRequest | Request) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  
  // Construct expected origin
  let expectedOrigin = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL;
  
  if (!expectedOrigin) {
    const host = req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "http";
    if (host) {
      expectedOrigin = `${proto}://${host}`;
    }
  }

  if (!expectedOrigin) {
    // If we can't determine expected origin, we can't safely validate.
    // Fail closed.
    throw new Error("Server configuration error: Cannot determine expected origin");
  }

  // Normalize (remove trailing slash)
  const normalize = (url: string) => url.replace(/\/$/, "").toLowerCase();
  const safeExpected = normalize(expectedOrigin);

  // 1. Check Origin (stronger signal for CSRF)
  if (origin) {
    if (normalize(origin) !== safeExpected) {
      throw new Error("Invalid Origin header");
    }
    return;
  }

  // 2. Fallback to Referer (if Origin missing, though browsers send Origin on POST)
  if (referer) {
    if (!normalize(referer).startsWith(safeExpected)) {
      throw new Error("Invalid Referer header");
    }
    return;
  }

  // 3. If neither, reject (mutation endpoints must have one)
  throw new Error("Missing Origin or Referer header");
}
