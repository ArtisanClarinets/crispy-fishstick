export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

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

export async function GET() {
  try {
    await requireAdmin({ permissions: ["invoices.read"] });

    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Tenant: true,
        InvoiceItem: true,
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch invoices:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin({ permissions: ["invoices.write"] });

    const body = await req.json();
    const validatedData = createInvoiceSchema.parse(body);

    // Generate Invoice Number (Simple auto-increment-like logic for now or UUID part)
    // In a real app, we might check the last invoice number for the tenant or system-wide
    const count = await prisma.invoice.count();
    const number = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const invoice = await prisma.invoice.create({
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
            amount: item.quantity * item.unitPrice
          }))
        }
      },
      include: {
        InvoiceItem: true,
      }
    });

    await createAuditLog({
      action: "create",
      resource: "invoice",
      resourceId: invoice.id,
      actorId: user.id,
      actorEmail: user.email,
      after: invoice,
    });

    return NextResponse.json(invoice, { status: 201 });
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
    console.error("Failed to create invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
