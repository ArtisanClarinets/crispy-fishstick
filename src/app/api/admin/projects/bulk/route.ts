import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const bulkProjectSchema = z.object({
  ids: z.array(z.string()).min(1).max(100),
  action: z.enum(["delete", "archive", "complete"]),
});

/**
 * Bulk actions on projects
 * POST /api/admin/projects/bulk
 */
export async function POST(req: NextRequest) {
  return adminMutation(
    req,
    {
      permissions: ["projects.write"],
      audit: { resource: "project", action: "bulk_action" },
    },
    async (user, body) => {
      const { ids, action } = bulkProjectSchema.parse(body);

      // Verify all projects belong to user's tenant
      const projects = await prisma.project.findMany({
        where: {
          id: { in: ids },
          ...tenantWhere(user),
          deletedAt: null,
        },
      });

      if (projects.length !== ids.length) {
        return { error: "Some projects not found or access denied", status: 403 };
      }

      let result;

      switch (action) {
        case "delete":
          result = await prisma.project.updateMany({
            where: { id: { in: ids } },
            data: {
              deletedAt: new Date(),
              deletedBy: user.id,
              deleteReason: "Bulk delete",
            },
          });
          break;

        case "archive":
          result = await prisma.project.updateMany({
            where: { id: { in: ids } },
            data: { status: "archived" },
          });
          break;

        case "complete":
          result = await prisma.project.updateMany({
            where: { id: { in: ids } },
            data: { status: "completed" },
          });
          break;

        default:
          return { error: "Invalid action", status: 400 };
      }

      return {
        success: true,
        processed: result.count,
        action,
      };
    }
  );
}
