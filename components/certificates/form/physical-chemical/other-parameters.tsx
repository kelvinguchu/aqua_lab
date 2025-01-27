"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormValues,
  TestParameterWithMeta,
  PhysicalChemicalResults,
} from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface OtherParametersProps {
  form: UseFormReturn<FormValues>;
}

export function OtherParameters({ form }: OtherParametersProps) {
  const otherParameters: TestParameterWithMeta<PhysicalChemicalResults>[] = [
    {
      id: "total_alkalinity",
      name: "Total Alkalinity",
      method: "ASL/TM/HACH/8203",
      unit: "mg/L",
      standard: "500",
      resultKey: "total_alkalinity_result",
      remarkKey: "total_alkalinity_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "total_hardness",
      name: "Total Hardness",
      method: "ASL/TM/HACH/8213",
      unit: "mg/L",
      standard: "600",
      resultKey: "total_hardness_result",
      remarkKey: "total_hardness_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "iron",
      name: "Iron",
      method: "ASL/TM/HACH/8008",
      unit: "mg/L",
      standard: "0.3",
      resultKey: "iron_result",
      remarkKey: "iron_remark",
      type: "number",
      category: "other_parameters",
      severity: "medium",
    },
    {
      id: "manganese",
      name: "Manganese",
      method: "ASL/TM/HACH/8149",
      unit: "mg/L",
      standard: "0.1",
      resultKey: "manganese_result",
      remarkKey: "manganese_remark",
      type: "number",
      category: "other_parameters",
      severity: "medium",
    },
    {
      id: "free_chlorine",
      name: "Free Chlorine",
      method: "ASL/TM/HACH/8021",
      unit: "mg/L",
      standard: "0.2 - 0.5",
      resultKey: "free_chlorine_result",
      remarkKey: "free_chlorine_remark",
      type: "number",
      category: "other_parameters",
      severity: "high",
    },
  ];

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
