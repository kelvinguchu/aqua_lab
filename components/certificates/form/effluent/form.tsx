"use client";

import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { PhysicalParameters } from "./physical-parameters";
import { ChemicalParameters } from "./chemical-parameters";
import { HeavyMetals } from "./heavy-metals";
import { OrganicCompounds } from "./organic-compounds";
import { MicrobiologicalParameters } from  "./microbiological-parameters";

interface EffluentFormProps {
  form: UseFormReturn<FormValues>;
}

export function EffluentForm({ form }: EffluentFormProps) {
  return (
    <div className='space-y-6'>
      <PhysicalParameters form={form} />
      <ChemicalParameters form={form} />
      <HeavyMetals form={form} />
      <OrganicCompounds form={form} />
      <MicrobiologicalParameters form={form} />
    </div>
  );
}
