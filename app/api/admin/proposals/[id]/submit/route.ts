export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { sendEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["proposals.write"] }, async (user) => {
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

    if (proposal.status !== "draft") {
      return { error: "Only draft proposals can be submitted", status: 400 };
    }

    const updated = await prisma.proposal.update({
      where: { id: params.id },
      data: {
        status: "pending_approval",
      },
    });

    // Send notification email
    if (proposal.clientEmail) {
      await sendEmail({
        to: proposal.clientEmail,
        subject: `Proposal Ready for Review: ${proposal.title}`,
        html: `
          <h1>Proposal Submitted</h1>
          <p>Your proposal "${proposal.title}" has been submitted for review.</p>
          <p>You will be notified once it has been reviewed.</p>
        `
      });
    }

    return { data: updated };
  });
}
