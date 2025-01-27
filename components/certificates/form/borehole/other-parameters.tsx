"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, BoreholeResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface OtherParametersProps {
  form: UseFormReturn<FormValues>;
}

const otherParameters: TestParameterWithMeta<BoreholeResults>[] = [
  {
    id: "borehole_total_hardness",
    name: "Total Hardness",
    type: "text",
    category: "other_parameters",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L",
    standard: "600",
    resultKey: "borehole_total_hardness_result",
    remarkKey: "borehole_total_hardness_remark",
    severity: "low",
  },
  {
    id: "borehole_calcium_hardness",
    name: "Calcium Hardness",
    type: "text",
    category: "other_parameters",
    method: "ASL/TM/HACH/8204",
    unit: "mg/L",
    standard: "300",
    resultKey: "borehole_calcium_hardness_result",
    remarkKey: "borehole_calcium_hardness_remark",
    severity: "low",
  },
  {
    id: "borehole_magnesium_hardness",
    name: "Magnesium Hardness",
    type: "text",
    category: "other_parameters",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L",
    standard: "300",
    resultKey: "borehole_magnesium_hardness_result",
    remarkKey: "borehole_magnesium_hardness_remark",
    severity: "low",
  },
];

export function OtherParameters({ form }: OtherParametersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Other Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {otherParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
