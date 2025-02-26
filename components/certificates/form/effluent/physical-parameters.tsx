"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface PhysicalParametersProps {
  form: UseFormReturn<FormValues>;
  effluent_type?: "environment" | "public_sewers";
}

// Define standards for each effluent type
const environmentStandards = {
  ph: "6.5 - 8.5",
  temperature: "± 3°C of ambient",
  tss: "30",
  tds: "1200",
  color: "15",
};

const publicSewersStandards = {
  ph: "6.0 - 9.0",
  temperature: "20 - 35",
  tss: "250",
  tds: "2000",
  color: "N/A",
};

// All physical parameters are common to both effluent types
const getPhysicalParameters = (
  effluent_type?: "environment" | "public_sewers"
): TestParameterWithMeta[] => {
  // Default to environment standards if no type is specified
  const standards =
    effluent_type === "public_sewers"
      ? publicSewersStandards
      : environmentStandards;

  return [
    {
      id: "effluent_ph",
      name: "pH",
      type: "number",
      category: "physical",
      method: "ASL/TM/HACH/8156",
      unit: "pH units",
      standard: standards.ph,
      resultKey: "effluent_ph_result" as string,
      remarkKey: "effluent_ph_remark" as string,
      severity: "high",
    },
    {
      id: "effluent_temperature",
      name: "Temperature",
      type: "number",
      category: "physical",
      method: "ASL/TM/HACH/2550",
      unit: "°C",
      standard: standards.temperature,
      resultKey: "effluent_temperature_result" as string,
      remarkKey: "effluent_temperature_remark" as string,
      severity: "medium",
    },
    {
      id: "effluent_tss",
      name: "Total Suspended Solids (TSS)",
      type: "number",
      category: "physical",
      method: "ASL/TM/HACH/8006",
      unit: "mg/L",
      standard: standards.tss,
      resultKey: "effluent_tss_result" as string,
      remarkKey: "effluent_tss_remark" as string,
      severity: "medium",
    },
    {
      id: "effluent_tds",
      name: "Total Dissolved Solids (TDS)",
      type: "number",
      category: "physical",
      method: "ASL/TM/HACH/8160",
      unit: "mg/L",
      standard: standards.tds,
      resultKey: "effluent_tds_result" as string,
      remarkKey: "effluent_tds_remark" as string,
      severity: "medium",
    },
    {
      id: "effluent_color",
      name: "Color",
      type: "text",
      category: "physical",
      method: "ASL/TM/HACH/8025",
      unit: "TCU",
      standard: standards.color,
      resultKey: "effluent_color_result" as string,
      remarkKey: "effluent_color_remark" as string,
      severity: "low",
    },
  ];
};

export function PhysicalParameters({
  form,
  effluent_type,
}: PhysicalParametersProps) {
  const physicalParameters = getPhysicalParameters(effluent_type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {physicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
