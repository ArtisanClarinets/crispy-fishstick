"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-background text-foreground min-h-screen flex items-center justify-center font-sans antialiased">
        <div className="flex flex-col items-center justify-center p-8 max-w-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Critical System Failure</h2>
          <p className="text-muted-foreground mb-8">
            The application encountered a critical error and cannot recover.
          </p>
          <Button onClick={() => reset()} variant="destructive">
            Restart Application
          </Button>
        </div>
      </body>
    </html>
  );
}
