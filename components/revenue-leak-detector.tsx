"use client";

import { useState, useMemo } from "react";
import { calculateLeak } from "@/lib/revenue-leak/model";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Download, Activity } from "lucide-react";
import Link from "next/link";

// --- Custom Area Chart Component ---
function ProjectionsChart({
  revenue,
  monthlyLeak
}: {
  revenue: number;
  monthlyLeak: number;
}) {
  const dataPoints = 12;
  const width = 1000;
  const height = 300;
  const padding = 40;

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxRevenue = revenue * dataPoints;

  const getX = (month: number) => padding + (month / (dataPoints - 1)) * chartWidth;
  const getY = (val: number) => height - padding - (val / maxRevenue) * chartHeight;

  let optimizedPath = `M ${getX(0)} ${getY(0)}`;
  let currentPath = `M ${getX(0)} ${getY(0)}`;

  for (let i = 1; i < dataPoints; i++) {
    const month = i;
    const optVal = revenue * (month + 1);
    const currVal = (revenue - monthlyLeak) * (month + 1);

    optimizedPath += ` L ${getX(month)} ${getY(optVal)}`;
    currentPath += ` L ${getX(month)} ${getY(currVal)}`;
  }

  let areaPath = optimizedPath;
  for (let i = dataPoints - 1; i >= 0; i--) {
     const currVal = (revenue - monthlyLeak) * (i + 1);
     areaPath += ` L ${getX(i)} ${getY(currVal)}`;
  }
  areaPath += " Z";

  return (
    <div className="w-full h-full relative font-mono text-xs select-none">
       <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
             <line
               key={tick}
               x1={padding}
               y1={getY(maxRevenue * tick)}
               x2={width - padding}
               y2={getY(maxRevenue * tick)}
               stroke="currentColor"
               strokeOpacity="0.1"
             />
          ))}
          <motion.path
             d={areaPath}
             fill="currentColor"
             className="text-destructive/10"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1 }}
          />
          <motion.path
             d={optimizedPath}
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             className="text-primary"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
             d={currentPath}
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             className="text-muted-foreground"
             strokeDasharray="4 4"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <text x={getX(dataPoints - 1) + 10} y={getY(revenue * dataPoints)} fill="currentColor" className="text-primary font-bold">Optimized</text>
          <text x={getX(dataPoints - 1) + 10} y={getY((revenue - monthlyLeak) * dataPoints)} fill="currentColor" className="text-muted-foreground">Current</text>
       </svg>
    </div>
  );
}


