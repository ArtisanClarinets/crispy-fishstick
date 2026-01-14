import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import { AuthProvider } from "@/components/auth-provider";
import { PointerSignalProvider } from "@/components/pointer-signal-provider";
import { VisitedPathProvider } from "@/components/visited-path-provider";
import { AppMotionConfig } from "@/components/motion-config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Vantus Systems | High-Trust Engineering",
    template: "%s | Vantus Systems",
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
  authors: [{ name: "Vantus Systems" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vantus.systems",
    title: "Vantus Systems",
    description:
      "Engineering for High-Trust Products. Production-grade quality from day one.",
    siteName: "Vantus Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantus Systems",
    creator: "@vantus_systems",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// required for per-request nonce
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        inter.variable,
        "font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary pb-20 md:pb-0"
      )}>
        <AuthProvider session={session}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            nonce={nonce}
            >
                <AppMotionConfig>
                    <PointerSignalProvider>
                        <VisitedPathProvider>
                            {children}
                            <MobileBottomNav />
                        </VisitedPathProvider>
                    </PointerSignalProvider>
                </AppMotionConfig>
            </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
