export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { tenantWhere } from "@/shared/lib/admin/guards";

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["media.write"] }, async (user) => {
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: { not: null },
      },
    });

    if (!asset) {
      return { error: "Archived media asset not found", status: 404 };
    }

    const restored = await prisma.mediaAsset.update({
      where: { id: params.id },
      data: {
        deletedAt: null,
        deletedBy: null,
        deleteReason: null,
      },
    });

    return { data: restored };
  });
}
