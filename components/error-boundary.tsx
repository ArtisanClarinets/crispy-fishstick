"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold tracking-tight">System Malfunction</h2>
            <p className="text-muted-foreground">
              An unexpected error occurred within the interface subsystem.
            </p>
            <div className="p-4 bg-destructive/10 text-destructive text-sm font-mono rounded-lg text-left overflow-auto max-h-32">
              {this.state.error?.message || "Unknown error"}
            </div>
            <Button onClick={this.handleReload} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reinitialize System
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
