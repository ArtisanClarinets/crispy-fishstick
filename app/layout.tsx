import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Studio - Premium Digital Experiences",
    template: "%s | Studio",
  },
  description:
    "Creating premium digital experiences with attention to detail and craftsmanship. Specializing in modern web development and design.",
  keywords: [
    "web development",
    "design",
    "digital studio",
    "portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.example.com",
    title: "Studio - Premium Digital Experiences",
    description:
      "Creating premium digital experiences with attention to detail and craftsmanship.",
    siteName: "Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio - Premium Digital Experiences",
    description:
      "Creating premium digital experiences with attention to detail and craftsmanship.",
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}


