"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    budget: "$10k - $25k",
    message: "",
    email: "",
    website: "",
    honeypot: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
        setStep(step + 1);
        return;
    }

    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally handle error UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center container px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
        >
          <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Message Received</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Thanks for reaching out. I usually respond within 24 hours to schedule a deep-dive session.
          </p>
          <Button asChild variant="outline">
            <a href="/">Back to Home</a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 container px-4 flex flex-col items-center justify-center" data-system-tone="contact">
      <div className="max-w-2xl w-full">
         <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let&apos;s talk engineering.</h1>
            <p className="text-xl text-muted-foreground">
               Tell me about the problem you&apos;re trying to solve.
            </p>
         </div>

        <Card className="border-border/50 shadow-2xl shadow-primary/5">
          <CardHeader className="space-y-1 pb-8 border-b border-border/50">
             <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                   <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-primary' : 'bg-secondary'}`} />
                ))}
             </div>
            <CardTitle className="text-xl">
               {step === 1 && "About You"}
               {step === 2 && "Project Details"}
               {step === 3 && "Contact Info"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit}>
              <div className="hidden">
                <Label htmlFor="honeypot">Leave this field empty</Label>
                <Input
                  id="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>
              <AnimatePresence mode="wait">
                 {step === 1 && (
                    <motion.div
                       key="step1"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-6"
                    >
                       <div className="space-y-2">
                          <Label htmlFor="name">What&apos;s your name?</Label>
                          <Input
                            id="name"
                            required
                            placeholder="Jane Doe"
                            className="h-14 text-lg"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="role">What is your role?</Label>
                          <Input
                            id="role"
                            placeholder="Founder, CTO, Product Lead..."
                            className="h-14 text-lg"
                            value={formData.role}
                            onChange={handleChange}
                          />
                       </div>
                    </motion.div>
                 )}

                 {step === 2 && (
                    <motion.div
                       key="step2"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-6"
                    >
                       <div className="space-y-2">
                          <Label htmlFor="budget">Estimated Budget Range</Label>
                          <select
                            id="budget"
                            className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.budget}
                            onChange={handleChange}
                          >
                             <option>$10k - $25k</option>
                             <option>$25k - $50k</option>
                             <option>$50k - $100k</option>
                             <option>$100k+</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="message">Tell me a bit about the project</Label>
                          <Textarea
                            id="message"
                            required
                            placeholder="We're looking to rebuild our core platform..."
                            className="min-h-[150px] text-lg p-4"
                            value={formData.message}
                            onChange={handleChange}
                          />
                       </div>
                    </motion.div>
                 )}

                 {step === 3 && (
                    <motion.div
                       key="step3"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       className="space-y-6"
                    >
                       <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="jane@company.com"
                            className="h-14 text-lg"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                          />
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="website">Company Website (Optional)</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://"
                            className="h-14 text-lg"
                            value={formData.website}
                            onChange={handleChange}
                          />
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                 {step > 1 && (
                    <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                       Back
                    </Button>
                 )}
                 <Button type="submit" size="lg" className="ml-auto rounded-full px-8" disabled={isSubmitting}>
                    {isSubmitting ? (
                       <>Please wait <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                    ) : step === 3 ? (
                       <>Send Request <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                       <>Next Step <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                 </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
