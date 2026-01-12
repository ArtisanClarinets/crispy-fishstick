import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Infrastructure Hub | Hardware Operations Center",
  description: "Radical Transparency in Hardware Operations. Math-backed recommendations, no lock-in.",
};

export default function InfrastructureHubPage() {
  return (
    <div className="container py-24 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Radical Transparency
        </h1>
        <p className="text-xl text-muted-foreground">
          The Hardware Operations Center. No sales fluff, just engineering truth.
        </p>
      </section>

      {/* Pathways */}
      <section className="grid md:grid-cols-3 gap-8">
        <Link href="/infrastructure/academy" className="group">
          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <BookOpen className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Academy</CardTitle>
              <CardDescription>
                I need to learn about hardware economics and myths.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Start Learning <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/infrastructure/estimator" className="group">
          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <Calculator className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Estimator</CardTitle>
              <CardDescription>
                I have a problem or workload but no specs yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Calculate Specs <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/infrastructure/configurator" className="group">
          <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <Server className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Configurator</CardTitle>
              <CardDescription>
                I have a spec and need to build/price it out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Start Building <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Truth Engine Principles */}
      <section className="bg-muted/30 rounded-2xl p-8 md:p-12 border border-border/50">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">Truth Engine Principles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold">Math-Backed</h3>
              <p className="text-muted-foreground text-sm">
                Every recommendation is derived from first principles and workload physics, not sales quotas.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">No Lock-In</h3>
              <p className="text-muted-foreground text-sm">
                We design for standard commodity hardware. Move your workload anywhere, anytime.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Full Explanation</h3>
              <p className="text-muted-foreground text-sm">
                We show our work. You'll see exactly why we recommend a specific CPU or drive type.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">TCO Focus</h3>
              <p className="text-muted-foreground text-sm">
                We optimize for Total Cost of Ownership, including power, cooling, and licensing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
