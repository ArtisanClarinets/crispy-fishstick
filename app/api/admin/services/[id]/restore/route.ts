import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { permissions: ["services.write"], audit: { action: "restore_service", resource: "service", resourceId: params.id } },
    async (user) => {
      const existing = await prisma.service.findFirst({
        where: { id: params.id, deletedAt: { not: null }, ...tenantWhere(user) },
      });
      if (!existing) return { error: "Service not found or not deleted", status: 404 };
      const service = await prisma.service.update({
        where: { id: params.id },
        data: { deletedAt: null, deletedBy: null, deleteReason: null },
      });
      return { data: service };
    }
  );
}
