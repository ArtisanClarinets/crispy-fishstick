import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import * as z from "zod";

export const dynamic = "force-dynamic";

const createJitRequestSchema = z.object({
  roleId: z.string().optional(),
  reason: z.string().min(10),
  durationMin: z.number().min(5).max(480), // 5 min to 8 hours
});

// List JIT access requests
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["jit.read"] }, async (_user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    const where: any = {};

    if (status) where.status = status;
    if (userId) where.userId = userId;

    const [requests] = await Promise.all([
      prisma.jitAccessRequest.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(requests, pagination);
  });
}

// Create JIT access request
export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["jit.request"] }, async (user, body) => {
    const validatedData = createJitRequestSchema.parse(body);

    const request = await prisma.jitAccessRequest.create({
      data: {
        ...validatedData,
        userId: user.id,
        status: "pending",
      },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return request;
  });
}
