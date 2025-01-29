"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormValues,
  TestParameterWithMeta,
  PhysicalChemicalResults,
} from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface PhysicalTestsProps {
  form: UseFormReturn<FormValues>;
}

const physicalParameters: TestParameterWithMeta<PhysicalChemicalResults>[] = [
  {
    id: "ph",
    name: "pH",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8156",
    unit: "pH Units",
    standard: "6.5 - 8.5",
    resultKey: "ph_result",
    remarkKey: "ph_remark",
  },
  {
    id: "turbidity",
    name: "Turbidity",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8195",
    unit: "NTU",
    standard: "< 5.0",
    resultKey: "turbidity_result",
    remarkKey: "turbidity_remark",
  },
  {
    id: "color",
    name: "Color",
    type: "text",
    category: "physical",
    method: "ASL/TM/HACH/8025",
    unit: "Pt. Co. APHA",
    standard: "15 TCU",
    resultKey: "color_result",
    remarkKey: "color_remark",
  },
  {
    id: "tss",
    name: "Total Suspended Solids",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: "NIL",
    resultKey: "tss_result",
    remarkKey: "tss_remark",
  },
  {
    id: "tds",
    name: "Total Dissolved Solids",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8169",
    unit: "mg/L",
    standard: "1000 Max.",
    resultKey: "tds_result",
    remarkKey: "tds_remark",
  },
  {
    id: "conductivity",
    name: "Conductivity",
    type: "number",
    category: "physical",
    method: "ASL/TM/HACH/8169",
    unit: "µS/cm",
    standard: "1500",
    resultKey: "conductivity_result",
    remarkKey: "conductivity_remark",
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
