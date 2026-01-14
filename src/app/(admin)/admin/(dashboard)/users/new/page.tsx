import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { UserForm } from "@/widgets/admin/users/user-form";

export default async function NewUserPage() {
  await requireAdmin({ permissions: ["users.write"] });

  const roles = await prisma.role.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New User</h1>
        <p className="text-muted-foreground">Create a new user and assign roles.</p>
      </div>

      <UserForm roles={roles} />
    </div>
  );
}
