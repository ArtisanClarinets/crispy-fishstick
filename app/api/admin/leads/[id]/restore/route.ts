import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { 
      permissions: ["leads.write"], 
      audit: { action: "restore_lead", resource: "lead", resourceId: params.id } 
    },
    async (user) => {
      // Verify lead exists and is soft deleted
      const existing = await prisma.lead.findFirst({
        where: {
          id: params.id,
          deletedAt: { not: null },
          ...tenantWhere(user),
        },
      });

      if (!existing) {
        return { error: "Lead not found or not deleted", status: 404 };
      }

      // Restore the lead
      const lead = await prisma.lead.update({
        where: { id: params.id },
        data: {
          deletedAt: null,
          deletedBy: null,
          deleteReason: null,
        },
      });

      return { data: lead };
    }
  );
}
