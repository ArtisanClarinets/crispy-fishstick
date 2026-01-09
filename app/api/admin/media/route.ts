import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { validateFile } from "@/lib/security/upload";
import { assertSameOrigin } from "@/lib/security/origin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin({ permissions: ["media.read"] });

    const assets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(assets, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return NextResponse.json({ error: "Invalid Origin" }, { status: 403 });
    }

    const user = await requireAdmin({ permissions: ["media.write"] });
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    try {
        validateFile(file);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "uploads"); // Private storage
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${safeName}`;
    const filepath = join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    const asset = await prisma.mediaAsset.create({
      data: {
        key: filename,
        url: `/api/uploads/${filename}`, // Serve via API
        mime: file.type,
        size: file.size,
        uploadedBy: user.email,
      },
    });

    await createAuditLog({
      action: "upload_media",
      resource: "media",
      resourceId: asset.id,
      actorId: user.id,
      actorEmail: user.email,
      after: asset,
    });

    return NextResponse.json(asset, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    console.error("Upload error:", _error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
