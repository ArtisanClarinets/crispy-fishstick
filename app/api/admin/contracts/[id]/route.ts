export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateContractSchema = z.object({
  title: z.string().min(1).optional(),
  tenantId: z.string().min(1).optional(),
  status: z.string().optional(),
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().nullable().transform((str) => str ? new Date(str) : null).optional(),
  value: z.number().min(0).optional(),
  content: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["contracts.read"] });
    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
      include: {
        Tenant: true,
      },
    });

    if (!contract) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(contract);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["contracts.write"] });
    const body = await req.json();
    const validatedData = updateContractSchema.parse(body);

    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id },
    });

    if (!existingContract) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedContract = await prisma.contract.update({
      where: { id: params.id },
      data: validatedData,
    });

    await createAuditLog({
      action: "update_contract",
      resource: "contract",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingContract,
      after: updatedContract,
    });

    return NextResponse.json(updatedContract);
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["contracts.write"] });

    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id },
    });

    if (!existingContract) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prisma.contract.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_contract",
      resource: "contract",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingContract,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
