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
} from "./base";
import type { Database } from "@/lib/database.types";

type IrrigationResults =
  Database["public"]["Tables"]["irrigation_results"]["Row"];

export async function submitIrrigationForm(
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
    const resultsData: Partial<Omit<IrrigationResults, "id" | "created_at">> = {
      // Physical Parameters
      irrigation_ph_result: data.irrigation_ph_result || null,
      irrigation_ph_remark: data.irrigation_ph_remark || null,
      irrigation_tds_result: data.irrigation_tds_result || null,
      irrigation_tds_remark: data.irrigation_tds_remark || null,
      // Chemical Parameters
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
      irrigation_zinc_result: data.irrigation_zinc_result || null,
      irrigation_zinc_remark: data.irrigation_zinc_remark || null,
    };

    let savedCertificate;

    if (data.id) {
      // Update existing certificate
      const updateResult = await updateCertificate(
        supabase,
        data,
        "irrigation"
      );
      savedCertificate = updateResult.certificate;


      // Update results using the certificate's UUID
      await updateResults(
        supabase,
        resultsData,
        "irrigation_results",
        savedCertificate.id
      );
    } else {
      // Create new certificate
      const createResult = await createCertificate(
        supabase,
        data,
        "irrigation"
      );
      savedCertificate = createResult.certificate;

      // Create new results with the certificate's UUID
      resultsData.certificate_id = savedCertificate.id;
      await createResults(supabase, resultsData, "irrigation_results");
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    return handleError(error, "submitIrrigationForm");
  }
}
