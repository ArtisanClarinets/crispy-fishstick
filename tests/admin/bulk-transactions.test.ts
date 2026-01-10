import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Bulk Action Transactions", () => {
  let testTenantId: string;
  let testUserId: string;
  let testLeadIds: string[] = [];

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

    // Create test leads
    const leads = await Promise.all([
      prisma.lead.create({
        data: {
          name: "Lead 1",
          email: "lead1@example.com",
          status: "NEW",
          tenantId: testTenantId,
        },
      }),
      prisma.lead.create({
        data: {
          name: "Lead 2",
          email: "lead2@example.com",
          status: "NEW",
          tenantId: testTenantId,
        },
      }),
      prisma.lead.create({
        data: {
          name: "Lead 3",
          email: "lead3@example.com",
          status: "NEW",
          tenantId: testTenantId,
        },
      }),
    ]);
    testLeadIds = leads.map(l => l.id);
  });

  afterEach(async () => {
    await prisma.lead.deleteMany({ where: { id: { in: testLeadIds } } });
    await prisma.user.deleteMany({ where: { id: testUserId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should update multiple records atomically in transaction", async () => {
    await prisma.$transaction(
      testLeadIds.map(id =>
        prisma.lead.update({
          where: { id },
          data: { status: "QUALIFIED" },
        })
      )
    );

    const leads = await prisma.lead.findMany({
      where: { id: { in: testLeadIds } },
    });

    leads.forEach(lead => {
      expect(lead.status).toBe("QUALIFIED");
    });
  });

  it("should rollback all changes if any update fails", async () => {
    const invalidId = "invalid-id-that-does-not-exist";

    try {
      await prisma.$transaction([
        ...testLeadIds.map(id =>
          prisma.lead.update({
            where: { id },
            data: { status: "QUALIFIED" },
          })
        ),
        // This will fail
        prisma.lead.update({
          where: { id: invalidId },
          data: { status: "QUALIFIED" },
        }),
      ]);
      expect.fail("Transaction should have failed");
    } catch (error) {
      expect(error).toBeDefined();
    }

    // Verify no changes were applied
    const leads = await prisma.lead.findMany({
      where: { id: { in: testLeadIds } },
    });

    leads.forEach(lead => {
      expect(lead.status).toBe("NEW"); // Should still be original status
    });
  });

  it("should bulk soft delete multiple records atomically", async () => {
    await prisma.$transaction(
      testLeadIds.map(id =>
        prisma.lead.update({
          where: { id },
          data: {
            deletedAt: new Date(),
            deletedBy: testUserId,
            deleteReason: "Bulk archive",
          },
        })
      )
    );

    const leads = await prisma.lead.findMany({
      where: { id: { in: testLeadIds } },
    });

    leads.forEach(lead => {
      expect(lead.deletedAt).not.toBeNull();
      expect(lead.deletedBy).toBe(testUserId);
    });
  });
});
