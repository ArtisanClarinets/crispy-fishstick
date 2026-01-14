export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { z } from "zod";

const rejectSchema = z.object({
  comment: z.string().min(1, "Rejection reason is required"),
});

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["proposals.approve"] }, async (user, body) => {
    const { comment } = rejectSchema.parse(body);

    const proposal = await prisma.proposal.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!proposal) {
      return { error: "Proposal not found", status: 404 };
    }

    if (proposal.status !== "pending_approval") {
      return { error: "Only proposals pending approval can be rejected", status: 400 };
    }

    await prisma.$transaction(async (tx) => {
      await tx.proposal.update({
        where: { id: params.id },
        data: {
          status: "rejected",
        },
      });

      await tx.proposalApproval.create({
        data: {
          proposalId: params.id,
          approverId: user.id,
          status: "rejected",
          comment,
        },
      });
    });

    const updated = await prisma.proposal.findUnique({
      where: { id: params.id },
      include: { ProposalApproval: true },
    });

    return { data: updated };
  });
}
