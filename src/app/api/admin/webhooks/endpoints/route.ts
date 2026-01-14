import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import { tenantWhere } from "@/shared/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const createWebhookSchema = z.object({
  url: z.string().url(),
  secret: z.string().optional(),
  events: z.string(), // Comma-separated event names
  active: z.boolean().default(true),
});

// List webhook endpoints with pagination
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["webhooks.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const where = {
      ...tenantWhere(user),
    };

    const [endpoints] = await Promise.all([
      prisma.webhookEndpoint.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { WebhookDelivery: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(endpoints, pagination);
  });
}

// Create webhook endpoint
export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["webhooks.write"] }, async (user, body) => {
    const validatedData = createWebhookSchema.parse(body);

    const endpoint = await prisma.webhookEndpoint.create({
      data: {
        ...validatedData,
        tenantId: user.tenantId!,
      },
    });

    return endpoint;
  });
}
