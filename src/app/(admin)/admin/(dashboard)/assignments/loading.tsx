import { TableSkeleton } from "@/shared/ui/table-skeleton";

export default function Loading() {
  return <TableSkeleton columnCount={6} rowCount={10} />;
}
