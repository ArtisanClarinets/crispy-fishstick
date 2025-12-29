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
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
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
    const origin = req.headers.get("origin");
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (origin && !allowedOrigins.includes(origin)) {
      const response = NextResponse.json({ message: "Origin not allowed" }, { status: 403 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      const response = NextResponse.json({ message: "Too many requests" }, { status: 429 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      const response = NextResponse.json(
        { message: "Message received successfully" },
        { status: 200 }
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    // In a real application, you would send this to an email service or CRM
    // For now, we'll log it to simulate the process
    console.log("Contact form submitted:", validatedData);

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
