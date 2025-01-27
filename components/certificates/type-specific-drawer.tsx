"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useForm, FormProvider } from "react-hook-form";
import { FormValues } from "@/components/certificates/form/types";

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

interface TypeSpecificDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole";
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

export function TypeSpecificDrawer({
  open,
  onOpenChange,
  type,
}: TypeSpecificDrawerProps) {
  const FormComponent = formComponents[type];
  const form = useForm<FormValues>();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='max-h-[100vh]'>
        <DrawerHeader className='sticky top-0 z-50 bg-background border-b py-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>New {formTitles[type]}</h2>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className='overflow-y-auto px-4'>
          <Suspense
            fallback={
              <div className='flex items-center justify-center py-8'>
                <LoadingSpinner />
              </div>
            }>
            <FormProvider {...form}>
              <FormComponent
                form={form}
                onSuccess={() => onOpenChange(false)}
              />
            </FormProvider>
          </Suspense>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
