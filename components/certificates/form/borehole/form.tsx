"use client";

import { useState, useEffect } from "react";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { HeaderInformation } from "../shared/header-information";
import { FormFooter } from "../shared/form-footer";
import { useToast } from "@/hooks/use-toast";
import { generateCertificateId } from "@/lib/utils/certificate-id";
import type { Certificate } from "@/lib/supabase";
import { submitBoreholeForm } from "@/lib/actions/certificates/borehole";
import { PhysicalTests } from "./physical-tests";
import { ChemicalTests } from "./chemical-tests";
import { OtherParameters } from "./other-parameters";
import { useFormCache } from "@/hooks/use-form-cache";

interface BoreholeFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
  mode: "create" | "edit";
}

export function BoreholeForm({
  form,
  onSuccess,
  certificate,
  mode,
}: BoreholeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>();
  const { toast } = useToast();

  // Use the form cache
  const { clearCache } = useFormCache(form, "borehole", mode, certificate?.id);

  useEffect(() => {
    // Generate certificate ID when component mounts
    if (!certificate) {
      generateCertificateId("borehole")
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
        : generatedId || (await generateCertificateId("borehole"));

      const result = await submitBoreholeForm({
        ...values,
        id: certificate?.id, // Make sure to pass the UUID for updates
        certificate_id,
        certificate_type: "borehole",
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
      <PhysicalTests form={form} />
      <ChemicalTests form={form} />
      <OtherParameters form={form} />
      <FormFooter
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        mode={mode}
      />
    </div>
  );
}
