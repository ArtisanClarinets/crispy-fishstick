import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">404</h1>
          <h2 className="text-xl font-medium text-muted-foreground">Page not found</h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          The requested resource could not be located. It may have been moved, deleted, or you might not have permission to view it.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <Button asChild variant="default">
            <Link href="/">Return Home</Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-border">
             <p className="text-xs text-muted-foreground font-mono">
                 TS//SYSTEM_ERR_404
             </p>
        </div>
      </div>
    </div>
  );
}
