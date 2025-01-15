import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Certificate } from "./supabase";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateCertificateId() {
  try {
    // Check if Supabase is properly initialized
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    // Get today's date in YYYYMMDD format
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");

    // Fetch certificates from today to get the latest sequence number
    const { data: certificates, error } = await supabase
      .from("certificates")
      .select("certificate_id")
      .like("certificate_id", `AQ-${dateStr}-%`)
      .order("certificate_id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Database error:", error.message);
      throw new Error("Failed to fetch last certificate");
    }

    let sequenceNumber = 1;

    if (certificates && certificates.length > 0) {
      const lastId = certificates[0].certificate_id;
      // Extract the sequence number from the last ID (format: AQ-YYYYMMDD-XXX)
      const match = lastId.match(/^AQ-\d{8}-(\d{3})$/);
      if (match) {
        sequenceNumber = parseInt(match[1]) + 1;
      }

      // If we reach 999, throw an error
      if (sequenceNumber > 999) {
        throw new Error("Maximum daily sequence number reached");
      }
    }

    // Format: AQ-YYYYMMDD-XXX (e.g., AQ-20240119-001)
    return `AQ-${dateStr}-${sequenceNumber.toString().padStart(3, "0")}`;
  } catch (error) {
    console.error("Error generating certificate ID:", error);
    throw error;
  }
}

export type TestParameter = {
  name: string;
  method: string;
  unit: string;
  standard: string;
  category: "physical" | "anions" | "cations" | "other";
  resultKey: keyof Certificate;
  remarkKey: keyof Certificate;
};

