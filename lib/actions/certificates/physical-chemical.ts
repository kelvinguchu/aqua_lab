"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  prepareCertificateData,
  handleError,
  CertificateResponse,
} from "./base";

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

    const certificateData = await prepareCertificateData(
      data,
      "physical_chemical"
    );

    // Validate the prepared data
    if (!certificateData || !certificateData.certificate_id) {
      console.error(
        "Invalid certificate data after preparation:",
        certificateData
      );
      return {
        error: "Failed to prepare certificate data - missing required fields",
        data: null,
      };
    }

    let savedCertificate;

    if (data.id) {
      // First get the certificate_id and existing data from physical_chemical_results
      const { data: physicalChemicalResult, error: physicalChemicalError } =
        await supabase
          .from("physical_chemical_results")
          .select("*, certificates(*)")
          .eq("id", data.id)
          .single();

      if (physicalChemicalError || !physicalChemicalResult) {
        console.error(
          "Error fetching physical chemical result:",
          physicalChemicalError
        );
        throw new Error(
          `Failed to fetch physical chemical result: ${physicalChemicalError?.message}`
        );
      }

      // Update existing certificate    
      const { data: updatedCertificate, error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", physicalChemicalResult.certificate_id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating certificate:", updateError);
        throw new Error(`Failed to update certificate: ${updateError.message}`);
      }


      savedCertificate = updatedCertificate;
    } else {
      // Create new certificate
      const { data: newCertificate, error: saveError } = await supabase
        .from("certificates")
        .insert([certificateData])
        .select()
        .single();

      if (saveError || !newCertificate) {
        console.error("Error saving new certificate:", saveError);
        throw new Error(`Failed to save certificate: ${saveError?.message}`);
      }


      savedCertificate = newCertificate;
    }

    if (!savedCertificate) {
      console.error("No certificate data after save/update");
      throw new Error("Failed to save/update certificate");
    }

    // Prepare results data
    const resultsData = {
      certificate_id: savedCertificate.id,
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
      sodium_result: data.sodium_result || null,
      sodium_remark: data.sodium_remark || null,
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
    };


    let resultsError;
    if (data.id) {
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("physical_chemical_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      // Create new results
      ({ error: resultsError } = await supabase
        .from("physical_chemical_results")
        .insert([resultsData]));
    }

    if (resultsError) {
      console.error("Error saving/updating results:", resultsError);
      // If results save/update fails and this was a new certificate, delete it
      if (!data.id) {
        await supabase
          .from("certificates")
          .delete()
          .eq("id", savedCertificate.id);
      }
      throw new Error(`Failed to save/update results: ${resultsError.message}`);
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    console.error("=== Error in submitPhysicalChemicalForm ===", error);
    return handleError(error, "submitPhysicalChemicalForm");
  }
}
