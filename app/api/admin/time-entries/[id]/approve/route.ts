import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/time-entries/[id]/approve
 * Approve a submitted time entry
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    {
      permissions: ["time.approve"],
      audit: { resource: "timeEntry", action: "approve", resourceId: params.id },
    },
    async (user) => {
      const timeEntry = await prisma.timeEntry.findFirst({
        where: { 
          id: params.id, 
          deletedAt: null,
        },
        include: { Project: true },
      });
      
      if (!timeEntry) {
        return { error: "Time entry not found", status: 404 };
      }

      // Verify access via project
      const hasAccess = await prisma.project.findFirst({
        where: {
          id: timeEntry.projectId,
          ...tenantWhere(user),
        },
      });

      if (!hasAccess) {
        return { error: "Access denied", status: 403 };
      }
      
      if (timeEntry.status !== "submitted") {
        return { error: "Only submitted time entries can be approved", status: 400 };
      }
      
      const updated = await prisma.timeEntry.update({
        where: { id: params.id },
        data: { 
          status: "approved",
          approvedBy: user.id,
          approvedAt: new Date(),
        },
      });
      
      return updated;
    }
  );
}
