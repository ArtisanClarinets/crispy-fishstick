import 'server-only';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
// Export DTOs to avoid unused vars error
export { toUserDTO, toLeadDTO } from "./dto";
export type { UserDTO, LeadDTO } from "./dto";

export const verifySession = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  return { isAuth: true, userId: session.user.id, session };
});

export const verifyAdmin = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const roles = session.user.roles || [];
  if (!roles.includes("Admin") && !roles.includes("Owner")) {
    redirect("/admin/error?error=AccessDenied");
  }

  return { isAuth: true, userId: session.user.id, session };
});

export const getCurrentUser = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  // Fetch fresh user data from DB to ensure validity/role updates
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      deletedAt: true,
      RoleAssignment: {
        include: {
          Role: true
        }
      }
    }
  });

  if (!user || user.deletedAt) {
    return null;
  }

  // Map to safe object (DTO-like)
  const roles = user.RoleAssignment.map((ra: any) => ra.Role.name);
  const permissions = Array.from(new Set(
    user.RoleAssignment.flatMap((ra: any) => {
      try {
        return JSON.parse(ra.Role.permissions);
      } catch {
        return [];
      }
    })
  ));

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles,
    permissions
  };
});

// DAL Methods

export async function createLead(data: {
  name: string;
  email: string;
  message: string;
  budget?: string;
  role?: string;
  website?: string | null;
  source?: string;
  status?: string;
  tenantId?: string;
}) {
  return await prisma.lead.create({
    data: {
      ...data,
      status: data.status || "new",
      source: data.source || "contact_form",
    },
  });
}

export async function getLeads(params: {
  take?: number;
  skip?: number;
  cursor?: string;
  status?: string;
  source?: string;
  search?: string;
  tenantId?: string;
}) {
  const where: any = {
    deletedAt: null,
  };

  if (params.tenantId) where.tenantId = params.tenantId;
  if (params.status) where.status = params.status;
  if (params.source) where.source = params.source;
  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
      { message: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    take: (params.take || 10) + 1,
    skip: params.skip,
    cursor: params.cursor ? { id: params.cursor } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return leads;
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      RoleAssignment: { include: { Role: true } },
    }
  });
}

// ETag helper
export function generateETag(data: any): string {
  return crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
}
