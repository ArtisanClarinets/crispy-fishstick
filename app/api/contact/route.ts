import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

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

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
const MIN_SUBMIT_TIME_MS = 1500;

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
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

    // Strict Origin Check
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

    if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
      const response = NextResponse.json({ message: "Origin not allowed" }, { status: 403 });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const rateLimitKey = `contact:${ip}:${userAgent}`; // Prefix to namespace
    
    const limitResult = await rateLimit({
      key: rateLimitKey,
      limit: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
    });

    if (!limitResult.success) {
      const response = NextResponse.json({ message: "Too many requests" }, { status: 429 });
      response.headers.set("Retry-After", `${Math.ceil((limitResult.reset.getTime() - Date.now()) / 1000)}`);
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const body = await req.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      // Silently ignore honeypot submissions
      return NextResponse.json(
        { message: "Message received successfully" },
        { status: 200 }
      );
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

    // Save to Database (SQLite)
    await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        budget: validatedData.budget,
        role: validatedData.role,
        website: validatedData.website || null,
        source: "contact_form",
        status: "new",
      },
    });

    // Log metadata only (No PII)
    console.log("Contact submission received", {
      ip: "REDACTED", // or hash it
      timestamp: new Date().toISOString(),
      status: "saved"
    });

    const response = NextResponse.json(
      { message: "Message received successfully" },
      { status: 201 }
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

    console.error("Error processing contact form (metadata only):", error instanceof Error ? error.message : "Unknown error");
    const response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
