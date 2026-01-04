import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";
import bcrypt from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleIds: z.array(z.string()).optional(), // Array of Role IDs
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin({ permissions: ["users.read"] });

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        RoleAssignment: {
          include: {
            Role: true,
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin({ permissions: ["users.write"] });
    const body = await req.json();

    const validatedData = createUserSchema.parse(body);
    const { roleIds, password, ...userData } = validatedData;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
        RoleAssignment: roleIds ? {
          create: roleIds.map((roleId) => ({
            Role: { connect: { id: roleId } },
          })),
        } : undefined,
      },
      include: {
        RoleAssignment: { include: { Role: true } },
      },
    });

    await createAuditLog({
      action: "create_user",
      resource: "user",
      resourceId: newUser.id,
      actorId: user.id,
      actorEmail: user.email,
      after: newUser,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
