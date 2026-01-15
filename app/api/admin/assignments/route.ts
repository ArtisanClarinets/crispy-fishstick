import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const createAssignmentSchema = z.object({
  projectId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  allocationPercentage: z.number().min(0).max(100).default(100),
});

// List assignments with pagination
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["assignments.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const projectId = searchParams.get("projectId");
    const userId = searchParams.get("userId");

    const where: {
      projectId?: string;
      userId?: string;
    } = {};

    // Tenant scoping via project
    if (projectId) {
      const project = await prisma.project.findFirst({
        where: { id: projectId, ...tenantWhere(user), deletedAt: null },
      });
      if (!project) {
        return { error: "Project not found or access denied", status: 403 };
      }
      where.projectId = projectId;
    }

    if (userId) where.userId = userId;

    const [assignments] = await Promise.all([
      prisma.assignment.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { startDate: "desc" },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Project: {
            select: { id: true, name: true, tenantId: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(assignments, pagination);
  });
}

// Create assignment
export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["assignments.write"] }, async (user, body) => {
    const validatedData = createAssignmentSchema.parse(body);

    // Verify project exists and user has access
    const project = await prisma.project.findFirst({
      where: {
        id: validatedData.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!project) {
      return { error: "Project not found or access denied", status: 403 };
    }

    const assignment = await prisma.assignment.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined,
      },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Project: {
          select: { id: true, name: true, tenantId: true },
        },
      },
    });

    return assignment;
  });
}
