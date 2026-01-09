export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { z } from "zod";

const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["post", "page", "article"]).default("post"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
});

export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["content.read"] }, async (_user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    
    const type = searchParams.get("type") || undefined;
    const status = searchParams.get("status") || undefined;
    const showArchived = searchParams.get("showArchived") === "true";

    const where = {
      ...(type && { type }),
      ...(status && { status }),
      ...(!showArchived && { deletedAt: null }),
    };

    const items = await prisma.content.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: pagination.take,
      ...(pagination.cursor && {
        cursor: { id: pagination.cursor },
        skip: 1,
      }),
      include: {
        User: { select: { name: true, email: true } },
      },
    });

    return { data: buildPaginationResult(items, pagination) };
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["content.write"] }, async (user, body) => {
    const validated = contentSchema.parse(body);

    const existing = await prisma.content.findUnique({
      where: { slug: validated.slug },
    });

    if (existing) {
      return { error: "Slug already exists", status: 400 };
    }

    const item = await prisma.content.create({
      data: {
        ...validated,
        authorId: user.id,
        publishedAt: validated.status === "published" ? new Date() : null,
      },
    });

    return { data: item, status: 201 };
  });
}
