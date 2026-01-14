import { NextRequest, NextResponse } from "next/server";
import { ConfiguratorStateSchema } from "@/shared/lib/infrastructure/configurator/schema";
import { validateConfiguration } from "@/shared/lib/infrastructure/configurator/constraints/validate";
import { normalizeError, createErrorResponse } from "@/shared/lib/api/errors";
import { rateLimit } from "@/shared/lib/rate-limit";

const RATE_LIMIT = {
  key: (ip: string) => `rate-limit:validate:${ip}`,
  limit: 50, // Higher limit for interactive UI
  windowMs: 60 * 1000,
};

export async function POST(req: NextRequest) {
  try {
    // 1. Origin Check
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin) {
       const originUrl = new URL(origin);
       if (!host || originUrl.host !== host) {
          if (process.env.NODE_ENV !== "development") {
            return createErrorResponse("FORBIDDEN", "Invalid origin");
          }
       }
    }

    // 2. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success } = await rateLimit({
      key: RATE_LIMIT.key(ip),
      limit: RATE_LIMIT.limit,
      windowMs: RATE_LIMIT.windowMs,
    });

    if (!success) {
      return createErrorResponse("RATE_LIMIT_EXCEEDED", "Too many requests.");
    }

    const body = await req.json();
    const state = ConfiguratorStateSchema.parse(body);
    const result = validateConfiguration(state);

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });

  } catch (error) {
    return normalizeError(error);
  }
}
