"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "./test-parameter";
import { getParametersByCategory } from "./types";

interface ChemicalCationsProps {
  form: UseFormReturn<FormValues>;
}

export function ChemicalCations({ form }: ChemicalCationsProps) {
  const cationParameters = getParametersByCategory("cations");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Tests - Cations</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {cationParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
