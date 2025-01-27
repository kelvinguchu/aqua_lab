"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface OrganicCompoundsProps {
  form: UseFormReturn<FormValues>;
}

const organicCompoundParameters: TestParameterWithMeta<EffluentResults>[] = [
  {
    id: "effluent_111_trichloroethane",
    name: "1,1,1-Trichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "3.0",
    resultKey: "effluent_111_trichloroethane_result",
    remarkKey: "effluent_111_trichloroethane_remark",
    severity: "high",
  },
  {
    id: "effluent_112_trichloroethane",
    name: "1,1,2-Trichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.06",
    resultKey: "effluent_112_trichloroethane_result",
    remarkKey: "effluent_112_trichloroethane_remark",
    severity: "high",
  },
  {
    id: "effluent_11_dichloroethylene",
    name: "1,1-Dichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.2",
    resultKey: "effluent_11_dichloroethylene_result",
    remarkKey: "effluent_11_dichloroethylene_remark",
    severity: "high",
  },
  {
    id: "effluent_12_dichloroethane",
    name: "1,2-Dichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.04",
    resultKey: "effluent_12_dichloroethane_result",
    remarkKey: "effluent_12_dichloroethane_remark",
    severity: "high",
  },
  {
    id: "effluent_13_dichloropropene",
    name: "1,3-Dichloropropene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_13_dichloropropene_result",
    remarkKey: "effluent_13_dichloropropene_remark",
    severity: "high",
  },
  {
    id: "effluent_benzene",
    name: "Benzene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.01",
    resultKey: "effluent_benzene_result",
    remarkKey: "effluent_benzene_remark",
    severity: "high",
  },
  {
    id: "effluent_carbon_tetrachloride",
    name: "Carbon Tetrachloride",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_carbon_tetrachloride_result",
    remarkKey: "effluent_carbon_tetrachloride_remark",
    severity: "high",
  },
  {
    id: "effluent_cis_12_dichloroethylene",
    name: "cis-1,2-Dichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.4",
    resultKey: "effluent_cis_12_dichloroethylene_result",
    remarkKey: "effluent_cis_12_dichloroethylene_remark",
    severity: "high",
  },
  {
    id: "effluent_dichloromethane",
    name: "Dichloromethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_dichloromethane_result",
    remarkKey: "effluent_dichloromethane_remark",
    severity: "high",
  },
  {
    id: "effluent_simazine",
    name: "Simazine",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.002",
    resultKey: "effluent_simazine_result",
    remarkKey: "effluent_simazine_remark",
    severity: "high",
  },
  {
    id: "effluent_tetrachloroethylene",
    name: "Tetrachloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.04",
    resultKey: "effluent_tetrachloroethylene_result",
    remarkKey: "effluent_tetrachloroethylene_remark",
    severity: "high",
  },
  {
    id: "effluent_thiobencarb",
    name: "Thiobencarb",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "effluent_thiobencarb_result",
    remarkKey: "effluent_thiobencarb_remark",
    severity: "high",
  },
  {
    id: "effluent_thiram",
    name: "Thiram",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.06",
    resultKey: "effluent_thiram_result",
    remarkKey: "effluent_thiram_remark",
    severity: "high",
  },
  {
    id: "effluent_trichloroethylene",
    name: "Trichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.03",
    resultKey: "effluent_trichloroethylene_result",
    remarkKey: "effluent_trichloroethylene_remark",
    severity: "high",
  },
];

export function OrganicCompounds({ form }: OrganicCompoundsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organic Compounds</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {organicCompoundParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
