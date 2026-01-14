import { NextRequest } from "next/server";
import { adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(
    request,
    { permissions: ["users.write"], audit: { action: "restore_user", resource: "user", resourceId: params.id } },
    async () => {
      const existing = await prisma.user.findFirst({
        where: { id: params.id, deletedAt: { not: null } },
      });
      if (!existing) return { error: "User not found or not deleted", status: 404 };
      const user = await prisma.user.update({
        where: { id: params.id },
        data: { deletedAt: null, deletedBy: null, deleteReason: null },
      });
      return { data: user };
    }
  );
}
