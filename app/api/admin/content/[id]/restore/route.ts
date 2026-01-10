export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["content.write"] }, async (_user) => {
    const item = await prisma.content.findFirst({
      where: {
        id: params.id,
        deletedAt: { not: null },
      },
    });

    if (!item) {
      return { error: "Archived content not found", status: 404 };
    }

    const restored = await prisma.content.update({
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
