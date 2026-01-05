import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateInvoiceSchema = z.object({
  status: z.enum(["draft", "sent", "paid", "overdue", "void"]).optional(),
  notes: z.string().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["invoices.read"] });

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        Tenant: true,
        InvoiceItem: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["invoices.write"] });

    const body = await req.json();
    const validatedData = updateInvoiceSchema.parse(body);

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        Tenant: true,
        InvoiceItem: true,
      },
    });

    await createAuditLog({
      action: "update_invoice",
      resource: "invoice",
      resourceId: updatedInvoice.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingInvoice,
      after: updatedInvoice,
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to update invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["invoices.write"] });

    const existingInvoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    await prisma.invoice.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_invoice",
      resource: "invoice",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingInvoice,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to delete invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
