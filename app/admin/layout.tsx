import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Admin Portal | Thompson Systems",
  description: "Operator console for managing content, artifacts, and leads.",
  robots: "noindex, nofollow", // Security hardening
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar - Placeholder for actual sidebar component */}
      <aside className="w-64 border-r border-border bg-muted/30 hidden md:flex flex-col">
        <div className="p-4 border-b border-border h-14 flex items-center">
          <span className="font-mono font-bold text-sm tracking-tighter">
            TS//ADMIN
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <AdminLink href="/admin" label="Dashboard" />
          <div className="pt-4 pb-2">
            <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Content
            </p>
          </div>
          <AdminLink href="/admin/content" label="Content Management" />
          <AdminLink href="/admin/media" label="Media Library" />

          <div className="pt-4 pb-2">
            <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Operations
            </p>
          </div>
          <AdminLink href="/admin/leads" label="Lead Inbox" />
          <AdminLink href="/admin/portal" label="Portal Management" />
          <AdminLink href="/admin/proof" label="Proof Artifacts" />

          <div className="pt-4 pb-2">
            <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              System
            </p>
          </div>
          <AdminLink href="/admin/audit-logs" label="Audit Logs" />
          <AdminLink href="/admin/settings" label="Settings" />
        </nav>
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground font-mono">
            v1.0.0 (Operator)
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
             {/* Mobile Toggle Placeholder */}
             <span className="md:hidden font-mono font-bold">TS//ADMIN</span>
             {/* Breadcrumbs Placeholder */}
             <span className="hidden md:inline-block text-sm text-muted-foreground">/ Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-medium">
              OP
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 relative">
             {/* System Layer Background Effect for Admin */}
             <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] z-0" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-2 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
    >
      {label}
    </Link>
  );
}
