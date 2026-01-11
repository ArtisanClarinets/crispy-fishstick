export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contentSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  type: z.enum(["post", "page", "article"]).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  deleteReason: z.string().optional(),
});

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["content.read"] }, async (_user) => {
    const item = await prisma.content.findUnique({
      where: {
        id: params.id,
      },
      include: {
        User: { select: { name: true, email: true } },
      },
    });

    if (!item) {
      return { error: "Content not found", status: 404 };
    }

    return { data: item };
  });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["content.write"] }, async (user, body) => {
    const validated = contentSchema.parse(body);

    const existing = await prisma.content.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
      },
    });

    if (!existing) {
      return { error: "Content not found", status: 404 };
    }

    if (validated.slug && validated.slug !== existing.slug) {
      const slugCheck = await prisma.content.findUnique({
        where: { slug: validated.slug },
      });
      if (slugCheck) {
        return { error: "Slug already exists", status: 400 };
      }
    }

    const item = await prisma.content.update({
      where: { id: params.id },
      data: {
        ...validated,
        updatedAt: new Date(),
        publishedAt: validated.status === "published" && !existing.publishedAt ? new Date() : undefined,
      },
    });

    return { data: item };
  });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["content.write"] }, async (user, body) => {
    const { deleteReason } = contentSchema.parse(body);

    const existing = await prisma.content.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
      },
    });

    if (!existing) {
      return { error: "Content not found", status: 404 };
    }

    await prisma.content.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
        deleteReason: deleteReason || "Archived by admin",
      },
    });

    return { data: null, status: 204 };
  });
}
