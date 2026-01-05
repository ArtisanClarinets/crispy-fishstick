"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </Button>
  );
}
