import { NextRequest } from "next/server";
import { adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Deny JIT access request
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  return adminMutation(
    req,
    {
      permissions: ["jit.approve"],
      audit: { resource: "jitRequest", action: "deny", resourceId: params.id },
    },
    async (user) => {
      const request = await prisma.jitAccessRequest.findUnique({
        where: { id: params.id },
      });

      if (!request) {
        return { error: "JIT access request not found", status: 404 };
      }

      if (request.status !== "pending") {
        return { error: "Only pending requests can be denied", status: 400 };
      }

      const updated = await prisma.jitAccessRequest.update({
        where: { id: params.id },
        data: {
          status: "denied",
          approvedBy: user.id,
        },
      });

      return updated;
    }
  );
}
