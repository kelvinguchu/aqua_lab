import { Database } from "@/lib/database.types";

export type CertificateType =
  | "physical_chemical"
  | "microbiological"
  | "effluent"
  | "irrigation"
  | "borehole";

// Core certificate fields shared by all types
export interface Certificate {
  id: string;
  certificate_id: string;
  sample_id: string;
  certificate_type: CertificateType;
  date_of_report: string;
  date_of_report_issue: string;
  description_of_sample: string;
  sample_source: string;
  submitted_by: string;
  customer_contact: string;
  sampled_by: string;
  date_of_sampling: string;
  date_sample_received: string;
  date_of_analysis: string;
  comments: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
}

// Physical Chemical Results
export interface PhysicalChemicalResults {
  id: string;
  certificate_id: string;
  // Physical Tests
  ph_result: number | null;
  ph_remark: string | null;
  turbidity_result: number | null;
  turbidity_remark: string | null;
  color_result: string | null;
  color_remark: string | null;
  tss_result: string | null;
  tss_remark: string | null;
  tds_result: number | null;
  tds_remark: string | null;
  conductivity_result: number | null;
  conductivity_remark: string | null;
  // Chemical Tests (Anions)
  ph_alkalinity_result: string | null;
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
  sodium_result: number | null;
  sodium_remark: string | null;
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
}

// Microbiological Results
export interface MicrobiologicalResults {
  id: string;
  certificate_id: string;
  total_viable_counts_result: string | null;
  total_viable_counts_remark: string | null;
  coliforms_mpn_result: string | null;
  coliforms_mpn_remark: string | null;
  ecoli_mpn_result: string | null;
  ecoli_mpn_remark: string | null;
  faecal_coliforms_mpn_result: string | null;
  faecal_coliforms_mpn_remark: string | null;
}

// Effluent Results
export interface EffluentResults {
  id: string;
  certificate_id: string;
  // Physical Parameters
  effluent_ph_result: number | null;
  effluent_ph_remark: string | null;
  effluent_temperature_result: number | null;
  effluent_temperature_remark: string | null;
  effluent_tss_result: number | null;
  effluent_tss_remark: string | null;
  effluent_tds_result: number | null;
  effluent_tds_remark: string | null;
  effluent_color_result: string | null;
  effluent_color_remark: string | null;
  // Chemical Parameters
  effluent_bod_result: number | null;
  effluent_bod_remark: string | null;
  effluent_cod_result: number | null;
  effluent_cod_remark: string | null;
  effluent_total_nitrogen_result: number | null;
  effluent_total_nitrogen_remark: string | null;
  effluent_total_phosphorus_result: number | null;
  effluent_total_phosphorus_remark: string | null;
  effluent_oil_grease_result: number | null;
  effluent_oil_grease_remark: string | null;
  effluent_detergents_result: number | null;
  effluent_detergents_remark: string | null;
  effluent_chloride_result: number | null;
  effluent_chloride_remark: string | null;
  effluent_fluoride_result: number | null;
  effluent_fluoride_remark: string | null;
  effluent_sulphide_result: number | null;
  effluent_sulphide_remark: string | null;
  effluent_phenols_result: number | null;
  effluent_phenols_remark: string | null;
  effluent_hexane_veg_result: number | null;
  effluent_hexane_veg_remark: string | null;
  effluent_hexane_mineral_result: number | null;
  effluent_hexane_mineral_remark: string | null;
  // Heavy Metals
  effluent_arsenic_result: number | null;
  effluent_arsenic_remark: string | null;
  effluent_boron_result: number | null;
  effluent_boron_remark: string | null;
  effluent_cadmium_result: number | null;
  effluent_cadmium_remark: string | null;
  effluent_chromium_vi_result: number | null;
  effluent_chromium_vi_remark: string | null;
  effluent_copper_result: number | null;
  effluent_copper_remark: string | null;
  effluent_iron_result: number | null;
  effluent_iron_remark: string | null;
  effluent_lead_result: number | null;
  effluent_lead_remark: string | null;
  effluent_manganese_result: number | null;
  effluent_manganese_remark: string | null;
  effluent_mercury_result: number | null;
  effluent_mercury_remark: string | null;
  effluent_nickel_result: number | null;
  effluent_nickel_remark: string | null;
  effluent_selenium_result: number | null;
  effluent_selenium_remark: string | null;
  effluent_zinc_result: number | null;
  effluent_zinc_remark: string | null;
  // Organic Compounds
  effluent_111_trichloroethane_result: number | null;
  effluent_111_trichloroethane_remark: string | null;
  effluent_112_trichloroethane_result: number | null;
  effluent_112_trichloroethane_remark: string | null;
  effluent_11_dichloroethylene_result: number | null;
  effluent_11_dichloroethylene_remark: string | null;
  effluent_12_dichloroethane_result: number | null;
  effluent_12_dichloroethane_remark: string | null;
  effluent_13_dichloropropene_result: number | null;
  effluent_13_dichloropropene_remark: string | null;
  effluent_benzene_result: number | null;
  effluent_benzene_remark: string | null;
  effluent_carbon_tetrachloride_result: number | null;
  effluent_carbon_tetrachloride_remark: string | null;
  effluent_cis_12_dichloroethylene_result: number | null;
  effluent_cis_12_dichloroethylene_remark: string | null;
  effluent_dichloromethane_result: number | null;
  effluent_dichloromethane_remark: string | null;
  effluent_simazine_result: number | null;
  effluent_simazine_remark: string | null;
  effluent_tetrachloroethylene_result: number | null;
  effluent_tetrachloroethylene_remark: string | null;
  effluent_thiobencarb_result: number | null;
  effluent_thiobencarb_remark: string | null;
  effluent_thiram_result: number | null;
  effluent_thiram_remark: string | null;
  effluent_trichloroethylene_result: number | null;
  effluent_trichloroethylene_remark: string | null;
  // Microbiological Parameters
  effluent_ecoli_result: string | null;
  effluent_ecoli_remark: string | null;
  effluent_total_coliforms_result: string | null;
  effluent_total_coliforms_remark: string | null;
}

