import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";
import { RouteTransitionLayer } from "@/components/route-transition-layer";
import { AppMotionConfig } from "@/components/motion-config";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thompsonsystems.com"),
  title: {
    default: "Thompson Systems | High-Trust Engineering",
    template: "%s | Thompson Systems",
  },
  description:
    "A specialized engineering studio for founders who demand production-grade quality, rigorous systems, and Apple-caliber interfaces.",
  keywords: [
    "Software Engineering",
    "Systems Architecture",
    "Next.js",
    "React",
    "TypeScript",
    "High-Performance",
    "Design Engineering",
  ],
  authors: [{ name: "Dylan Thompson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thompsonsystems.com",
    title: "Thompson Systems",
    description:
      "Engineering for High-Trust Products. Production-grade quality from day one.",
    siteName: "Thompson Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thompson Systems",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const headersList = headers();
  // const nonce = headersList.get("x-nonce") ?? undefined;

  // console.log("ROOT LAYOUT: x-nonce header value:", nonce);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        inter.variable,
        jetbrainsMono.variable,
        "font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary"
      )}>
        <ThemeProvider
          attribute="class"
          // Follow the user's device preference by default
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          // nonce={nonce} // Disabled nonce to avoid hydration mismatch, relying on unsafe-inline for now
        >
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
                <main className="flex-1 pt-20">{children}</main>
              </PageTransition>
              <Footer />
            </div>
            <Toaster />
          </AppMotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
