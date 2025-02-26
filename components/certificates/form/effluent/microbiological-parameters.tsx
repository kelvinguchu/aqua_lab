"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface MicrobiologicalParametersProps {
  form: UseFormReturn<FormValues>;
  effluent_type?: "environment" | "public_sewers";
}

// Define standards for each effluent type
const environmentStandards = {
  ecoli: "Nil",
  total_coliforms: "400",
};

const publicSewersStandards = {
  ecoli: "Nil",
  total_coliforms: "1000",
};

// All microbiological parameters are common to both effluent types
const getMicrobiologicalParameters = (
  effluent_type?: "environment" | "public_sewers"
): TestParameterWithMeta[] => {
  // Default to environment standards if no type is specified
  const standards =
    effluent_type === "public_sewers"
      ? publicSewersStandards
      : environmentStandards;

  return [
    {
      id: "effluent_ecoli",
      name: "E. coli",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9223",
      unit: "MPN/100mL",
      standard: standards.ecoli,
      resultKey: "effluent_ecoli_result" as string,
      remarkKey: "effluent_ecoli_remark" as string,
      severity: "high",
    },
    {
      id: "effluent_total_coliforms",
      name: "Total Coliforms",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9221",
      unit: "MPN/100mL",
      standard: standards.total_coliforms,
      resultKey: "effluent_total_coliforms_result" as string,
      remarkKey: "effluent_total_coliforms_remark" as string,
      severity: "high",
    },
  ];
};

export function MicrobiologicalParameters({
  form,
  effluent_type,
}: MicrobiologicalParametersProps) {
  const microbiologicalParameters = getMicrobiologicalParameters(effluent_type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Microbiological Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {microbiologicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
