"use server";

import { createClient } from "@/lib/supabase/server";
import { updateCertificateStatus } from "./base";
import { handleError } from "./base";

export async function toggleCertificateArchiveStatus(
  certificateId: string,
  currentStatus: "draft" | "published" | "archived"
) {
  try {
    const supabase = await createClient();

    // If currently archived, change to draft, otherwise archive
    const newStatus = currentStatus === "archived" ? "draft" : "archived";

    const result = await updateCertificateStatus(
      supabase,
      certificateId,
      newStatus
    );

    return {
      error: null,
      data: result.certificate,
    };
  } catch (error) {
    return handleError(error, "toggleCertificateArchiveStatus");
  }
}

export async function publishCertificate(
  certificateId: string,
  currentStatus: "draft" | "published" | "archived"
) {
  try {
    // Only draft certificates can be published
    if (currentStatus !== "draft") {
      throw new Error("Only draft certificates can be published");
    }

    const supabase = await createClient();
    const result = await updateCertificateStatus(
      supabase,
      certificateId,
      "published"
    );

    return {
      error: null,
      data: result.certificate,
    };
  } catch (error) {
    return handleError(error, "publishCertificate");
  }
}
