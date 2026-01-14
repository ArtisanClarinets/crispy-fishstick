"use client";

import { RecommendationResult } from "@/shared/lib/server-config/types";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Check, ArrowLeft, Server, Cpu, HardDrive, Zap } from "lucide-react";

interface RecommendationViewProps {
  result: RecommendationResult;
  onReset: () => void;
}

export function RecommendationView({ result, onReset }: RecommendationViewProps) {
  const { primarySku, alternativeSkus, requirements, explanation } = result;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header / Summary */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recommendation Ready</h2>
        <p className="text-muted-foreground">
          Based on your {explanation.bottleneck.replace("_", " ")} constraints and a {explanation.headroomFactor}x safety margin.
        </p>
      </div>

      {/* Primary Recommendation */}
      <Card className="border-primary/50 shadow-2xl shadow-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <Badge variant="secondary" className="text-lg py-1 px-4">Top Pick</Badge>
        </div>
        <CardHeader>
           <CardTitle className="text-2xl flex items-center gap-2">
              <Server className="h-6 w-6 text-primary" />
              {primarySku.name}
           </CardTitle>
           <CardDescription className="text-lg">{primarySku.description}</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Specs</h4>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2"><Cpu className="h-4 w-4" /> {primarySku.specs.cpuCores} Cores</li>
                 <li className="flex items-center gap-2"><Zap className="h-4 w-4" /> {primarySku.specs.ramGB} GB RAM</li>
                 <li className="flex items-center gap-2"><HardDrive className="h-4 w-4" /> {primarySku.specs.storageGB} GB {primarySku.specs.storageType}</li>
                 <li className="flex items-center gap-2">Network: {primarySku.specs.networkSpeedGbps} Gbps</li>
                 {primarySku.specs.gpuCount ? (
                    <li className="flex items-center gap-2 text-accent-foreground font-medium">
                       GPU: {primarySku.specs.gpuCount}x ({primarySku.specs.gpuVramGB}GB VRAM)
                    </li>
                 ) : null}
              </ul>
           </div>
           <div className="space-y-4 border-l pl-8 border-border/50">
              <h4 className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Why this SKU?</h4>
              <ul className="space-y-2 text-sm">
                 {explanation.notes.map((note, i) => (
                    <li key={i} className="flex gap-2">
                       <Check className="h-4 w-4 text-primary shrink-0" />
                       {note}
                    </li>
                 ))}
              </ul>
              <div className="pt-4">
                 <div className="text-3xl font-bold">${primarySku.priceMonthly}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              </div>
           </div>
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-between items-center">
           <div className="text-sm text-muted-foreground">Stock: <span className="capitalize text-foreground font-medium">{primarySku.stockStatus.replace("_", " ")}</span></div>
           <div className="flex gap-4">
              <Button variant="outline" onClick={onReset}>
                 <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
              </Button>
              <Button className="signal-sheen">Configure & Deploy</Button>
           </div>
        </CardFooter>
      </Card>

      {/* Computed Requirements (The Math) */}
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Computed Minimum Requirements</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
               <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{requirements.cpuCores}</div>
                  <div className="text-xs text-muted-foreground uppercase">Min Cores</div>
               </div>
               <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{requirements.ramGB} GB</div>
                  <div className="text-xs text-muted-foreground uppercase">Min RAM</div>
               </div>
               <div className="p-4 bg-muted/20 rounded-lg">
                  <div className="text-2xl font-bold">{requirements.storageGB} GB</div>
                  <div className="text-xs text-muted-foreground uppercase">Min Storage</div>
               </div>
               {requirements.gpuVramGB ? (
                  <div className="p-4 bg-muted/20 rounded-lg border border-accent/20">
                     <div className="text-2xl font-bold">{requirements.gpuVramGB} GB</div>
                     <div className="text-xs text-muted-foreground uppercase">Min VRAM</div>
                  </div>
               ) : (
                  <div className="p-4 bg-muted/20 rounded-lg">
                     <div className="text-2xl font-bold">N/A</div>
                     <div className="text-xs text-muted-foreground uppercase">GPU</div>
                  </div>
               )}
            </div>
         </CardContent>
      </Card>

      {/* Alternatives */}
      {alternativeSkus.length > 0 && (
         <div className="space-y-4">
            <h3 className="text-xl font-semibold">Alternatives</h3>
            <div className="grid md:grid-cols-2 gap-4">
               {alternativeSkus.map((sku) => (
                  <Card key={sku.id} className="bg-muted/10">
                     <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{sku.name}</CardTitle>
                        <CardDescription>{sku.description}</CardDescription>
                     </CardHeader>
                     <CardContent className="pb-2">
                        <div className="flex gap-4 text-sm">
                           <span>{sku.specs.cpuCores} Cores</span>
                           <span>{sku.specs.ramGB} GB RAM</span>
                           <span className="font-bold ml-auto">${sku.priceMonthly}/mo</span>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      )}

      <div className="flex justify-center pt-8">
         <Button variant="ghost" onClick={onReset}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
         </Button>
      </div>
    </div>
  );
}
