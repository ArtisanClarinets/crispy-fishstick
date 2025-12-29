"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5 max-w-md w-full backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive animate-pulse">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3 tracking-tight">System Malfunction</h2>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          An unexpected error has occurred in the application layer.
          Our engineering team has been automatically notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            variant="default"
            className="w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            onClick={() => window.location.href = "/"}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>

        {error.digest && (
          <div className="mt-6 pt-6 border-t border-destructive/10">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-mono">
              Error Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
