"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface ChemicalParametersProps {
  form: UseFormReturn<FormValues>;
  effluent_type?: "environment" | "public_sewers";
}

// Define standards for each effluent type
const environmentStandards = {
  bod: "30",
  cod: "50",
  total_nitrogen: "10",
  total_phosphorus: "2",
  oil_grease: "5",
  detergents: "15",
  chloride: "250",
  fluoride: "1.5",
  sulphide: "0.1",
  phenols: "0.002",
  hexane_veg: "30",
  hexane_mineral: "10",
  ammonia_compounds: "0.5",
  chlorine_free_residue: "0.1",
  chromium_total: "0.1",
  organo_phosphorus: "0.003",
  pcb: "0.003",
  cyanogen: "Nil",
  toxicity: "Non-toxic",
};

const publicSewersStandards = {
  bod: "500",
  cod: "1000",
  total_nitrogen: "80",
  total_phosphorus: "10",
  oil_grease: "50",
  detergents: "30",
  chloride: "1000",
  fluoride: "10",
  sulphide: "1",
  phenols: "10",
  hexane_veg: "100",
  hexane_mineral: "50",
  free_saline_ammonia: "20",
  nitrates: "20",
  phosphates: "5",
  cyanide_total: "0.5",
};

// Common parameters for both effluent types
const getCommonChemicalParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_bod",
    name: "Biochemical Oxygen Demand (BOD)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8043",
    unit: "mg/L",
    standard: standards.bod,
    resultKey: "effluent_bod_result" as string,
    remarkKey: "effluent_bod_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_cod",
    name: "Chemical Oxygen Demand (COD)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8000",
    unit: "mg/L",
    standard: standards.cod,
    resultKey: "effluent_cod_result" as string,
    remarkKey: "effluent_cod_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_total_nitrogen",
    name: "Total Nitrogen",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10071",
    unit: "mg/L",
    standard: standards.total_nitrogen,
    resultKey: "effluent_total_nitrogen_result" as string,
    remarkKey: "effluent_total_nitrogen_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_total_phosphorus",
    name: "Total Phosphorus",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8190",
    unit: "mg/L",
    standard: standards.total_phosphorus,
    resultKey: "effluent_total_phosphorus_result" as string,
    remarkKey: "effluent_total_phosphorus_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_oil_grease",
    name: "Oil & Grease",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: standards.oil_grease,
    resultKey: "effluent_oil_grease_result" as string,
    remarkKey: "effluent_oil_grease_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_detergents",
    name: "Detergents",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8028",
    unit: "mg/L",
    standard: standards.detergents,
    resultKey: "effluent_detergents_result" as string,
    remarkKey: "effluent_detergents_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_chloride",
    name: "Chloride",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8113",
    unit: "mg/L",
    standard: standards.chloride,
    resultKey: "effluent_chloride_result" as string,
    remarkKey: "effluent_chloride_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_fluoride",
    name: "Fluoride",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L",
    standard: standards.fluoride,
    resultKey: "effluent_fluoride_result" as string,
    remarkKey: "effluent_fluoride_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_sulphide",
    name: "Sulphide",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8131",
    unit: "mg/L",
    standard: standards.sulphide,
    resultKey: "effluent_sulphide_result" as string,
    remarkKey: "effluent_sulphide_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_phenols",
    name: "Phenols",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8047",
    unit: "mg/L",
    standard: standards.phenols,
    resultKey: "effluent_phenols_result" as string,
    remarkKey: "effluent_phenols_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_hexane_veg",
    name: "Hexane Extractable Material (Vegetable)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: standards.hexane_veg,
    resultKey: "effluent_hexane_veg_result" as string,
    remarkKey: "effluent_hexane_veg_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_hexane_mineral",
    name: "Hexane Extractable Material (Mineral)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/10056",
    unit: "mg/L",
    standard: standards.hexane_mineral,
    resultKey: "effluent_hexane_mineral_result" as string,
    remarkKey: "effluent_hexane_mineral_remark" as string,
    severity: "medium",
  },
];

