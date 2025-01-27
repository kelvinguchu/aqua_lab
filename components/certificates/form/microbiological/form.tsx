"use client";

import { Card } from "@/components/ui/card";
import { FormValues } from "../types";
import { UseFormReturn } from "react-hook-form";
import { MicrobiologicalTests } from "./microbiological-tests";

interface MicrobiologicalFormProps {
  form: UseFormReturn<FormValues>;
}

export function MicrobiologicalForm({ form }: MicrobiologicalFormProps) {
  return (
    <div className='space-y-6'>
      <MicrobiologicalTests form={form} />
    </div>
  );
}
