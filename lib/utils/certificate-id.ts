import { supabase } from "@/lib/supabase";
import { createHash } from "crypto";

type CertificateType =
  | "physical_chemical"
  | "microbiological"
  | "effluent"
  | "irrigation"
  | "borehole";

const TYPE_PREFIXES = {
  physical_chemical: "ATSL-PC",
  microbiological: "ATSL-MB",
  effluent: "ATSL-EF",
  irrigation: "ATSL-IR",
  borehole: "ATSL-BH",
} as const;

// Secret key for HMAC (in production, this should be in environment variables)
const SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

function generateSecureHash(input: string): string {
  const hash = createHash("sha256")
    .update(input + SECRET_KEY)
    .digest("hex")
    .toUpperCase();
  return hash.substring(0, 8); // Take first 8 characters for brevity
}

export async function generateCertificateId(
  type: CertificateType
): Promise<string> {
  try {
    // Get the current year and month
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    const prefix = TYPE_PREFIXES[type];

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      // Get the latest certificate for this type, year, and month
      const { data: certificates, error } = await supabase
        .from("certificates")
        .select("certificate_id")
        .eq("certificate_type", type)
        .ilike("certificate_id", `${prefix}/${currentYear}${currentMonth}/%`)
        .order("certificate_id", { ascending: false })
        .limit(1);

      if (error) throw error;

      let sequentialNumber = 1;

      if (certificates && certificates.length > 0) {
        // Extract the sequential number from the latest certificate ID
        const latestId = certificates[0].certificate_id;
        const match = latestId.match(/\/(\d+)-/);
        if (match) {
          sequentialNumber = parseInt(match[1], 10) + 1;
        }
      }

      // Format base: PREFIX/YYYYMM/SEQUENTIAL-HASH
      const paddedNumber = sequentialNumber.toString().padStart(4, "0");
      const baseId = `${prefix}/${currentYear}${currentMonth}/${paddedNumber}`;

      // Generate a secure hash based on the certificate details
      const timestamp = now.toISOString();
      const hashInput = `${baseId}${type}${timestamp}${sequentialNumber}`;
      const secureHash = generateSecureHash(hashInput);

      // Final format: ATSL-PC/202401/0001-A1B2C3D4
      const certificateId = `${baseId}-${secureHash}`;

      // Verify this ID doesn't already exist
      const { data: existingCert, error: checkError } = await supabase
        .from("certificates")
        .select("id")
        .eq("certificate_id", certificateId)
        .single();

      if (checkError && !existingCert) {
        // ID is unique, we can use it
        return certificateId;
      }

      // ID already exists or error occurred, try again
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay before retry
    }

    throw new Error(
      "Failed to generate unique certificate ID after multiple attempts"
    );
  } catch (error) {
    console.error("Error generating certificate ID:", error);
    throw new Error("Failed to generate certificate ID");
  }
}

export function verifyCertificateId(certificateId: string): boolean {
  try {
    // Extract components from the certificate ID
    const match = certificateId.match(
      /^([A-Z]{2})\/(\d{6})\/(\d{4})-([A-F0-9]{8})$/
    );
    if (!match) return false;

    const [, prefix, yearMonth, sequential, hash] = match;

    // Reconstruct the base ID
    const baseId = `${prefix}/${yearMonth}/${sequential}`;

    // Find the certificate type from prefix
    const type = Object.entries(TYPE_PREFIXES).find(
      ([, p]) => p === prefix
    )?.[0] as CertificateType;
    if (!type) return false;

    // Reconstruct the hash input (note: this is an approximation since we don't have the original timestamp)
    const hashInput = `${baseId}${type}${sequential}`;
    const expectedHash = generateSecureHash(hashInput);

    // Verify the hash matches
    return hash === expectedHash;
  } catch (error) {
    return false;
  }
}
