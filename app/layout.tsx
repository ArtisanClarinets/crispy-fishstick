import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AppMotionConfig } from "@/components/motion-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = headers().get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(
        inter.variable,
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
          <AppMotionConfig>
            {children}
          </AppMotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
