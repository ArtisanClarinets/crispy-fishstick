export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateIncidentSchema = z.object({
  title: z.string().min(1).optional(),
  severity: z.string().min(1).optional(),
  status: z.string().optional(),
  serviceId: z.string().nullable().optional(),
  commanderId: z.string().nullable().optional(),
  summary: z.string().optional(),
  deleteReason: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminRead(req, { permissions: ["incidents.read"] }, async (user) => {
    const incident = await prisma.incident.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
      },
      include: {
        Service: true,
        User: true,
      },
    });

    if (!incident) {
      return { error: "Incident not found", status: 404 };
    }

    return { data: incident };
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["incidents.write"] }, async (user, body) => {
    const validatedData = updateIncidentSchema.parse(body);

    const existingIncident = await prisma.incident.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingIncident) {
      return { error: "Incident not found", status: 404 };
    }

    const updatedIncident = await prisma.incident.update({
      where: { id: params.id },
      data: validatedData,
    });

    return { data: updatedIncident };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return adminMutation(req, { permissions: ["incidents.write"] }, async (user, body) => {
    const { deleteReason } = updateIncidentSchema.parse(body);

    const existingIncident = await prisma.incident.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingIncident) {
      return { error: "Incident not found", status: 404 };
    }

    await prisma.incident.update({
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