// Environment-specific parameters
const getEnvironmentSpecificParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_ammonia_compounds",
    name: "Ammonia Compounds",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8038",
    unit: "mg/L",
    standard: standards.ammonia_compounds,
    resultKey: "effluent_ammonia_compounds_result" as string,
    remarkKey: "effluent_ammonia_compounds_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_chlorine_free_residue",
    name: "Chlorine (Free Residue)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8021",
    unit: "mg/L",
    standard: standards.chlorine_free_residue,
    resultKey: "effluent_chlorine_free_residue_result" as string,
    remarkKey: "effluent_chlorine_free_residue_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_chromium_total",
    name: "Chromium (Total)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8024",
    unit: "mg/L",
    standard: standards.chromium_total,
    resultKey: "effluent_chromium_total_result" as string,
    remarkKey: "effluent_chromium_total_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_organo_phosphorus",
    name: "Organo-Phosphorus Compounds",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8048",
    unit: "mg/L",
    standard: standards.organo_phosphorus,
    resultKey: "effluent_organo_phosphorus_result" as string,
    remarkKey: "effluent_organo_phosphorus_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_pcb",
    name: "PCB (Polychlorinated Biphenyls)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8110",
    unit: "mg/L",
    standard: standards.pcb,
    resultKey: "effluent_pcb_result" as string,
    remarkKey: "effluent_pcb_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_cyanogen",
    name: "Cyanogen Compounds",
    type: "text",
    category: "chemical",
    method: "ASL/TM/HACH/8027",
    unit: "",
    standard: standards.cyanogen,
    resultKey: "effluent_cyanogen_result" as string,
    remarkKey: "effluent_cyanogen_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_toxicity",
    name: "Toxicity",
    type: "text",
    category: "chemical",
    method: "ASL/TM/HACH/8006",
    unit: "",
    standard: standards.toxicity,
    resultKey: "effluent_toxicity_result" as string,
    remarkKey: "effluent_toxicity_remark" as string,
    severity: "high",
  },
];

// Public Sewers-specific parameters
const getPublicSewersSpecificParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_free_saline_ammonia",
    name: "Free & Saline Ammonia",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8038",
    unit: "mg/L",
    standard: standards.free_saline_ammonia,
    resultKey: "effluent_free_saline_ammonia_result" as string,
    remarkKey: "effluent_free_saline_ammonia_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_nitrates",
    name: "Nitrates",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8039",
    unit: "mg/L",
    standard: standards.nitrates,
    resultKey: "effluent_nitrates_result" as string,
    remarkKey: "effluent_nitrates_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_phosphates",
    name: "Phosphates",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8048",
    unit: "mg/L",
    standard: standards.phosphates,
    resultKey: "effluent_phosphates_result" as string,
    remarkKey: "effluent_phosphates_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_cyanide_total",
    name: "Cyanide (Total)",
    type: "number",
    category: "chemical",
    method: "ASL/TM/HACH/8027",
    unit: "mg/L",
    standard: standards.cyanide_total,
    resultKey: "effluent_cyanide_total_result" as string,
    remarkKey: "effluent_cyanide_total_remark" as string,
    severity: "high",
  },
];

const getChemicalParameters = (
  effluent_type?: "environment" | "public_sewers"
): TestParameterWithMeta[] => {
  // Default to environment standards if no type is specified
  const standards =
    effluent_type === "public_sewers"
      ? publicSewersStandards
      : environmentStandards;

  // Get common parameters
  const commonParameters = getCommonChemicalParameters(standards);

  // Add type-specific parameters
  if (effluent_type === "public_sewers") {
    return [
      ...commonParameters,
      ...getPublicSewersSpecificParameters(standards),
    ];
  } else {
    return [
      ...commonParameters,
      ...getEnvironmentSpecificParameters(standards),
    ];
  }
};

export function ChemicalParameters({
  form,
  effluent_type,
}: ChemicalParametersProps) {
  const chemicalParameters = getChemicalParameters(effluent_type);

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