export const TEST_PARAMETERS: TestParameter[] = [
  // Physical Tests
  {
    name: "pH",
    method: "ASL/TM/HACH/8156",
    unit: "pH Units",
    standard: "6.5 - 8.5",
    category: "physical",
    resultKey: "ph_result",
    remarkKey: "ph_remark",
  },
  {
    name: "Turbidity",
    method: "ASL/TM/HACH/8195",
    unit: "NTU",
    standard: "< 5.0",
    category: "physical",
    resultKey: "turbidity_result",
    remarkKey: "turbidity_remark",
  },
  {
    name: "Color",
    method: "ASL/TM/HACH/8025",
    unit: "Pt. Co. APHA",
    standard: "15 TCU",
    category: "physical",
    resultKey: "color_result",
    remarkKey: "color_remark",
  },
  {
    name: "Total Suspended Solids",
    method: "ASL/TM/HACH/8006",
    unit: "mg/L",
    standard: "NIL",
    category: "physical",
    resultKey: "tss_result",
    remarkKey: "tss_remark",
  },
  {
    name: "Total Dissolved Solids",
    method: "ASL/TM/HACH/8169",
    unit: "mg/L",
    standard: "1000 Max.",
    category: "physical",
    resultKey: "tds_result",
    remarkKey: "tds_remark",
  },
  {
    name: "Conductivity",
    method: "ASL/TM/HACH/8169",
    unit: "µS/cm",
    standard: "1500",
    category: "physical",
    resultKey: "conductivity_result",
    remarkKey: "conductivity_remark",
  },
  // Chemical Tests (Anions)
  {
    name: "Phenolphthalein Alkalinity",
    method: "ASL/TM/HACH/8203",
    unit: "mg/L CaCO₃",
    standard: "NS",
    category: "anions",
    resultKey: "ph_alkalinity_result",
    remarkKey: "ph_alkalinity_remark",
  },
  {
    name: "Total Alkalinity",
    method: "ASL/TM/HACH/8203",
    unit: "mg/L CaCO₃",
    standard: "NS",
    category: "anions",
    resultKey: "total_alkalinity_result",
    remarkKey: "total_alkalinity_remark",
  },
  {
    name: "Chloride",
    method: "ASL/TM/HACH/8206",
    unit: "mg/L Cl⁻",
    standard: "250",
    category: "anions",
    resultKey: "chloride_result",
    remarkKey: "chloride_remark",
  },
  {
    name: "Fluoride",
    method: "ASL/TM/HACH/8029",
    unit: "mg/L F⁻",
    standard: "1.5",
    category: "anions",
    resultKey: "fluoride_result",
    remarkKey: "fluoride_remark",
  },
  {
    name: "Sulfate",
    method: "ASL/TM/HACH/8051",
    unit: "mg/L SO₄²⁻",
    standard: "400",
    category: "anions",
    resultKey: "sulfate_result",
    remarkKey: "sulfate_remark",
  },
  {
    name: "Nitrate",
    method: "ASL/TM/HACH/8171",
    unit: "mg/L NO₃⁻",
    standard: "45",
    category: "anions",
    resultKey: "nitrate_result",
    remarkKey: "nitrate_remark",
  },
  {
    name: "Nitrite",
    method: "ASL/TM/HACH/8507",
    unit: "mg/L NO₂⁻",
    standard: "0.9",
    category: "anions",
    resultKey: "nitrite_result",
    remarkKey: "nitrite_remark",
  },
  {
    name: "Phosphate",
    method: "ASL/TM/HACH/8048",
    unit: "mg/L PO₄³⁻",
    standard: "2.2",
    category: "anions",
    resultKey: "phosphate_result",
    remarkKey: "phosphate_remark",
  },
  {
    name: "Sulfide",
    method: "ASL/TM/HACH/8131",
    unit: "mg/L S²⁻",
    standard: "0.1",
    category: "anions",
    resultKey: "sulfide_result",
    remarkKey: "sulfide_remark",
  },
  // Chemical Tests (Cations)
  {
    name: "Potassium",
    method: "ASL/TM/HACH/8049",
    unit: "mg/L K",
    standard: "50",
    category: "cations",
    resultKey: "potassium_result",
    remarkKey: "potassium_remark",
  },
  {
    name: "Calcium",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Ca",
    standard: "150",
    category: "cations",
    resultKey: "calcium_result",
    remarkKey: "calcium_remark",
  },
  {
    name: "Magnesium",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Mg",
    standard: "100",
    category: "cations",
    resultKey: "magnesium_result",
    remarkKey: "magnesium_remark",
  },
  {
    name: "Iron",
    method: "ASL/TM/HACH/8008",
    unit: "mg/L Fe",
    standard: "0.3",
    category: "cations",
    resultKey: "iron_result",
    remarkKey: "iron_remark",
  },
  {
    name: "Manganese",
    method: "ASL/TM/HACH/8149",
    unit: "mg/L Mn",
    standard: "0.1",
    category: "cations",
    resultKey: "manganese_result",
    remarkKey: "manganese_remark",
  },
  {
    name: "Ammonia",
    method: "ASL/TM/HACH/8038",
    unit: "mg/L NH₃",
    standard: "0.5",
    category: "cations",
    resultKey: "ammonia_result",
    remarkKey: "ammonia_remark",
  },
  {
    name: "Copper",
    method: "ASL/TM/HACH/8506",
    unit: "mg/L Cu",
    standard: "1.0",
    category: "cations",
    resultKey: "copper_result",
    remarkKey: "copper_remark",
  },
  {
    name: "Zinc",
    method: "ASL/TM/HACH/8009",
    unit: "mg/L Zn",
    standard: "5.0",
    category: "cations",
    resultKey: "zinc_result",
    remarkKey: "zinc_remark",
  },
  {
    name: "Chromium",
    method: "ASL/TM/HACH/8023",
    unit: "mg/L Cr",
    standard: "0.05",
    category: "cations",
    resultKey: "chromium_result",
    remarkKey: "chromium_remark",
  },
  // Other Parameters
  {
    name: "Total Hardness",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L CaCO₃",
    standard: "300",
    category: "other",
    resultKey: "total_hardness_result",
    remarkKey: "total_hardness_remark",
  },
  {
    name: "Calcium Hardness",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Ca²⁺",
    standard: "NS",
    category: "other",
    resultKey: "calcium_hardness_result",
    remarkKey: "calcium_hardness_remark",
  },
  {
    name: "Magnesium Hardness",
    method: "ASL/TM/HACH/8213",
    unit: "mg/L Mg²⁺",
    standard: "NS",
    category: "other",
    resultKey: "magnesium_hardness_result",
    remarkKey: "magnesium_hardness_remark",
  },
  {
    name: "Silica",
    method: "ASL/TM/HACH/8185",
    unit: "mg/L SiO₂",
    standard: "NS",
    category: "other",
    resultKey: "silica_result",
    remarkKey: "silica_remark",
  },
  {
    name: "Free Chlorine",
    method: "ASL/TM/HACH/8167",
    unit: "mg/L Cl₂",
    standard: "0.2",
    category: "other",
    resultKey: "free_chlorine_result",
    remarkKey: "free_chlorine_remark",
  },
];

// Helper function to get parameters by category
export function getParametersByCategory(category: TestParameter["category"]) {
  return TEST_PARAMETERS.filter((param) => param.category === category);
}

// Helper function to check if a result passes the standard
export function checkStandard(
  parameter: TestParameter,
  value: number | string | null
): "PASS" | "FAIL" | "N/A" {
  if (value === null || parameter.standard === "NS") return "N/A";
  if (typeof value === "string") return "N/A";

  const numValue = Number(value);
  const standard = parameter.standard;

  if (standard.includes("Max.")) {
    const max = parseFloat(standard.replace(" Max.", ""));
    return numValue <= max ? "PASS" : "FAIL";
  }

  if (standard.includes("-")) {
    const [min, max] = standard.split("-").map((s) => parseFloat(s.trim()));
    return numValue >= min && numValue <= max ? "PASS" : "FAIL";
  }

  if (standard.includes("<")) {
    const max = parseFloat(standard.replace("<", "").trim());
    return numValue < max ? "PASS" : "FAIL";
  }

  return "N/A";
}
