export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const createProposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["draft", "pending_approval", "approved", "rejected", "sent"]).default("draft"),
  clientEmail: z.string().email().optional().or(z.literal("")),
  content: z.string().optional(),
  validUntil: z.string().optional(),
  tenantId: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).min(1, "At least one item is required"),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["proposals.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    // Filters
    const status = searchParams.get("status") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...tenantWhere(user),
      ...(status && { status }),
      ...(!showArchived && { deletedAt: null }),
    };

    const proposals = await prisma.proposal.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pagination.take,
      ...(pagination.cursor && {
        cursor: { id: pagination.cursor },
        skip: 1,
      }),
      include: {
        _count: {
          select: { ProposalItem: true, ProposalApproval: true },
        },
      },
    });

    return { data: buildPaginationResult(proposals, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["proposals.write"] }, async (user, body) => {
    const validatedData = createProposalSchema.parse(body);

    // Validate tenant if provided
    if (validatedData.tenantId) {
      const tenant = await prisma.tenant.findUnique({
        where: { id: validatedData.tenantId, deletedAt: null },
      });
      if (!tenant) {
        return { error: "Invalid tenant", status: 400 };
      }
    }

    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.hours * item.rate), 0);

    const proposal = await prisma.proposal.create({
      data: {
        title: validatedData.title,
        status: validatedData.status,
        clientEmail: validatedData.clientEmail || null,
        content: validatedData.content,
        validUntil: validatedData.validUntil ? new Date(validatedData.validUntil) : null,
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

    return { data: proposal, status: 201 };
  });
}
