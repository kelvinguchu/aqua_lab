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
    id: "chloride",
    name: "Chloride",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8206",
    unit: "mg/L",
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
    unit: "mg/L",
    standard: "1.5",
    resultKey: "fluoride_result",
    remarkKey: "fluoride_remark",
  },
  {
    id: "nitrate",
    name: "Nitrate",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8039",
    unit: "mg/L",
    standard: "10",
    resultKey: "nitrate_result",
    remarkKey: "nitrate_remark",
  },
  {
    id: "nitrite",
    name: "Nitrite",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8507",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "nitrite_result",
    remarkKey: "nitrite_remark",
  },
  {
    id: "sulfate",
    name: "Sulfate",
    type: "number",
    category: "anions",
    method: "ASL/TM/HACH/8051",
    unit: "mg/L",
    standard: "400",
    resultKey: "sulfate_result",
    remarkKey: "sulfate_remark",
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
