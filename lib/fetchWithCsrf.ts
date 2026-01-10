import { getCsrfToken } from "next-auth/react";

/**
 * Enhanced fetch wrapper that automatically adds CSRF token to requests
 * and handles common error scenarios.
 */
export async function fetchWithCsrf(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // Get CSRF token
  const csrfToken = await getCsrfToken();
  
  const headers = new Headers(init?.headers);
  
  // Add Content-Type if not present and body is provided, BUT NOT for FormData
  if (init?.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  
  // Add CSRF token header (standard for NextAuth / CSRF protection)
  // Some backends might look for X-CSRF-Token or X-XSRF-Token.
  // NextAuth.js uses `next-auth.csrf-token` cookie, but we can also pass it in headers or body.
  // Since we are building the backend, we should verify how we want to validate it.
  // NextAuth v4 usually doesn't strictly enforce CSRF on API routes unless configured or using middleware.
  // However, for hardening, we should send it.
  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized - could redirect or throw
    // window.location.href = "/admin/login";
  }

  return response;
}
