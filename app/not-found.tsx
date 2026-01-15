import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-9xl font-bold text-primary/10 tracking-tighter select-none">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground max-w-[400px] mx-auto">
            The page you are looking for has been moved, deleted, or possibly never existed.
          </p>
        </div>

        <Button asChild variant="outline" className="mt-8 rounded-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </div>

      {/* Decorative calibration element */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-20 pointer-events-none">
        <div className="h-px w-24 bg-foreground/50 relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-3 bg-foreground/50" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-3 bg-foreground/50" />
        </div>
      </div>
    </div>
  );
}
