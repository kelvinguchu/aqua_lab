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
}

export function PhysicalChemicalForm({
  form,
  onSuccess,
  certificate,
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

      // Get the certificate_id from form values, fallback to generating a new one if somehow missing
      const certificate_id =
        values.certificate_id ||
        (await generateCertificateId("physical_chemical"));

      const result = await submitPhysicalChemicalForm({
        ...values,
        certificate_id,
        certificate_type: "physical_chemical",
        id: certificate?.id,
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
      <FormFooter form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
