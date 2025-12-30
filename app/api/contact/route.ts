import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(1, "Message is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.literal("")),
  honeypot: z.string().optional(),
});

// Simple in-memory rate limiting
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

// Durable storage for submissions (simulating a DB/Email service)
const SUBMISSIONS_FILE = path.join(process.cwd(), "contact_submissions.json");

function saveSubmission(data: any) {
  try {
    const submissions = fs.existsSync(SUBMISSIONS_FILE)
      ? JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"))
      : [];
    submissions.push({
      ...data,
      receivedAt: new Date().toISOString(),
    });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to save submission:", error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    // Strict Origin Check
    if (!origin || !allowedOrigins.includes(origin)) {
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
      // Silently ignore honeypot submissions
      return NextResponse.json(
        { message: "Message received successfully" },
        { status: 200 }
      );
    }

    // Save to durable storage instead of just logging
    const saved = saveSubmission({
        name: validatedData.name,
        role: validatedData.role,
        budget: validatedData.budget,
        message: validatedData.message,
        email: validatedData.email,
        website: validatedData.website
    });

    if (!saved) {
         return NextResponse.json(
          { message: "Failed to save submission" },
          { status: 502 }
        );
    }

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
