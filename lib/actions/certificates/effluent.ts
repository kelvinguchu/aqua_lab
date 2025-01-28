"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUserAuthorization,
  prepareCertificateData,
  handleError,
  CertificateResponse,
} from "./base";

export async function submitEffluentForm(
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

    const certificateData = await prepareCertificateData(data, "effluent");

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
      // First get the certificate_id and existing data from effluent_results
      const { data: effluentResult, error: effluentError } = await supabase
        .from("effluent_results")
        .select("*, certificates(*)")
        .eq("id", data.id)
        .single();

      if (effluentError || !effluentResult) {
        console.error("Error fetching effluent result:", effluentError);
        throw new Error(
          `Failed to fetch effluent result: ${effluentError?.message}`
        );
      }


      // Update existing certificate
      const { data: updatedCertificate, error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", effluentResult.certificate_id)
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
      // Physical Parameters
      effluent_ph_result: data.effluent_ph_result || null,
      effluent_ph_remark: data.effluent_ph_remark || null,
      effluent_temperature_result: data.effluent_temperature_result || null,
      effluent_temperature_remark: data.effluent_temperature_remark || null,
      effluent_tss_result: data.effluent_tss_result || null,
      effluent_tss_remark: data.effluent_tss_remark || null,
      effluent_tds_result: data.effluent_tds_result || null,
      effluent_tds_remark: data.effluent_tds_remark || null,
      effluent_color_result: data.effluent_color_result || null,
      effluent_color_remark: data.effluent_color_remark || null,
      // Chemical Parameters
      effluent_bod_result: data.effluent_bod_result || null,
      effluent_bod_remark: data.effluent_bod_remark || null,
      effluent_cod_result: data.effluent_cod_result || null,
      effluent_cod_remark: data.effluent_cod_remark || null,
      effluent_total_nitrogen_result:
        data.effluent_total_nitrogen_result || null,
      effluent_total_nitrogen_remark:
        data.effluent_total_nitrogen_remark || null,
      effluent_total_phosphorus_result:
        data.effluent_total_phosphorus_result || null,
      effluent_total_phosphorus_remark:
        data.effluent_total_phosphorus_remark || null,
      effluent_oil_grease_result: data.effluent_oil_grease_result || null,
      effluent_oil_grease_remark: data.effluent_oil_grease_remark || null,
      effluent_detergents_result: data.effluent_detergents_result || null,
      effluent_detergents_remark: data.effluent_detergents_remark || null,
      effluent_chloride_result: data.effluent_chloride_result || null,
      effluent_chloride_remark: data.effluent_chloride_remark || null,
      effluent_fluoride_result: data.effluent_fluoride_result || null,
      effluent_fluoride_remark: data.effluent_fluoride_remark || null,
      effluent_sulphide_result: data.effluent_sulphide_result || null,
      effluent_sulphide_remark: data.effluent_sulphide_remark || null,
      effluent_phenols_result: data.effluent_phenols_result || null,
      effluent_phenols_remark: data.effluent_phenols_remark || null,
      effluent_hexane_veg_result: data.effluent_hexane_veg_result || null,
      effluent_hexane_veg_remark: data.effluent_hexane_veg_remark || null,
      effluent_hexane_mineral_result:
        data.effluent_hexane_mineral_result || null,
      effluent_hexane_mineral_remark:
        data.effluent_hexane_mineral_remark || null,
      // Heavy Metals
      effluent_arsenic_result: data.effluent_arsenic_result || null,
      effluent_arsenic_remark: data.effluent_arsenic_remark || null,
      effluent_boron_result: data.effluent_boron_result || null,
      effluent_boron_remark: data.effluent_boron_remark || null,
      effluent_cadmium_result: data.effluent_cadmium_result || null,
      effluent_cadmium_remark: data.effluent_cadmium_remark || null,
      effluent_chromium_vi_result: data.effluent_chromium_vi_result || null,
      effluent_chromium_vi_remark: data.effluent_chromium_vi_remark || null,
      effluent_copper_result: data.effluent_copper_result || null,
      effluent_copper_remark: data.effluent_copper_remark || null,
      effluent_iron_result: data.effluent_iron_result || null,
      effluent_iron_remark: data.effluent_iron_remark || null,
      effluent_lead_result: data.effluent_lead_result || null,
      effluent_lead_remark: data.effluent_lead_remark || null,
      effluent_manganese_result: data.effluent_manganese_result || null,
      effluent_manganese_remark: data.effluent_manganese_remark || null,
      effluent_mercury_result: data.effluent_mercury_result || null,
      effluent_mercury_remark: data.effluent_mercury_remark || null,
      effluent_nickel_result: data.effluent_nickel_result || null,
      effluent_nickel_remark: data.effluent_nickel_remark || null,
      effluent_selenium_result: data.effluent_selenium_result || null,
      effluent_selenium_remark: data.effluent_selenium_remark || null,
      effluent_zinc_result: data.effluent_zinc_result || null,
      effluent_zinc_remark: data.effluent_zinc_remark || null,
      // Organic Compounds
      effluent_111_trichloroethane_result:
        data.effluent_111_trichloroethane_result || null,
      effluent_111_trichloroethane_remark:
        data.effluent_111_trichloroethane_remark || null,
      effluent_112_trichloroethane_result:
        data.effluent_112_trichloroethane_result || null,
      effluent_112_trichloroethane_remark:
        data.effluent_112_trichloroethane_remark || null,
      effluent_11_dichloroethylene_result:
        data.effluent_11_dichloroethylene_result || null,
      effluent_11_dichloroethylene_remark:
        data.effluent_11_dichloroethylene_remark || null,
      effluent_12_dichloroethane_result:
        data.effluent_12_dichloroethane_result || null,
      effluent_12_dichloroethane_remark:
        data.effluent_12_dichloroethane_remark || null,
      effluent_13_dichloropropene_result:
        data.effluent_13_dichloropropene_result || null,
      effluent_13_dichloropropene_remark:
        data.effluent_13_dichloropropene_remark || null,
      effluent_benzene_result: data.effluent_benzene_result || null,
      effluent_benzene_remark: data.effluent_benzene_remark || null,
      effluent_carbon_tetrachloride_result:
        data.effluent_carbon_tetrachloride_result || null,
      effluent_carbon_tetrachloride_remark:
        data.effluent_carbon_tetrachloride_remark || null,
      effluent_cis_12_dichloroethylene_result:
        data.effluent_cis_12_dichloroethylene_result || null,
      effluent_cis_12_dichloroethylene_remark:
        data.effluent_cis_12_dichloroethylene_remark || null,
      effluent_dichloromethane_result:
        data.effluent_dichloromethane_result || null,
      effluent_dichloromethane_remark:
        data.effluent_dichloromethane_remark || null,
      effluent_simazine_result: data.effluent_simazine_result || null,
      effluent_simazine_remark: data.effluent_simazine_remark || null,
      effluent_tetrachloroethylene_result:
        data.effluent_tetrachloroethylene_result || null,
      effluent_tetrachloroethylene_remark:
        data.effluent_tetrachloroethylene_remark || null,
      effluent_thiobencarb_result: data.effluent_thiobencarb_result || null,
      effluent_thiobencarb_remark: data.effluent_thiobencarb_remark || null,
      effluent_thiram_result: data.effluent_thiram_result || null,
      effluent_thiram_remark: data.effluent_thiram_remark || null,
      effluent_trichloroethylene_result:
        data.effluent_trichloroethylene_result || null,
      effluent_trichloroethylene_remark:
        data.effluent_trichloroethylene_remark || null,
    };


    let resultsError;
    if (data.id) {
      // Update existing results
      ({ error: resultsError } = await supabase
        .from("effluent_results")
        .update(resultsData)
        .eq("id", data.id));
    } else {
      // Create new results
      ({ error: resultsError } = await supabase
        .from("effluent_results")
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
    console.error("=== Error in submitEffluentForm ===", error);
    return handleError(error, "submitEffluentForm");
  }
}
