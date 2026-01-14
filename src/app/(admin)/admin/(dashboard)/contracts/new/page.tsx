import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { ContractForm } from "@/widgets/admin/contracts/contract-form";

export default async function NewContractPage() {
  await requireAdmin({ permissions: ["contracts.write"] });

  const tenants = await prisma.tenant.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Contract</h1>
        <p className="text-muted-foreground">Create a new contract for a tenant.</p>
      </div>

      <ContractForm tenants={tenants} />
    </div>
  );
}
