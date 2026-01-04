import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  roleIds: z.array(z.string()).optional(),
});

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin({ permissions: ["users.read"] });

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        RoleAssignment: {
          include: {
            Role: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const actor = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = updateUserSchema.parse(body);
    const { roleIds, ...userData } = validatedData;

    // Handle role updates if provided
    if (roleIds) {
      // First delete existing assignments
      await prisma.roleAssignment.deleteMany({
        where: { userId: params.id },
      });
      
      // Then create new ones
      // We do this transactionally ideally, but for now simple sequential ops
      // Or better, use update with deleteMany and create
      await prisma.user.update({
        where: { id: params.id },
        data: {
          RoleAssignment: {
            create: roleIds.map((roleId) => ({
              Role: { connect: { id: roleId } },
            })),
          },
        },
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: userData,
      include: {
        RoleAssignment: { include: { Role: true } },
      },
    });

    await createAuditLog({
      action: "update_user",
      resource: "user",
      resourceId: updatedUser.id,
      actorId: actor.id,
      actorEmail: actor.email,
      after: updatedUser,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  void request;
  try {
    const actor = await requireAdmin({ permissions: ["users.write"] });

    // Prevent deleting yourself
    if (actor.id === params.id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: params.id },
    });

    await createAuditLog({
      action: "delete_user",
      resource: "user",
      resourceId: params.id,
      actorId: actor.id,
      actorEmail: actor.email,
      before: deletedUser,
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
