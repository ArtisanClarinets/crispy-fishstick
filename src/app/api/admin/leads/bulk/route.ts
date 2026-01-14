import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const bulkLeadSchema = z.object({
  ids: z.array(z.string()).min(1).max(100),
  action: z.enum(["delete", "archive", "assign"]),
  assignedTo: z.string().optional(),
});

/**
 * Bulk actions on leads
 * POST /api/admin/leads/bulk
 * Body: { ids: string[], action: "delete"|"archive"|"assign", assignedTo?: string }
 */
export async function POST(req: NextRequest) {
  return adminMutation(
    req,
    {
      permissions: ["leads.write"],
      audit: { resource: "lead", action: "bulk_action" },
    },
    async (user, body) => {
      const { ids, action, assignedTo } = bulkLeadSchema.parse(body);

      // Verify all leads belong to user's tenant
      const leads = await prisma.lead.findMany({
        where: {
          id: { in: ids },
          ...tenantWhere(user),
          deletedAt: null,
        },
      });

      if (leads.length !== ids.length) {
        return { error: "Some leads not found or access denied", status: 403 };
      }

      let result;

      switch (action) {
        case "delete":
          result = await prisma.lead.updateMany({
            where: { id: { in: ids } },
            data: {
              deletedAt: new Date(),
              deletedBy: user.id,
              deleteReason: "Bulk delete",
            },
          });
          break;

        case "archive":
          result = await prisma.lead.updateMany({
            where: { id: { in: ids } },
            data: { status: "archived" },
          });
          break;

        case "assign":
          if (!assignedTo) {
            return { error: "assignedTo required for assign action", status: 400 };
          }
          result = await prisma.lead.updateMany({
            where: { id: { in: ids } },
            data: { assignedTo },
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
