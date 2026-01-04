import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { ContractForm } from "@/components/admin/contracts/contract-form";
import { notFound } from "next/navigation";

export default async function EditContractPage({ params }: { params: { id: string } }) {
  await requireAdmin({ permissions: ["contracts.write"] });

  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
  });

  if (!contract) {
    notFound();
  }

  const tenants = await prisma.tenant.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Contract</h1>
        <p className="text-muted-foreground">Update contract details.</p>
      </div>

      <ContractForm 
        initialData={contract}
        tenants={tenants} 
      />
    </div>
  );
}
