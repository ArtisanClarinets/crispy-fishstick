import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { assertSameOrigin } from "@/lib/security/origin";
import { z } from "zod";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["post", "page", "article"]).default("post"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    await requireAdmin({ permissions: ["content.read"] });
    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const items = await prisma.content.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        User: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json(items, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Content fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    // CSRF protection
    try {
      assertSameOrigin(req);
    } catch (_error) {
      return new NextResponse("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
    }

    const user = await requireAdmin({ permissions: ["content.write"] });
    const body = await req.json();
    const validated = contentSchema.parse(body);

    const existing = await prisma.content.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const item = await prisma.content.create({
      data: {
        id: randomUUID(),
        ...validated,
        authorId: user.id,
        updatedAt: new Date(),
        publishedAt: validated.status === "published" ? new Date() : null,
      },
    });

    await createAuditLog({
      action: "create_content",
      resource: "content",
      resourceId: item.id,
      actorId: user.id,
      actorEmail: user.email,
      after: item,
    });

    return NextResponse.json(item, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (_error) {
    if (_error instanceof z.ZodError) {
      return NextResponse.json(
        { error: _error.errors },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    console.error("Content create error:", _error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
