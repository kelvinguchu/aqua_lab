"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormValues,
  TestParameterWithMeta,
  PhysicalChemicalResults,
} from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface ChemicalCationsProps {
  form: UseFormReturn<FormValues>;
}

const cationParameters: TestParameterWithMeta<PhysicalChemicalResults>[] = [
  {
    id: "potassium",
    name: "Potassium",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8049",
    unit: "mg/L K",
    standard: "50",
    resultKey: "potassium_result",
    remarkKey: "potassium_remark",
    severity: "medium",
  },
  {
    id: "sodium",
    name: "Sodium",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8205",
    unit: "mg/L",
    standard: "200",
    resultKey: "sodium_result",
    remarkKey: "sodium_remark",
    severity: "medium",
  },
  {
    id: "calcium",
    name: "Calcium",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Ca",
    standard: "150",
    resultKey: "calcium_result",
    remarkKey: "calcium_remark",
    severity: "medium",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Mg",
    standard: "100",
    resultKey: "magnesium_result",
    remarkKey: "magnesium_remark",
    severity: "medium",
  },
  {
    id: "iron",
    name: "Iron",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L Fe",
    standard: "0.3",
    resultKey: "iron_result",
    remarkKey: "iron_remark",
    severity: "medium",
  },
  {
    id: "manganese",
    name: "Manganese",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8149",
    unit: "mg/L Mn",
    standard: "0.1",
    resultKey: "manganese_result",
    remarkKey: "manganese_remark",
    severity: "medium",
  },
  {
    id: "ammonia",
    name: "Ammonia",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8038",
    unit: "mg/L NH₃",
    standard: "0.5",
    resultKey: "ammonia_result",
    remarkKey: "ammonia_remark",
    severity: "medium",
  },
  {
    id: "copper",
    name: "Copper",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8506",
    unit: "mg/L Cu",
    standard: "1.0",
    resultKey: "copper_result",
    remarkKey: "copper_remark",
    severity: "medium",
  },
  {
    id: "zinc",
    name: "Zinc",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8009",
    unit: "mg/L Zn",
    standard: "5.0",
    resultKey: "zinc_result",
    remarkKey: "zinc_remark",
    severity: "medium",
  },
  {
    id: "chromium",
    name: "Chromium",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8023",
    unit: "mg/L Cr",
    standard: "0.05",
    resultKey: "chromium_result",
    remarkKey: "chromium_remark",
    severity: "high",
  },
];

export function ChemicalCations({ form }: ChemicalCationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Tests (Cations)</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {cationParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
