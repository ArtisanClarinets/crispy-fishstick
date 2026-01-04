import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Client Portal | Thompson Systems",
  description: "Secure workspace for project deliverables and evidence.",
  robots: "noindex, nofollow",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Portal Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border h-20 flex items-center">
             {/* Logo Placeholder */}
             <div className="w-8 h-8 bg-primary rounded mr-3"></div>
             <span className="font-semibold tracking-tight">Acme Corp</span>
        </div>

        <div className="p-4">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-2">
                Workspace
            </div>
            <nav className="space-y-1">
                <PortalLink href="/portal" label="Overview" active />
                <PortalLink href="/portal/projects" label="Projects" />
                <PortalLink href="/portal/account" label="Account" />
            </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Jane Doe</p>
                    <p className="text-xs text-muted-foreground truncate">jane@acme.com</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-muted/10">
         {/* Mobile Header */}
         <header className="md:hidden h-16 border-b border-border flex items-center px-4 bg-background">
             <span className="font-semibold">Client Portal</span>
         </header>

         <div className="flex-1 overflow-auto p-6 md:p-10 max-w-7xl mx-auto w-full">
            {children}
         </div>
      </main>
    </div>
  );
}

function PortalLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
        >
            {label}
        </Link>
    )
}
