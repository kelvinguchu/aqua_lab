"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "./test-parameter";
import { getParametersByCategory } from "./types";

interface PhysicalTestsProps {
  form: UseFormReturn<FormValues>;
}

export function PhysicalTests({ form }: PhysicalTestsProps) {
  const physicalParameters = getParametersByCategory("physical");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Tests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {physicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
