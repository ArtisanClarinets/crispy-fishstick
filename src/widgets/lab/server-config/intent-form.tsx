"use client";

import { useForm } from "react-hook-form";
import { WorkloadIntent, WorkloadIntentSchema } from "@/shared/lib/server-config/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

interface IntentFormProps {
  onSubmit: (data: WorkloadIntent) => Promise<void>;
}

export function IntentForm({ onSubmit }: IntentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch } = useForm<WorkloadIntent>({
    defaultValues: {
      workloadType: "web_server",
      environment: "production",
      trafficPattern: "constant",
      userCount: 100,
      // Defaults for specifics (will be cleaned up by schema parse)
      requestsPerSecond: 50,
      concurrentConnections: 20,
      datasetSizeGB: 10,
      readWriteRatio: "balanced",
      modelSizeParams: "medium",
      batchSize: 1,
      trainingOrInference: "inference",
      storageCapacityTB: 1,
      accessFrequency: "hot",
      concurrentJobs: 1,
    } as any
  });

  const workloadType = watch("workloadType");

  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Validate with Zod manually since we don't have resolvers
      // We need to coerce types because HTML inputs return strings
      const payload = {
        ...data,
        userCount: Number(data.userCount),
        requestsPerSecond: Number(data.requestsPerSecond),
        concurrentConnections: Number(data.concurrentConnections),
        datasetSizeGB: Number(data.datasetSizeGB),
        batchSize: Number(data.batchSize),
        storageCapacityTB: Number(data.storageCapacityTB),
        concurrentJobs: Number(data.concurrentJobs),
      };

      const validData = WorkloadIntentSchema.parse(payload);
      await onSubmit(validData);
    } catch (error) {
      console.error("Validation failed", error);
      if (error instanceof z.ZodError) {
        const message = error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("\n");
        alert("Please fix the following errors:\n" + message);
      } else if (error instanceof Error) {
        alert("An error occurred: " + error.message);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-2xl shadow-primary/5">
      <CardHeader>
        <CardTitle>Workload Intelligence</CardTitle>
        <CardDescription>
          Describe your intended workload to receive a heuristic-based hardware recommendation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workloadType">Workload Type</Label>
              <select
                {...register("workloadType")}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 input-precision"
              >
                <option value="web_server">Web Server</option>
                <option value="database">Database</option>
                <option value="ai_ml">AI / ML Node</option>
                <option value="storage_node">Storage Cluster</option>
                <option value="general_compute">General Compute</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <select
                {...register("environment")}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 input-precision"
              >
                <option value="production">Production</option>
                <option value="staging">Staging / QA</option>
                <option value="dev">Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="trafficPattern">Traffic Pattern</Label>
              <select
                {...register("trafficPattern")}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 input-precision"
              >
                <option value="constant">Constant (Steady)</option>
                <option value="bursty">Bursty (Spikes)</option>
                <option value="predictable_spikes">Predictable Spikes</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userCount">Estimated Concurrent Users</Label>
              <Input
                type="number"
                {...register("userCount", { min: 1 })}
              />
            </div>
          </div>

          <div className="border-t border-border pt-6 mt-6">
             <h3 className="text-lg font-medium mb-4">Specific Parameters</h3>
             
             {workloadType === "web_server" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label>Requests Per Second (Avg)</Label>
                      <Input type="number" {...register("requestsPerSecond")} />
                   </div>
                   <div className="space-y-2">
                      <Label>Concurrent Connections</Label>
                      <Input type="number" {...register("concurrentConnections")} />
                   </div>
                </div>
             )}

             {workloadType === "database" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label>Dataset Size (GB)</Label>
                      <Input type="number" {...register("datasetSizeGB")} />
                   </div>
                   <div className="space-y-2">
                      <Label>I/O Pattern</Label>
                      <select {...register("readWriteRatio")} className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 input-precision">
                         <option value="read_heavy">Read Heavy (Caching)</option>
                         <option value="write_heavy">Write Heavy (Ingest)</option>
                         <option value="balanced">Balanced</option>
                      </select>
                   </div>
                </div>
             )}

             {workloadType === "ai_ml" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label>Model Size</Label>
                      <select {...register("modelSizeParams")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                         <option value="small">Small (e.g. 7B, ResNet)</option>
                         <option value="medium">Medium (e.g. 13B, SDXL)</option>
                         <option value="large">Large (e.g. 30B+)</option>
                         <option value="xlarge">X-Large (e.g. 70B+)</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <Label>Task Type</Label>
                      <select {...register("trainingOrInference")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                         <option value="inference">Inference</option>
                         <option value="training">Training / Fine-tuning</option>
                      </select>
                   </div>
                </div>
             )}

             {workloadType === "storage_node" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label>Capacity Needed (TB)</Label>
                      <Input type="number" {...register("storageCapacityTB")} />
                   </div>
                   <div className="space-y-2">
                      <Label>Access Frequency</Label>
                      <select {...register("accessFrequency")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                         <option value="hot">Hot (Frequent)</option>
                         <option value="warm">Warm (Occasional)</option>
                         <option value="cold">Cold (Archive)</option>
                      </select>
                   </div>
                </div>
             )}

             {workloadType === "general_compute" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label>Concurrent Jobs</Label>
                      <Input type="number" {...register("concurrentJobs")} />
                   </div>
                </div>
             )}
          </div>

          <div className="flex justify-end pt-4">
             <Button type="submit" size="lg" disabled={isSubmitting} className="signal-sheen">
                {isSubmitting ? (
                   <>Computing... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                ) : (
                   <>Generate Recommendation <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
             </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}
