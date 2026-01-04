import React from "react";
import Link from "next/link";

export default function PortalDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Track active projects, deliverables, and evidence drops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCard
            title="E-Commerce Replatform"
            status="In Progress"
            nextMilestone="Beta Release - Oct 24"
            progress={65}
          />
          <ProjectCard
            title="Security Audit"
            status="Completed"
            nextMilestone="Final Report"
            progress={100}
            completed
          />
          <div className="rounded-xl border border-dashed border-border bg-transparent p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  +
              </div>
              <p className="font-medium">New Project</p>
              <p className="text-xs text-muted-foreground mt-1">Contact us to start</p>
          </div>
      </div>

      <div>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
           <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                DOC
                            </div>
                            <div>
                                <p className="text-sm font-medium">Architecture Diagram v2.0</p>
                                <p className="text-xs text-muted-foreground">Added to <span className="text-foreground">E-Commerce Replatform</span></p>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            2 hours ago
                        </div>
                    </div>
                ))}
           </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, status, nextMilestone, progress, completed }: any) {
    return (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="font-semibold text-lg">{title}</div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    completed ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600"
                }`}>
                    {status}
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next Milestone</p>
                    <p className="text-sm font-medium">{nextMilestone}</p>
                </div>

                <div>
                     <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                         <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                     </div>
                </div>

                <div className="pt-2">
                    <Link href="/portal/projects/1" className="text-sm font-medium text-primary hover:underline">
                        View Project &rarr;
                    </Link>
                </div>
            </div>
        </div>
    )
}
