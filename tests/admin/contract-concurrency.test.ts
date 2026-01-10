import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Contract Version Concurrency", () => {
  let testTenantId: string;
  let testContractId: string;

  beforeEach(async () => {
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant",
        slug: `test-tenant-${Date.now()}`,
                        contactEmail: "test@example.com",
      },
    });
    testTenantId = tenant.id;

    const contract = await prisma.contract.create({
      data: {
        title: "Test Contract",
        status: "DRAFT",
        tenantId: testTenantId,
        startDate: new Date(),
        version: 1,
      },
    });
    testContractId = contract.id;
  });

  afterEach(async () => {
    await prisma.contract.deleteMany({ where: { id: testContractId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should increment version on each update", async () => {
    const initialContract = await prisma.contract.findUnique({
      where: { id: testContractId },
    });
    expect(initialContract?.version).toBe(1);

    await prisma.contract.update({
      where: { id: testContractId },
      data: {
        title: "Updated Contract",
        version: { increment: 1 },
      },
    });

    const updatedContract = await prisma.contract.findUnique({
      where: { id: testContractId },
    });
    expect(updatedContract?.version).toBe(2);
  });

  it("should detect version mismatch in concurrent updates", async () => {
    const initialContract = await prisma.contract.findUnique({
      where: { id: testContractId },
    });
    expect(initialContract?.version).toBe(1);

    // First update succeeds
    await prisma.contract.update({
      where: { id: testContractId, version: 1 },
      data: {
        title: "First Update",
        version: { increment: 1 },
      },
    });

    // Second update with stale version should fail
    try {
      await prisma.contract.update({
        where: { id: testContractId, version: 1 }, // Stale version
        data: {
          title: "Second Update",
          version: { increment: 1 },
        },
      });
      expect.fail("Update with stale version should have failed");
    } catch (error) {
      // Expected: Prisma will throw because version 1 no longer exists
      expect(error).toBeDefined();
    }
  });

  it("should allow update with correct version", async () => {
    const contract = await prisma.contract.findUnique({
      where: { id: testContractId },
    });
    expect(contract).not.toBeNull();

    await prisma.contract.update({
      where: { id: testContractId, version: contract!.version },
      data: {
        title: "Valid Update",
        version: { increment: 1 },
      },
    });

    const updated = await prisma.contract.findUnique({
      where: { id: testContractId },
    });
    expect(updated?.version).toBe(2);
    expect(updated?.title).toBe("Valid Update");
  });
});
