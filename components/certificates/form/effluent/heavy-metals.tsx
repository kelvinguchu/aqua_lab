"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface HeavyMetalsProps {
  form: UseFormReturn<FormValues>;
  effluent_type?: "environment" | "public_sewers";
}

// Define standards for each effluent type
const environmentStandards = {
  arsenic: "0.02",
  boron: "1.0",
  cadmium: "0.01",
  chromium_vi: "0.05",
  copper: "1.0",
  iron: "3.5",
  lead: "0.1",
  manganese: "3.5",
  mercury: "0.005",
  nickel: "0.3",
  selenium: "0.02",
  zinc: "5.0",
};

const publicSewersStandards = {
  arsenic: "0.1",
  boron: "4.0",
  cadmium: "0.5",
  chromium_vi: "0.1",
  copper: "3.0",
  iron: "10.0",
  lead: "1.0",
  manganese: "10.0",
  mercury: "0.05",
  nickel: "3.0",
  selenium: "0.2",
  zinc: "10.0",
  aluminium: "10.0",
};

// Common parameters for both effluent types
const getCommonHeavyMetalParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_arsenic",
    name: "Arsenic",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: standards.arsenic,
    resultKey: "effluent_arsenic_result" as string,
    remarkKey: "effluent_arsenic_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_boron",
    name: "Boron",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8015",
    unit: "mg/L",
    standard: standards.boron,
    resultKey: "effluent_boron_result" as string,
    remarkKey: "effluent_boron_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_cadmium",
    name: "Cadmium",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8017",
    unit: "mg/L",
    standard: standards.cadmium,
    resultKey: "effluent_cadmium_result" as string,
    remarkKey: "effluent_cadmium_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_chromium_vi",
    name: "Chromium VI",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8023",
    unit: "mg/L",
    standard: standards.chromium_vi,
    resultKey: "effluent_chromium_vi_result" as string,
    remarkKey: "effluent_chromium_vi_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_copper",
    name: "Copper",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8506",
    unit: "mg/L",
    standard: standards.copper,
    resultKey: "effluent_copper_result" as string,
    remarkKey: "effluent_copper_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_iron",
    name: "Iron",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L",
    standard: standards.iron,
    resultKey: "effluent_iron_result" as string,
    remarkKey: "effluent_iron_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_lead",
    name: "Lead",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8033",
    unit: "mg/L",
    standard: standards.lead,
    resultKey: "effluent_lead_result" as string,
    remarkKey: "effluent_lead_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_manganese",
    name: "Manganese",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8034",
    unit: "mg/L",
    standard: standards.manganese,
    resultKey: "effluent_manganese_result" as string,
    remarkKey: "effluent_manganese_remark" as string,
    severity: "medium",
  },
  {
    id: "effluent_mercury",
    name: "Mercury",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: standards.mercury,
    resultKey: "effluent_mercury_result" as string,
    remarkKey: "effluent_mercury_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_nickel",
    name: "Nickel",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8037",
    unit: "mg/L",
    standard: standards.nickel,
    resultKey: "effluent_nickel_result" as string,
    remarkKey: "effluent_nickel_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_selenium",
    name: "Selenium",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8039",
    unit: "mg/L",
    standard: standards.selenium,
    resultKey: "effluent_selenium_result" as string,
    remarkKey: "effluent_selenium_remark" as string,
    severity: "high",
  },
  {
    id: "effluent_zinc",
    name: "Zinc",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8009",
    unit: "mg/L",
    standard: standards.zinc,
    resultKey: "effluent_zinc_result" as string,
    remarkKey: "effluent_zinc_remark" as string,
    severity: "medium",
  },
];

// Public Sewers-specific parameters
const getPublicSewersSpecificParameters = (
  standards: any
): TestParameterWithMeta[] => [
  {
    id: "effluent_aluminium",
    name: "Aluminium",
    type: "number",
    category: "heavy_metals",
    method: "ASL/TM/HACH/8012",
    unit: "mg/L",
    standard: standards.aluminium,
    resultKey: "effluent_aluminium_result" as string,
    remarkKey: "effluent_aluminium_remark" as string,
    severity: "medium",
  },
];

const getHeavyMetalParameters = (
  effluent_type?: "environment" | "public_sewers"
): TestParameterWithMeta[] => {
  // Default to environment standards if no type is specified
  const standards =
    effluent_type === "public_sewers"
      ? publicSewersStandards
      : environmentStandards;

  // Get common parameters
  const commonParameters = getCommonHeavyMetalParameters(standards);

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

export function HeavyMetals({ form, effluent_type }: HeavyMetalsProps) {
  const heavyMetalParameters = getHeavyMetalParameters(effluent_type);

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
