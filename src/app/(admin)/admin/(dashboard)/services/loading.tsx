import { TableSkeleton } from "@/shared/ui/table-skeleton";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage microservices and infrastructure components.</p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Register Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Catalog</CardTitle>
          <CardDescription>
            Inventory of all technical services and their ownership.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableSkeleton columnCount={7} rowCount={10} />
        </CardContent>
      </Card>
    </div>
  );
}
