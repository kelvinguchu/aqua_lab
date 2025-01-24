"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "./test-parameter";
import { getParametersByCategory } from "./types";

interface MicrobiologicalTestsProps {
  form: UseFormReturn<FormValues>;
}

export function MicrobiologicalTests({ form }: MicrobiologicalTestsProps) {
  const microbiologicalParameters = getParametersByCategory("microbiological");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Microbiological Tests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {microbiologicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
