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
      id: "total_hardness",
      name: "Total Hardness",
      method: "ASL/TM/HACH/8213",
      unit: "mg/L CaCO₃",
      standard: "300",
      resultKey: "total_hardness_result",
      remarkKey: "total_hardness_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "calcium_hardness",
      name: "Calcium Hardness",
      method: "ASL/TM/HACH/8213",
      unit: "mg/L Ca²⁺",
      standard: "NS",
      resultKey: "calcium_hardness_result",
      remarkKey: "calcium_hardness_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "magnesium_hardness",
      name: "Magnesium Hardness",
      method: "ASL/TM/HACH/8213",
      unit: "mg/L Mg²⁺",
      standard: "NS",
      resultKey: "magnesium_hardness_result",
      remarkKey: "magnesium_hardness_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "silica",
      name: "Silica",
      method: "ASL/TM/HACH/8185",
      unit: "mg/L SiO₂",
      standard: "NS",
      resultKey: "silica_result",
      remarkKey: "silica_remark",
      type: "number",
      category: "other_parameters",
      severity: "low",
    },
    {
      id: "free_chlorine",
      name: "Free Chlorine",
      method: "ASL/TM/HACH/8167",
      unit: "mg/L Cl₂",
      standard: "0.2",
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