export function RevenueLeakDetector() {
  const [revenue, setRevenue] = useState(50000);
  const [conversion, setConversion] = useState(2.0);
  const [responseTime, setResponseTime] = useState(30);
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  const result = useMemo(() => {
    return calculateLeak(revenue, conversion, responseTime);
  }, [revenue, conversion, responseTime]);

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="w-full mx-auto bg-card border border-border rounded-none md:rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px]">

      {/* Left Panel: Inputs (Diagnostic Controls) */}
      <div className="w-full lg:w-1/3 p-6 md:p-8 bg-muted/30 border-r border-border flex flex-col">
         <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Input Parameters</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">System Configuration</h2>
         </div>

         <div className="space-y-8 flex-1">
            {/* Revenue Input */}
            <div className="space-y-3 group">
               <label className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Monthly Revenue ($)</label>
               <div className="flex items-center gap-4">
                  <input
                     type="number"
                     value={revenue}
                     onChange={(e) => setRevenue(Number(e.target.value))}
                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
                  />
                  <input
                     type="range"
                     min="10000" max="1000000" step="1000"
                     value={revenue}
                     onChange={(e) => setRevenue(Number(e.target.value))}
                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
               </div>
            </div>

             {/* Conversion Input */}
             <div className="space-y-3 group">
               <label className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Conversion Rate (%)</label>
               <div className="flex items-center gap-4">
                  <input
                     type="number"
                     min="0.1" max="100" step="0.1"
                     value={conversion}
                     onChange={(e) => setConversion(Number(e.target.value))}
                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
                  />
                  <input
                     type="range"
                     min="0.1" max="10.0" step="0.1"
                     value={conversion}
                     onChange={(e) => setConversion(Number(e.target.value))}
                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
               </div>
            </div>

             {/* Response Time Input */}
             <div className="space-y-3 group">
               <label className="text-xs font-mono uppercase text-muted-foreground group-hover:text-primary transition-colors">Lead Response Time (min)</label>
               <div className="flex items-center gap-4">
                  <input
                     type="number"
                     min="0" max="1440"
                     value={responseTime}
                     onChange={(e) => setResponseTime(Number(e.target.value))}
                     className="bg-background border border-border px-3 py-2 w-32 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-sm"
                  />
                  <input
                     type="range"
                     min="1" max="120" step="1"
                     value={responseTime}
                     onChange={(e) => setResponseTime(Number(e.target.value))}
                     className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
               </div>
            </div>
         </div>

         {/* System Status Footer (Left) */}
         <div className="mt-8 pt-6 border-t border-border/50">
             <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                 System: Offline / Local Client
             </div>
         </div>
      </div>

      {/* Right Panel: Telemetry & Results */}
      <div className="w-full lg:w-2/3 p-6 md:p-8 bg-background flex flex-col">

         {/* Header Telemetry */}
         <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
               <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Risk Assessment</div>
               <div className={cn(
                  "text-4xl font-mono font-bold tracking-tight",
                  result.band === "high" ? "text-destructive" :
                  result.band === "medium" ? "text-orange-500" : "text-green-500"
               )}>
                  {result.riskScore}/100
               </div>
            </div>
            <div>
               <div className="text-xs font-mono uppercase text-muted-foreground mb-1">Est. 12-Mo Revenue Leak</div>
               <div className="text-4xl font-mono font-bold tracking-tight text-foreground">
                  ${(result.monthlyLeak * 12).toLocaleString()}
               </div>
               <div className="text-xs text-muted-foreground mt-1">
                  Based on current trajectory vs. optimized state
               </div>
            </div>
         </div>

         {/* Chart Area */}
         <div className="flex-1 min-h-[250px] bg-secondary/5 border border-border/50 rounded-sm mb-8 relative p-4">
             <div className="absolute top-4 left-4 text-[10px] font-mono uppercase text-muted-foreground">
                Projection Model: 12-Month Horizon
             </div>
             <ProjectionsChart revenue={revenue} monthlyLeak={result.monthlyLeak} />
         </div>

         {/* Recommendations & Actions */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Diagnostic Report
               </h3>
               <div className="space-y-4">
                  {result.remediation.map((item, i) => (
                      <div key={i} className="text-sm border-l-2 border-border pl-3 py-1">
                          <div className={cn("font-medium mb-1", item.type === 'critical' ? 'text-destructive' : 'text-foreground')}>
                             {item.issue}
                          </div>
                          <div className="text-muted-foreground text-xs leading-relaxed">
                             {item.action}
                          </div>
                          {item.link && (
                             <Link href={item.link.href} className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2 hover:underline">
                                {item.link.label} <ArrowRight className="w-3 h-3" />
                             </Link>
                          )}
                      </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col justify-end space-y-4">
                <div className="bg-secondary/20 p-4 rounded-sm border border-border/50">
                    <div className="text-xs font-mono uppercase text-muted-foreground mb-2">Action Required</div>
                    <p className="text-sm text-foreground mb-4">
                       {result.band === 'high'
                          ? "Critical system inefficiencies detected. Immediate architectural review recommended."
                          : "Optimization opportunities identified. Schedule a technical deep-dive."}
                    </p>
                    <Button className="w-full" asChild>
                       <Link href="/contact">Book Technical Audit</Link>
                    </Button>
                </div>
                <Button variant="outline" className="w-full font-mono text-xs" onClick={handleExport}>
                   <Download className="w-3 h-3 mr-2" /> Export Report
                </Button>
            </div>
         </div>

         {/* Methodology Accordion (Simple Custom Implementation) */}
         <div className="mt-8 pt-4 border-t border-border">
            <button
              onClick={() => setMethodologyOpen(!methodologyOpen)}
              className="w-full flex items-center justify-between text-xs font-mono uppercase text-muted-foreground hover:text-foreground py-2 focus:outline-none"
            >
               <span>[ + View Calculation Methodology ]</span>
               <ChevronDown className={cn("w-4 h-4 transition-transform", methodologyOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {methodologyOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-sm text-muted-foreground space-y-4 pl-4 border-l border-primary/20 py-4">
                     <div className="space-y-1">
                        <strong className="text-foreground">Algorithmic Basis & Data Sources</strong>
                        <p>This diagnostic instrument models <em>Latency-Induced Opportunity Cost</em>. The algorithm applies a non-linear decay function to your baseline <em>Conversion Rate</em>, correlated against the <em>Lead Response Time</em> delta.</p>
                     </div>
                     <div className="space-y-1">
                        <strong className="text-foreground">Key Benchmarks</strong>
                        <ul className="list-disc list-inside space-y-1">
                           <li><strong>The 5-Minute Threshold:</strong> Based on data from the <em>Lead Response Management Study</em>, the odds of qualifying a lead decrease significantly if response time exceeds 5 minutes.</li>
                           <li><strong>Decay Trajectory:</strong> Beyond the initial 5-minute window, lead viability follows a logarithmic decay curve. This model projects that decay against your <em>Monthly Revenue</em> to estimate the delta between <em>Optimized Performance</em> (T &lt; 5min) and <em>Current State</em>.</li>
                        </ul>
                     </div>
                     <div className="space-y-1">
                        <strong className="text-foreground">Privacy Protocol</strong>
                        <p>All computations are executed locally within the client-side runtime environment. No financial inputs or telemetry data are transmitted to Thompson Systems servers.</p>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>

      </div>
    </div>
  );
}
