import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/admin/users/route";
import { NextRequest } from "next/server";

// Mocks
const verifyCsrfTokenMock = vi.fn();
const requireAdminMock = vi.fn();
const assertSameOriginMock = vi.fn();
const validatePasswordEnhancedMock = vi.fn();

vi.mock("@/lib/security/csrf", () => ({
  verifyCsrfToken: (...args: any[]) => verifyCsrfTokenMock(...args),
}));

vi.mock("@/lib/admin/guards", () => ({
  requireAdmin: (...args: any[]) => requireAdminMock(...args),
}));

vi.mock("@/lib/security/origin", () => ({
  assertSameOrigin: (...args: any[]) => assertSameOriginMock(...args),
}));

vi.mock("@/lib/security/password-enhanced", () => ({
  validatePasswordEnhanced: (...args: any[]) => validatePasswordEnhancedMock(...args),
  addToPasswordHistory: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
    rateLimit: {
      findUnique: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
    },
    auditLog: {
        create: vi.fn()
    }
  }
}));

describe("Admin User Creation CSRF Enforcement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call verifyCsrfToken", async () => {
    // Setup
    requireAdminMock.mockResolvedValue({ id: "admin-id", email: "admin@example.com", tenantId: null });
    validatePasswordEnhancedMock.mockResolvedValue(null);

    const req = new NextRequest("http://localhost/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
            name: "Test User",
            email: "test@example.com",
            password: "password123456",
        }),
    });

    // Act
    await POST(req);

    // Assert
    expect(assertSameOriginMock).toHaveBeenCalled();
    expect(verifyCsrfTokenMock).toHaveBeenCalled();
  });

  it("should return 403 if verifyCsrfToken throws", async () => {
      // Setup
      requireAdminMock.mockResolvedValue({ id: "admin-id", email: "admin@example.com" });
      verifyCsrfTokenMock.mockRejectedValue(new Error("CSRF token missing"));

      const req = new NextRequest("http://localhost/api/admin/users", {
          method: "POST",
          body: JSON.stringify({}),
      });

      // Act
      const res = await POST(req);
      const json = await res.json();

      // Assert
      expect(res.status).toBe(403);
      expect(json.error).toContain("CSRF");
  });
});
