import { NextRequest } from "next/server";
import { adminRead, adminMutation } from "@/shared/lib/admin/route";
import { prisma } from "@/shared/lib/prisma";
import { parsePaginationParams, buildPaginationResult } from "@/shared/lib/api/pagination";
import * as z from "zod";

export const dynamic = "force-dynamic";

const createRoleAssignmentSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  scopeType: z.enum(["GLOBAL", "TENANT", "PROJECT", "SERVICE", "REGION"]).default("GLOBAL"),
  scopeId: z.string().optional(),
});

// List role assignments with pagination
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["roles.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const userId = searchParams.get("userId");
    const roleId = searchParams.get("roleId");
    const scopeType = searchParams.get("scopeType");

    const where: any = {};

    if (userId) where.userId = userId;
    if (roleId) where.roleId = roleId;
    if (scopeType) where.scopeType = scopeType;

    // If user has tenant scope, filter role assignments accordingly
    if (user.tenantId && scopeType !== "GLOBAL") {
      where.scopeId = user.tenantId;
    }

    const [assignments] = await Promise.all([
      prisma.roleAssignment.findMany({
        where,
        take: pagination.take + 1,
        ...(pagination.cursor && {
          skip: 1,
          cursor: { id: pagination.cursor },
        }),
        orderBy: { createdAt: "desc" },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Role: {
            select: { id: true, name: true, permissions: true },
          },
        },
      }),
    ]);

    return buildPaginationResult(assignments, pagination);
  });
}

// Create role assignment
export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["roles.write"] }, async (user, body) => {
    const validatedData = createRoleAssignmentSchema.parse(body);

    // Verify role exists
    const role = await prisma.role.findUnique({
      where: { id: validatedData.roleId },
    });

    if (!role) {
      return { error: "Role not found", status: 404 };
    }

    // Verify user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    });

    if (!targetUser) {
      return { error: "User not found", status: 404 };
    }

    const assignment = await prisma.roleAssignment.create({
      data: validatedData,
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
        Role: {
          select: { id: true, name: true, permissions: true },
        },
      },
    });

    return assignment;
  });
}
