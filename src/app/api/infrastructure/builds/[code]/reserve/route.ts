import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { normalizeError, createErrorResponse } from "@/shared/lib/api/errors";
import { rateLimit } from "@/shared/lib/rate-limit";

const RATE_LIMIT = {
  key: (ip: string) => `rate-limit:reserve:${ip}`,
  limit: 5,
  windowMs: 60 * 1000,
};

export async function POST(req: NextRequest, props: { params: Promise<{ code: string }> }) {
  const params = await props.params;
  try {
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

    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success } = await rateLimit({
      key: RATE_LIMIT.key(ip),
      limit: RATE_LIMIT.limit,
      windowMs: RATE_LIMIT.windowMs,
    });

    if (!success) return createErrorResponse("RATE_LIMIT_EXCEEDED", "Limit exceeded");

    const build = await prisma.infraBuild.findUnique({
      where: { code: params.code }
    });

    if (!build) return createErrorResponse("NOT_FOUND", "Build not found");

    if (build.expiresAt < new Date()) {
       return createErrorResponse("CONFLICT", "Build expired");
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await prisma.infraReservation.create({
      data: {
        buildId: build.id,
        expiresAt,
        status: "active"
      }
    });

    const response = NextResponse.json({ status: "reserved", expiresAt });
    response.headers.set("Cache-Control", "no-store");
    return response;

  } catch (error) {
    return normalizeError(error);
  }
}
