import { NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import { join } from "path";

export async function GET(request: Request, props: { params: Promise<{ filename: string }> }) {
  const params = await props.params;
  try {
    const filename = params.filename;

    // Security: Prevent directory traversal
    if (filename.includes("..") || filename.includes("/")) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    const filePath = join(process.cwd(), "uploads", filename);

    // Check if file exists
    try {
      await stat(filePath);
    } catch {
      return new NextResponse("File not found", { status: 404 });
    }
    
    // Security: Enforce allowed file types (MIME)
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || "").split(",").filter(Boolean);
    const ext = filename.split(".").pop()?.toLowerCase();
    
    // Map extension to MIME (simple map)
    const mimeMap: Record<string, string> = {
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "webp": "image/webp",
        "gif": "image/gif",
        "pdf": "application/pdf"
    };

    const contentType = mimeMap[ext || ""] || "application/octet-stream";

    if (allowedTypes.length > 0 && !allowedTypes.includes(contentType)) {
        return new NextResponse("Unsupported Media Type", { status: 415 });
    }

    // Security: Check max size (from env)
    const stats = await stat(filePath);
    const maxSize = parseInt(process.env.MAX_UPLOAD_SIZE || "10485760", 10);

    if (stats.size > maxSize) {
        // If file on disk is larger than allowed (e.g. policy changed), do we block serving?
        // Maybe. "max size from env".
        return new NextResponse("File too large", { status: 413 }); // Payload Too Large? Or generic 403?
        // But usually max upload size applies to upload. Here we are serving.
        // If the instruction "enforce MIME + max size" is applied to this file, it might just mean checking it.
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
