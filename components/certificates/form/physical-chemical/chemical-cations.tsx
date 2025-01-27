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
    unit: "mg/L",
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
    method: "ASL/TM/HACH/8222",
    unit: "mg/L",
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
    method: "ASL/TM/HACH/8030",
    unit: "mg/L",
    standard: "100",
    resultKey: "magnesium_result",
    remarkKey: "magnesium_remark",
    severity: "medium",
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
