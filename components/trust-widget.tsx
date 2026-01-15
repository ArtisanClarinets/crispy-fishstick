"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Smartphone, Eye, Server } from "lucide-react";
import { motion } from "framer-motion";

export function TrustWidget() {
  const items = [
    { label: "Google Compliance", status: "Passing", icon: Shield },
    { label: "Mobile Friendly", status: "Yes", icon: Smartphone },
    { label: "ADA Contrast", status: "Yes", icon: Eye },
    { label: "SSL Secure", status: "Active", icon: Server },
  ];

  return (
    <Card className="card-precision w-full h-full bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Shield className="text-primary w-5 h-5" />
          Health Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-[var(--signal-success)]">{item.status}</span>
                <div className="bg-[var(--signal-success)]/20 p-0.5 rounded-full">
                  <Check className="w-3 h-3 text-[var(--signal-success)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last scanned: Just now</span>
            <span className="flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-[var(--signal-success)] animate-pulse" />
               Live
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
