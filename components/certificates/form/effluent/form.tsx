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
import { useFormCache } from "@/hooks/use-form-cache";

interface EffluentFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
  mode: "create" | "edit";
}

export function EffluentForm({
  form,
  onSuccess,
  certificate,
  mode,
}: EffluentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>();
  const { toast } = useToast();

  // Use the form cache
  const { clearCache } = useFormCache(form, "effluent", mode, certificate?.id);

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

      // For updates, use the existing certificate ID
      // For new certificates, use the generated ID or generate a new one
      const certificate_id = certificate
        ? certificate.certificate_id
        : generatedId || (await generateCertificateId("effluent"));

      const result = await submitEffluentForm({
        ...values,
        id: certificate?.id, // Make sure to pass the UUID for updates
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

      // Clear the cache after successful submission
      clearCache();
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
      <FormFooter
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        mode={mode}
      />
    </div>
  );
}
