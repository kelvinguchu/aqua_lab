"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface HeavyMetalsProps {
  form: UseFormReturn<FormValues>;
}

const heavyMetalParameters: TestParameterWithMeta<EffluentResults>[] = [
  {
    id: "effluent_arsenic",
    name: "Arsenic",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_arsenic_result",
    remarkKey: "effluent_arsenic_remark",
    severity: "high",
  },
  {
    id: "effluent_boron",
    name: "Boron",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8015",
    unit: "mg/L",
    standard: "1.0",
    resultKey: "effluent_boron_result",
    remarkKey: "effluent_boron_remark",
    severity: "high",
  },
  {
    id: "effluent_cadmium",
    name: "Cadmium",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8017",
    unit: "mg/L",
    standard: "0.01",
    resultKey: "effluent_cadmium_result",
    remarkKey: "effluent_cadmium_remark",
    severity: "high",
  },
  {
    id: "effluent_chromium_vi",
    name: "Chromium VI",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8023",
    unit: "mg/L",
    standard: "0.05",
    resultKey: "effluent_chromium_vi_result",
    remarkKey: "effluent_chromium_vi_remark",
    severity: "high",
  },
  {
    id: "effluent_copper",
    name: "Copper",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8506",
    unit: "mg/L",
    standard: "1.0",
    resultKey: "effluent_copper_result",
    remarkKey: "effluent_copper_remark",
    severity: "high",
  },
  {
    id: "effluent_iron",
    name: "Iron",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L",
    standard: "3.5",
    resultKey: "effluent_iron_result",
    remarkKey: "effluent_iron_remark",
    severity: "medium",
  },
  {
    id: "effluent_lead",
    name: "Lead",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8033",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "effluent_lead_result",
    remarkKey: "effluent_lead_remark",
    severity: "high",
  },
  {
    id: "effluent_manganese",
    name: "Manganese",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8034",
    unit: "mg/L",
    standard: "3.5",
    resultKey: "effluent_manganese_result",
    remarkKey: "effluent_manganese_remark",
    severity: "medium",
  },
  {
    id: "effluent_mercury",
    name: "Mercury",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: "0.005",
    resultKey: "effluent_mercury_result",
    remarkKey: "effluent_mercury_remark",
    severity: "high",
  },
  {
    id: "effluent_nickel",
    name: "Nickel",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8037",
    unit: "mg/L",
    standard: "0.3",
    resultKey: "effluent_nickel_result",
    remarkKey: "effluent_nickel_remark",
    severity: "high",
  },
  {
    id: "effluent_selenium",
    name: "Selenium",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8039",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_selenium_result",
    remarkKey: "effluent_selenium_remark",
    severity: "high",
  },
  {
    id: "effluent_zinc",
    name: "Zinc",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8009",
    unit: "mg/L",
    standard: "5.0",
    resultKey: "effluent_zinc_result",
    remarkKey: "effluent_zinc_remark",
    severity: "medium",
  },
];

export function HeavyMetals({ form }: HeavyMetalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Heavy Metals</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {heavyMetalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
