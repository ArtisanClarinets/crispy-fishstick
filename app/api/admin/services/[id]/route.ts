export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateServiceSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().optional(),
  ownerId: z.string().optional().nullable(),
  repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  lifecycle: z.enum(["production", "staging", "development", "deprecated"]).optional(),
  deleteReason: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminRead(req, { permissions: ["services.read"] }, async (user) => {
    const service = await prisma.service.findFirst({
      where: {
        id: params.id,
        deletedAt: null, // Filter out soft-deleted services
        ...tenantWhere(user),
      },
      include: {
        User: true,
        Incident: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!service) {
      return { error: "Service not found", status: 404 };
    }

    return { data: service };
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["services.write"] }, async (user, body) => {
    const validatedData = updateServiceSchema.parse(body);

    const existingService = await prisma.service.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingService) {
      return { error: "Service not found", status: 404 };
    }

    const updatedService = await prisma.service.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: validatedData.ownerId,
        repoUrl: validatedData.repoUrl,
        lifecycle: validatedData.lifecycle,
      },
    });

    return { data: updatedService };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["services.write"] }, async (user, body) => {
    const { deleteReason } = updateServiceSchema.parse(body);

    const existingService = await prisma.service.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingService) {
      return { error: "Service not found", status: 404 };
    }

    await prisma.service.update({
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
