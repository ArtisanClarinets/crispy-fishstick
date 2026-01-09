import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("JIT Access Expiry", () => {
  let testTenantId: string;
  let testUserId: string;
  let testJitRequestId: string;

  beforeEach(async () => {
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant",
        slug: `test-tenant-${Date.now()}`,
        contactEmail: "test@example.com",
      },
    });
    testTenantId = tenant.id;

    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
        tenantId: testTenantId,
      },
    });
    testUserId = user.id;

    // Create active JIT request (approved, not expired)
    const jitRequest = await prisma.jitAccessRequest.create({
      data: {
        userId: testUserId,
        reason: "Test access",
        durationMin: 60,
        status: "approved",
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
        approvedBy: testUserId,
      },
    });
    testJitRequestId = jitRequest.id;
  });

  afterEach(async () => {
    await prisma.jitAccessRequest.deleteMany({ where: { id: testJitRequestId } });
    await prisma.user.deleteMany({ where: { id: testUserId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should identify active JIT requests before expiry", async () => {
    const request = await prisma.jitAccessRequest.findFirst({
      where: {
        userId: testUserId,
        status: "approved",
        expiresAt: { gt: new Date() },
      },
    });

    expect(request).not.toBeNull();
    expect(request?.id).toBe(testJitRequestId);
  });

  it("should exclude expired JIT requests", async () => {
    // Create expired request
    const expiredRequest = await prisma.jitAccessRequest.create({
      data: {
        userId: testUserId,
        reason: "Expired test access",
        durationMin: 60,
        status: "approved",
        expiresAt: new Date(Date.now() - 3600000), // 1 hour ago
        approvedBy: testUserId,
      },
    });

    const activeRequests = await prisma.jitAccessRequest.findMany({
      where: {
        userId: testUserId,
        status: "approved",
        expiresAt: { gt: new Date() },
      },
    });

    const requestIds = activeRequests.map(r => r.id);
    expect(requestIds).not.toContain(expiredRequest.id);

    await prisma.jitAccessRequest.deleteMany({ where: { id: expiredRequest.id } });
  });

  it("should exclude denied JIT requests", async () => {
    // Update status to denied
    await prisma.jitAccessRequest.update({
      where: { id: testJitRequestId },
      data: {
        status: "denied",
      },
    });

    const activeRequests = await prisma.jitAccessRequest.findMany({
      where: {
        userId: testUserId,
        status: "approved",
        expiresAt: { gt: new Date() },
      },
    });

    const requestIds = activeRequests.map(r => r.id);
    expect(requestIds).not.toContain(testJitRequestId);
  });
});
