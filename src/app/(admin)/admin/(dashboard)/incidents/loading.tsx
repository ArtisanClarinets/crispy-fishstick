import { TableSkeleton } from "@/shared/ui/table-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
      </div>
      <TableSkeleton columnCount={6} rowCount={10} />
    </div>
  );
}
