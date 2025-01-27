"use client";

import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { PhysicalTests } from "./physical-tests";
import { ChemicalTests } from "./chemical-tests";
import { OtherParameters } from "./other-parameters";

interface BoreholeFormProps {
  form: UseFormReturn<FormValues>;
}

export function BoreholeForm({ form }: BoreholeFormProps) {
  return (
    <div className='space-y-6'>
      <PhysicalTests form={form} />
      <ChemicalTests form={form} />
      <OtherParameters form={form} />
    </div>
  );
}
