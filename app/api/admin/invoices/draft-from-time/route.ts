export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMutation } from "@/lib/admin/route";
import { z } from "zod";

const draftFromTimeSchema = z.object({
  projectId: z.string().optional(),
  tenantId: z.string().min(1, "Tenant is required"),
  dueDate: z.string().transform((str) => new Date(str)),
});

/**
 * POST /api/admin/invoices/draft-from-time
 * Generate draft invoice from approved, unbilled time entries
 */
export const POST = adminMutation(
  {
    permissions: ["invoices.write", "time.read"],
    audit: { resource: "invoice", action: "draft_from_time" },
  },
  async (req, { user: _user }) => {
    const body = await req.json();
    const { projectId, tenantId, dueDate } = draftFromTimeSchema.parse(body);
    
    // Query approved, unbilled time entries
    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        status: "approved",
        billable: true,
        invoiceId: null,
        deletedAt: null,
        ...(projectId ? { projectId } : {}),
        Project: {
          tenantId,
          deletedAt: null,
        },
      },
      include: {
        User: true,
        Project: true,
      },
    });
    
    if (timeEntries.length === 0) {
      return NextResponse.json(
        { error: "No approved, unbilled time entries found" },
        { status: 400 }
      );
    }
    
    // Group by project and user, calculate totals
    const grouped: Record<string, any[]> = {};
    for (const entry of timeEntries) {
      const key = `${entry.Project.name} - ${entry.User.name || entry.User.email}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(entry);
    }
    
    // Create invoice items
    const items = Object.entries(grouped).map(([description, entries]) => {
      const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
      const rate = 150; // Default hourly rate - should be configurable
      return {
        description: `${description} (${totalHours} hours)`,
        quantity: totalHours,
        unitPrice: rate,
        amount: totalHours * rate,
      };
    });
    
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    
    // Create draft invoice (not using sequence since it's draft)
    const draftNumber = `DRAFT-${Date.now()}`;
    
    const invoice = await prisma.invoice.create({
      data: {
        number: draftNumber,
        tenantId,
        status: "draft",
        issueDate: new Date(),
        dueDate,
        totalAmount,
        notes: `Auto-generated from ${timeEntries.length} time entries`,
        InvoiceItem: {
          create: items,
        },
      },
      include: {
        InvoiceItem: true,
        Tenant: true,
      },
    });
    
    // Link time entries to invoice
    await prisma.timeEntry.updateMany({
      where: {
        id: { in: timeEntries.map(e => e.id) },
      },
      data: {
        invoiceId: invoice.id,
      },
    });
    
    return NextResponse.json({
      invoice,
      timeEntriesCount: timeEntries.length,
    }, { status: 201 });
  }
);
