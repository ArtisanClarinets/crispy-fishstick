import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateContractSchema = z.object({
  title: z.string().optional(),
  status: z.enum(["draft", "pending_signature", "active", "expired", "terminated"]).optional(),
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().transform((str) => new Date(str)).optional(),
  value: z.number().min(0).optional(),
  content: z.string().optional(),
  // E-sig fields
  signedBy: z.string().optional(),
  signedAt: z.string().transform((str) => new Date(str)).optional(),
  signatureUrl: z.string().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["contracts.read"] });

    const contract = await prisma.contract.findUnique({
      where: { id: params.id },
      include: {
        Tenant: true,
        versions: {
          orderBy: { version: "desc" },
        },
      },
    });

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }

    return NextResponse.json(contract);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch contract:", error);
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
      include: { versions: true },
    });

    if (!existingContract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }

    // Handle Versioning if content changes
    if (validatedData.content && validatedData.content !== existingContract.content) {
      const nextVersion = existingContract.versions.length + 1;
      
      await prisma.contractVersion.create({
        data: {
          contractId: existingContract.id,
          version: nextVersion,
          content: existingContract.content, // Save OLD content as version history? Or new? Usually snapshot current before update.
          // Let's snapshot the PREVIOUS state.
          status: existingContract.status,
          changeLog: "Content updated",
          createdBy: user.id,
        },
      });
    }

    const updatedContract = await prisma.contract.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        versions: true,
      },
    });

    await createAuditLog({
      action: "update_contract",
      resource: "contract",
      resourceId: updatedContract.id,
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
    console.error("Failed to update contract:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["contracts.write"] });

    const existingContract = await prisma.contract.findUnique({
      where: { id: params.id },
    });

    if (!existingContract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to delete contract:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
