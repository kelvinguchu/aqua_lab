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



    let savedCertificate;

    if (data.id) {
      // First get the certificate_id and existing data from microbiological_results
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


      // Update existing certificate
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
      total_viable_counts_result: data.total_viable_counts_result || null,
      total_viable_counts_remark: data.total_viable_counts_remark || null,
      coliforms_mpn_result: data.coliforms_mpn_result || null,
      coliforms_mpn_remark: data.coliforms_mpn_remark || null,
      ecoli_mpn_result: data.ecoli_mpn_result || null,
      ecoli_mpn_remark: data.ecoli_mpn_remark || null,
      faecal_coliforms_mpn_result: data.faecal_coliforms_mpn_result || null,
      faecal_coliforms_mpn_remark: data.faecal_coliforms_mpn_remark || null,
    };


    let resultsError;
    if (data.id) {
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("microbiological_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      // Create new results
      ({ error: resultsError } = await supabase
        .from("microbiological_results")
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
    console.error("=== Error in submitMicrobiologicalForm ===", error);
    return handleError(error, "submitMicrobiologicalForm");
  }
}
