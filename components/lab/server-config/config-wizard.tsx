"use client";

import { useState } from "react";
import { WorkloadIntent, RecommendationResult } from "@/lib/server-config/types";
import { IntentForm } from "./intent-form";
import { RecommendationView } from "./recommendation-view";
import { AnimatePresence, motion } from "framer-motion";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

export function ConfigWizard() {
  const [step, setStep] = useState<"intent" | "result">("intent");
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  const handleIntentSubmit = async (intent: WorkloadIntent) => {
    try {
      const res = await fetchWithCsrf("/api/server-config/recommend", {
        method: "POST",
        body: JSON.stringify(intent),
      });

      if (!res.ok) throw new Error("Failed to get recommendation");

      const data = await res.json();
      setRecommendation(data);
      setStep("result");
    } catch (error) {
      console.error(error);
      // In a real app, show toast error here
    }
  };

  const handleReset = () => {
    setStep("intent");
    setRecommendation(null);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <AnimatePresence mode="wait">
        {step === "intent" ? (
          <motion.div
            key="intent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <IntentForm onSubmit={handleIntentSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {recommendation && (
              <RecommendationView result={recommendation} onReset={handleReset} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
