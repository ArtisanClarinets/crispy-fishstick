export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult, getPrismaParams } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { validateFile } from "@/lib/security/upload";
import { createHash } from "crypto";

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["media.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    const mime = searchParams.get("mime") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...tenantWhere(user),
      ...(mime && { mime: { contains: mime } }),
      ...(!showArchived && { deletedAt: null }),
    };

    const assets = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...getPrismaParams(pagination),
    });

    return { data: buildPaginationResult(assets, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["media.write"] }, async (user) => {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const visibility = (formData.get("visibility") as string) || "PRIVATE";
    const tenantId = formData.get("tenantId") as string | null;

    if (!file) {
      return { error: "No file provided", status: 400 };
    }

    try {
      validateFile(file);
    } catch (error: any) {
      return { error: error.message, status: 400 };
    }

    // Validate visibility enum
    if (!["PUBLIC", "PRIVATE", "TENANT", "PROJECT"].includes(visibility)) {
      return { error: "Invalid visibility value", status: 400 };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate checksum for deduplication
    const checksum = createHash("sha256").update(buffer).digest("hex");

    // Check for existing file with same checksum
    const existing = await prisma.mediaAsset.findFirst({
      where: { checksum, deletedAt: null },
    });

    if (existing) {
      return { data: existing, status: 200 }; // Return existing asset
    }

    // Ensure upload directory exists
    const uploadDir = process.env.UPLOADS_DIR || join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Generate unique storage key
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageKey = `${timestamp}-${safeName}`;
    const filepath = join(uploadDir, storageKey);

    // Write file
    await writeFile(filepath, buffer);

    const asset = await prisma.mediaAsset.create({
      data: {
        key: file.name, // Original filename
        storageKey, // Unique storage identifier
        url: `/api/admin/media/${storageKey}/download`, // Authenticated download endpoint
        mime: file.type,
        size: file.size,
        checksum,
        visibility,
        uploadedBy: user.email,
        tenantId: tenantId || user.tenantId,
      },
    });

    return { data: asset, status: 201 };
  });
}
