"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface PhysicalParametersProps {
  form: UseFormReturn<FormValues>;
}

const physicalParameters: TestParameterWithMeta<EffluentResults>[] = [
  {
    id: "effluent_ph",
    name: "pH",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8156",
    unit: "pH units",
    standard: "6.5 - 8.5",
    resultKey: "effluent_ph_result",
    remarkKey: "effluent_ph_remark",
    severity: "high",
  },
  {
    id: "effluent_temperature",
    name: "Temperature",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/2550",
    unit: "°C",
    standard: "20 - 35",
    resultKey: "effluent_temperature_result",
    remarkKey: "effluent_temperature_remark",
    severity: "medium",
  },
  {
    id: "effluent_tss",
    name: "Total Suspended Solids (TSS)",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: "30",
    resultKey: "effluent_tss_result",
    remarkKey: "effluent_tss_remark",
    severity: "medium",
  },
  {
    id: "effluent_tds",
    name: "Total Dissolved Solids (TDS)",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8160",
    unit: "mg/L",
    standard: "1200",
    resultKey: "effluent_tds_result",
    remarkKey: "effluent_tds_remark",
    severity: "medium",
  },
  {
    id: "effluent_color",
    name: "Color",
    type: "text",
    category: "physical",
    method: "ASL/TM/HACH/8025",
    unit: "TCU",
    standard: "15",
    resultKey: "effluent_color_result",
    remarkKey: "effluent_color_remark",
    severity: "low",
  },
];

export function PhysicalParameters({ form }: PhysicalParametersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {physicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
