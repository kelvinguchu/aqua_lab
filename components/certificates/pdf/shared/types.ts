import { Certificate } from "@/lib/supabase";

export type CertificateType =
  | "physical_chemical"
  | "microbiological"
  | "effluent"
  | "irrigation"
  | "borehole";

export interface BasePDFProps {
  certificate: Certificate;
}

export interface DateInfo {
  label: string;
  value: string | null;
}

export interface TestParameter {
  name: string;
  method: string;
  unit: string;
  standard: string;
  resultKey: keyof Certificate;
  remarkKey: keyof Certificate;
}

export interface TestCategory {
  title: string;
  parameters: TestParameter[];
}
