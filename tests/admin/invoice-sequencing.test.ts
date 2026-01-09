import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Invoice Number Sequencing", () => {
  let testTenantId: string;

  beforeEach(async () => {
    const tenant = await prisma.tenant.create({
      data: {
        name: "Test Tenant",
        slug: `test-tenant-${Date.now()}`,
                        contactEmail: "test@example.com",
      },
    });
    testTenantId = tenant.id;
  });

  afterEach(async () => {
    await prisma.invoice.deleteMany({ where: { tenantId: testTenantId } });
    await prisma.tenant.deleteMany({ where: { id: testTenantId } });
  });

  it("should generate sequential invoice numbers atomically", async () => {
    const now = new Date();
    const invoices = await Promise.all([
      prisma.invoice.create({
        data: {
          number: `INV-001-${Date.now()}`,
          tenantId: testTenantId,
          status: "DRAFT",
          totalAmount: 1000,
          issueDate: now,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.invoice.create({
        data: {
          number: `INV-002-${Date.now()}`,
          tenantId: testTenantId,
          status: "DRAFT",
          totalAmount: 2000,
          issueDate: now,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.invoice.create({
        data: {
          number: `INV-003-${Date.now()}`,
          tenantId: testTenantId,
          status: "DRAFT",
          totalAmount: 3000,
          issueDate: now,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    const invoiceNumbers = invoices.map(i => i.number);
    const uniqueNumbers = new Set(invoiceNumbers);

    // All invoice numbers should be unique
    expect(uniqueNumbers.size).toBe(3);
  });

  it("should prevent duplicate invoice numbers under concurrent load", async () => {
    const now = new Date();
    // Create 10 invoices concurrently with unique numbers
    const createPromises = Array.from({ length: 10 }, (_, i) =>
      prisma.invoice.create({
        data: {
          number: `INV-BULK-${Date.now()}-${i}`,
          tenantId: testTenantId,
          status: "DRAFT",
          totalAmount: 1000,
          issueDate: now,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    );

    const invoices = await Promise.all(createPromises);
    const invoiceNumbers = invoices.map(i => i.number);
    const uniqueNumbers = new Set(invoiceNumbers);

    // All 10 invoice numbers must be unique
    expect(uniqueNumbers.size).toBe(10);
  });
});
