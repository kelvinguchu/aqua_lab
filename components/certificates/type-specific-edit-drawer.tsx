"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { Certificate } from "@/lib/supabase";
import { useForm, FormProvider } from "react-hook-form";
import { FormValues } from "@/components/certificates/form/types";
import { supabase } from "@/lib/supabase";

// Lazy load form components with named exports
const PhysicalChemicalForm = lazy(() =>
  import("@/components/certificates/form/physical-chemical/form").then(
    (mod) => ({
      default: mod.PhysicalChemicalForm,
    })
  )
);
const MicrobiologicalForm = lazy(() =>
  import("@/components/certificates/form/microbiological/form").then((mod) => ({
    default: mod.MicrobiologicalForm,
  }))
);
const EffluentForm = lazy(() =>
  import("@/components/certificates/form/effluent/form").then((mod) => ({
    default: mod.EffluentForm,
  }))
);
const IrrigationForm = lazy(() =>
  import("@/components/certificates/form/irrigation/form").then((mod) => ({
    default: mod.IrrigationForm,
  }))
);
const BoreholeForm = lazy(() =>
  import("@/components/certificates/form/borehole/form").then((mod) => ({
    default: mod.BoreholeForm,
  }))
);

interface TypeSpecificEditDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole";
  certificate: Certificate | null;
}

const formComponents = {
  physical_chemical: PhysicalChemicalForm,
  microbiological: MicrobiologicalForm,
  effluent: EffluentForm,
  irrigation: IrrigationForm,
  borehole: BoreholeForm,
};

const formTitles = {
  physical_chemical: "Physical Chemical Certificate",
  microbiological: "Microbiological Certificate",
  effluent: "Effluent Certificate",
  irrigation: "Irrigation Certificate",
  borehole: "Borehole Certificate",
};

const resultsTableMap = {
  physical_chemical: "physical_chemical_results",
  microbiological: "microbiological_results",
  effluent: "effluent_results",
  irrigation: "irrigation_results",
  borehole: "borehole_results",
};

export function TypeSpecificEditDrawer({
  open,
  onOpenChange,
  type,
  certificate,
}: TypeSpecificEditDrawerProps) {
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<FormValues>();

  useEffect(() => {
    async function loadFormData() {
      if (!certificate) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch the results for this certificate
        const { data: results, error } = await supabase
          .from(resultsTableMap[type])
          .select("*")
          .eq("certificate_id", certificate.id)
          .single();

        if (error) {
          console.error("Error fetching results:", error);
          return;
        }

        // Merge certificate and results data
        const mergedData = {
          ...certificate,
          ...results,
        };

        // Reset form with merged data
        form.reset(mergedData);
        setFormData(mergedData);
      } catch (error) {
        console.error("Error loading form data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (open && certificate) {
      loadFormData();
    }
  }, [open, certificate, type, form]);

  if (!certificate) return null;

  const FormComponent = formComponents[type];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='max-h-[100vh]'>
        <DrawerHeader className='sticky top-0 z-50 bg-background border-b py-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Edit {formTitles[type]}</h2>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className='overflow-y-auto px-4'>
          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <LoadingSpinner />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className='flex items-center justify-center py-8'>
                  <LoadingSpinner />
                </div>
              }>
              <FormProvider {...form}>
                <FormComponent
                  form={form}
                  certificate={certificate}
                  onSuccess={() => onOpenChange(false)}
                />
              </FormProvider>
            </Suspense>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
