export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { parseCommonFilters, buildDeletedFilter, buildDateRangeFilter } from "@/shared/lib/api/filters/common";
import { z } from "zod";
import { createHash } from "crypto";

const createInvoiceSchema = z.object({
  tenantId: z.string().min(1, "Tenant is required"),
  issueDate: z.string().transform((str) => new Date(str)),
  dueDate: z.string().transform((str) => new Date(str)),
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).default("draft"),
  notes: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(0.01, "Quantity must be positive"),
    unitPrice: z.number().min(0, "Unit price must be non-negative"),
  })).min(1, "At least one item is required"),
});

/**
 * GET /api/admin/invoices
 * List invoices with pagination, filtering, and tenant scoping
 */
export const GET = adminRead(
  { permissions: ["invoices.read"] },
  async (req, { user }) => {
    const { searchParams } = req.nextUrl;
    
    // Parse pagination and filters
    const pagination = parsePaginationParams(searchParams);
    const filters = parseCommonFilters(searchParams);
    
    // Build where clause with tenant scoping
    const where: any = {
      ...tenantWhere(user, filters.tenantId || undefined),
      ...buildDeletedFilter(filters.includeDeleted),
      ...buildDateRangeFilter("createdAt", filters.dateFrom, filters.dateTo),
    };
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    if (filters.q) {
      where.OR = [
        { number: { contains: filters.q, mode: "insensitive" } },
        { notes: { contains: filters.q, mode: "insensitive" } },
      ];
    }
    
    // Query with pagination
    const prismaParams = getPrismaParams(pagination);
    const invoices = await prisma.invoice.findMany({
      where,
      ...prismaParams,
      orderBy: { createdAt: "desc" },
      include: {
        Tenant: true,
        InvoiceItem: true,
        TimeEntry: true,
      },
    });
    
    const result = buildPaginationResult(invoices, pagination);
    
    return NextResponse.json(result);
  }
);

/**
 * POST /api/admin/invoices
 * Create invoice with atomic sequence numbering and idempotency
 */
export const POST = adminMutation(
  { 
    permissions: ["invoices.write"],
    rateLimitKey: "invoice:create",
    rateLimitMax: 50,
    audit: { resource: "invoice", action: "create" },
  },
  async (req, { user }) => {
    const body = await req.json();
    const validatedData = createInvoiceSchema.parse(body);
    
    // Tenant scoping check
    const tenantCheck = tenantWhere(user, validatedData.tenantId);
    if (!tenantCheck.tenantId) {
      throw new Error("Forbidden: Invalid tenant access");
    }
    
    // Check idempotency
    const idempotencyKey = req.headers.get("x-idempotency-key");
    if (idempotencyKey) {
      const hash = createHash("sha256").update(JSON.stringify(body)).digest("hex");
      
      const existing = await prisma.idempotencyKey.findUnique({
        where: { key: idempotencyKey },
      });
      
      if (existing) {
        // Return cached response
        return new NextResponse(existing.responseBody, {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      // Store idempotency key check
      await prisma.idempotencyKey.create({
        data: {
          key: idempotencyKey,
          userId: user.id,
          route: req.nextUrl.pathname,
          requestHash: hash,
          responseBody: "", // Will update after creation
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });
    }
    
    // Atomic sequence numbering with transaction
    const invoice = await prisma.$transaction(async (tx) => {
      const year = new Date(validatedData.issueDate).getFullYear();
      
      // Upsert and increment sequence
      const sequence = await tx.invoiceSequence.upsert({
        where: {
          tenantId_year: {
            tenantId: validatedData.tenantId,
            year,
          },
        },
        create: {
          tenantId: validatedData.tenantId,
          year,
          lastSeq: 1,
        },
        update: {
          lastSeq: {
            increment: 1,
          },
        },
      });
      
      const number = `INV-${year}-${sequence.lastSeq.toString().padStart(6, "0")}`;
      const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      
      // Create invoice
      const newInvoice = await tx.invoice.create({
        data: {
          number,
          tenantId: validatedData.tenantId,
          issueDate: validatedData.issueDate,
          dueDate: validatedData.dueDate,
          status: validatedData.status,
          notes: validatedData.notes,
          totalAmount,
          InvoiceItem: {
            create: validatedData.items.map(item => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              amount: item.quantity * item.unitPrice,
            })),
          },
        },
        include: {
          InvoiceItem: true,
          Tenant: true,
        },
      });
      
      return newInvoice;
    });
    
    const response = NextResponse.json(invoice, { status: 201 });
    
    // Update idempotency cache
    if (idempotencyKey) {
      await prisma.idempotencyKey.update({
        where: { key: idempotencyKey },
        data: { responseBody: JSON.stringify(invoice) },
      });
    }
    
    return response;
  }
);
