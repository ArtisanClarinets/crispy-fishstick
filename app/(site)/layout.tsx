import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { ErrorBoundary } from "@/components/error-boundary";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";
import { RouteTransitionLayer } from "@/components/route-transition-layer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Background system layer */}
      <SystemLayer />

      {/* Console HUD */}
      <ConsoleHud />

      {/* Route Transition Overlay */}
      <RouteTransitionLayer />

      {/* Foreground app chrome */}
      <div className="relative z-10 min-h-dvh flex flex-col">
        <Header />
        <PageTransition>
          <ErrorBoundary>
            <main className="flex-1 pt-20">{children}</main>
          </ErrorBoundary>
        </PageTransition>
        <Footer />
      </div>
    </>
  );
}
