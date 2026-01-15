"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Eye, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InteractiveToggle() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [headline, setHeadline] = useState("Fresh Coffee, Served Daily.");
  const [price, setPrice] = useState("4.50");

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10 rounded-3xl border border-border bg-card shadow-2xl">
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-border/50">
        <div className="space-y-1">
           <h3 className="font-semibold text-lg">Try it yourself</h3>
           <p className="text-sm text-muted-foreground">Toggle &quot;Edit Mode&quot; to see how easy it is.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="mode-toggle" className={`font-medium ${!isEditMode ? 'text-foreground' : 'text-muted-foreground'}`}>Live View</Label>
          <Switch id="mode-toggle" checked={isEditMode} onCheckedChange={setIsEditMode} />
          <Label htmlFor="mode-toggle" className={`font-medium ${isEditMode ? 'text-primary' : 'text-muted-foreground'}`}>Edit Mode</Label>
        </div>
      </div>

      <div className="relative min-h-[200px] flex flex-col justify-center items-center text-center space-y-4 p-8 rounded-xl bg-background border border-dashed border-border/50">
         <AnimatePresence mode="wait">
            {isEditMode ? (
               <motion.div
                  key="edit"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full space-y-4"
               >
                  <div className="flex items-center justify-center gap-2 mb-4 text-primary text-sm font-medium">
                     <Edit className="w-4 h-4" /> Editing Homepage Hero
                  </div>

                  <div className="space-y-2 text-left max-w-sm mx-auto">
                     <Label className="text-xs uppercase text-muted-foreground">Headline</Label>
                     <Input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="text-center text-lg font-bold"
                     />
                  </div>

                  <div className="space-y-2 text-left max-w-xs mx-auto">
                     <Label className="text-xs uppercase text-muted-foreground">Price Display</Label>
                     <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                        <Input
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           className="pl-7"
                        />
                     </div>
                  </div>

                  <Button className="w-full max-w-xs mx-auto mt-4 gap-2" size="sm">
                     <Save className="w-4 h-4" /> Save Changes
                  </Button>
               </motion.div>
            ) : (
               <motion.div
                  key="live"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
               >
                  <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground text-sm font-medium">
                     <Eye className="w-4 h-4" /> Live Website View
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                     {headline}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                     Latte: <span className="font-semibold text-foreground">${price}</span>
                  </p>
                  <Button variant="outline" className="mt-4 rounded-full">Order Now</Button>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
