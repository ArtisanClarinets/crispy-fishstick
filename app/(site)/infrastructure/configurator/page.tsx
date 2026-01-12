export const metadata = {
  title: "Server Configurator",
  description: "Build your server with live TCO and compatibility checks.",
};

export default function ConfiguratorPage() {
  return (
    <div className="container py-8 h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="lg:col-span-2 space-y-4">
           <h1 className="text-2xl font-bold">Configurator</h1>
           <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border border-dashed">
             <span className="text-muted-foreground">Server Paper Doll / Visualization</span>
           </div>
           <div className="grid grid-cols-3 gap-4">
             <div className="p-4 border rounded bg-card">
               <div className="text-xs text-muted-foreground uppercase">Monthly Cost</div>
               <div className="text-2xl font-mono font-bold">$0.00</div>
             </div>
             <div className="p-4 border rounded bg-card">
               <div className="text-xs text-muted-foreground uppercase">Power Draw</div>
               <div className="text-2xl font-mono font-bold">0 W</div>
             </div>
             <div className="p-4 border rounded bg-card">
               <div className="text-xs text-muted-foreground uppercase">Validation</div>
               <div className="text-sm font-medium text-green-500">Ready</div>
             </div>
           </div>
        </div>
        
        <div className="border-l pl-8 space-y-6 overflow-y-auto">
          <h2 className="font-semibold text-lg">Configuration</h2>
          <p className="text-sm text-muted-foreground">Select components to build your spec.</p>
          {/* Stepper controls will go here */}
        </div>
      </div>
    </div>
  );
}
