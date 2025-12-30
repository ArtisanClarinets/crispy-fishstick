import { NextResponse } from "next/server";

const SVG_ICON = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <rect width="16" height="16" fill="transparent" />
</svg>`;

export async function GET() {
  // Serve a tiny SVG favicon to avoid returning a 204 body which can trigger
  // Response validation errors in some Node/undici versions.
  return new NextResponse(SVG_ICON, {
    status: 200,
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
