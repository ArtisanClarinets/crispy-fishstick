export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["incidents.write"] }, async (user) => {
    const incident = await prisma.incident.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: { not: null },
      },
    });

    if (!incident) {
      return { error: "Archived incident not found", status: 404 };
    }

    const restored = await prisma.incident.update({
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
