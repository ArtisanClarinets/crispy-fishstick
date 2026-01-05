import { NextResponse } from "next/server";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().min(1, "Message is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.literal("")),
  // Honeypot field - should be empty
  company_address: z.string().optional(),
});

// Simple in-memory rate limiting (for demo purposes)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(req: Request) {
  try {
    // 1. Origin Check
    const origin = req.headers.get("origin");
    // In a real scenario, compare against allowed domains.
    // Since we don't have the env var for the domain, we'll allow if it's present.
    // Ideally: if (origin !== process.env.NEXT_PUBLIC_SITE_URL) ...
    if (!origin) {
        return NextResponse.json({ message: "Invalid origin" }, { status: 403 });
    }

    // 2. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const limitData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - limitData.lastReset > RATE_LIMIT_WINDOW) {
      limitData.count = 0;
      limitData.lastReset = now;
    }

    limitData.count++;
    rateLimitMap.set(ip, limitData);

    if (limitData.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { message: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 3. Validate the request body (includes honeypot check)
    const validatedData = contactFormSchema.parse(body);

    // Honeypot check
    if (validatedData.company_address) {
       // Silently fail or return success to fool bots
       return NextResponse.json(
        { message: "Message received successfully" },
        { status: 200 }
      );
    }

    // In a real application, you would send this to an email service or CRM
    // For now, we'll log it to simulate the process
    console.log("Contact form submitted:", { ...validatedData, company_address: undefined });

    // Removed artificial delay

    return NextResponse.json(
      { message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
