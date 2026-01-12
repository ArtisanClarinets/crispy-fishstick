export const metadata = {
  title: "Workload Estimator",
  description: "Turn business inputs into hardware specifications.",
};

export default function EstimatorPage() {
  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Workload Estimator</h1>
          <p className="text-muted-foreground">
            Describe your workload requirements to get a physics-based hardware recommendation.
          </p>
        </div>
        
        <div className="p-8 border rounded-xl bg-card/50">
          <p className="text-center text-muted-foreground">
            Estimator Wizard Loading...
            <br />
            <span className="text-xs">(This will be the client-side wizard component)</span>
          </p>
        </div>
      </div>
    </div>
  );
}
