"use server";

import { createClient } from "@/lib/supabase/server";
import { handleError } from "./base";

export async function fetchCertificateResults(
  certificateId: string,
  type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole"
) {
  try {
    const supabase = await createClient();
    const tableName = `${type}_results`;

    const { data: results, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("certificate_id", certificateId)
      .single();

    if (error) {
      console.error(`Error fetching ${type} results:`, error);
      throw error;
    }

    return {
      error: null,
      data: results,
    };
  } catch (error) {
    return handleError(error, "fetchCertificateResults");
  }
}
