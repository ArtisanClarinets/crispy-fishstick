export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { sendEmail } from "@/lib/email";
import { z } from "zod";

const updateProposalSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  status: z.enum(["draft", "sent", "approved", "rejected", "pending_approval"]).optional(),
  validUntil: z.string().optional(),
  deleteReason: z.string().optional(),
  items: z.array(z.object({
    id: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminRead(req, { permissions: ["proposals.read"] }, async (user) => {
    const proposal = await prisma.proposal.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
      },
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
      return { error: "Proposal not found", status: 404 };
    }

    return { data: proposal };
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["proposals.write"] }, async (user, body) => {
    const validatedData = updateProposalSchema.parse(body);

    const existingProposal = await prisma.proposal.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
      include: { ProposalItem: true },
    });

    if (!existingProposal) {
      return { error: "Proposal not found", status: 404 };
    }

    let totalAmount = existingProposal.totalAmount;

    // If items are being updated, recalculate total amount
    if (validatedData.items) {
      totalAmount = validatedData.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
    }

    // Transaction to handle updates
    const finalProposal = await prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      await tx.proposal.update({
        where: { id: params.id },
        data: {
          title: validatedData.title,
          status: validatedData.status,
          validUntil: validatedData.validUntil ? new Date(validatedData.validUntil) : undefined,
          totalAmount,
        },
      });

      // Handle Mock Email Sending
      if (validatedData.status === "pending_approval" || validatedData.status === "sent") {
        const clientEmail = existingProposal.clientEmail || "client@example.com";
        await sendEmail({
          to: clientEmail,
          subject: `Proposal: ${existingProposal.title}`,
          html: `
            <h1>Proposal Update</h1>
            <p>Your proposal "${existingProposal.title}" has been updated to status: ${validatedData.status}.</p>
            <p>Please review and approve.</p>
          `
        });
      }

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

      // Fetch final state
      return await tx.proposal.findUnique({
        where: { id: params.id },
        include: { ProposalItem: true },
      });
    });

    return { data: finalProposal };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["proposals.write"] }, async (user, body) => {
    const { deleteReason } = updateProposalSchema.parse(body);

    const existingProposal = await prisma.proposal.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingProposal) {
      return { error: "Proposal not found", status: 404 };
    }

    await prisma.proposal.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
        deleteReason: deleteReason || "Archived by admin",
      },
    });

    return { data: null, status: 204 };
  });
}
