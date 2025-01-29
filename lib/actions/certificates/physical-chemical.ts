"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  handleError,
  CertificateResponse,
  updateCertificate,
  createCertificate,
  updateResults,
  createResults,
  CertificateType,
} from "./base";
import type { Database } from "@/lib/database.types";

type PhysicalChemicalResults =
  Database["public"]["Tables"]["physical_chemical_results"]["Row"];

// Helper function to convert number to string or null
const toStringOrNull = (value: number | null | undefined): string | null => {
  return value === undefined || value === null ? null : value.toString();
};

export async function submitPhysicalChemicalForm(
  data: FormValues
): Promise<CertificateResponse> {

  try {
    const supabase = await createClient();

    // Check user authorization
    const authResult = await checkUserAuthorization();
    if (authResult.error) {
      return authResult;
    }

    // Validate certificate ID
    if (!data.certificate_id) {
      return {
        error: "Certificate ID is required",
        data: null,
      };
    }

    // Prepare results data
    const resultsData: Partial<
      Omit<PhysicalChemicalResults, "id" | "created_at">
    > = {
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
      ph_alkalinity_result: toStringOrNull(data.ph_alkalinity_result),
      ph_alkalinity_remark: data.ph_alkalinity_remark || null,
      total_alkalinity_result: data.total_alkalinity_result || null,
      total_alkalinity_remark: data.total_alkalinity_remark || null,
      chloride_result: data.chloride_result || null,
      chloride_remark: data.chloride_remark || null,
      fluoride_result: data.fluoride_result || null,
      fluoride_remark: data.fluoride_remark || null,
      sulfate_result: toStringOrNull(data.sulfate_result),
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
      sodium_result: data.sodium_result || null,
      sodium_remark: data.sodium_remark || null,
      calcium_result: toStringOrNull(data.calcium_result),
      calcium_remark: data.calcium_remark || null,
      magnesium_result: toStringOrNull(data.magnesium_result),
      magnesium_remark: data.magnesium_remark || null,
      iron_result: data.iron_result || null,
      iron_remark: data.iron_remark || null,
      manganese_result: data.manganese_result || null,
      manganese_remark: data.manganese_remark || null,
      ammonia_result: toStringOrNull(data.ammonia_result),
      ammonia_remark: data.ammonia_remark || null,
      copper_result: data.copper_result || null,
      copper_remark: data.copper_remark || null,
      zinc_result: data.zinc_result || null,
      zinc_remark: data.zinc_remark || null,
      chromium_result: data.chromium_result || null,
      chromium_remark: data.chromium_remark || null,
      // Other Parameters
      total_hardness_result: toStringOrNull(data.total_hardness_result),
      total_hardness_remark: data.total_hardness_remark || null,
      calcium_hardness_result: toStringOrNull(data.calcium_hardness_result),
      calcium_hardness_remark: data.calcium_hardness_remark || null,
      magnesium_hardness_result: toStringOrNull(data.magnesium_hardness_result),
      magnesium_hardness_remark: data.magnesium_hardness_remark || null,
      silica_result: toStringOrNull(data.silica_result),
      silica_remark: data.silica_remark || null,
      free_chlorine_result: data.free_chlorine_result || null,
      free_chlorine_remark: data.free_chlorine_remark || null,
    };

    let savedCertificate;

    if (data.id) {
      // Update existing certificate
      const updateResult = await updateCertificate(
        supabase,
        data,
        "physical_chemical"
      );
      savedCertificate = updateResult.certificate;

      // Update results using the certificate's UUID
      await updateResults(
        supabase,
        resultsData,
        "physical_chemical_results",
        savedCertificate.id
      );
    } else {
      // Create new certificate
      const createResult = await createCertificate(
        supabase,
        data,
        "physical_chemical"
      );
      savedCertificate = createResult.certificate;

      // Create new results with the certificate's UUID
      resultsData.certificate_id = savedCertificate.id;
      await createResults(supabase, resultsData, "physical_chemical_results");
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    return handleError(error, "submitPhysicalChemicalForm");
  }
}
