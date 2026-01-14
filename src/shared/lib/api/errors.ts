/**
 * Standardized error responses for API routes
 * @module lib/api/errors
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ErrorCode = 
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "UNPROCESSABLE_ENTITY"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVER_ERROR"
  | "SERVICE_UNAVAILABLE";

export interface ApiError {
  error: {
    code: ErrorCode;
    message: string;
    details?: any;
    requestId?: string;
  };
}

export function createErrorResponse(
  code: ErrorCode,
  message: string,
  details?: any,
  requestId?: string
): NextResponse<ApiError> {
  const statusMap: Record<ErrorCode, number> = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    RATE_LIMIT_EXCEEDED: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  };

  const status = statusMap[code];

  return NextResponse.json(
    {
      error: {
        code,
        message,
        details,
        requestId,
      },
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        ...(requestId ? { "X-Request-Id": requestId } : {}),
      },
    }
  );
}

export function normalizeError(error: unknown, requestId?: string): NextResponse<ApiError> {
  // Handle known error types
  if (error instanceof Error) {
    if (error.message === "Unauthorized") {
      return createErrorResponse("UNAUTHORIZED", "Authentication required", undefined, requestId);
    }
    if (error.message === "Forbidden") {
      return createErrorResponse("FORBIDDEN", "Insufficient permissions", undefined, requestId);
    }
    if (error.message.includes("Origin") || error.message.includes("Referer")) {
      return createErrorResponse("FORBIDDEN", "Invalid request origin", undefined, requestId);
    }
    if (error.message.includes("CSRF")) {
      return createErrorResponse("FORBIDDEN", "Invalid CSRF token", undefined, requestId);
    }
    if (error.message.includes("Rate limit")) {
      return createErrorResponse("RATE_LIMIT_EXCEEDED", error.message, undefined, requestId);
    }
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return createErrorResponse(
      "UNPROCESSABLE_ENTITY",
      "Validation failed",
      error.errors,
      requestId
    );
  }

  // Handle Prisma errors
  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as any;
    if (prismaError.code === "P2002") {
      return createErrorResponse("CONFLICT", "Duplicate entry", prismaError.meta, requestId);
    }
    if (prismaError.code === "P2025") {
      return createErrorResponse("NOT_FOUND", "Record not found", undefined, requestId);
    }
  }

  // Log unexpected errors
  console.error("[API Error]", error);

  // Generic error
  return createErrorResponse(
    "INTERNAL_SERVER_ERROR",
    "An unexpected error occurred",
    undefined,
    requestId
  );
}
