import { ServerConfigWizard } from '@/components/server-config/wizard';

export const metadata = {
  title: 'Server Recommendation Engine | Thompson Systems',
  description: 'Interactive sizing tool for high-performance infrastructure.',
};

export default function ServerConfigPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Infrastructure Sizing Engine
        </h1>
        <p className="text-lg text-muted-foreground">
          Define your workload intent and get precise, evidence-backed server specifications.
          Calculations include bottleneck analysis and production-grade headroom.
        </p>
      </div>

      <ServerConfigWizard />
    </div>
  );
}
