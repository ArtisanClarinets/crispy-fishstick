import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure Academy",
  description: "Learn the truth about cloud costs, hardware performance, and data sovereignty.",
};

export default function AcademyIndexPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold mb-8">Infrastructure Academy</h1>
      <p className="text-muted-foreground mb-12">Inoculate yourself against cloud marketing fluff.</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for content items - normally fetched from DB */}
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2">The Latency Tax</h3>
          <p className="text-muted-foreground text-sm mb-4">Why your cloud bills are really about network hops.</p>
          <span className="text-xs font-mono bg-muted px-2 py-1 rounded">Coming Soon</span>
        </div>
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2">vCPU vs Core</h3>
          <p className="text-muted-foreground text-sm mb-4">The performance difference they don't want you to measure.</p>
          <span className="text-xs font-mono bg-muted px-2 py-1 rounded">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