// Irrigation Results
export interface IrrigationResults {
  id: string;
  certificate_id: string;
  irrigation_ph_result: number | null;
  irrigation_ph_remark: string | null;
  irrigation_aluminium_result: number | null;
  irrigation_aluminium_remark: string | null;
  irrigation_arsenic_result: number | null;
  irrigation_arsenic_remark: string | null;
  irrigation_boron_result: number | null;
  irrigation_boron_remark: string | null;
  irrigation_cadmium_result: number | null;
  irrigation_cadmium_remark: string | null;
  irrigation_chloride_result: number | null;
  irrigation_chloride_remark: string | null;
  irrigation_chromium_result: number | null;
  irrigation_chromium_remark: string | null;
  irrigation_cobalt_result: number | null;
  irrigation_cobalt_remark: string | null;
  irrigation_copper_result: number | null;
  irrigation_copper_remark: string | null;
  irrigation_ecoli_result: string | null;
  irrigation_ecoli_remark: string | null;
  irrigation_fluoride_result: number | null;
  irrigation_fluoride_remark: string | null;
  irrigation_iron_result: number | null;
  irrigation_iron_remark: string | null;
  irrigation_lead_result: number | null;
  irrigation_lead_remark: string | null;
  irrigation_selenium_result: number | null;
  irrigation_selenium_remark: string | null;
  irrigation_sar_result: number | null;
  irrigation_sar_remark: string | null;
  irrigation_tds_result: number | null;
  irrigation_tds_remark: string | null;
  irrigation_zinc_result: number | null;
  irrigation_zinc_remark: string | null;
}

// Borehole Results
export interface BoreholeResults {
  id: string;
  certificate_id: string;
  // Physical Tests
  borehole_ph_result: number | null;
  borehole_ph_remark: string | null;
  borehole_turbidity_result: number | null;
  borehole_turbidity_remark: string | null;
  borehole_color_result: string | null;
  borehole_color_remark: string | null;
  borehole_tss_result: string | null;
  borehole_tss_remark: string | null;
  borehole_tds_result: number | null;
  borehole_tds_remark: string | null;
  borehole_conductivity_result: number | null;
  borehole_conductivity_remark: string | null;
  // Chemical Tests (Anions)
  borehole_fluoride_result: number | null;
  borehole_fluoride_remark: string | null;
  // Chemical Tests (Cations)
  borehole_calcium_result: string | null;
  borehole_calcium_remark: string | null;
  borehole_magnesium_result: string | null;
  borehole_magnesium_remark: string | null;
  borehole_iron_result: number | null;
  borehole_iron_remark: string | null;
  borehole_manganese_result: number | null;
  borehole_manganese_remark: string | null;
  // Other Parameters
  borehole_total_hardness_result: string | null;
  borehole_total_hardness_remark: string | null;
  borehole_calcium_hardness_result: string | null;
  borehole_calcium_hardness_remark: string | null;
  borehole_magnesium_hardness_result: string | null;
  borehole_magnesium_hardness_remark: string | null;
}

export interface TestParameter<T> {
  name: string;
  method: string;
  unit: string;
  standard: string;
  resultKey: keyof T;
  remarkKey: keyof T;
}

export interface TestCategory<T> {
  title: string;
  parameters: TestParameter<T>[];
}

// Props for each PDF template
export interface BasePDFProps {
  certificate: Certificate;
}

export interface PhysicalChemicalPDFProps extends BasePDFProps {
  results: PhysicalChemicalResults;
}

export interface MicrobiologicalPDFProps extends BasePDFProps {
  results: MicrobiologicalResults;
}

export interface EffluentPDFProps extends BasePDFProps {
  results: EffluentResults;
}

export interface IrrigationPDFProps extends BasePDFProps {
  results: IrrigationResults;
}

export interface BoreholePDFProps extends BasePDFProps {
  results: BoreholeResults;
}

export interface DateInfo {
  label: string;
  value: string | null;
}
