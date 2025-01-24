"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "./types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "./test-parameter";
import { getParametersByCategory } from "./types";

interface OtherParametersProps {
  form: UseFormReturn<FormValues>;
}

export function OtherParameters({ form }: OtherParametersProps) {
  const otherParameters = getParametersByCategory("other");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Other Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {otherParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
