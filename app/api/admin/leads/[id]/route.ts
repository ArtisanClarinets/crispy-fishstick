import { adminRead, adminMutation } from "@/lib/admin/route";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

const updateLeadSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  assignedTo: z.string().optional().nullable(),
});

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return adminRead(request, { permissions: ["leads.read"] }, async (user) => {
    const lead = await prisma.lead.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
        ...tenantWhere(user),
      },
    });

    if (!lead) {
      return { error: "Lead not found", status: 404 };
    }

    return { data: lead };
  });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    req,
    { 
      permissions: ["leads.write"], 
      audit: { action: "update_lead", resource: "lead", resourceId: params.id } 
    },
    async (user, body) => {
      const validatedData = updateLeadSchema.parse(body);

      const lead = await prisma.lead.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: validatedData,
      });

      if (lead.count === 0) {
        return { error: "Lead not found or already deleted", status: 404 };
      }

      const updated = await prisma.lead.findUniqueOrThrow({ where: { id: params.id } });
      return { data: updated };
    }
  );
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    request,
    { 
      permissions: ["leads.write"], 
      audit: { action: "delete_lead", resource: "lead", resourceId: params.id } 
    },
    async (user) => {
      const deleteReason = request.headers.get("X-Delete-Reason") || "Deleted by admin";

      const lead = await prisma.lead.updateMany({
        where: {
          id: params.id,
          deletedAt: null,
          ...tenantWhere(user),
        },
        data: {
          deletedAt: new Date(),
          deletedBy: user.id,
          deleteReason,
        },
      });

      if (lead.count === 0) {
        return { error: "Lead not found or already deleted", status: 404 };
      }

      return { data: { success: true, message: "Lead soft deleted" } };
    }
  );
}
