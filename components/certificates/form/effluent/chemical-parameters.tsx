"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface ChemicalParametersProps {
  form: UseFormReturn<FormValues>;
}

const chemicalParameters: TestParameterWithMeta<EffluentResults>[] = [
  {
    id: "effluent_bod",
    name: "Biochemical Oxygen Demand (BOD)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8043",
    unit: "mg/L",
    standard: "30",
    resultKey: "effluent_bod_result",
    remarkKey: "effluent_bod_remark",
    severity: "high",
  },
  {
    id: "effluent_cod",
    name: "Chemical Oxygen Demand (COD)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8000",
    unit: "mg/L",
    standard: "50",
    resultKey: "effluent_cod_result",
    remarkKey: "effluent_cod_remark",
    severity: "high",
  },
  {
    id: "effluent_total_nitrogen",
    name: "Total Nitrogen",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10071",
    unit: "mg/L",
    standard: "10",
    resultKey: "effluent_total_nitrogen_result",
    remarkKey: "effluent_total_nitrogen_remark",
    severity: "medium",
  },
  {
    id: "effluent_total_phosphorus",
    name: "Total Phosphorus",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8190",
    unit: "mg/L",
    standard: "2",
    resultKey: "effluent_total_phosphorus_result",
    remarkKey: "effluent_total_phosphorus_remark",
    severity: "medium",
  },
  {
    id: "effluent_oil_grease",
    name: "Oil & Grease",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: "5",
    resultKey: "effluent_oil_grease_result",
    remarkKey: "effluent_oil_grease_remark",
    severity: "high",
  },
  {
    id: "effluent_detergents",
    name: "Detergents",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8028",
    unit: "mg/L",
    standard: "15",
    resultKey: "effluent_detergents_result",
    remarkKey: "effluent_detergents_remark",
    severity: "medium",
  },
  {
    id: "effluent_chloride",
    name: "Chloride",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8113",
    unit: "mg/L",
    standard: "250",
    resultKey: "effluent_chloride_result",
    remarkKey: "effluent_chloride_remark",
    severity: "medium",
  },
  {
    id: "effluent_fluoride",
    name: "Fluoride",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L",
    standard: "1.5",
    resultKey: "effluent_fluoride_result",
    remarkKey: "effluent_fluoride_remark",
    severity: "high",
  },
  {
    id: "effluent_sulphide",
    name: "Sulphide",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8131",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "effluent_sulphide_result",
    remarkKey: "effluent_sulphide_remark",
    severity: "high",
  },
  {
    id: "effluent_phenols",
    name: "Phenols",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8047",
    unit: "mg/L",
    standard: "0.002",
    resultKey: "effluent_phenols_result",
    remarkKey: "effluent_phenols_remark",
    severity: "high",
  },
  {
    id: "effluent_hexane_veg",
    name: "Hexane Extractable Material (Vegetable)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: "30",
    resultKey: "effluent_hexane_veg_result",
    remarkKey: "effluent_hexane_veg_remark",
    severity: "medium",
  },
  {
    id: "effluent_hexane_mineral",
    name: "Hexane Extractable Material (Mineral)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: "10",
    resultKey: "effluent_hexane_mineral_result",
    remarkKey: "effluent_hexane_mineral_remark",
    severity: "medium",
  },
];

export function ChemicalParameters({ form }: ChemicalParametersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chemical Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {chemicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
