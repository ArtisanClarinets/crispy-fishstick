export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

const createProposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["draft", "sent", "approved", "rejected"]).default("draft"),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).min(1, "At least one item is required"),
});

export async function GET() {
  try {
    await requireAdmin({ permissions: ["proposals.read"] });

    const proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { ProposalItem: true, ProposalApproval: true },
        },
      },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
        return new NextResponse("Forbidden", { status: 403 });
    }
    console.error("Failed to fetch proposals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin({ permissions: ["proposals.write"] });
    const body = await req.json();

    const validatedData = createProposalSchema.parse(body);

    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);

    const proposal = await prisma.proposal.create({
      data: {
        title: validatedData.title,
        status: validatedData.status,
        totalAmount,
        ProposalItem: {
          create: validatedData.items.map(item => ({
            customName: item.description,
            hours: item.hours,
            rate: item.rate,
            amount: item.hours * item.rate
          }))
        }
      },
      include: {
        ProposalItem: true,
      }
    });

    await createAuditLog({
      action: "create",
      resource: "proposal",
      resourceId: proposal.id,
      actorId: user.id,
      actorEmail: user.email,
      after: proposal,
    });

    return NextResponse.json(proposal, { status: 201 });
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
    console.error("Failed to create proposal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
