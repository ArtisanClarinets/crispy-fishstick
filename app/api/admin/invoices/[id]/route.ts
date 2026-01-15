import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";
import crypto from "crypto";

const updateInvoiceSchema = z.object({
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).optional(),
  notes: z.string().optional(),
});

export const dynamic = "force-dynamic";

function generateETag(data: Record<string, unknown> | string | number) {
  // Updated to use SHA-256 for stronger ETag generation.
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

// Wrapper to inject ETag
export async function GET_WITH_ETAG(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const response = await adminRead(req, { permissions: ["invoices.read"] }, async (user) => {
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

        // Pass result
        return { data: invoice };
    });

    if (response.ok) {
        // We need to calculate ETag from the body.
        // We can clone the response.
        const clone = response.clone();
        const body = await clone.json();
        if (body) {
            const etag = generateETag(body);
            response.headers.set("ETag", etag);
        }
    }
    return response;
}
// Replace export
export { GET_WITH_ETAG as GET };


export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  // Check If-Match header
  const ifMatch = req.headers.get("If-Match");
  if (!ifMatch) {
      // It is cleaner to enforce it, but maybe optional? The instruction says "implement If-Match... return 412 on mismatch".
      // Usually implies it is required or verified if present. I'll make it verified if present, or required?
      // "implement If-Match/ETag support" -> usually means optimistic concurrency.
  }

  return adminMutation(
    req,
    {
      permissions: ["invoices.write"],
      audit: { action: "update_invoice", resource: "invoice", resourceId: params.id },
    },
    async (user, body) => {
      // Fetch current version to check ETag
      const currentInvoice = await prisma.invoice.findUnique({
          where: { id: params.id },
          include: { Tenant: true, InvoiceItem: true }
      });

      if (!currentInvoice) return { error: "Invoice not found", status: 404 };

      if (ifMatch) {
          const currentETag = generateETag(currentInvoice);
          if (currentETag !== ifMatch && currentETag !== `"${ifMatch}"`) { // Handle quotes
               return { error: "Precondition Failed", status: 412 };
          }
      }

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

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
