import { TableSkeleton } from "@/shared/ui/table-skeleton";

export default function Loading() {
  return <TableSkeleton columnCount={5} rowCount={10} />;
}
