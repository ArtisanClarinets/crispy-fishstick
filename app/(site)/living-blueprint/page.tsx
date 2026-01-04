
import { LivingBlueprintSection } from "@/components/living-blueprint-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Living Blueprint",
  description: "A scroll-driven assembly that turns the build plan into something you can inspect.",
};

export default function LivingBlueprintPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LivingBlueprintSection />
    </div>
  );
}
