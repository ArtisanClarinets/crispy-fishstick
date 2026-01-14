export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { sendEmail } from "@/shared/lib/email";

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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
