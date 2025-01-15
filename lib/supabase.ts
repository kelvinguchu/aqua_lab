import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Certificate = {
  id: string;
  // Header Information (these change per certificate)
  certificate_id: string;
  sample_id: string;
  date_of_report: string;
  description_of_sample: string;
  sample_source: string;
  submitted_by: string;
  customer_contact: string;
  sampled_by: string;
  date_of_sampling: string;
  date_sample_received: string;
  date_of_analysis: string;
  date_of_report_issue: string;

  // Test Results (only storing Results and Remarks as other values are constant)
  // Physical Tests
  ph_result: number | null;
  ph_remark: string | null;
  turbidity_result: number | null;
  turbidity_remark: string | null;
  color_result: string | null;
  color_remark: string | null;
  tss_result: string | null; // total suspended solids
  tss_remark: string | null;
  tds_result: number | null; // total dissolved solids
  tds_remark: string | null;
  conductivity_result: number | null;
  conductivity_remark: string | null;

  // Chemical Tests (Anions)
  ph_alkalinity_result: string | null; // phenolphthalein alkalinity
  ph_alkalinity_remark: string | null;
  total_alkalinity_result: number | null;
  total_alkalinity_remark: string | null;
  chloride_result: number | null;
  chloride_remark: string | null;
  fluoride_result: number | null;
  fluoride_remark: string | null;
  sulfate_result: string | null;
  sulfate_remark: string | null;
  nitrate_result: number | null;
  nitrate_remark: string | null;
  nitrite_result: number | null;
  nitrite_remark: string | null;
  phosphate_result: number | null;
  phosphate_remark: string | null;
  sulfide_result: number | null;
  sulfide_remark: string | null;

  // Chemical Tests (Cations)
  potassium_result: number | null;
  potassium_remark: string | null;
  calcium_result: string | null;
  calcium_remark: string | null;
  magnesium_result: string | null;
  magnesium_remark: string | null;
  iron_result: number | null;
  iron_remark: string | null;
  manganese_result: number | null;
  manganese_remark: string | null;
  ammonia_result: string | null;
  ammonia_remark: string | null;
  copper_result: number | null;
  copper_remark: string | null;
  zinc_result: number | null;
  zinc_remark: string | null;
  chromium_result: number | null;
  chromium_remark: string | null;

  // Other Parameters
  total_hardness_result: string | null;
  total_hardness_remark: string | null;
  calcium_hardness_result: string | null;
  calcium_hardness_remark: string | null;
  magnesium_hardness_result: string | null;
  magnesium_hardness_remark: string | null;
  silica_result: string | null;
  silica_remark: string | null;
  free_chlorine_result: number | null;
  free_chlorine_remark: string | null;

  // Metadata
  comments: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;

  // Microbiological test fields
  total_viable_counts_result: string;
  total_viable_counts_remark: string;
  coliforms_mpn_result: string;
  coliforms_mpn_remark: string;
  ecoli_mpn_result: string;
  ecoli_mpn_remark: string;
  faecal_coliforms_mpn_result: string;
  faecal_coliforms_mpn_remark: string;
};
