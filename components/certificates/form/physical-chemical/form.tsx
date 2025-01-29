"use client";

import { useState, useEffect } from "react";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { PhysicalTests } from "./physical-tests";
import { ChemicalAnions } from "./chemical-anions";
import { ChemicalCations } from "./chemical-cations";
import { OtherParameters } from "./other-parameters";
import { HeaderInformation } from "../shared/header-information";
import { FormFooter } from "../shared/form-footer";
import { useToast } from "@/hooks/use-toast";
import { generateCertificateId } from "@/lib/utils/certificate-id";
import type { Certificate } from "@/lib/supabase";
import { submitPhysicalChemicalForm } from "@/lib/actions/certificates/physical-chemical";

interface PhysicalChemicalFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
  mode: "create" | "edit";
}

export function PhysicalChemicalForm({
  form,
  onSuccess,
  certificate,
  mode,
}: PhysicalChemicalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    // Generate certificate ID when component mounts
    if (!certificate) {
      generateCertificateId("physical_chemical")
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
        : generatedId || (await generateCertificateId("physical_chemical"));

      const result = await submitPhysicalChemicalForm({
        ...values,
        id: certificate?.id, // Make sure to pass the UUID for updates
        certificate_id,
        certificate_type: "physical_chemical",
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
      <PhysicalTests form={form} />
      <ChemicalAnions form={form} />
      <ChemicalCations form={form} />
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
