import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { ContractForm } from "@/components/admin/contracts/contract-form";
import { ContractVersions } from "@/components/admin/contracts/contract-versions";
import { ContractSignature } from "@/components/admin/contracts/contract-signature";

interface ContractPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContractPage(props: ContractPageProps) {
  const params = await props.params;
  await requireAdmin({ permissions: ["contracts.read"] });

  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
    include: {
      versions: {
        orderBy: { version: "desc" },
      },
    },
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
        <p className="text-muted-foreground">
          Manage contract details, versions, and signatures.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <ContractForm initialData={contract} tenants={tenants} />
        </div>
        
        <div className="space-y-6">
          <ContractSignature 
            contractId={contract.id} 
            status={contract.status}
            signedBy={contract.signedBy}
            signedAt={contract.signedAt ? contract.signedAt.toISOString() : null}
          />
          <ContractVersions versions={contract.versions.map(v => ({
            ...v,
            createdAt: v.createdAt.toISOString(),
          }))} />
        </div>
      </div>
    </div>
  );
}
