"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  prepareCertificateData,
  handleError,
  CertificateResponse,
} from "./base";

export async function submitMicrobiologicalForm(
  data: FormValues
): Promise<CertificateResponse> {
  try {
    console.log("=== Starting submitMicrobiologicalForm ===");
    console.log("Received form data:", {
      certificate_id: data.certificate_id,
      id: data.id,
      sample_id: data.sample_id,
      // Log other relevant fields but avoid sensitive data
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
    const certificateData = await prepareCertificateData(
      data,
      "microbiological"
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
      // First get the certificate_id and existing data from microbiological_results
      console.log("Fetching existing microbiological result...");
      const { data: microbiologicalResult, error: microbiologicalError } =
        await supabase
          .from("microbiological_results")
          .select("*, certificates(*)")
          .eq("id", data.id)
          .single();

      if (microbiologicalError || !microbiologicalResult) {
        console.error(
          "Error fetching microbiological result:",
          microbiologicalError
        );
        throw new Error(
          `Failed to fetch microbiological result: ${microbiologicalError?.message}`
        );
      }

      console.log("Found existing microbiological result:", {
        result_id: microbiologicalResult.id,
        certificate_id: microbiologicalResult.certificate_id,
        certificate_data: microbiologicalResult.certificates,
      });

      // Update existing certificate
      console.log("Updating certificate with data:", {
        certificate_id: certificateData.certificate_id,
        update_target_id: microbiologicalResult.certificate_id,
        data_keys: Object.keys(certificateData),
      });
      const { data: updatedCertificate, error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", microbiologicalResult.certificate_id)
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
      total_viable_counts_result: data.total_viable_counts_result || null,
      total_viable_counts_remark: data.total_viable_counts_remark || null,
      coliforms_mpn_result: data.coliforms_mpn_result || null,
      coliforms_mpn_remark: data.coliforms_mpn_remark || null,
      ecoli_mpn_result: data.ecoli_mpn_result || null,
      ecoli_mpn_remark: data.ecoli_mpn_remark || null,
      faecal_coliforms_mpn_result: data.faecal_coliforms_mpn_result || null,
      faecal_coliforms_mpn_remark: data.faecal_coliforms_mpn_remark || null,
    };

    console.log("Preparing to save microbiological results:", {
      certificate_id: resultsData.certificate_id,
      has_total_viable_counts: !!resultsData.total_viable_counts_result,
      has_coliforms: !!resultsData.coliforms_mpn_result,
    });

    let resultsError;
    if (data.id) {
      console.log("Updating existing results for ID:", data.id);
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("microbiological_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      console.log("Creating new results");
      // Create new results
      ({ error: resultsError } = await supabase
        .from("microbiological_results")
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

    console.log("=== Successfully completed submitMicrobiologicalForm ===");
    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    console.error("=== Error in submitMicrobiologicalForm ===", error);
    return handleError(error, "submitMicrobiologicalForm");
  }
}
