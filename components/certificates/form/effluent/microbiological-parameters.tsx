"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, EffluentResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface MicrobiologicalParametersProps {
  form: UseFormReturn<FormValues>;
}

const microbiologicalParameters: TestParameterWithMeta<EffluentResults>[] = [
  {
    id: "effluent_ecoli",
    name: "E. coli",
    type: "text",
    category: "microbiological",
    method: "ASL/TM/HACH/9223",
    unit: "MPN/100mL",
    standard: "Nil",
    resultKey: "effluent_ecoli_result",
    remarkKey: "effluent_ecoli_remark",
    severity: "high",
  },
  {
    id: "effluent_total_coliforms",
    name: "Total Coliforms",
    type: "text",
    category: "microbiological",
    method: "ASL/TM/HACH/9221",
    unit: "MPN/100mL",
    standard: "400",
    resultKey: "effluent_total_coliforms_result",
    remarkKey: "effluent_total_coliforms_remark",
    severity: "high",
  },
];

export function MicrobiologicalParameters({
  form,
}: MicrobiologicalParametersProps) {
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
