import { NextRequest, NextResponse } from "next/server";
import { EstimatorWizardSchema } from "@/lib/infrastructure/estimator/schema";
import { calculateEstimate } from "@/lib/infrastructure/estimator/math";
import { normalizeError, createErrorResponse } from "@/lib/api/errors";
import { rateLimit } from "@/lib/rate-limit";

const RATE_LIMIT = {
  key: (ip: string) => `rate-limit:estimate:${ip}`,
  limit: 20,
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
    const { success, remaining } = await rateLimit({
      key: RATE_LIMIT.key(ip),
      limit: RATE_LIMIT.limit,
      windowMs: RATE_LIMIT.windowMs,
    });

    if (!success) {
      return createErrorResponse("RATE_LIMIT_EXCEEDED", "Too many requests.");
    }

    const body = await req.json();

    // 3. Validation
    const state = EstimatorWizardSchema.parse(body);

    // 4. Logic
    const estimate = calculateEstimate(state);

    // 5. Response
    const response = NextResponse.json(estimate);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-RateLimit-Limit", RATE_LIMIT.limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());

    return response;

  } catch (error) {
    return normalizeError(error);
  }
}
