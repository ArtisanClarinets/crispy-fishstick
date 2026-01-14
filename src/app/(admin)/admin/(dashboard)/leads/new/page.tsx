import { requireAdmin } from "@/shared/lib/admin/guards";
import { LeadForm } from "@/widgets/admin/leads/lead-form";

export default async function NewLeadPage() {
  await requireAdmin({ permissions: ["leads.write"] });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Lead</h1>
        <p className="text-muted-foreground">Manually add a new lead.</p>
      </div>

      <LeadForm />
    </div>
  );
}
