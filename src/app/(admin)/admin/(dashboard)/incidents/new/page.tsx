import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { IncidentForm } from "@/widgets/admin/incidents/incident-form";

export default async function NewIncidentPage() {
  await requireAdmin({ permissions: ["incidents.write"] });

  const services = await prisma.service.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Incident</h1>
        <p className="text-muted-foreground">Report a new system incident.</p>
      </div>

      <IncidentForm services={services} users={users} />
    </div>
  );
}
