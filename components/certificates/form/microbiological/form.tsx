"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { MicrobiologicalTests } from "./microbiological-tests";
import { HeaderInformation } from "../shared/header-information";
import { FormFooter } from "../shared/form-footer";
import { useToast } from "@/hooks/use-toast";
import { generateCertificateId } from "@/lib/utils/certificate-id";
import type { Certificate } from "@/lib/supabase";
import { submitMicrobiologicalForm } from "@/lib/actions/certificates/microbiological";

interface MicrobiologicalFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
}

export function MicrobiologicalForm({
  form,
  onSuccess,
  certificate,
}: MicrobiologicalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedId, setGeneratedId] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    // Generate certificate ID when component mounts
    if (!certificate) {
      generateCertificateId("microbiological")
        .then((id) => {
          setGeneratedId(id);
          // Set the certificate ID in the form data
          form.setValue("certificate_id", id);
          form.setValue("certificate_type", "microbiological");
        })
        .catch((error) => {
          console.error("Error generating certificate ID:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate certificate ID. Please try again.",
          });
        });
    } else {
      // If editing an existing certificate, set its ID
      form.setValue("certificate_id", certificate.certificate_id);
      form.setValue("certificate_type", "microbiological");
    }
  }, [certificate, form, toast]);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);

      // Ensure certificate ID is present
      const certificateId = form.getValues("certificate_id");
      if (!certificateId) {
        throw new Error("Certificate ID is required");
      }

      // Ensure all required fields are present
      const result = await submitMicrobiologicalForm({
        ...values,
        certificate_id: certificateId,
        certificate_type: "microbiological",
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
      <MicrobiologicalTests form={form} />
      <FormFooter form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
