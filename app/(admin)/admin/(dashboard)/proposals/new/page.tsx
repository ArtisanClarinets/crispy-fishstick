import { ProposalForm } from "@/components/admin/proposals/proposal-form";
import { requireAdmin } from "@/lib/admin/guards";

export default async function NewProposalPage() {
  await requireAdmin({ permissions: ["proposals.write"] });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Proposal</h2>
        <p className="text-muted-foreground">
          Create a new proposal for a client.
        </p>
      </div>

      <ProposalForm />
    </div>
  );
}
