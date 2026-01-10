import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateInvoiceSchema = z.object({
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).optional(),
  notes: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminRead(req, { permissions: ["invoices.read"] }, async (user) => {
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
        ...tenantWhere(user),
      },
      include: {
        Tenant: true,
        InvoiceItem: true,
      },
    });

    if (!invoice) {
      return { error: "Invoice not found", status: 404 };
    }

    return { data: invoice };
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(
    req,
    {
      permissions: ["invoices.write"],
      audit: { action: "update_invoice", resource: "invoice", resourceId: params.id },
    },
    async (user, body) => {
      const validatedData = updateInvoiceSchema.parse(body);

      const invoice = await prisma.invoice.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: validatedData,
      });

      if (invoice.count === 0) {
        return { error: "Invoice not found or already deleted", status: 404 };
      }

      const updated = await prisma.invoice.findUniqueOrThrow({
        where: { id: params.id },
        include: {
          Tenant: true,
          InvoiceItem: true,
        },
      });

      return { data: updated };
    }
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(
    req,
    {
      permissions: ["invoices.write"],
      audit: { action: "delete_invoice", resource: "invoice", resourceId: params.id },
    },
    async (user) => {
      const deleteReason = req.headers.get("X-Delete-Reason") || "Deleted by admin";

      const invoice = await prisma.invoice.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: {
          deletedAt: new Date(),
          deletedBy: user.id,
          deleteReason,
        },
      });

      if (invoice.count === 0) {
        return { error: "Invoice not found or already deleted", status: 404 };
      }

      return { data: { success: true, message: "Invoice soft deleted" } };
    }
  );
}
