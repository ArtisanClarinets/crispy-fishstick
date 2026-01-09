import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const createTimeEntrySchema = z.object({
  projectId: z.string(),
  userId: z.string(),
  date: z.string(),
  hours: z.number().positive(),
  description: z.string().optional(),
  billable: z.boolean().default(true),
  status: z.enum(["draft", "submitted"]).default("draft"),
});

// List time entries with pagination and filters
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["time.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    // Filters from query params
    const projectId = searchParams.get("projectId");
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const showArchived = searchParams.get("archived") === "true";

    const where: any = {
      deletedAt: showArchived ? undefined : null,
    };

    if (projectId) {
      where.projectId = projectId;
      // Verify project belongs to user's tenant
      const project = await prisma.project.findFirst({
        where: { id: projectId, ...tenantWhere(user), deletedAt: null },
      });
      if (!project) {
        return { error: "Project not found or access denied", status: 403 };
      }
    }

    if (userId) where.userId = userId;
    if (status) where.status = status;

    const [entries] = await Promise.all([
      prisma.timeEntry.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { date: "desc" },
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

    return buildPaginationResult(entries, pagination);
  });
}

// Create time entry
export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["time.write"] }, async (user, body) => {
    const validatedData = createTimeEntrySchema.parse(body);

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

    const entry = await prisma.timeEntry.create({
      data: validatedData,
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Project: {
          select: { id: true, name: true, tenantId: true },
        },
      },
    });

    return entry;
  });
}
