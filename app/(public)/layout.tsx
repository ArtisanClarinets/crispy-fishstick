import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";
import { RouteTransitionLayer } from "@/components/route-transition-layer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Background system layer (always present for public) */}
      <SystemLayer />

      {/* Console HUD (system overlay) */}
      <ConsoleHud />

      {/* Route Transition Overlay */}
      <RouteTransitionLayer />

      {/* Foreground app chrome */}
      <div className="relative z-10 min-h-dvh flex flex-col">
        <Header />
        <PageTransition>
          <main className="flex-1 pt-20">{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
}
