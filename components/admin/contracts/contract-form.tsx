"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, ChevronRight, User, Calendar, FileText } from "lucide-react";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

const contractSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
  tenantId: z.string().min(1, "Tenant is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  value: z.coerce.number().min(0, "Value must be positive"),
  content: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractSchema>;

interface ContractFormProps {
  initialData?: any;
  tenants: { id: string; name: string }[];
}

const steps = [
  { id: 1, name: "Basics", icon: User },
  { id: 2, name: "Terms", icon: Calendar },
  { id: 3, name: "Content", icon: FileText },
];

export function ContractForm({ initialData, tenants }: ContractFormProps) {
  const router = useRouter();
  const { hasPermission } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const canSubmit = initialData ? hasPermission("contracts.edit") : hasPermission("contracts.create");

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      title: initialData?.title || "",
      status: initialData?.status || "draft",
      tenantId: initialData?.tenantId || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "",
      value: initialData?.value || 0,
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (data: ContractFormValues) => {
    try {
      setLoading(true);
      
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      };

      if (initialData) {
        const res = await fetchWithCsrf(`/api/admin/contracts/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update");
        toast.success("Contract updated");
      } else {
        const res = await fetchWithCsrf("/api/admin/contracts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create");
        toast.success("Contract created");
      }
      router.refresh();
      router.push("/admin/contracts");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate.push("title", "tenantId", "status", "value");
    } else if (currentStep === 2) {
      fieldsToValidate.push("startDate", "endDate");
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                currentStep >= step.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
            </div>
            <div className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
              {step.name}
            </div>
            {index < steps.length - 1 && (
              <div className="mx-4 h-[2px] w-12 bg-muted" />
            )}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Contract Basics"}
                {currentStep === 2 && "Dates & Terms"}
                {currentStep === 3 && "Contract Content"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Enter the core details of the contract."}
                {currentStep === 2 && "Define the validity period and value."}
                {currentStep === 3 && "Add the full text or notes for this agreement."}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {currentStep === 1 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Annual Service Agreement" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tenantId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tenant</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tenant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tenants.map((tenant) => (
                              <SelectItem key={tenant.id} value={tenant.id}>
                                {tenant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="terminated">Terminated</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content / Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Contract details and terms..." 
                            className="min-h-[300px] font-mono"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                   <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.push("/admin/contracts")}
                  >
                    Cancel
                  </Button>
                )}

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  canSubmit && (
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : initialData ? "Update Contract" : "Create Contract"}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
