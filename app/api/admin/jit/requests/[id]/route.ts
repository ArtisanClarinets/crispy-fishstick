import { NextRequest } from "next/server";
import { adminRead } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Get JIT access request by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return adminRead(req, { permissions: ["jit.read"] }, async () => {
    const request = await prisma.jitAccessRequest.findUnique({
      where: { id: params.id },
      include: {
        User: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!request) {
      return { error: "JIT access request not found", status: 404 };
    }

    return request;
  });
}
