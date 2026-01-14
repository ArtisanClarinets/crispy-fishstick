import { TableSkeleton } from "@/shared/ui/table-skeleton";

export default function Loading() {
  return <TableSkeleton columnCount={7} rowCount={10} />;
}
