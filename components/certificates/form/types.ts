import { Database } from "@/lib/database.types";
import {
  TestParameter,
  TestCategory,
} from "@/components/certificates/pdf/shared/types";

// Get the row types from the database
type Tables = Database["public"]["Tables"];
export type Certificate = Tables["certificates"]["Row"];
export type PhysicalChemicalResults =
  Tables["physical_chemical_results"]["Row"];
export type MicrobiologicalResults = Tables["microbiological_results"]["Row"];
export type EffluentResults = Tables["effluent_results"]["Row"];
export type IrrigationResults = Tables["irrigation_results"]["Row"];
export type BoreholeResults = Tables["borehole_results"]["Row"];

// Combine certificate and results for form values
export interface FormValues {
  // Optional ID for editing existing certificates
  id?: string | undefined;

  // Certificate metadata
  certificate_id: string;
  certificate_type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole";
  sample_id?: string;
  description_of_sample?: string;
  sample_source?: string;
  submitted_by?: string;
  customer_contact?: string;
  sampled_by?: string;
  date_of_report?: string;
  date_of_sampling?: string;
  date_sample_received?: string;
  date_of_analysis?: string;
  date_of_report_issue?: string;
  comments?: string;
  status?: "draft" | "final";

  // Physical Tests
  ph_result?: number;
  ph_remark?: string;
  turbidity_result?: number;
  turbidity_remark?: string;
  color_result?: string;
  color_remark?: string;
  tss_result?: string;
  tss_remark?: string;
  tds_result?: number;
  tds_remark?: string;
  conductivity_result?: number;
  conductivity_remark?: string;

  // Chemical Tests (Anions)
  ph_alkalinity_result?: number;
  ph_alkalinity_remark?: string;
  total_alkalinity_result?: number;
  total_alkalinity_remark?: string;
  chloride_result?: number;
  chloride_remark?: string;
  fluoride_result?: number;
  fluoride_remark?: string;
  sulfate_result?: number;
  sulfate_remark?: string;
  nitrate_result?: number;
  nitrate_remark?: string;
  nitrite_result?: number;
  nitrite_remark?: string;
  phosphate_result?: number;
  phosphate_remark?: string;
  sulfide_result?: number;
  sulfide_remark?: string;

  // Chemical Tests (Cations)
  potassium_result?: number;
  potassium_remark?: string;
  sodium_result?: number;
  sodium_remark?: string;
  calcium_result?: number;
  calcium_remark?: string;
  magnesium_result?: number;
  magnesium_remark?: string;
  iron_result?: number;
  iron_remark?: string;
  manganese_result?: number;
  manganese_remark?: string;
  ammonia_result?: number;
  ammonia_remark?: string;
  copper_result?: number;
  copper_remark?: string;
  zinc_result?: number;
  zinc_remark?: string;
  chromium_result?: number;
  chromium_remark?: string;
  free_carbon_result?: number;
  free_carbon_remark?: string;

  // Other Parameters
  total_hardness_result?: number;
  total_hardness_remark?: string;
  calcium_hardness_result?: number;
  calcium_hardness_remark?: string;
  magnesium_hardness_result?: number;
  magnesium_hardness_remark?: string;
  silica_result?: number;
  silica_remark?: string;
  free_chlorine_result?: number;
  free_chlorine_remark?: string;

  // Microbiological Parameters
  total_viable_counts_result?: string;
  total_viable_counts_remark?: string;
  coliforms_mpn_result?: string;
  coliforms_mpn_remark?: string;
  ecoli_mpn_result?: string;
  ecoli_mpn_remark?: string;
  faecal_coliforms_mpn_result?: string;
  faecal_coliforms_mpn_remark?: string;

