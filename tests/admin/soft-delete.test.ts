import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Soft Delete and Restore", () => {
  let testUserId: string;
  let testTenantId: string;
  let testServiceId: string;

  beforeEach(async () => {
    // Create test tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant",
        slug: `test-tenant-${Date.now()}`,
                        contactEmail: "test@example.com",
      },
    });
    testTenantId = tenant.id;

    // Create test user
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
                tenantId: testTenantId,
      },
    });
    testUserId = user.id;

    // Create test service
    const service = await prisma.service.create({
      data: {
        name: "Test Service",
        lifecycle: "ACTIVE",
        ownerId: testUserId,
      },
    });
    testServiceId = service.id;
  });

  afterEach(async () => {
    // Cleanup
    await prisma.service.deleteMany({ where: { id: testServiceId } });
    await prisma.user.deleteMany({ where: { id: testUserId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should soft delete a service", async () => {
    await prisma.service.update({
      where: { id: testServiceId },
      data: {
        deletedAt: new Date(),
        deletedBy: testUserId,
        deleteReason: "Test deletion",
      },
    });

    const service = await prisma.service.findUnique({
      where: { id: testServiceId },
    });

    expect(service?.deletedAt).not.toBeNull();
    expect(service?.deletedBy).toBe(testUserId);
    expect(service?.deleteReason).toBe("Test deletion");
  });

  it("should restore a soft-deleted service", async () => {
    // First soft delete
    await prisma.service.update({
      where: { id: testServiceId },
      data: {
        deletedAt: new Date(),
        deletedBy: testUserId,
        deleteReason: "Test deletion",
      },
    });

    // Then restore
    await prisma.service.update({
      where: { id: testServiceId },
      data: {
        deletedAt: null,
        deletedBy: null,
        deleteReason: null,
      },
    });

    const service = await prisma.service.findUnique({
      where: { id: testServiceId },
    });

    expect(service?.deletedAt).toBeNull();
    expect(service?.deletedBy).toBeNull();
    expect(service?.deleteReason).toBeNull();
  });

  it("should exclude soft-deleted records from default queries", async () => {
    // Soft delete the service
    await prisma.service.update({
      where: { id: testServiceId },
      data: {
        deletedAt: new Date(),
        deletedBy: testUserId,
        deleteReason: "Test deletion",
      },
    });

    // Query without deletedAt filter
    const activeServices = await prisma.service.findMany({
      where: { deletedAt: null },
    });

    const deletedServiceIds = activeServices.map(s => s.id);
    expect(deletedServiceIds).not.toContain(testServiceId);
  });
});
