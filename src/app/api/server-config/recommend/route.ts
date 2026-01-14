import { NextRequest, NextResponse } from "next/server";
import { WorkloadIntentSchema } from "@/shared/lib/server-config/schema";
import { recommendServer } from "@/shared/lib/server-config/engine";
import { normalizeError, createErrorResponse } from "@/shared/lib/api/errors";
import { rateLimit } from "@/shared/lib/rate-limit";

// Rate limit configuration
const RATE_LIMIT = {
  key: (ip: string) => `rate-limit:recommend:${ip}`,
  limit: 20, // 20 requests
  windowMs: 60 * 1000, // per minute
};

export async function POST(req: NextRequest) {
  try {
    // 1. Origin Check (Hardened)
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");

    // In strict production, allow only same-origin
    if (origin) {
       const originUrl = new URL(origin);
       if (!host || originUrl.host !== host) {
          // Allow localhost in dev
          if (process.env.NODE_ENV !== "development") {
            return createErrorResponse("FORBIDDEN", "Invalid origin");
          }
       }
    }

    // 2. Rate Limiting
    // Use IP or a fallback for anonymous users
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success, remaining, reset } = await rateLimit({
      key: RATE_LIMIT.key(ip),
      limit: RATE_LIMIT.limit,
      windowMs: RATE_LIMIT.windowMs,
    });

    if (!success) {
      return createErrorResponse(
        "RATE_LIMIT_EXCEEDED",
        "Too many recommendation requests. Please wait.",
        undefined,
        undefined
      );
    }

    // 3. Content-Type Check
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return createErrorResponse("BAD_REQUEST", "Content-Type must be application/json");
    }

    const body = await req.json();

    // 4. Validation (Zod)
    const intent = WorkloadIntentSchema.parse(body);

    // 5. Logic
    const recommendation = recommendServer(intent);

    // 6. Response
    const response = NextResponse.json(recommendation);

    // Security Headers
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-RateLimit-Limit", RATE_LIMIT.limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.getTime().toString());

    return response;

  } catch (error) {
    return normalizeError(error);
  }
}
