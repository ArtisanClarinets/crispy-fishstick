export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminRead } from "@/lib/admin/route";
import { tenantWhere } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * GET /api/admin/media/[id]/download
 * Download private media artifact with authentication and audit
 */
export const GET = adminRead(
  { permissions: ["media.read"] },
  async (_req, { user, params }: any) => {
    const { id } = params;
    
    const asset = await prisma.mediaAsset.findUnique({
      where: { id, deletedAt: null },
    });
    
    if (!asset) {
      return NextResponse.json({ error: "Media asset not found" }, { status: 404 });
    }
    
    // Enforce tenant scoping for tenant-scoped assets
    if (asset.tenantId) {
      try {
        tenantWhere(user, asset.tenantId);
      } catch {
        return NextResponse.json(
          { error: "Forbidden: Cannot access this asset" },
          { status: 403 }
        );
      }
    }
    
    // Check visibility
    if (asset.visibility === "private" && !user.permissions.includes("*")) {
      // Only global admins can access private assets
      // In production, implement more granular access control
      return NextResponse.json(
        { error: "Forbidden: Insufficient permissions for private asset" },
        { status: 403 }
      );
    }
    
    // Audit the download
    await createAuditLog({
      action: "download",
      resource: "media",
      resourceId: asset.id,
      actorId: user.id,
      actorEmail: user.email,
    });
    
    // Determine file path
    const uploadsDir = process.env.UPLOADS_DIR || "./uploads";
    const filePath = asset.storageKey
      ? path.join(uploadsDir, asset.storageKey)
      : path.join(uploadsDir, asset.key);
    
    // Check if file exists
    if (!existsSync(filePath)) {
      console.error(`[Media Download] File not found: ${filePath}`);
      return NextResponse.json(
        { error: "File not found on disk" },
        { status: 404 }
      );
    }
    
    // Read file
    const fileBuffer = await readFile(filePath);
    
    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": asset.contentType || asset.mime || "application/octet-stream",
        "Content-Disposition": asset.contentDisposition || `attachment; filename="${asset.key}"`,
        "Content-Length": asset.size.toString(),
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
);
