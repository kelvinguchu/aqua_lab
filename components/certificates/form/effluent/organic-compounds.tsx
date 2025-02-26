"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface OrganicCompoundsProps {
  form: UseFormReturn<FormValues>;
  effluent_type?: "environment" | "public_sewers";
}

// Define standards for each effluent type
const environmentStandards = {
  trichloroethane_111: "3.0",
  trichloroethane_112: "0.06",
  dichloroethylene_11: "0.2",
  dichloroethane_12: "0.04",
  dichloropropene_13: "0.02",
  benzene: "0.01",
  carbon_tetrachloride: "0.02",
  dichloroethylene_cis_12: "0.4",
  dichloromethane: "0.02",
  simazine: "0.002",
  tetrachloroethylene: "0.04",
  thiobencarb: "0.02",
  thiram: "0.06",
  trichloroethylene: "0.03",
};

const publicSewersStandards = {
  trichloroethane_111: "5.0",
  trichloroethane_112: "0.2",
  dichloroethylene_11: "0.5",
  dichloroethane_12: "0.1",
  dichloropropene_13: "0.1",
  benzene: "0.1",
  carbon_tetrachloride: "0.1",
  dichloroethylene_cis_12: "1.0",
  dichloromethane: "0.1",
  simazine: "0.01",
  tetrachloroethylene: "0.1",
  thiobencarb: "0.1",
  thiram: "0.2",
  trichloroethylene: "0.1",
  calcium_carbide: "Nil",
  chloroform: "Nil",
  inflammable_solvents: "Nil",
  radioactive_residues: "Nil",
  degreasing_solvents: "Nil",
};

// Common parameters for both effluent types
const getCommonOrganicCompoundParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_111_trichloroethane",
    name: "1,1,1-Trichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.trichloroethane_111,
    resultKey: "effluent_111_trichloroethane_result" as string,
    remarkKey: "effluent_111_trichloroethane_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_112_trichloroethane",
    name: "1,1,2-Trichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.trichloroethane_112,
    resultKey: "effluent_112_trichloroethane_result" as string,
    remarkKey: "effluent_112_trichloroethane_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_11_dichloroethylene",
    name: "1,1-Dichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.dichloroethylene_11,
    resultKey: "effluent_11_dichloroethylene_result" as string,
    remarkKey: "effluent_11_dichloroethylene_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_12_dichloroethane",
    name: "1,2-Dichloroethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.dichloroethane_12,
    resultKey: "effluent_12_dichloroethane_result" as string,
    remarkKey: "effluent_12_dichloroethane_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_13_dichloropropene",
    name: "1,3-Dichloropropene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.dichloropropene_13,
    resultKey: "effluent_13_dichloropropene_result" as string,
    remarkKey: "effluent_13_dichloropropene_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_benzene",
    name: "Benzene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.benzene,
    resultKey: "effluent_benzene_result" as string,
    remarkKey: "effluent_benzene_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_carbon_tetrachloride",
    name: "Carbon Tetrachloride",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.carbon_tetrachloride,
    resultKey: "effluent_carbon_tetrachloride_result" as string,
    remarkKey: "effluent_carbon_tetrachloride_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_cis_12_dichloroethylene",
    name: "cis-1,2-Dichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.dichloroethylene_cis_12,
    resultKey: "effluent_cis_12_dichloroethylene_result" as string,
    remarkKey: "effluent_cis_12_dichloroethylene_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_dichloromethane",
    name: "Dichloromethane",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.dichloromethane,
    resultKey: "effluent_dichloromethane_result" as string,
    remarkKey: "effluent_dichloromethane_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_simazine",
    name: "Simazine",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.simazine,
    resultKey: "effluent_simazine_result" as string,
    remarkKey: "effluent_simazine_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_tetrachloroethylene",
    name: "Tetrachloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.tetrachloroethylene,
    resultKey: "effluent_tetrachloroethylene_result" as string,
    remarkKey: "effluent_tetrachloroethylene_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_thiobencarb",
    name: "Thiobencarb",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.thiobencarb,
    resultKey: "effluent_thiobencarb_result" as string,
    remarkKey: "effluent_thiobencarb_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_thiram",
    name: "Thiram",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.thiram,
    resultKey: "effluent_thiram_result" as string,
    remarkKey: "effluent_thiram_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_trichloroethylene",
    name: "Trichloroethylene",
    type: "number",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.trichloroethylene,
    resultKey: "effluent_trichloroethylene_result" as string,
    remarkKey: "effluent_trichloroethylene_remark" as string,
    severity: "high",
  },
];

// Public Sewers-specific parameters
const getPublicSewersSpecificParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_calcium_carbide",
    name: "Calcium Carbide",
    type: "text",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "",
    standard: standards.calcium_carbide,
    resultKey: "effluent_calcium_carbide_result" as string,
    remarkKey: "effluent_calcium_carbide_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_chloroform",
    name: "Chloroform",
    type: "text",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "",
    standard: standards.chloroform,
    resultKey: "effluent_chloroform_result" as string,
    remarkKey: "effluent_chloroform_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_inflammable_solvents",
    name: "Inflammable Solvents",
    type: "text",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "",
    standard: standards.inflammable_solvents,
    resultKey: "effluent_inflammable_solvents_result" as string,
    remarkKey: "effluent_inflammable_solvents_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_radioactive_residues",
    name: "Radioactive Residues",
    type: "text",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "",
    standard: standards.radioactive_residues,
    resultKey: "effluent_radioactive_residues_result" as string,
    remarkKey: "effluent_radioactive_residues_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_degreasing_solvents",
    name: "Degreasing Solvents",
    type: "text",
    category: "organic_compounds",
    method: "ASL/TM/HACH/8013",
    unit: "",
    standard: standards.degreasing_solvents,
    resultKey: "effluent_degreasing_solvents_result" as string,
    remarkKey: "effluent_degreasing_solvents_remark" as string,
    severity: "high",
  },
];

const getOrganicCompoundParameters = (
  effluent_type?: "environment" | "public_sewers"
): TestParameterWithMeta[] => {
  // Default to environment standards if no type is specified
  const standards =
    effluent_type === "public_sewers"
      ? publicSewersStandards
      : environmentStandards;

  // Get common parameters
  const commonParameters = getCommonOrganicCompoundParameters(standards);

  // Add type-specific parameters
  if (effluent_type === "public_sewers") {
    return [
      ...commonParameters,
      ...getPublicSewersSpecificParameters(standards),
    ];
  } else {
    return commonParameters;
  }
};

export function OrganicCompounds({
  form,
  effluent_type,
}: OrganicCompoundsProps) {
  const organicCompoundParameters = getOrganicCompoundParameters(effluent_type);

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
