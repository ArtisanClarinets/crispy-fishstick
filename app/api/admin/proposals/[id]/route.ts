export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const updateProposalSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  status: z.enum(["draft", "sent", "approved", "rejected"]).optional(),
  items: z.array(z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["proposals.read"] });

    const proposal = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: {
        ProposalItem: true,
        ProposalApproval: {
          include: {
            User: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!proposal) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(proposal);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch proposal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["proposals.write"] });
    const body = await req.json();
    const validatedData = updateProposalSchema.parse(body);

    const existingProposal = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: { ProposalItem: true },
    });

    if (!existingProposal) {
      return new NextResponse("Not Found", { status: 404 });
    }

    let totalAmount = existingProposal.totalAmount;

    // If items are being updated, recalculate total amount
    if (validatedData.items) {
      totalAmount = validatedData.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
    }

    // Transaction to handle updates
    await prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      const updated = await tx.proposal.update({
        where: { id: params.id },
        data: {
          title: validatedData.title,
          status: validatedData.status,
          totalAmount,
        },
      });

      // 2. Handle items if provided
      if (validatedData.items) {
        // Delete existing items
        await tx.proposalItem.deleteMany({
          where: { proposalId: params.id },
        });

        // Create new items
        if (validatedData.items.length > 0) {
          await tx.proposalItem.createMany({
            data: validatedData.items.map((item) => ({
              proposalId: params.id,
              customName: item.description,
              hours: item.hours,
              rate: item.rate,
              amount: item.hours * item.rate,
            })),
          });
        }
      }

      // 3. Create approval record if status is approved or rejected
      if (validatedData.status === "approved" || validatedData.status === "rejected") {
        await tx.proposalApproval.create({
          data: {
            proposalId: params.id,
            approverId: user.id,
            status: validatedData.status,
            comment: "Status updated via admin panel",
          },
        });
      }

      return updated;
    });

    // Fetch final state for return and audit
    const finalProposal = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: { ProposalItem: true },
    });

    await createAuditLog({
      action: "update",
      resource: "proposal",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingProposal,
      after: finalProposal,
    });

    return NextResponse.json(finalProposal);
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
    console.error("Failed to update proposal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["proposals.write"] });

    const existingProposal = await prisma.proposal.findUnique({
      where: { id: params.id },
    });

    if (!existingProposal) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await prisma.proposal.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete",
      resource: "proposal",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existingProposal,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to delete proposal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
