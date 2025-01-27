"use client";

import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { IrrigationParameters } from "./irrigation-parameters";

interface IrrigationFormProps {
  form: UseFormReturn<FormValues>;
}

export function IrrigationForm({ form }: IrrigationFormProps) {
  return (
    <div className='space-y-6'>
      <IrrigationParameters form={form} />
    </div>
  );
}
