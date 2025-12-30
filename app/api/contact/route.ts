import { NextResponse } from "next/server";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(1, "Message is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.literal("")),
  honeypot: z.string().optional(),
  startedAt: z.number().int().positive(),
});

/**
 * RATE LIMITING NOTE:
 * This implementation uses an in-memory Map which is not suitable for scalable,
 * multi-instance production environments (e.g., Vercel Serverless Functions) as state
 * is not shared between instances and is lost on cold starts. Treat this as a
 * best-effort limiter only.
 *
 * TODO for Production:
 * 1. Move to a persistent store like Redis (Upstash).
 * 2. Or use edge-native rate limiting (e.g., @vercel/kv).
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
const MIN_SUBMIT_TIME_MS = 1500;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const response = NextResponse.json({ message: "Unsupported content type" }, { status: 415 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!origin && !referer) {
      const response = NextResponse.json({ message: "Origin required" }, { status: 403 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    let requestOrigin = origin;
    if (!requestOrigin && referer) {
      try {
        requestOrigin = new URL(referer).origin;
      } catch {
        const response = NextResponse.json({ message: "Invalid referer" }, { status: 403 });
        response.headers.set("Cache-Control", "no-store");
        return response;
      }
    }

    if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
      const response = NextResponse.json({ message: "Origin not allowed" }, { status: 403 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const rateLimitKey = `${ip}:${userAgent}`;
    if (isRateLimited(rateLimitKey)) {
      const response = NextResponse.json({ message: "Too many requests" }, { status: 429 });
      response.headers.set("Retry-After", `${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)}`);
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const body = await req.json();

    // 3. Validate the request body (includes honeypot check)
    const validatedData = contactFormSchema.parse(body);

    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      const response = NextResponse.json(
        { message: "Message received successfully" },
        { status: 200 }
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const submittedInMs = Date.now() - validatedData.startedAt;
    if (Number.isFinite(submittedInMs) && submittedInMs < MIN_SUBMIT_TIME_MS) {
      const response = NextResponse.json(
        { message: "Submission too fast" },
        { status: 400 }
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    // In a real application, you would send this to an email service or CRM
    // For now, we'll log it to simulate the process
    const requestId = crypto.randomUUID();
    console.info("Contact form submitted", { requestId, receivedAt: new Date().toISOString() });

    const response = NextResponse.json(
      { message: "Message received successfully" },
      { status: 200 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const response = NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    console.error("Error processing contact form:", error);
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
