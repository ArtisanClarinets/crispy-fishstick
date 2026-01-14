import { requireAdmin } from "@/shared/lib/admin/guards";
import { prisma } from "@/shared/lib/prisma";
import { InvoiceForm } from "@/widgets/admin/invoices/invoice-form";
import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewInvoicePage() {
  await requireAdmin({ permissions: ["invoices.write"] });

  const tenants = await prisma.tenant.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/invoices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Invoice</h1>
          <p className="text-muted-foreground">Create and send invoices to tenants.</p>
        </div>
      </div>

      <div className="flex justify-center">
        <InvoiceForm tenants={tenants} />
      </div>
    </div>
  );
}
