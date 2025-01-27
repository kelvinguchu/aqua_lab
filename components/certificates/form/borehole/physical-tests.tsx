"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, BoreholeResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface PhysicalTestsProps {
  form: UseFormReturn<FormValues>;
}

const physicalParameters: TestParameterWithMeta<BoreholeResults>[] = [
  {
    id: "borehole_ph",
    name: "pH",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8156",
    unit: "pH units",
    standard: "6.5 - 8.5",
    resultKey: "borehole_ph_result",
    remarkKey: "borehole_ph_remark",
    severity: "high",
  },
  {
    id: "borehole_turbidity",
    name: "Turbidity",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8237",
    unit: "NTU",
    standard: "5",
    resultKey: "borehole_turbidity_result",
    remarkKey: "borehole_turbidity_remark",
    severity: "medium",
  },
  {
    id: "borehole_color",
    name: "Color",
    type: "text",
    category: "physical",
    method: "ASL/TM/HACH/8025",
    unit: "TCU",
    standard: "15",
    resultKey: "borehole_color_result",
    remarkKey: "borehole_color_remark",
    severity: "low",
  },
  {
    id: "borehole_tss",
    name: "Total Suspended Solids (TSS)",
    type: "text",
    category: "physical",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: "30",
    resultKey: "borehole_tss_result",
    remarkKey: "borehole_tss_remark",
    severity: "medium",
  },
  {
    id: "borehole_tds",
    name: "Total Dissolved Solids (TDS)",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8160",
    unit: "mg/L",
    standard: "1000",
    resultKey: "borehole_tds_result",
    remarkKey: "borehole_tds_remark",
    severity: "medium",
  },
  {
    id: "borehole_conductivity",
    name: "Conductivity",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8160",
    unit: "µS/cm",
    standard: "2500",
    resultKey: "borehole_conductivity_result",
    remarkKey: "borehole_conductivity_remark",
    severity: "medium",
  },
];

export function PhysicalTests({ form }: PhysicalTestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Tests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {physicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
