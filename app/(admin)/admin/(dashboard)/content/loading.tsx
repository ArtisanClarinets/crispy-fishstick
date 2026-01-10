import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton columnCount={6} rowCount={10} />
        </CardContent>
      </Card>
    </div>
  );
}
