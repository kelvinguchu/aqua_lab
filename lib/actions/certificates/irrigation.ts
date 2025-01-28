"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  prepareCertificateData,
  handleError,
  CertificateResponse,
} from "./base";

export async function submitIrrigationForm(
  data: FormValues
): Promise<CertificateResponse> {
  try {
    console.log("=== Starting submitIrrigationForm ===");
    console.log("Received form data:", {
      certificate_id: data.certificate_id,
      id: data.id,
      sample_id: data.sample_id,
    });

    const supabase = await createClient();

    // Check user authorization
    console.log("Checking user authorization...");
    const authResult = await checkUserAuthorization();
    if (authResult.error) {
      console.log("Authorization failed:", authResult.error);
      return authResult;
    }
    console.log("User authorization successful");

    // Validate certificate ID
    console.log("Validating certificate ID...");
    if (!data.certificate_id) {
      console.log("Certificate ID missing in form data");
      return {
        error: "Certificate ID is required",
        data: null,
      };
    }
    console.log("Certificate ID validation successful:", data.certificate_id);

    // Prepare base certificate data
    console.log("Preparing certificate data with:", {
      certificate_id: data.certificate_id,
      sample_id: data.sample_id,
      certificate_type: data.certificate_type,
      form_data_keys: Object.keys(data),
    });
    const certificateData = await prepareCertificateData(data, "irrigation");

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

    // Double check the data is valid before proceeding
    console.log("Validated prepared certificate data:", {
      certificate_id: certificateData.certificate_id,
      sample_id: certificateData.sample_id,
      certificate_type: certificateData.certificate_type,
      all_fields_present: Object.keys(certificateData).length > 0,
      raw_data: certificateData,
    });

    let savedCertificate;

    if (data.id) {
      console.log("Updating existing certificate with ID:", data.id);
      // First get the certificate_id and existing data from irrigation_results
      console.log("Fetching existing irrigation result...");
      const { data: irrigationResult, error: irrigationError } = await supabase
        .from("irrigation_results")
        .select("*, certificates(*)")
        .eq("id", data.id)
        .single();

      if (irrigationError || !irrigationResult) {
        console.error("Error fetching irrigation result:", irrigationError);
        throw new Error(
          `Failed to fetch irrigation result: ${irrigationError?.message}`
        );
      }

      console.log("Found existing irrigation result:", {
        result_id: irrigationResult.id,
        certificate_id: irrigationResult.certificate_id,
        certificate_data: irrigationResult.certificates,
      });

      // Update existing certificate
      console.log("Updating certificate with data:", {
        certificate_id: certificateData.certificate_id,
        update_target_id: irrigationResult.certificate_id,
        data_keys: Object.keys(certificateData),
      });
      const { data: updatedCertificate, error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", irrigationResult.certificate_id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating certificate:", updateError);
        throw new Error(`Failed to update certificate: ${updateError.message}`);
      }

      console.log("Successfully updated certificate:", {
        id: updatedCertificate?.id,
        certificate_id: updatedCertificate?.certificate_id,
      });

      savedCertificate = updatedCertificate;
    } else {
      console.log("Creating new certificate");
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

      console.log("Successfully created new certificate:", {
        id: newCertificate.id,
        certificate_id: newCertificate.certificate_id,
      });

      savedCertificate = newCertificate;
    }

    if (!savedCertificate) {
      console.error("No certificate data after save/update");
      throw new Error("Failed to save/update certificate");
    }

    // Prepare results data
    const resultsData = {
      certificate_id: savedCertificate.id,
      irrigation_ph_result: data.irrigation_ph_result || null,
      irrigation_ph_remark: data.irrigation_ph_remark || null,
      irrigation_aluminium_result: data.irrigation_aluminium_result || null,
      irrigation_aluminium_remark: data.irrigation_aluminium_remark || null,
      irrigation_arsenic_result: data.irrigation_arsenic_result || null,
      irrigation_arsenic_remark: data.irrigation_arsenic_remark || null,
      irrigation_boron_result: data.irrigation_boron_result || null,
      irrigation_boron_remark: data.irrigation_boron_remark || null,
      irrigation_cadmium_result: data.irrigation_cadmium_result || null,
      irrigation_cadmium_remark: data.irrigation_cadmium_remark || null,
      irrigation_chloride_result: data.irrigation_chloride_result || null,
      irrigation_chloride_remark: data.irrigation_chloride_remark || null,
      irrigation_chromium_result: data.irrigation_chromium_result || null,
      irrigation_chromium_remark: data.irrigation_chromium_remark || null,
      irrigation_cobalt_result: data.irrigation_cobalt_result || null,
      irrigation_cobalt_remark: data.irrigation_cobalt_remark || null,
      irrigation_copper_result: data.irrigation_copper_result || null,
      irrigation_copper_remark: data.irrigation_copper_remark || null,
      irrigation_ecoli_result: data.irrigation_ecoli_result || null,
      irrigation_ecoli_remark: data.irrigation_ecoli_remark || null,
      irrigation_fluoride_result: data.irrigation_fluoride_result || null,
      irrigation_fluoride_remark: data.irrigation_fluoride_remark || null,
      irrigation_iron_result: data.irrigation_iron_result || null,
      irrigation_iron_remark: data.irrigation_iron_remark || null,
      irrigation_lead_result: data.irrigation_lead_result || null,
      irrigation_lead_remark: data.irrigation_lead_remark || null,
      irrigation_selenium_result: data.irrigation_selenium_result || null,
      irrigation_selenium_remark: data.irrigation_selenium_remark || null,
      irrigation_sar_result: data.irrigation_sar_result || null,
      irrigation_sar_remark: data.irrigation_sar_remark || null,
      irrigation_tds_result: data.irrigation_tds_result || null,
      irrigation_tds_remark: data.irrigation_tds_remark || null,
      irrigation_zinc_result: data.irrigation_zinc_result || null,
      irrigation_zinc_remark: data.irrigation_zinc_remark || null,
    };

    console.log("Preparing to save irrigation results:", {
      certificate_id: resultsData.certificate_id,
      has_ph: !!resultsData.irrigation_ph_result,
      has_tds: !!resultsData.irrigation_tds_result,
    });

    let resultsError;
    if (data.id) {
      console.log("Updating existing results for ID:", data.id);
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("irrigation_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      console.log("Creating new results");
      // Create new results
      ({ error: resultsError } = await supabase
        .from("irrigation_results")
        .insert([resultsData]));
    }

    if (resultsError) {
      console.error("Error saving/updating results:", resultsError);
      // If results save/update fails and this was a new certificate, delete it
      if (!data.id) {
        console.log("Deleting certificate due to results save failure");
        await supabase
          .from("certificates")
          .delete()
          .eq("id", savedCertificate.id);
      }
      throw new Error(`Failed to save/update results: ${resultsError.message}`);
    }

    console.log("=== Successfully completed submitIrrigationForm ===");
    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    console.error("=== Error in submitIrrigationForm ===", error);
    return handleError(error, "submitIrrigationForm");
  }
}
