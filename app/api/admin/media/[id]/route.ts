export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateMediaSchema = z.object({
  key: z.string().optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "TENANT", "PROJECT"]).optional(),
  deleteReason: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return adminRead(req, { permissions: ["media.read"] }, async (user) => {
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        id,
        ...tenantWhere(user),
      },
    });

    if (!asset) {
      return { error: "Media asset not found", status: 404 };
    }

    return { data: asset };
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return adminMutation(req, { permissions: ["media.write"] }, async (user, body) => {
    const validated = updateMediaSchema.parse(body);

    const existing = await prisma.mediaAsset.findFirst({
      where: {
        id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existing) {
      return { error: "Media asset not found", status: 404 };
    }

    const updated = await prisma.mediaAsset.update({
      where: { id },
      data: validated,
    });

    return { data: updated };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return adminMutation(req, { permissions: ["media.write"] }, async (user, body) => {
    const { deleteReason } = updateMediaSchema.parse(body);

    const existing = await prisma.mediaAsset.findFirst({
      where: {
        id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existing) {
      return { error: "Media asset not found", status: 404 };
    }

    await prisma.mediaAsset.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
        deleteReason: deleteReason || "Archived by admin",
      },
    });

    return { data: null, status: 204 };
  });
}
