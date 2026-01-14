import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { normalizeError, createErrorResponse } from "@/shared/lib/api/errors";
import { rateLimit } from "@/shared/lib/rate-limit";
import { z } from "zod";
import crypto from "crypto";

const RATE_LIMIT = {
  key: (ip: string) => `rate-limit:builds:${ip}`,
  limit: 10,
  windowMs: 60 * 1000,
};

const BuildSchema = z.object({
  state: z.any(), // We store raw JSON
  validation: z.any(),
});

function generateCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars
}

export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { state, validation } = BuildSchema.parse(body);

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h

    await prisma.infraBuild.create({
      data: {
        code,
        expiresAt,
        skuSnapshotJson: JSON.stringify(state), // using fields available in schema
        optionsSnapshotJson: JSON.stringify(validation),
        computedTotalsJson: JSON.stringify(validation?.metrics || {}),
      }
    });

    const response = NextResponse.json({ code, expiresAt });
    response.headers.set("Cache-Control", "no-store");
    return response;

  } catch (error) {
    return normalizeError(error);
  }
}
