import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { cn } from "@/lib/utils";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
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
    creator: "@dylanthompson-demo",
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
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        inter.variable,
        "font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background system layer (always present) */}
          <SystemLayer />

          {/* Console HUD (system overlay) */}
          <ConsoleHud />

          {/* Foreground app chrome */}
          <div className="relative z-10 min-h-dvh flex flex-col">
            <Header />
            <PageTransition>
              <main className="flex-1 pt-20">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
