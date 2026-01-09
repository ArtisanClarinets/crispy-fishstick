import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import * as z from "zod";

export const dynamic = "force-dynamic";

const updateTimeEntrySchema = z.object({
  hours: z.number().positive().optional(),
  description: z.string().optional(),
  billable: z.boolean().optional(),
  status: z.enum(["draft", "submitted"]).optional(),
});

// Get time entry by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return adminRead(req, { permissions: ["time.read"] }, async (user) => {
    const entry = await prisma.timeEntry.findFirst({
      where: { id: params.id, deletedAt: null },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Project: {
          select: { id: true, name: true, tenantId: true },
        },
      },
    });

    if (!entry) {
      return { error: "Time entry not found", status: 404 };
    }

    // Verify user has access to the project
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: entry.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    return entry;
  });
}

// Update time entry
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(req, { permissions: ["time.write"] }, async (user, body) => {
    const validatedData = updateTimeEntrySchema.parse(body);

    // Check entry exists
    const entry = await prisma.timeEntry.findFirst({
      where: { id: params.id, deletedAt: null },
      include: { Project: true },
    });

    if (!entry) {
      return { error: "Time entry not found", status: 404 };
    }

    // Verify access
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: entry.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    // Prevent editing approved or invoiced entries
    if (entry.status === "approved" || entry.invoiceId) {
      return { error: "Cannot edit approved or invoiced time entries", status: 400 };
    }

    const updated = await prisma.timeEntry.update({
      where: { id: params.id },
      data: validatedData,
    });

    return updated;
  });
}

// Delete time entry (soft delete)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(req, { permissions: ["time.write"] }, async (user, body) => {
    const entry = await prisma.timeEntry.findFirst({
      where: { id: params.id, deletedAt: null },
      include: { Project: true },
    });

    if (!entry) {
      return { error: "Time entry not found", status: 404 };
    }

    // Verify access
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: entry.projectId,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!hasAccess) {
      return { error: "Access denied", status: 403 };
    }

    // Prevent deleting invoiced entries
    if (entry.invoiceId) {
      return { error: "Cannot delete invoiced time entries", status: 400 };
    }

    const deleteReason = (body as any)?.deleteReason || "Deleted by admin";

    const deleted = await prisma.timeEntry.update({
      where: { id: params.id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
        deleteReason,
      },
    });

    return deleted;
  });
}
