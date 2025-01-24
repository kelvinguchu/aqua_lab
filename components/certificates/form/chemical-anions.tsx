"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "./test-parameter";
import { getParametersByCategory } from "./types";

interface ChemicalAnionsProps {
  form: UseFormReturn<FormValues>;
}

export function ChemicalAnions({ form }: ChemicalAnionsProps) {
  const anionParameters = getParametersByCategory("anions");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Tests - Anions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {anionParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
