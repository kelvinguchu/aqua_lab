"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export async function createCertificate(data: FormValues) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        error: "Unauthorized. Please sign in to create certificates.",
        data: null,
      };
    }

    // Format dates for database (YYYY-MM-DD)
    const formatDatabaseDate = (date: Date) => format(date, "yyyy-MM-dd");

    // Prepare certificate data
    const certificateData = {
      certificate_id: data.certificate_id,
      sample_id: data.sample_id,
      description_of_sample: data.description_of_sample,
      sample_source: data.sample_source,
      submitted_by: data.submitted_by,
      customer_contact: data.customer_contact,
      sampled_by: data.sampled_by,
      date_of_report: formatDatabaseDate(data.date_of_report),
      date_of_sampling: formatDatabaseDate(data.date_of_sampling),
      date_sample_received: formatDatabaseDate(data.date_sample_received),
      date_of_analysis: formatDatabaseDate(data.date_of_analysis),
      date_of_report_issue: formatDatabaseDate(data.date_of_report_issue),

      // Physical Tests
      ph_result: data.ph_result || null,
      ph_remark: data.ph_remark || null,
      turbidity_result: data.turbidity_result || null,
      turbidity_remark: data.turbidity_remark || null,
      color_result: data.color_result || null,
      color_remark: data.color_remark || null,
      tss_result: data.tss_result || null,
      tss_remark: data.tss_remark || null,
      tds_result: data.tds_result || null,
      tds_remark: data.tds_remark || null,
      conductivity_result: data.conductivity_result || null,
      conductivity_remark: data.conductivity_remark || null,

      // Chemical Tests (Anions)
      ph_alkalinity_result: data.ph_alkalinity_result || null,
      ph_alkalinity_remark: data.ph_alkalinity_remark || null,
      total_alkalinity_result: data.total_alkalinity_result || null,
      total_alkalinity_remark: data.total_alkalinity_remark || null,
      chloride_result: data.chloride_result || null,
      chloride_remark: data.chloride_remark || null,
      fluoride_result: data.fluoride_result || null,
      fluoride_remark: data.fluoride_remark || null,
      sulfate_result: data.sulfate_result || null,
      sulfate_remark: data.sulfate_remark || null,
      nitrate_result: data.nitrate_result || null,
      nitrate_remark: data.nitrate_remark || null,
      nitrite_result: data.nitrite_result || null,
      nitrite_remark: data.nitrite_remark || null,
      phosphate_result: data.phosphate_result || null,
      phosphate_remark: data.phosphate_remark || null,
      sulfide_result: data.sulfide_result || null,
      sulfide_remark: data.sulfide_remark || null,

      // Chemical Tests (Cations)
      potassium_result: data.potassium_result || null,
      potassium_remark: data.potassium_remark || null,
      calcium_result: data.calcium_result || null,
      calcium_remark: data.calcium_remark || null,
      magnesium_result: data.magnesium_result || null,
      magnesium_remark: data.magnesium_remark || null,
      iron_result: data.iron_result || null,
      iron_remark: data.iron_remark || null,
      manganese_result: data.manganese_result || null,
      manganese_remark: data.manganese_remark || null,
      ammonia_result: data.ammonia_result || null,
      ammonia_remark: data.ammonia_remark || null,
      copper_result: data.copper_result || null,
      copper_remark: data.copper_remark || null,
      zinc_result: data.zinc_result || null,
      zinc_remark: data.zinc_remark || null,
      chromium_result: data.chromium_result || null,
      chromium_remark: data.chromium_remark || null,

      // Other Parameters
      total_hardness_result: data.total_hardness_result || null,
      total_hardness_remark: data.total_hardness_remark || null,
      calcium_hardness_result: data.calcium_hardness_result || null,
      calcium_hardness_remark: data.calcium_hardness_remark || null,
      magnesium_hardness_result: data.magnesium_hardness_result || null,
      magnesium_hardness_remark: data.magnesium_hardness_remark || null,
      silica_result: data.silica_result || null,
      silica_remark: data.silica_remark || null,
      free_chlorine_result: data.free_chlorine_result || null,
      free_chlorine_remark: data.free_chlorine_remark || null,

      // Microbiological Tests
      total_viable_counts_result: data.total_viable_counts_result || "ND",
      total_viable_counts_remark: data.total_viable_counts_remark || "PASS",
      coliforms_mpn_result: data.coliforms_mpn_result || "ND",
      coliforms_mpn_remark: data.coliforms_mpn_remark || "PASS",
      ecoli_mpn_result: data.ecoli_mpn_result || "ND",
      ecoli_mpn_remark: data.ecoli_mpn_remark || "PASS",
      faecal_coliforms_mpn_result: data.faecal_coliforms_mpn_result || "ND",
      faecal_coliforms_mpn_remark: data.faecal_coliforms_mpn_remark || "PASS",

      // Metadata
      comments: data.comments || null,
      status: "draft" as const,
      created_at: new Date().toISOString(),
    };

    // Save to database
    const { error: saveError } = await supabase
      .from("certificates")
      .insert([certificateData]);

    if (saveError) {
      throw new Error(`Failed to save certificate: ${saveError.message}`);
    }

    return {
      error: null,
      data: certificateData,
    };
  } catch (error) {
    console.error("Error in createCertificate:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
}
