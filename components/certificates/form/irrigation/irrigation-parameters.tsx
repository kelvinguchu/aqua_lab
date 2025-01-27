"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues, TestParameterWithMeta, IrrigationResults } from "../types";
import { UseFormReturn } from "react-hook-form";
import { TestParameter } from "../shared/test-parameter";

interface IrrigationParametersProps {
  form: UseFormReturn<FormValues>;
}

const irrigationParameters: TestParameterWithMeta<IrrigationResults>[] = [
  {
    id: "irrigation_ph",
    name: "pH",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8156",
    unit: "pH units",
    standard: "6.5 - 8.5",
    resultKey: "irrigation_ph_result",
    remarkKey: "irrigation_ph_remark",
    severity: "high",
  },
  {
    id: "irrigation_aluminium",
    name: "Aluminium",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8012",
    unit: "mg/L",
    standard: "5.0",
    resultKey: "irrigation_aluminium_result",
    remarkKey: "irrigation_aluminium_remark",
    severity: "high",
  },
  {
    id: "irrigation_arsenic",
    name: "Arsenic",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8013",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "irrigation_arsenic_result",
    remarkKey: "irrigation_arsenic_remark",
    severity: "high",
  },
  {
    id: "irrigation_boron",
    name: "Boron",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8015",
    unit: "mg/L",
    standard: "0.75",
    resultKey: "irrigation_boron_result",
    remarkKey: "irrigation_boron_remark",
    severity: "high",
  },
  {
    id: "irrigation_cadmium",
    name: "Cadmium",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8017",
    unit: "mg/L",
    standard: "0.01",
    resultKey: "irrigation_cadmium_result",
    remarkKey: "irrigation_cadmium_remark",
    severity: "high",
  },
  {
    id: "irrigation_chloride",
    name: "Chloride",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8113",
    unit: "mg/L",
    standard: "100",
    resultKey: "irrigation_chloride_result",
    remarkKey: "irrigation_chloride_remark",
    severity: "medium",
  },
  {
    id: "irrigation_chromium",
    name: "Chromium",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8024",
    unit: "mg/L",
    standard: "0.1",
    resultKey: "irrigation_chromium_result",
    remarkKey: "irrigation_chromium_remark",
    severity: "high",
  },
  {
    id: "irrigation_cobalt",
    name: "Cobalt",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8017",
    unit: "mg/L",
    standard: "0.05",
    resultKey: "irrigation_cobalt_result",
    remarkKey: "irrigation_cobalt_remark",
    severity: "high",
  },
  {
    id: "irrigation_copper",
    name: "Copper",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8506",
    unit: "mg/L",
    standard: "0.2",
    resultKey: "irrigation_copper_result",
    remarkKey: "irrigation_copper_remark",
    severity: "high",
  },
  {
    id: "irrigation_ecoli",
    name: "E. coli",
    type: "text",
    category: "irrigation",
    method: "ASL/TM/HACH/9223",
    unit: "MPN/100mL",
    standard: "1000",
    resultKey: "irrigation_ecoli_result",
    remarkKey: "irrigation_ecoli_remark",
    severity: "high",
  },
  {
    id: "irrigation_fluoride",
    name: "Fluoride",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L",
    standard: "1.0",
    resultKey: "irrigation_fluoride_result",
    remarkKey: "irrigation_fluoride_remark",
    severity: "high",
  },
  {
    id: "irrigation_iron",
    name: "Iron",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L",
    standard: "5.0",
    resultKey: "irrigation_iron_result",
    remarkKey: "irrigation_iron_remark",
    severity: "medium",
  },
  {
    id: "irrigation_lead",
    name: "Lead",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8033",
    unit: "mg/L",
    standard: "5.0",
    resultKey: "irrigation_lead_result",
    remarkKey: "irrigation_lead_remark",
    severity: "high",
  },
  {
    id: "irrigation_selenium",
    name: "Selenium",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8039",
    unit: "mg/L",
    standard: "0.02",
    resultKey: "irrigation_selenium_result",
    remarkKey: "irrigation_selenium_remark",
    severity: "high",
  },
  {
    id: "irrigation_sar",
    name: "Sodium Adsorption Ratio (SAR)",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8205",
    unit: "",
    standard: "6",
    resultKey: "irrigation_sar_result",
    remarkKey: "irrigation_sar_remark",
    severity: "medium",
  },
  {
    id: "irrigation_tds",
    name: "Total Dissolved Solids (TDS)",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8160",
    unit: "mg/L",
    standard: "1200",
    resultKey: "irrigation_tds_result",
    remarkKey: "irrigation_tds_remark",
    severity: "medium",
  },
  {
    id: "irrigation_zinc",
    name: "Zinc",
    type: "number",
    category: "irrigation",
    method: "ASL/TM/HACH/8009",
    unit: "mg/L",
    standard: "2.0",
    resultKey: "irrigation_zinc_result",
    remarkKey: "irrigation_zinc_remark",
    severity: "medium",
  },
];

export function IrrigationParameters({ form }: IrrigationParametersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Irrigation Parameters</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {irrigationParameters.map((parameter) => (
          <TestParameter key={parameter.id} form={form} parameter={parameter} />
        ))}
      </CardContent>
    </Card>
  );
}
