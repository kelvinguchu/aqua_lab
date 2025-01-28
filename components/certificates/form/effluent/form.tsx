"use client";

import { useState, useEffect } from "react";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { HeaderInformation } from "../shared/header-information";
import { FormFooter } from "../shared/form-footer";
import { useToast } from "@/hooks/use-toast";
import { generateCertificateId } from "@/lib/utils/certificate-id";
import type { Certificate } from "@/lib/supabase";
import { submitEffluentForm } from "@/lib/actions/certificates/effluent";
import { PhysicalParameters } from "./physical-parameters";
import { ChemicalParameters } from "./chemical-parameters";
import { HeavyMetals } from "./heavy-metals";
import { OrganicCompounds } from "./organic-compounds";
import { MicrobiologicalParameters } from "./microbiological-parameters";

interface EffluentFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
}

export function EffluentForm({
  form,
  onSuccess,
  certificate,
}: EffluentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    // Generate certificate ID when component mounts
    if (!certificate) {
      generateCertificateId("effluent")
        .then(setGeneratedId)
        .catch(console.error);
    }
  }, [certificate]);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      // Use the pre-generated ID or generate a new one if somehow missing
      const certificate_id =
        generatedId || (await generateCertificateId("effluent"));

      const result = await submitEffluentForm({
        ...values,
        certificate_id,
        certificate_type: "effluent",
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Success",
        description: `Certificate ${
          certificate ? "updated" : "created"
        } successfully`,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error saving certificate:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save certificate. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <HeaderInformation
        form={form}
        certificate={certificate}
        certificateId={generatedId}
      />
      <PhysicalParameters form={form} />
      <ChemicalParameters form={form} />
      <HeavyMetals form={form} />
      <OrganicCompounds form={form} />
      <MicrobiologicalParameters form={form} />
      <FormFooter form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
