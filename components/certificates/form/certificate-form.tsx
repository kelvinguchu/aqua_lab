"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "./types";
import { HeaderSection } from "./header-section";
import { PhysicalTests } from "./physical-tests";
import { ChemicalAnions } from "./chemical-anions";
import { ChemicalCations } from "./chemical-cations";
import { OtherParameters } from "./other-parameters";
import { MicrobiologicalTests } from "./microbiological-tests";
import { CommentsSection } from "./comments-section";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { createCertificate } from "@/lib/actions/certificates";
import { Loader2 } from "lucide-react";
import { generateCertificateId } from "@/lib/utils";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

const CACHE_KEY = "certificate_form_draft";
const AUTO_SAVE_DELAY = 1000; // 1 second

interface CertificateFormProps {
  onSuccess?: () => void;
}

export function CertificateForm({ onSuccess }: CertificateFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingId, setIsGeneratingId] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificate_id: "",
      sample_id: "",
      date_of_report: new Date(),
      date_of_report_issue: new Date(),
      description_of_sample: "",
      sample_source: "",
      submitted_by: "",
      customer_contact: "",
      sampled_by: "",
      date_of_sampling: new Date(),
      date_sample_received: new Date(),
      date_of_analysis: new Date(),
      comments: "",
      // Initialize all test results and remarks as empty strings
      ph_result: "",
      ph_remark: "",
      turbidity_result: "",
      turbidity_remark: "",
      color_result: "",
      color_remark: "",
      tss_result: "",
      tss_remark: "",
      tds_result: "",
      tds_remark: "",
      conductivity_result: "",
      conductivity_remark: "",
      ph_alkalinity_result: "",
      ph_alkalinity_remark: "",
      total_alkalinity_result: "",
      total_alkalinity_remark: "",
      chloride_result: "",
      chloride_remark: "",
      fluoride_result: "",
      fluoride_remark: "",
      sulfate_result: "",
      sulfate_remark: "",
      nitrate_result: "",
      nitrate_remark: "",
      nitrite_result: "",
      nitrite_remark: "",
      phosphate_result: "",
      phosphate_remark: "",
      sulfide_result: "",
      sulfide_remark: "",
      potassium_result: "",
      potassium_remark: "",
      calcium_result: "",
      calcium_remark: "",
      magnesium_result: "",
      magnesium_remark: "",
      iron_result: "",
      iron_remark: "",
      manganese_result: "",
      manganese_remark: "",
      ammonia_result: "",
      ammonia_remark: "",
      copper_result: "",
      copper_remark: "",
      zinc_result: "",
      zinc_remark: "",
      chromium_result: "",
      chromium_remark: "",
      total_hardness_result: "",
      total_hardness_remark: "",
      calcium_hardness_result: "",
      calcium_hardness_remark: "",
      magnesium_hardness_result: "",
      magnesium_hardness_remark: "",
      silica_result: "",
      silica_remark: "",
      free_chlorine_result: "",
      free_chlorine_remark: "",
      total_viable_counts_result: "",
      total_viable_counts_remark: "",
      coliforms_mpn_result: "",
      coliforms_mpn_remark: "",
      ecoli_mpn_result: "",
      ecoli_mpn_remark: "",
      faecal_coliforms_mpn_result: "",
      faecal_coliforms_mpn_remark: "",
    },
  });

  // Load cached form data and generate certificate ID
  useEffect(() => {
    const loadCachedForm = async () => {
      try {
        setIsGeneratingId(true);
        // Generate certificate ID
        const certificateId = await generateCertificateId();
        form.setValue("certificate_id", certificateId);

        // Load cached form data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);

          // Convert date strings back to Date objects
          const dateFields = [
            "date_of_report",
            "date_of_report_issue",
            "date_of_sampling",
            "date_sample_received",
            "date_of_analysis",
          ];

          dateFields.forEach((field) => {
            if (parsedData[field]) {
              parsedData[field] = new Date(parsedData[field]);
            }
          });

          // Keep the new certificate ID but load other cached data
          form.reset({ ...parsedData, certificate_id: certificateId });
          toast({
            title: "Draft Restored",
            description: "Your previous work has been restored from cache.",
          });
        }
      } catch (error) {
        console.error("Failed to load cached form:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cached form",
        });
      } finally {
        setIsGeneratingId(false);
      }
    };

    loadCachedForm();
  }, [form, toast]);

  // Watch form changes and update state
  useEffect(() => {
    const subscription = form.watch((data) => {
      setFormData(data as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Debounced auto-save effect
  useEffect(() => {
    if (!formData) return;

    const handler = setTimeout(() => {
      try {
        setIsSaving(true);
        localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
        setLastSaved(new Date());
      } catch (error) {
        console.error("Error saving form:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save draft",
        });
      } finally {
        setIsSaving(false);
      }
    }, AUTO_SAVE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [formData, toast]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const result = await createCertificate(data);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Certificate saved successfully",
      });

      // Clear the cached form data
      localStorage.removeItem(CACHE_KEY);

      // Reset form after successful submission
      form.reset();

      // Call onSuccess callback if provided
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save certificate",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard this draft?")) {
      localStorage.removeItem(CACHE_KEY);
      form.reset();
      toast({
        title: "Draft Discarded",
        description: "Your draft has been discarded",
      });
    }
  };

  return (
    <div className='space-y-6'>
      {/* Auto-save indicator */}
      <div className='text-sm text-muted-foreground text-right'>
        {isSaving ? (
          <span>Saving draft...</span>
        ) : lastSaved ? (
          <span>Last saved {format(lastSaved, "HH:mm:ss")}</span>
        ) : null}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <HeaderSection form={form} />
          <PhysicalTests form={form} />
          <ChemicalAnions form={form} />
          <ChemicalCations form={form} />
          <OtherParameters form={form} />
          <MicrobiologicalTests form={form} />
          <CommentsSection form={form} />

          <Card className='fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handleDiscard}
              disabled={isSubmitting || isGeneratingId}
              className='min-w-[100px] transition-colors hover:bg-accent'>
              Discard
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting || isGeneratingId}
              className='min-w-[100px] transition-colors'>
              {(isSubmitting || isGeneratingId) && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Save Certificate
            </Button>
          </Card>
        </form>
      </Form>
    </div>
  );
}
