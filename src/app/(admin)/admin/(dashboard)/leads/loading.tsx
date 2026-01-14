import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage potential clients and inquiries.</p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      <TableSkeleton columnCount={6} rowCount={10} />
    </div>
  );
}
