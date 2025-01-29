"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormValues,
  TestParameterWithMeta,
  PhysicalChemicalResults,
} from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface ChemicalAnionsProps {
  form: UseFormReturn<FormValues>;
}

const anionParameters: TestParameterWithMeta<PhysicalChemicalResults>[] = [
  {
    id: "ph_alkalinity",
    name: "Phenolphthalein Alkalinity",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8203",
    unit: "mg/L CaCO₃",
    standard: "NS",
    resultKey: "ph_alkalinity_result",
    remarkKey: "ph_alkalinity_remark",
  },
  {
    id: "total_alkalinity",
    name: "Total Alkalinity",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8203",
    unit: "mg/L CaCO₃",
    standard: "NS",
    resultKey: "total_alkalinity_result",
    remarkKey: "total_alkalinity_remark",
  },
  {
    id: "chloride",
    name: "Chloride",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8206",
    unit: "mg/L Cl⁻",
    standard: "250",
    resultKey: "chloride_result",
    remarkKey: "chloride_remark",
  },
  {
    id: "fluoride",
    name: "Fluoride",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L F⁻",
    standard: "1.5",
    resultKey: "fluoride_result",
    remarkKey: "fluoride_remark",
  },
  {
    id: "sulfate",
    name: "Sulfate",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8051",
    unit: "mg/L SO₄²⁻",
    standard: "400",
    resultKey: "sulfate_result",
    remarkKey: "sulfate_remark",
  },
  {
    id: "nitrate",
    name: "Nitrate",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8171",
    unit: "mg/L NO₃⁻",
    standard: "45",
    resultKey: "nitrate_result",
    remarkKey: "nitrate_remark",
  },
  {
    id: "nitrite",
    name: "Nitrite",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8507",
    unit: "mg/L NO₂⁻",
    standard: "0.9",
    resultKey: "nitrite_result",
    remarkKey: "nitrite_remark",
  },
  {
    id: "phosphate",
    name: "Phosphate",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8048",
    unit: "mg/L PO₄³⁻",
    standard: "2.2",
    resultKey: "phosphate_result",
    remarkKey: "phosphate_remark",
  },
  {
    id: "sulfide",
    name: "Sulfide",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8131",
    unit: "mg/L S²⁻",
    standard: "0.1",
    resultKey: "sulfide_result",
    remarkKey: "sulfide_remark",
  },
];

export function ChemicalAnions({ form }: ChemicalAnionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Tests (Anions)</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {anionParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
