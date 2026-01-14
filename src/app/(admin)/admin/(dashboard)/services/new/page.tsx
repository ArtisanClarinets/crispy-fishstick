import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { ServiceForm } from "@/widgets/admin/services/service-form";

export default async function NewServicePage() {
  await requireAdmin({ permissions: ["services.write"] });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Service</h1>
        <p className="text-muted-foreground">Register a new service or component.</p>
      </div>
      <ServiceForm users={users} />
    </div>
  );
}
