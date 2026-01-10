import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-3">
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
