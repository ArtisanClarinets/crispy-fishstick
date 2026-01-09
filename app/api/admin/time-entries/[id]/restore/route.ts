import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

// Restore soft-deleted time entry
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { permissions: ["time.write"] },
    async (user) => {
      const entry = await prisma.timeEntry.findFirst({
        where: { id: params.id, deletedAt: { not: null } },
        include: { Project: true },
      });

      if (!entry) {
        return { error: "Time entry not found", status: 404 };
      }

      // Verify access
      const hasAccess = await prisma.project.findFirst({
        where: {
          id: entry.projectId,
          ...tenantWhere(user),
        },
      });

      if (!hasAccess) {
        return { error: "Access denied", status: 403 };
      }

      const restored = await prisma.timeEntry.update({
        where: { id: params.id },
        data: {
          deletedAt: null,
          deletedBy: null,
          deleteReason: null,
        },
      });

      return restored;
    }
  );
}
