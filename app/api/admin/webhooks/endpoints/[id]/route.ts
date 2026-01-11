import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const updateWebhookSchema = z.object({
  url: z.string().url().optional(),
  secret: z.string().optional(),
  events: z.string().optional(),
  active: z.boolean().optional(),
});

// Get webhook endpoint by ID
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["webhooks.read"] }, async (user) => {
    const endpoint = await prisma.webhookEndpoint.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
      },
      include: {
        _count: {
          select: { WebhookDelivery: true },
        },
      },
    });

    if (!endpoint) {
      return { error: "Webhook endpoint not found", status: 404 };
    }

    return endpoint;
  });
}

// Update webhook endpoint
export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["webhooks.write"] }, async (user, body) => {
    const validatedData = updateWebhookSchema.parse(body);

    const endpoint = await prisma.webhookEndpoint.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
      },
    });

    if (!endpoint) {
      return { error: "Webhook endpoint not found", status: 404 };
    }

    const updated = await prisma.webhookEndpoint.update({
      where: { id: params.id },
      data: validatedData,
    });

    return updated;
  });
}

// Delete webhook endpoint
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["webhooks.write"] }, async (user) => {
    const endpoint = await prisma.webhookEndpoint.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
      },
    });

    if (!endpoint) {
      return { error: "Webhook endpoint not found", status: 404 };
    }

    // Hard delete (cascades to deliveries)
    await prisma.webhookEndpoint.delete({
      where: { id: params.id },
    });

    return { success: true };
  });
}
