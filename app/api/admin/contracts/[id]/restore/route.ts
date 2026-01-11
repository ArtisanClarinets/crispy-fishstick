export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["contracts.write"] }, async (user) => {
    const contract = await prisma.contract.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: { not: null },
      },
    });

    if (!contract) {
      return { error: "Archived contract not found", status: 404 };
    }

    const restored = await prisma.contract.update({
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
