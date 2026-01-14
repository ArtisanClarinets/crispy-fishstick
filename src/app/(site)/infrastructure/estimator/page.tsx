import { EstimatorWizard } from "@/widgets/infrastructure/estimator/wizard";

export const metadata = {
  title: "Workload Estimator | Vantus Systems",
  description: "Physics-based hardware sizing. No sales fluff.",
};

export default function EstimatorPage() {
  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto space-y-8 mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Workload Estimator</h1>
        <p className="text-xl text-muted-foreground">
          Turn your business metrics into engineering specifications.
        </p>
      </div>

      <EstimatorWizard />
    </div>
  );
}
