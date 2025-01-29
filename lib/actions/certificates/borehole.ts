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

type BoreholeResults = Database["public"]["Tables"]["borehole_results"]["Row"];

export async function submitBoreholeForm(
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
    const resultsData: Partial<Omit<BoreholeResults, "id" | "created_at">> = {
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

    let savedCertificate;

    if (data.id) {
      // Update existing certificate
      const updateResult = await updateCertificate(supabase, data, "borehole");
      savedCertificate = updateResult.certificate;

      // Update results using the certificate's UUID
      await updateResults(
        supabase,
        resultsData,
        "borehole_results",
        savedCertificate.id
      );
    } else {
      // Create new certificate
      const createResult = await createCertificate(supabase, data, "borehole");
      savedCertificate = createResult.certificate;

      // Create new results with the certificate's UUID
      resultsData.certificate_id = savedCertificate.id;
      await createResults(supabase, resultsData, "borehole_results");
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    return handleError(error, "submitBoreholeForm");
  }
}
