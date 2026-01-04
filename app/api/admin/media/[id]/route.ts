import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { unlink } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  void req;
  try {
    const user = await requireAdmin({ permissions: ["media.write"] });

    const asset = await prisma.mediaAsset.findUnique({
      where: { id: params.id },
    });

    if (!asset) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete file
    try {
      const filepath = join(process.cwd(), "public", asset.url); // url is like /uploads/filename
      await unlink(filepath);
    } catch (err) {
      console.error("Failed to delete file:", err);
      // Continue to delete record even if file is missing
    }

    await prisma.mediaAsset.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_media",
      resource: "media",
      resourceId: asset.id,
      actorId: user.id,
      actorEmail: user.email,
      before: asset,
    });

    return NextResponse.json(asset);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
