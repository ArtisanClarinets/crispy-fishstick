import { toast } from "sonner";

/**
 * Enhanced fetch wrapper that automatically adds CSRF token to requests
 * and handles common error scenarios.
 */
export async function fetchWithCsrf(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // Fetch CSRF token from our endpoint
  let csrfToken: string | null = null;
  try {
    const csrfRes = await fetch("/api/csrf");
    if (csrfRes.ok) {
      const data = await csrfRes.json();
      csrfToken = data.csrfToken;
    }
  } catch (e) {
    console.error("Failed to fetch CSRF token", e);
  }
  
  const headers = new Headers(init?.headers);
  
  // Add Content-Type if not present and body is provided, BUT NOT for FormData
  if (init?.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  
  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized
     toast.error("Session expired. Please login again.");
     // Optional: Redirect to login
     // window.location.href = "/admin/login";
  }

  return response;
}
