export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { z } from "zod";

const updateTenantSchema = z.object({
  name: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
});

export const GET = adminRead(
  { permissions: ["tenants.read"] },
  async (_req, { params }: any) => {
    const { id } = params;
    
    const tenant = await prisma.tenant.findUnique({
      where: { id, deletedAt: null },
      include: {
        _count: {
          select: {
            Project: true,
            Invoice: true,
            Contract: true,
            Lead: true,
          },
        },
      },
    });
    
    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }
    
    return NextResponse.json(tenant);
  }
);

export const PATCH = adminMutation(
  {
    permissions: ["tenants.write"],
    audit: { resource: "tenant", action: "update" },
  },
  async (req, { params }: any) => {
    const { id } = params;
    const body = await req.json();
    const validatedData = updateTenantSchema.parse(body);
    
    const updated = await prisma.tenant.update({
      where: { id, deletedAt: null },
      data: validatedData,
    });
    
    return NextResponse.json(updated);
  }
);

export const DELETE = adminMutation(
  {
    permissions: ["tenants.write"],
    audit: { resource: "tenant", action: "delete" },
  },
  async (_req, { user, params }: any) => {
    const { id } = params;
    
    const deleteReason = _req.headers.get("x-delete-reason") || "Deleted by admin";
    
    await prisma.tenant.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: user.id,
        deleteReason,
      },
    });
    
    return NextResponse.json({ success: true });
  }
);
