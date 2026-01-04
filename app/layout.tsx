import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { AppMotionConfig } from "@/components/motion-config";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { VisitedPathProvider } from "@/components/visited-path-provider";
import { AuthProvider } from "@/components/auth-provider";
import { headers } from "next/headers";

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

import { PointerSignalProvider } from "@/components/pointer-signal-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        "font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <PointerSignalProvider />
          <AuthProvider>
            <VisitedPathProvider>
              <AppMotionConfig>
                {children}
                <Toaster />
                <SonnerToaster />
              </AppMotionConfig>
            </VisitedPathProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
