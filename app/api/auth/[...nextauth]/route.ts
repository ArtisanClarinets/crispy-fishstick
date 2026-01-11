import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import winston from "winston";
import type { NextRequest } from "next/server";

// Configure logger for server-side error logging
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/auth-errors.log" })
  ]
});

// Create the NextAuth handler instance
const authHandler = NextAuth(authOptions);

// Wrap the NextAuth handler to handle dynamic route segments and errors properly
async function handleAuthRequest(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
): Promise<Response | void> {
  try {
    // Extract the nextauth segments from the dynamic route
    const { nextauth } = await context.params;
    
    // Call the appropriate HTTP method handler based on the request method
    if (req.method === "GET") {
      return authHandler.GET?.(req, context) ?? NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    } else if (req.method === "POST") {
      return authHandler.POST?.(req, context) ?? NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    } else {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }
  } catch (error) {
    // Log the full error details server-side without exposing sensitive info to client
    logger.error({
      message: "Authentication handler error",
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      requestMethod: req.method,
      requestUrl: req.url
    });
    
    // Return a safe, generic error response to the client
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { handleAuthRequest as GET, handleAuthRequest as POST };
