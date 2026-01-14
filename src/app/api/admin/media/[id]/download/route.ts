export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { adminRead } from "@/shared/lib/admin/route";
import { tenantWhere } from "@/shared/lib/admin/guards";
import { createAuditLog } from "@/shared/lib/admin/audit";
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
    
    // Try to find by ID first, then storageKey
    // Since storageKey is unique, we can query it directly if ID lookup fails
    // or use findFirst with OR condition
    const asset = await prisma.mediaAsset.findFirst({
      where: {
        OR: [
          { id },
          { storageKey: id }
        ],
        deletedAt: null 
      },
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
    const uploadsDir = path.resolve(process.env.UPLOADS_DIR || "./uploads");
    const filename = asset.storageKey || asset.key;
    
    // Security check: Prevent path traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      console.error(`[Media Download] Potential path traversal attempt: ${filename}`);
      return NextResponse.json(
        { error: "Invalid filename" },
        { status: 400 }
      );
    }

    const filePath = path.join(uploadsDir, filename);
    
    // Double check that the resolved path is within uploadsDir
    if (!filePath.startsWith(uploadsDir)) {
      console.error(`[Media Download] Path traversal detected: ${filePath}`);
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }
    
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
