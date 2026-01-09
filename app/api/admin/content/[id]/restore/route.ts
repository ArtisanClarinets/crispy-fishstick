import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { permissions: ["content.write"], audit: { action: "restore_content", resource: "content", resourceId: params.id } },
    async () => {
      const existing = await prisma.content.findFirst({
        where: { id: params.id, deletedAt: { not: null } },
      });
      if (!existing) return { error: "Content not found or not deleted", status: 404 };
      const content = await prisma.content.update({
        where: { id: params.id },
        data: { deletedAt: null, deletedBy: null, deleteReason: null },
      });
      return { data: content };
    }
  );
}
