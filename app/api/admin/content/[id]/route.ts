import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import { z } from "zod";

export const dynamic = "force-dynamic";

const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["post", "page", "article"]).default("post"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin({ permissions: ["content.read"] });

    const item = await prisma.content.findUnique({
      where: { id: params.id },
      include: {
        User: {
          select: { name: true, email: true },
        },
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Content fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["content.write"] });
    const body = await req.json();
    const validated = contentSchema.parse(body);

    const existing = await prisma.content.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Check slug uniqueness if changed
    if (validated.slug !== existing.slug) {
      const slugCheck = await prisma.content.findUnique({
        where: { slug: validated.slug },
      });
      if (slugCheck) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    const item = await prisma.content.update({
      where: { id: params.id },
      data: {
        ...validated,
        updatedAt: new Date(),
        publishedAt: 
          validated.status === "published" && existing.status !== "published"
            ? new Date() 
            : (validated.status !== "published" ? null : existing.publishedAt),
      },
    });

    await createAuditLog({
      action: "update_content",
      resource: "content",
      resourceId: item.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existing,
      after: item,
    });

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Content update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin({ permissions: ["content.write"] });

    const existing = await prisma.content.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.content.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_content",
      resource: "content",
      resourceId: params.id,
      actorId: user.id,
      actorEmail: user.email,
      before: existing,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
