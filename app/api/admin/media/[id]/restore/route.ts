import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { permissions: ["media.write"], audit: { action: "restore_media", resource: "media", resourceId: params.id } },
    async (user) => {
      const existing = await prisma.mediaAsset.findFirst({
        where: { id: params.id, deletedAt: { not: null }, ...tenantWhere(user) },
      });
      if (!existing) return { error: "Media not found or not deleted", status: 404 };
      const media = await prisma.mediaAsset.update({
        where: { id: params.id },
        data: { deletedAt: null, deletedBy: null, deleteReason: null },
      });
      return { data: media };
    }
  );
}
