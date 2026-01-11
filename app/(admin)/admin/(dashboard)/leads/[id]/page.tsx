import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { LeadForm } from "@/components/admin/leads/lead-form";
import { notFound } from "next/navigation";

export default async function EditLeadPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await requireAdmin({ permissions: ["leads.write"] });

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
  });

  if (!lead) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Lead</h1>
        <p className="text-muted-foreground">Update lead status and details.</p>
      </div>

      <LeadForm initialData={lead} />
    </div>
  );
}
