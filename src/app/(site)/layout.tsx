import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { PageTransition } from "@/widgets/page-transition";
import { ErrorBoundary } from "@/widgets/error-boundary";
import { SystemLayer } from "@/widgets/system-layer";
import { ConsoleHud } from "@/widgets/console-hud";
import { RouteTransitionLayer } from "@/widgets/route-transition-layer";

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
