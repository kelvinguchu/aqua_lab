"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, BoreholeResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface ChemicalTestsProps {
  form: UseFormReturn<FormValues>;
}

const chemicalParameters: TestParameterWithMeta<BoreholeResults>[] = [
  // Anions
  {
    id: "borehole_fluoride",
    name: "Fluoride",
    type: "number",
    category: "chemical_anions",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L",
    standard: "1.5",
    resultKey: "borehole_fluoride_result",
    remarkKey: "borehole_fluoride_remark",
    severity: "high",
  },
  // Cations
  {
    id: "borehole_calcium",
    name: "Calcium",
    type: "text",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8222",
    unit: "mg/L",
    standard: "150",
    resultKey: "borehole_calcium_result",
    remarkKey: "borehole_calcium_remark",
    severity: "medium",
  },
  {
    id: "borehole_magnesium",
    name: "Magnesium",
    type: "text",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8030",
    unit: "mg/L",
    standard: "100",
    resultKey: "borehole_magnesium_result",
    remarkKey: "borehole_magnesium_remark",
    severity: "medium",
  },
  {
    id: "borehole_iron",
    name: "Iron",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L",
    standard: "0.3",
    resultKey: "borehole_iron_result",
    remarkKey: "borehole_iron_remark",
    severity: "medium",
  },
  {
    id: "borehole_manganese",
    name: "Manganese",
    type: "number",
    category: "chemical_cations",
    method: "ASL/TM/HACH/8149",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "borehole_manganese_result",
    remarkKey: "borehole_manganese_remark",
    severity: "medium",
  },
];

export function ChemicalTests({ form }: ChemicalTestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Tests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {chemicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
