import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { permissions: ["contracts.write"], audit: { action: "restore_contract", resource: "contract", resourceId: params.id } },
    async (user) => {
      const existing = await prisma.contract.findFirst({
        where: { id: params.id, deletedAt: { not: null }, ...tenantWhere(user) },
      });
      if (!existing) return { error: "Contract not found or not deleted", status: 404 };
      const contract = await prisma.contract.update({
        where: { id: params.id },
        data: { deletedAt: null, deletedBy: null, deleteReason: null },
      });
      return { data: contract };
    }
  );
}
