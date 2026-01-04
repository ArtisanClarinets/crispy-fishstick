import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";
import { RouteTransitionLayer } from "@/components/route-transition-layer";
import { AppMotionConfig } from "@/components/motion-config";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/session-provider";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thompsonsystems.com"),
  title: {
    default: "Vantus Systems | Digital Alchemy",
    template: "%s | Vantus Systems",
  },
  description:
    "A specialized engineering lab demonstrating production-grade quality, rigorous systems, and refined digital craftsmanship.",
  keywords: [
    "Software Engineering",
    "Systems Architecture",
    "Next.js",
    "React",
    "TypeScript",
    "High-Performance",
    "Design Engineering",
    "Vantus Systems",
  ],
  authors: [{ name: "Dylan Thompson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vantussystems.com",
    title: "Vantus Systems",
    description:
      "Digital Alchemy & Engineering Precision. Production-grade quality from day one.",
    siteName: "Vantus Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantus Systems",
  },
  robots: {
    index: true,
    follow: true,
  },
};


import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  // console.log("ROOT LAYOUT: x-nonce header value:", nonce);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        "font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary"
      )}>
        <ThemeProvider
          attribute="class"
          // Follow the user's device preference by default
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <SessionProvider>
            <AppMotionConfig>
              {/* Background system layer (always present) */}
              <SystemLayer />

              {/* Console HUD (system overlay) */}
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
              <Toaster />
            </AppMotionConfig>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
