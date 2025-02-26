"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import { format, parseISO } from "date-fns";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

export type CertificateType =
  | "effluent"
  | "borehole"
  | "microbiological"
  | "physical_chemical"
  | "irrigation";

// Shared utility function for date formatting
export const formatDatabaseDate = (dateStr: string | undefined) => {
  if (!dateStr) return null;
  try {
    return format(parseISO(dateStr), "yyyy-MM-dd");
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

// Base certificate data preparation
export const prepareCertificateData = async (
  data: FormValues,
  certificateType: string
) => {
  if (!data.certificate_id) {
    throw new Error("Certificate ID is required");
  }

  // Validate the input data
  if (
    typeof data.certificate_id !== "string" ||
    data.certificate_id.trim() === ""
  ) {
    console.error("Invalid certificate ID format:", data.certificate_id);
    throw new Error("Invalid certificate ID format");
  }

  // Format all dates
  const [
    dateOfReport,
    dateOfSampling,
    dateSampleReceived,
    dateOfAnalysis,
    dateOfReportIssue,
  ] = await Promise.all([
    formatDatabaseDate(data.date_of_report),
    formatDatabaseDate(data.date_of_sampling),
    formatDatabaseDate(data.date_sample_received),
    formatDatabaseDate(data.date_of_analysis),
    formatDatabaseDate(data.date_of_report_issue),
  ]);

  const preparedData = {
    certificate_id: data.certificate_id.trim(),
    sample_id: data.sample_id || null,
    certificate_type: certificateType,
    description_of_sample: data.description_of_sample || null,
    sample_source: data.sample_source || null,
    submitted_by: data.submitted_by || null,
    customer_contact: data.customer_contact || null,
    sampled_by: data.sampled_by || null,
    date_of_report: dateOfReport,
    date_of_sampling: dateOfSampling,
    date_sample_received: dateSampleReceived,
    date_of_analysis: dateOfAnalysis,
    date_of_report_issue: dateOfReportIssue,
    comments: data.comments || null,
    status: "draft" as const,
    // Add effluent_type if this is an effluent certificate
    ...(certificateType === "effluent" && {
      effluent_type: data.effluent_type || "environment",
    }),
  };

  // Validate the prepared data
  if (!preparedData.certificate_id) {
    console.error("Certificate ID is missing in prepared data");
    throw new Error(
      "Failed to prepare certificate data - missing certificate ID"
    );
  }

  return preparedData;
};

// Shared error handling for unauthorized access
export const checkUserAuthorization = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Unauthorized. Please sign in to create certificates.",
      data: null,
      user: null,
    };
  }

  return { error: null, data: null, user };
};

// Generic error response
export const handleError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  return {
    error: "An unexpected error occurred. Please try again.",
    data: null,
  };
};

// Types
export type CertificateResponse = {
  error: string | null;
  data: any | null;
};

// Base create function for certificates
export const createCertificate = async (
  supabase: any,
  data: FormValues,
  certificateType: string
) => {
  try {
    // Prepare certificate data
    const certificateData = await prepareCertificateData(data, certificateType);

    // Check if certificate with this ID already exists
    const { data: existingCertificate } = await supabase
      .from("certificates")
      .select("certificate_id")
      .eq("certificate_id", certificateData.certificate_id)
      .single();

    if (existingCertificate) {
      throw new Error(
        `Certificate with ID ${certificateData.certificate_id} already exists`
      );
    }

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

    return { certificate: newCertificate };
  } catch (error) {
    console.error(`Error in createCertificate for ${certificateType}:`, error);
    throw error;
  }
};

// Base create results function
export const createResults = async (
  supabase: any,
  resultsData: any,
  resultsTableName: string
) => {
  try {
    // Create new results
    const { error: resultsError } = await supabase
      .from(resultsTableName)
      .insert([resultsData]);

    if (resultsError) {
      console.error("Error saving results:", resultsError);
      throw new Error(`Failed to save results: ${resultsError.message}`);
    }

    return { error: null };
  } catch (error) {
    console.error(`Error in createResults for ${resultsTableName}:`, error);
    throw error;
  }
};

// Base update certificate function
export async function updateCertificate(
  supabase: SupabaseClient<Database>,
  data: any,
  type: CertificateType
) {
  try {
    const { data: existingCertificate, error: fetchError } = await supabase
      .from("certificates")
      .select("*")
      .eq("certificate_id", data.certificate_id)
      .single();

    if (fetchError) {
      throw new Error(`Certificate not found: ${fetchError.message}`);
    }

    // Prepare certificate data
    const certificateData = await prepareCertificateData(data, type);

    if (!existingCertificate) {
      throw new Error(
        `Certificate with ID ${certificateData.certificate_id} not found`
      );
    }

    // Update the certificate
    const { data: updatedCertificate, error: updateError } = await supabase
      .from("certificates")
      .update(certificateData)
      .eq("certificate_id", certificateData.certificate_id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating certificate:", updateError);
      throw new Error(`Failed to update certificate: ${updateError.message}`);
    }

    return { certificate: updatedCertificate };
  } catch (error) {
    throw error;
  }
}

// Base update results function
export const updateResults = async (
  supabase: any,
  resultsData: any,
  resultsTableName: string,
  certificateId: string // This is the UUID from certificates table
) => {
  try {
    // Update existing results
    const { error: resultsError } = await supabase
      .from(resultsTableName)
      .update(resultsData)
      .eq("certificate_id", certificateId);

    if (resultsError) {
      console.error("Error updating results:", resultsError);
      throw new Error(`Failed to update results: ${resultsError.message}`);
    }

    return { error: null };
  } catch (error) {
    console.error(`Error in updateResults for ${resultsTableName}:`, error);
    throw error;
  }
};

// Update certificate status
export async function updateCertificateStatus(
  supabase: SupabaseClient<Database>,
  certificateId: string,
  status: "draft" | "published" | "archived"
) {
  try {
    const { data: updatedCertificate, error: updateError } = await supabase
      .from("certificates")
      .update({ status })
      .eq("id", certificateId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating certificate status:", updateError);
      throw new Error(
        `Failed to update certificate status: ${updateError.message}`
      );
    }

    return { certificate: updatedCertificate };
  } catch (error) {
    console.error("Error in updateCertificateStatus:", error);
    throw error;
  }
}
