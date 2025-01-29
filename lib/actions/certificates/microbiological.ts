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

type MicrobiologicalResults =
  Database["public"]["Tables"]["microbiological_results"]["Row"];

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

    // Prepare results data
    const resultsData: Partial<
      Omit<MicrobiologicalResults, "id" | "created_at">
    > = {
      total_viable_counts_result: data.total_viable_counts_result || null,
      total_viable_counts_remark: data.total_viable_counts_remark || null,
      coliforms_mpn_result: data.coliforms_mpn_result || null,
      coliforms_mpn_remark: data.coliforms_mpn_remark || null,
      ecoli_mpn_result: data.ecoli_mpn_result || null,
      ecoli_mpn_remark: data.ecoli_mpn_remark || null,
      faecal_coliforms_mpn_result: data.faecal_coliforms_mpn_result || null,
      faecal_coliforms_mpn_remark: data.faecal_coliforms_mpn_remark || null,
    };

    let savedCertificate;

    if (data.id) {
      // Update existing certificate
      const updateResult = await updateCertificate(
        supabase,
        data,
        "microbiological"
      );
      savedCertificate = updateResult.certificate;

      // Update results using the certificate's UUID
      await updateResults(
        supabase,
        resultsData,
        "microbiological_results",
        savedCertificate.id
      );
    } else {
      // Create new certificate
      const createResult = await createCertificate(
        supabase,
        data,
        "microbiological"
      );
      savedCertificate = createResult.certificate;

      // Create new results with the certificate's UUID
      resultsData.certificate_id = savedCertificate.id;
      await createResults(supabase, resultsData, "microbiological_results");
    }

    return {
      error: null,
      data: savedCertificate,
    };
  } catch (error) {
    return handleError(error, "submitMicrobiologicalForm");
  }
}
