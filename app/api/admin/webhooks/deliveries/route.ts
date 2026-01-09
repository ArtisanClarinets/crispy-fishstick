import { NextRequest } from "next/server";
import { adminRead } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/lib/api/pagination";
import { tenantWhere } from "@/lib/admin/guards";

export const dynamic = "force-dynamic";

// List webhook deliveries with pagination
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["webhooks.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const endpointId = searchParams.get("endpointId");
    const status = searchParams.get("status");

    const where: any = {};

    // Filter by endpoint (must be in user's tenant)
    if (endpointId) {
      const endpoint = await prisma.webhookEndpoint.findFirst({
        where: { id: endpointId, ...tenantWhere(user) },
      });
      if (!endpoint) {
        return { error: "Webhook endpoint not found or access denied", status: 403 };
      }
      where.endpointId = endpointId;
    }

    if (status) where.status = status;

    const [deliveries] = await Promise.all([
      prisma.webhookDelivery.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
        include: {
          WebhookEndpoint: {
            select: { id: true, url: true, active: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(deliveries, pagination);
  });
}
