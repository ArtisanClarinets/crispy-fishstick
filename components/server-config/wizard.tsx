"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkloadIntentSchema } from '@/lib/server-config/schema';
import { WorkloadIntent, RecommendationResult } from '@/lib/server-config/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ServerConfigWizard() {
  const [step, setStep] = useState(1);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<WorkloadIntent>({
    resolver: zodResolver(WorkloadIntentSchema),
    defaultValues: {
      traffic: 'medium',
      persistence: 'ephemeral',
    }
  });

  const appType = watch('appType');

  const onSubmit = async (data: WorkloadIntent) => {
    setLoading(true);
    try {
      const res = await fetch('/api/server-config/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setRecommendation(result);
      setStep(3);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <div className="flex justify-between mb-8">
        <div className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>1. Intent</div>
        <div className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>2. Details</div>
        <div className={`text-sm font-medium ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>3. Recommendation</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">What type of application are you deploying?</Label>
              <div className="grid grid-cols-2 gap-4">
                {['web', 'db', 'cache', 'ml'].map((type) => (
                  <Label key={type} className={`border p-4 rounded-lg cursor-pointer hover:bg-muted ${appType === type ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                    <input type="radio" value={type} {...register('appType')} className="sr-only" />
                    <span className="capitalize font-medium">{type === 'ml' ? 'Machine Learning' : type === 'db' ? 'Database' : type}</span>
                  </Label>
                ))}
              </div>
              {errors.appType && <p className="text-destructive text-sm">Please select an application type</p>}
            </div>

            <div className="pt-4">
              <Button type="button" onClick={nextStep} disabled={!appType}>Next: Details</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Traffic / Load Level</Label>
              <div className="flex gap-4">
                {['low', 'medium', 'high'].map((level) => (
                  <Label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={level} {...register('traffic')} className="accent-primary" />
                    <span className="capitalize">{level}</span>
                  </Label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Data Persistence</Label>
              <div className="flex gap-4">
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="ephemeral" {...register('persistence')} className="accent-primary" />
                  <span>Ephemeral (Stateless)</span>
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="persistent" {...register('persistence')} className="accent-primary" />
                  <span>Persistent (Stateful)</span>
                </Label>
              </div>
            </div>

            {appType === 'db' && (
               <div className="space-y-2">
                 <Label>Estimated Data Size (GB)</Label>
                 <Input type="number" {...register('dataSizeGb', {
                   valueAsNumber: true,
                   setValueAs: (v) => v === '' ? undefined : Number(v)
                 })} placeholder="e.g. 10" />
               </div>
            )}

            {appType === 'cache' && (
               <div className="space-y-2">
                 <Label>Cache Size (GB)</Label>
                 <Input type="number" {...register('dataSizeGb', {
                   valueAsNumber: true,
                   setValueAs: (v) => v === '' ? undefined : Number(v)
                 })} placeholder="e.g. 5" />
               </div>
            )}

            {appType === 'ml' && (
               <div className="space-y-2">
                 <Label>Model Size (GB)</Label>
                 <Input type="number" {...register('modelSizeGb', {
                   valueAsNumber: true,
                   setValueAs: (v) => v === '' ? undefined : Number(v)
                 })} placeholder="e.g. 2" />
               </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Get Recommendation'}</Button>
            </div>
          </div>
        )}
      </form>

      {step === 3 && recommendation && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-muted/50 p-6 rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-4">Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="text-xs text-muted-foreground uppercase">CPU</p>
                    <p className="font-mono text-lg">{recommendation.requirements.minCpuCores} Cores</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase">RAM</p>
                    <p className="font-mono text-lg">{recommendation.requirements.minRamGb} GB</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase">Storage</p>
                    <p className="font-mono text-lg">{recommendation.requirements.minStorageGb} GB ({recommendation.requirements.storageType.toUpperCase()})</p>
                </div>
                {recommendation.requirements.minGpuVramGb && (
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">GPU VRAM</p>
                        <p className="font-mono text-lg">{recommendation.requirements.minGpuVramGb} GB</p>
                    </div>
                )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">{recommendation.requirements.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recommended Servers</h3>
            {recommendation.recommendations.length > 0 ? (
                <div className="grid gap-4">
                {recommendation.recommendations.map((sku, i) => (
                    <Card key={sku.id} className={`p-4 flex justify-between items-center ${i === 0 ? 'border-primary shadow-md' : ''}`}>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold">{sku.name}</h4>
                                {i === 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Best Match</span>}
                            </div>
                            <p className="text-sm text-muted-foreground">{sku.cpuCores} vCPU • {sku.ramGb} GB RAM • {sku.storageGb} GB {sku.storageType.toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold">${sku.priceMonthly}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                        </div>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="p-8 text-center border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No exact matches found in inventory. Try adjusting your constraints.</p>
                </div>
            )}
          </div>

          <div className="bg-blue-500/5 p-4 rounded-lg text-sm space-y-1">
              <p><span className="font-semibold text-blue-600">Why this recommendation?</span></p>
              <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Limiting Factor: {recommendation.explanation.bottleneck}</li>
                  <li>Headroom Applied: {recommendation.explanation.headroom}</li>
                  <li>Sizing Factor: {recommendation.explanation.factor}</li>
              </ul>
          </div>

          <div className="pt-4">
            <Button variant="outline" onClick={() => setStep(1)}>Start Over</Button>
          </div>
        </div>
      )}
    </div>
  );
}
