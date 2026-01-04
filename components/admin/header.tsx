'use client';

import { signOut, useSession } from "next-auth/react";
import { LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
      <div className="w-full flex-1">
        {/* Breadcrumb placeholder or search */}
        <h1 className="text-lg font-semibold md:text-xl">Admin Portal</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2 text-sm">
            {session?.user?.email && (
                <span className="hidden md:inline-block text-muted-foreground">
                    {session.user.email}
                </span>
            )}
            <Button variant="ghost" size="icon" onClick={() => signOut()} title="Sign out">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign out</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
