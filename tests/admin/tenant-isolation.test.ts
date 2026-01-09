import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import { tenantWhere } from "@/lib/admin/guards";

const prisma = new PrismaClient();

describe("Tenant Isolation", () => {
  let testTenant1Id: string;
  let testTenant2Id: string;
  let testUser1Id: string;
  let testUser2Id: string;
  let testProjectId: string;

  beforeEach(async () => {
    // Create two test tenants
    const tenant1 = await prisma.tenant.create({
      data: {
        name: "Test Tenant 1",
        slug: `tenant1-${Date.now()}`,
                        contactEmail: "tenant1@example.com",
      },
    });
    testTenant1Id = tenant1.id;

    const tenant2 = await prisma.tenant.create({
      data: {
        name: "Test Tenant 2",
        slug: `tenant2-${Date.now()}`,
                        contactEmail: "tenant2@example.com",
      },
    });
    testTenant2Id = tenant2.id;

    // Create users in each tenant
    const user1 = await prisma.user.create({
      data: {
        email: `user1-${Date.now()}@example.com`,
        name: "Tenant 1 User",
                tenantId: testTenant1Id,
      },
    });
    testUser1Id = user1.id;

    const user2 = await prisma.user.create({
      data: {
        email: `user2-${Date.now()}@example.com`,
        name: "Tenant 2 User",
                tenantId: testTenant2Id,
      },
    });
    testUser2Id = user2.id;

    // Create project in tenant 1
    const project = await prisma.project.create({
      data: {
        name: "Tenant 1 Project",
        status: "ACTIVE",
        tenantId: testTenant1Id,
      },
    });
    testProjectId = project.id;
  });

  afterEach(async () => {
    await prisma.project.deleteMany({ where: { id: testProjectId } });
    await prisma.user.deleteMany({ where: { OR: [{ id: testUser1Id }, { id: testUser2Id }] } });
    await prisma.tenant.deleteMany({ where: { OR: [{ id: testTenant1Id }, { id: testTenant2Id }] } });
  });

  it("should prevent cross-tenant data access with tenantWhere", async () => {
    const user2 = await prisma.user.findUnique({ where: { id: testUser2Id } });
    expect(user2).not.toBeNull();

    // Mock AdminUserContext for user2
    const mockUser2 = {
      id: user2!.id,
      email: user2!.email,
      name: user2!.name,
      roles: ["user"],
      permissions: ["read:projects"],
      tenantId: user2!.tenantId,
    };

    // User from tenant 2 should not see tenant 1's project
    const projects = await prisma.project.findMany({
      where: {
        ...tenantWhere(mockUser2),
        deletedAt: null,
      },
    });

    const projectIds = projects.map(p => p.id);
    expect(projectIds).not.toContain(testProjectId);
  });

  it("should allow access to own tenant data", async () => {
    const user1 = await prisma.user.findUnique({ where: { id: testUser1Id } });
    expect(user1).not.toBeNull();

    // Mock AdminUserContext for user1
    const mockUser1 = {
      id: user1!.id,
      email: user1!.email,
      name: user1!.name,
      roles: ["user"],
      permissions: ["read:projects"],
      tenantId: user1!.tenantId,
    };

    // User from tenant 1 should see tenant 1's project
    const projects = await prisma.project.findMany({
      where: {
        ...tenantWhere(mockUser1),
        deletedAt: null,
      },
    });

    const projectIds = projects.map(p => p.id);
    expect(projectIds).toContain(testProjectId);
  });
});
