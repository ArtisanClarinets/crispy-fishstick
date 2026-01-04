import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { IncidentForm } from "@/components/admin/incidents/incident-form";
import { notFound } from "next/navigation";

export default async function EditIncidentPage({ params }: { params: { id: string } }) {
  await requireAdmin({ permissions: ["incidents.write"] });

  const incident = await prisma.incident.findUnique({
    where: { id: params.id },
  });

  if (!incident) {
    notFound();
  }

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
        <h1 className="text-2xl font-bold tracking-tight">Edit Incident</h1>
        <p className="text-muted-foreground">Update incident details.</p>
      </div>

      <IncidentForm 
        initialData={incident}
        services={services} 
        users={users} 
      />
    </div>
  );
}
