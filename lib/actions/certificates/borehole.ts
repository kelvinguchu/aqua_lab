"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  prepareCertificateData,
  handleError,
  CertificateResponse,
} from "./base";

export async function submitBoreholeForm(
  data: FormValues
): Promise<CertificateResponse> {
  try {
    console.log("=== Starting submitBoreholeForm ===");
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
    const certificateData = await prepareCertificateData(data, "borehole");

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
      // First get the certificate_id and existing data from borehole_results
      console.log("Fetching existing borehole result...");
      const { data: boreholeResult, error: boreholeError } = await supabase
        .from("borehole_results")
        .select("*, certificates(*)")
        .eq("id", data.id)
        .single();

      if (boreholeError || !boreholeResult) {
        console.error("Error fetching borehole result:", boreholeError);
        throw new Error(
          `Failed to fetch borehole result: ${boreholeError?.message}`
        );
      }

      console.log("Found existing borehole result:", {
        result_id: boreholeResult.id,
        certificate_id: boreholeResult.certificate_id,
        certificate_data: boreholeResult.certificates,
      });

      // Update existing certificate
      console.log("Updating certificate with data:", {
        certificate_id: certificateData.certificate_id,
        update_target_id: boreholeResult.certificate_id,
        data_keys: Object.keys(certificateData),
      });
      const { data: updatedCertificate, error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", boreholeResult.certificate_id)
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
      // Physical Tests
      borehole_ph_result: data.borehole_ph_result || null,
      borehole_ph_remark: data.borehole_ph_remark || null,
      borehole_turbidity_result: data.borehole_turbidity_result || null,
      borehole_turbidity_remark: data.borehole_turbidity_remark || null,
      borehole_color_result: data.borehole_color_result || null,
      borehole_color_remark: data.borehole_color_remark || null,
      borehole_tss_result: data.borehole_tss_result || null,
      borehole_tss_remark: data.borehole_tss_remark || null,
      borehole_tds_result: data.borehole_tds_result || null,
      borehole_tds_remark: data.borehole_tds_remark || null,
      borehole_conductivity_result: data.borehole_conductivity_result || null,
      borehole_conductivity_remark: data.borehole_conductivity_remark || null,
      // Chemical Tests (Anions)
      borehole_fluoride_result: data.borehole_fluoride_result || null,
      borehole_fluoride_remark: data.borehole_fluoride_remark || null,
      // Chemical Tests (Cations)
      borehole_calcium_result: data.borehole_calcium_result || null,
      borehole_calcium_remark: data.borehole_calcium_remark || null,
      borehole_magnesium_result: data.borehole_magnesium_result || null,
      borehole_magnesium_remark: data.borehole_magnesium_remark || null,
      borehole_iron_result: data.borehole_iron_result || null,
      borehole_iron_remark: data.borehole_iron_remark || null,
      borehole_manganese_result: data.borehole_manganese_result || null,
      borehole_manganese_remark: data.borehole_manganese_remark || null,
      // Other Parameters
      borehole_total_hardness_result:
        data.borehole_total_hardness_result || null,
      borehole_total_hardness_remark:
        data.borehole_total_hardness_remark || null,
      borehole_calcium_hardness_result:
        data.borehole_calcium_hardness_result || null,
      borehole_calcium_hardness_remark:
        data.borehole_calcium_hardness_remark || null,
      borehole_magnesium_hardness_result:
        data.borehole_magnesium_hardness_result || null,
      borehole_magnesium_hardness_remark:
        data.borehole_magnesium_hardness_remark || null,
    };

    console.log("Preparing to save borehole results:", {
      certificate_id: resultsData.certificate_id,
      has_ph: !!resultsData.borehole_ph_result,
      has_turbidity: !!resultsData.borehole_turbidity_result,
    });

    let resultsError;
    if (data.id) {
      console.log("Updating existing results for ID:", data.id);
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("borehole_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      console.log("Creating new results");
      // Create new results
      ({ error: resultsError } = await supabase
        .from("borehole_results")
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

    console.log("=== Successfully completed submitBoreholeForm ===");
    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    console.error("=== Error in submitBoreholeForm ===", error);
    return handleError(error, "submitBoreholeForm");
  }
}
