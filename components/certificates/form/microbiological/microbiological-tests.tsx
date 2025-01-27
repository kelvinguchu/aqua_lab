"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormValues,
  TestParameterWithMeta,
  MicrobiologicalResults,
} from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface MicrobiologicalTestsProps {
  form: UseFormReturn<FormValues>;
}

const microbiologicalParameters: TestParameterWithMeta<MicrobiologicalResults>[] =
  [
    {
      id: "total_viable_counts",
      name: "Total Viable Counts",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9215",
      unit: "CFU/mL",
      standard: "500",
      resultKey: "total_viable_counts_result",
      remarkKey: "total_viable_counts_remark",
      severity: "high",
    },
    {
      id: "coliforms_mpn",
      name: "Coliforms (MPN)",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9221",
      unit: "MPN/100mL",
      standard: "0",
      resultKey: "coliforms_mpn_result",
      remarkKey: "coliforms_mpn_remark",
      severity: "high",
    },
    {
      id: "ecoli_mpn",
      name: "E. coli (MPN)",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9223",
      unit: "MPN/100mL",
      standard: "0",
      resultKey: "ecoli_mpn_result",
      remarkKey: "ecoli_mpn_remark",
      severity: "high",
    },
    {
      id: "faecal_coliforms_mpn",
      name: "Faecal Coliforms (MPN)",
      type: "text",
      category: "microbiological",
      method: "ASL/TM/HACH/9221",
      unit: "MPN/100mL",
      standard: "0",
      resultKey: "faecal_coliforms_mpn_result",
      remarkKey: "faecal_coliforms_mpn_remark",
      severity: "high",
    },
  ];

export function MicrobiologicalTests({ form }: MicrobiologicalTestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Microbiological Tests</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {microbiologicalParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
