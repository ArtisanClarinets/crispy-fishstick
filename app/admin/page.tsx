import React from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, Operator. System status is nominal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value="12" change="+2 today" />
        <StatCard title="Content Drafts" value="4" change="Needs review" />
        <StatCard title="Active Projects" value="3" change="All healthy" />
        <StatCard title="System Health" value="100%" change="All checks pass" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
             {/* Placeholder List */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-start gap-3 text-sm">
                 <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                 <div>
                   <p className="font-medium">Audit Log Entry #{1000 + i}</p>
                   <p className="text-muted-foreground text-xs">Admin updated content settings.</p>
                 </div>
                 <div className="ml-auto text-xs text-muted-foreground font-mono">
                   10:42 AM
                 </div>
               </div>
             ))}
          </div>
        </div>
         <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-medium mb-4">Proof Status</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/20">
                  <span className="text-sm">Security Headers</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                    Enforced
                  </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-border bg-muted/20">
                  <span className="text-sm">Build Provenance</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                    Verified
                  </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{change}</p>
    </div>
  );
}
