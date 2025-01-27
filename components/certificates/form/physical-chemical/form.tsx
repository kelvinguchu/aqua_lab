"use client";

import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { PhysicalTests } from "./physical-tests";
import { ChemicalAnions } from "./chemical-anions";
import { ChemicalCations } from "./chemical-cations";
import { OtherParameters } from "./other-parameters";
import type { Certificate } from "@/lib/supabase";

interface PhysicalChemicalFormProps {
  form: UseFormReturn<FormValues>;
  onSuccess?: () => void;
  certificate?: Certificate;
}

export function PhysicalChemicalForm({
  form,
  certificate,
}: PhysicalChemicalFormProps) {
  return (
    <div className='space-y-6'>
      <PhysicalTests form={form} />
      <ChemicalAnions form={form} />
      <ChemicalCations form={form} />
      <OtherParameters form={form} />
    </div>
  );
}
