"use client";

import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationControlsProps {
  nextCursor?: string | null;
  prevCursor?: string | null;
}

export function PaginationControls({ nextCursor, prevCursor }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNext = () => {
    if (!nextCursor) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", nextCursor);
    params.set("direction", "forward");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    if (!prevCursor) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", prevCursor);
    params.set("direction", "backward");
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!nextCursor && !prevCursor) return null;

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={!prevCursor}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={!nextCursor}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