  // Effluent Parameters
  // Physical Parameters
  effluent_ph_result?: number;
  effluent_ph_remark?: string;
  effluent_temperature_result?: number;
  effluent_temperature_remark?: string;
  effluent_tss_result?: number;
  effluent_tss_remark?: string;
  effluent_tds_result?: number;
  effluent_tds_remark?: string;
  effluent_color_result?: string;
  effluent_color_remark?: string;
  // Chemical Parameters
  effluent_bod_result?: number;
  effluent_bod_remark?: string;
  effluent_cod_result?: number;
  effluent_cod_remark?: string;
  effluent_total_nitrogen_result?: number;
  effluent_total_nitrogen_remark?: string;
  effluent_total_phosphorus_result?: number;
  effluent_total_phosphorus_remark?: string;
  effluent_oil_grease_result?: number;
  effluent_oil_grease_remark?: string;
  effluent_detergents_result?: number;
  effluent_detergents_remark?: string;
  effluent_chloride_result?: number;
  effluent_chloride_remark?: string;
  effluent_fluoride_result?: number;
  effluent_fluoride_remark?: string;
  effluent_sulphide_result?: number;
  effluent_sulphide_remark?: string;
  effluent_phenols_result?: number;
  effluent_phenols_remark?: string;
  effluent_hexane_veg_result?: number;
  effluent_hexane_veg_remark?: string;
  effluent_hexane_mineral_result?: number;
  effluent_hexane_mineral_remark?: string;
  // Heavy Metals
  effluent_arsenic_result?: number;
  effluent_arsenic_remark?: string;
  effluent_boron_result?: number;
  effluent_boron_remark?: string;
  effluent_cadmium_result?: number;
  effluent_cadmium_remark?: string;
  effluent_chromium_vi_result?: number;
  effluent_chromium_vi_remark?: string;
  effluent_copper_result?: number;
  effluent_copper_remark?: string;
  effluent_iron_result?: number;
  effluent_iron_remark?: string;
  effluent_lead_result?: number;
  effluent_lead_remark?: string;
  effluent_manganese_result?: number;
  effluent_manganese_remark?: string;
  effluent_mercury_result?: number;
  effluent_mercury_remark?: string;
  effluent_nickel_result?: number;
  effluent_nickel_remark?: string;
  effluent_selenium_result?: number;
  effluent_selenium_remark?: string;
  effluent_zinc_result?: number;
  effluent_zinc_remark?: string;
  // Organic Compounds
  effluent_111_trichloroethane_result?: number;
  effluent_111_trichloroethane_remark?: string;
  effluent_112_trichloroethane_result?: number;
  effluent_112_trichloroethane_remark?: string;
  effluent_11_dichloroethylene_result?: number;
  effluent_11_dichloroethylene_remark?: string;
  effluent_12_dichloroethane_result?: number;
  effluent_12_dichloroethane_remark?: string;
  effluent_13_dichloropropene_result?: number;
  effluent_13_dichloropropene_remark?: string;
  effluent_benzene_result?: number;
  effluent_benzene_remark?: string;
  effluent_carbon_tetrachloride_result?: number;
  effluent_carbon_tetrachloride_remark?: string;
  effluent_cis_12_dichloroethylene_result?: number;
  effluent_cis_12_dichloroethylene_remark?: string;
  effluent_dichloromethane_result?: number;
  effluent_dichloromethane_remark?: string;
  effluent_simazine_result?: number;
  effluent_simazine_remark?: string;
  effluent_tetrachloroethylene_result?: number;
  effluent_tetrachloroethylene_remark?: string;
  effluent_thiobencarb_result?: number;
  effluent_thiobencarb_remark?: string;
  effluent_thiram_result?: number;
  effluent_thiram_remark?: string;
  effluent_trichloroethylene_result?: number;
  effluent_trichloroethylene_remark?: string;
  // Microbiological Parameters
  effluent_ecoli_result?: string;
  effluent_ecoli_remark?: string;
  effluent_total_coliforms_result?: string;
  effluent_total_coliforms_remark?: string;

  // Irrigation Parameters
  irrigation_ph_result?: number;
  irrigation_ph_remark?: string;
  irrigation_aluminium_result?: number;
  irrigation_aluminium_remark?: string;
  irrigation_arsenic_result?: number;
  irrigation_arsenic_remark?: string;
  irrigation_boron_result?: number;
  irrigation_boron_remark?: string;
  irrigation_cadmium_result?: number;
  irrigation_cadmium_remark?: string;
  irrigation_chloride_result?: number;
  irrigation_chloride_remark?: string;
  irrigation_chromium_result?: number;
  irrigation_chromium_remark?: string;
  irrigation_cobalt_result?: number;
  irrigation_cobalt_remark?: string;
  irrigation_copper_result?: number;
  irrigation_copper_remark?: string;
  irrigation_ecoli_result?: string;
  irrigation_ecoli_remark?: string;
  irrigation_fluoride_result?: number;
  irrigation_fluoride_remark?: string;
  irrigation_iron_result?: number;
  irrigation_iron_remark?: string;
  irrigation_lead_result?: number;
  irrigation_lead_remark?: string;
  irrigation_selenium_result?: number;
  irrigation_selenium_remark?: string;
  irrigation_sar_result?: number;
  irrigation_sar_remark?: string;
  irrigation_tds_result?: number;
  irrigation_tds_remark?: string;
  irrigation_zinc_result?: number;
  irrigation_zinc_remark?: string;

  // Borehole Parameters
  // Physical Tests
  borehole_ph_result?: number;
  borehole_ph_remark?: string;
  borehole_turbidity_result?: number;
  borehole_turbidity_remark?: string;
  borehole_color_result?: string;
  borehole_color_remark?: string;
  borehole_tss_result?: string;
  borehole_tss_remark?: string;
  borehole_tds_result?: number;
  borehole_tds_remark?: string;
  borehole_conductivity_result?: number;
  borehole_conductivity_remark?: string;
  // Chemical Tests (Anions)
  borehole_fluoride_result?: number;
  borehole_fluoride_remark?: string;
  // Chemical Tests (Cations)
  borehole_calcium_result?: string;
  borehole_calcium_remark?: string;
  borehole_magnesium_result?: string;
  borehole_magnesium_remark?: string;
  borehole_iron_result?: number;
  borehole_iron_remark?: string;
  borehole_manganese_result?: number;
  borehole_manganese_remark?: string;
  // Other Parameters
  borehole_total_hardness_result?: string;
  borehole_total_hardness_remark?: string;
  borehole_calcium_hardness_result?: string;
  borehole_calcium_hardness_remark?: string;
  borehole_magnesium_hardness_result?: string;
  borehole_magnesium_hardness_remark?: string;
}

// Extend TestParameter to include form-specific metadata
export interface TestParameterWithMeta<T = any> extends TestParameter<T> {
  id: string;
  type: "text" | "number";
  category: string;
  severity?: "low" | "medium" | "high";
}

// Helper function to get parameters by category
export function getParametersByCategory(
  category: string
): TestParameterWithMeta<PhysicalChemicalResults>[] {
  return []; // This will be populated with actual parameters
}
