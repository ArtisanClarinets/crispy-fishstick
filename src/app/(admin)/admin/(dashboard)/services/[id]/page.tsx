import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { ServiceForm } from "@/widgets/admin/services/service-form";
import { notFound } from "next/navigation";

export default async function ServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await requireAdmin({ permissions: ["services.read"] });

  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Service</h1>
        <p className="text-muted-foreground">Update service details.</p>
      </div>
      <ServiceForm initialData={service} users={users} />
    </div>
  );
}
