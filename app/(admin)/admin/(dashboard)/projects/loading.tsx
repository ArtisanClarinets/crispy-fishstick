import { TableSkeleton } from "@/components/ui/table-skeleton";

export default function Loading() {
  return <TableSkeleton columnCount={7} rowCount={10} />;
}
