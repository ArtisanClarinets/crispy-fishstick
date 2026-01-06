import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { UserForm } from "@/components/admin/users/user-form";
import { notFound } from "next/navigation";
import { SAFE_USER_WITH_ROLES_SELECT } from "@/lib/security/safe-user";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  await requireAdmin({ permissions: ["users.write"] });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: SAFE_USER_WITH_ROLES_SELECT,
  });

  if (!user) {
    notFound();
  }

  const roles = await prisma.role.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
        <p className="text-muted-foreground">Update user details and role assignments.</p>
      </div>

      <UserForm 
        initialData={user}
        roles={roles} 
      />
    </div>
  );
}
