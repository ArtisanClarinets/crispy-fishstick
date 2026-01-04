'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Image as ImageIcon,
  ShieldAlert,
  BarChart3,
  ScrollText,
  Receipt,
  Briefcase,
  FolderKanban,
  AlertTriangle,
  Server
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Leads',
    href: '/admin/leads',
    icon: Users, // Should probably change this icon if Users uses Users
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    title: 'Services',
    href: '/admin/services',
    icon: Server,
  },
  {
    title: 'Incidents',
    href: '/admin/incidents',
    icon: AlertTriangle,
  },
  {
    title: 'Proposals',
    href: '/admin/proposals',
    icon: Briefcase,
  },
  {
    title: 'Contracts',
    href: '/admin/contracts',
    icon: ScrollText,
  },
  {
    title: 'Invoices',
    href: '/admin/invoices',
    icon: Receipt,
  },
  {
    title: 'Media',
    href: '/admin/media',
    icon: ImageIcon,
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: FileText,
  },
  {
    title: 'Audit Logs',
    href: '/admin/audit',
    icon: ShieldAlert,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Vantus Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          v1.0.0 (SQLite)
        </div>
      </div>
    </div>
  );
}
