import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { unlink } from "fs/promises";
import { join } from "path";
import { assertSameOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return NextResponse.json({ error: "Invalid Origin" }, { status: 403 });
    }

    const user = await requireAdmin({ permissions: ["media.write"] });

    const asset = await prisma.mediaAsset.findUnique({
      where: { id: params.id },
    });

    if (!asset) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Delete file using asset.key (not URL)
    try {
      const filepath = join(process.cwd(), "uploads", asset.key);
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

    return NextResponse.json(asset, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    if (_error instanceof Error && _error.message === "Invalid Origin") {
      return NextResponse.json(
        { error: "Invalid Origin" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (_error instanceof Error && _error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (_error instanceof Error && _error.message === "Forbidden") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: { "Cache-Control": "no-store" } }
      );
    }
    console.error("Failed to delete media:", _error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
