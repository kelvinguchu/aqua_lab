"use server";

import { FormValues } from "@/components/certificates/form/types";
import { createClient } from "@/lib/supabase/server";
import { format, parseISO } from "date-fns";

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
