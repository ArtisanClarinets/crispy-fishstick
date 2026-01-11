export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { z } from "zod";

const updateContractSchema = z.object({
  title: z.string().optional(),
  status: z.enum(["draft", "pending_signature", "active", "expired", "terminated"]).optional(),
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().transform((str) => new Date(str)).optional(),
  value: z.number().min(0).optional(),
  content: z.string().optional(),
  signedBy: z.string().optional(),
  signedAt: z.string().transform((str) => new Date(str)).optional(),
  signatureUrl: z.string().optional(),
  deleteReason: z.string().optional(),
});

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminRead(req, { permissions: ["contracts.read"] }, async (user) => {
    const contract = await prisma.contract.findFirst({
      where: {
        id: params.id,
        deletedAt: null, // Filter out soft-deleted contracts
        ...tenantWhere(user),
      },
      include: {
        Tenant: true,
      },
    });

    if (!contract) {
      return { error: "Contract not found", status: 404 };
    }

    return { data: contract };
  });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["contracts.write"] }, async (user, body) => {
    const validatedData = updateContractSchema.parse(body);

    // Optimistic concurrency control: check If-Match header
    const ifMatch = req.headers.get("If-Match");
    
    const existingContract = await prisma.contract.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingContract) {
      return { error: "Contract not found", status: 404 };
    }

    // Version concurrency check
    if (ifMatch) {
      const expectedVersion = parseInt(ifMatch, 10);
      if (existingContract.version !== expectedVersion) {
        return { 
          error: "Version conflict - contract has been modified by another user", 
          status: 409,
          data: { currentVersion: existingContract.version }
        };
      }
    }

    // Increment version on update
    const updatedContract = await prisma.contract.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        version: { increment: 1 },
      },
    });

    return { data: updatedContract };
  });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return adminMutation(req, { permissions: ["contracts.write"] }, async (user, body) => {
    const { deleteReason } = updateContractSchema.parse(body);

    const existingContract = await prisma.contract.findFirst({
      where: {
        id: params.id,
        ...tenantWhere(user),
        deletedAt: null,
      },
    });

    if (!existingContract) {
      return { error: "Contract not found", status: 404 };
    }

    await prisma.contract.update({
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
