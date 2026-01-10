export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMutation } from "@/lib/admin/route";

/**
 * POST /api/admin/invoices/[id]/restore
 * Restore a soft-deleted invoice
 */
export const POST = adminMutation(
  {
    permissions: ["invoices.write"],
    audit: { resource: "invoice", action: "restore" },
  },
  async (req, { user: _user, params }: any) => {
    const { id } = params;
    
    // Verify invoice exists and is deleted
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    
    if (!invoice.deletedAt) {
      return NextResponse.json({ error: "Invoice is not deleted" }, { status: 400 });
    }
    
    // Restore
    const restored = await prisma.invoice.update({
      where: { id },
      data: {
        deletedAt: null,
        deletedBy: null,
        deleteReason: null,
      },
      include: {
        Tenant: true,
        InvoiceItem: true,
      },
    });
    
    return NextResponse.json(restored);
  }
);
