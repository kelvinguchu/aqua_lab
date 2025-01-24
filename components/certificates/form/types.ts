import * as z from "zod";

// Form schema
export const formSchema = z.object({
  // Header Information
  certificate_id: z.string(),
  sample_id: z.string(),
  date_of_report: z.date(),
  date_of_report_issue: z.date(),
  description_of_sample: z.string(),
  sample_source: z.string(),
  submitted_by: z.string(),
  customer_contact: z.string(),
  sampled_by: z.string(),
  date_of_sampling: z.date(),
  date_sample_received: z.date(),
  date_of_analysis: z.date(),

  // Test Results - Physical Tests
  ph_result: z.string(),
  ph_remark: z.string(),
  turbidity_result: z.string(),
  turbidity_remark: z.string(),
  color_result: z.string(),
  color_remark: z.string(),
  tss_result: z.string(),
  tss_remark: z.string(),
  tds_result: z.string(),
  tds_remark: z.string(),
  conductivity_result: z.string(),
  conductivity_remark: z.string(),

  // Test Results - Chemical Tests (Anions)
  ph_alkalinity_result: z.string(),
  ph_alkalinity_remark: z.string(),
  total_alkalinity_result: z.string(),
  total_alkalinity_remark: z.string(),
  chloride_result: z.string(),
  chloride_remark: z.string(),
  fluoride_result: z.string(),
  fluoride_remark: z.string(),
  sulfate_result: z.string(),
  sulfate_remark: z.string(),
  nitrate_result: z.string(),
  nitrate_remark: z.string(),
  nitrite_result: z.string(),
  nitrite_remark: z.string(),
  phosphate_result: z.string(),
  phosphate_remark: z.string(),
  sulfide_result: z.string(),
  sulfide_remark: z.string(),

  // Test Results - Chemical Tests (Cations)
  potassium_result: z.string(),
  potassium_remark: z.string(),
  calcium_result: z.string(),
  calcium_remark: z.string(),
  magnesium_result: z.string(),
  magnesium_remark: z.string(),
  iron_result: z.string(),
  iron_remark: z.string(),
  manganese_result: z.string(),
  manganese_remark: z.string(),
  ammonia_result: z.string(),
  ammonia_remark: z.string(),
  copper_result: z.string(),
  copper_remark: z.string(),
  zinc_result: z.string(),
  zinc_remark: z.string(),
  chromium_result: z.string(),
  chromium_remark: z.string(),

  // Test Results - Other Parameters
  total_hardness_result: z.string(),
  total_hardness_remark: z.string(),
  calcium_hardness_result: z.string(),
  calcium_hardness_remark: z.string(),
  magnesium_hardness_result: z.string(),
  magnesium_hardness_remark: z.string(),
  silica_result: z.string(),
  silica_remark: z.string(),
  free_chlorine_result: z.string(),
  free_chlorine_remark: z.string(),

  // Test Results - Microbiological Tests
  total_viable_counts_result: z.string(),
  total_viable_counts_remark: z.string(),
  coliforms_mpn_result: z.string(),
  coliforms_mpn_remark: z.string(),
  ecoli_mpn_result: z.string(),
  ecoli_mpn_remark: z.string(),
  faecal_coliforms_mpn_result: z.string(),
  faecal_coliforms_mpn_remark: z.string(),

  // Comments
  comments: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

// Define test parameter categories
export type ParameterCategory =
  | "physical"
  | "anions"
  | "cations"
  | "other"
  | "microbiological";

// Add this type helper
export type TestParameterWithMeta = {
  id: string;
  name: string;
  type: "text";
  resultKey: keyof FormValues;
  remarkKey: keyof FormValues;
  category: ParameterCategory;
};

// Define test parameters
export const TEST_PARAMETERS: TestParameterWithMeta[] = [
  // Physical Tests
  {
    id: "ph",
    name: "pH",
    type: "text",
    resultKey: "ph_result",
    remarkKey: "ph_remark",
    category: "physical",
  },
  {
    id: "turbidity",
    name: "Turbidity",
    type: "text",
    resultKey: "turbidity_result",
    remarkKey: "turbidity_remark",
    category: "physical",
  },
  {
    id: "color",
    name: "Color",
    type: "text",
    resultKey: "color_result",
    remarkKey: "color_remark",
    category: "physical",
  },
  {
    id: "tss",
    name: "Total Suspended Solids (TSS)",
    type: "text",
    resultKey: "tss_result",
    remarkKey: "tss_remark",
    category: "physical",
  },
  {
    id: "tds",
    name: "Total Dissolved Solids (TDS)",
    type: "text",
    resultKey: "tds_result",
    remarkKey: "tds_remark",
    category: "physical",
  },
  {
    id: "conductivity",
    name: "Conductivity",
    type: "text",
    resultKey: "conductivity_result",
    remarkKey: "conductivity_remark",
    category: "physical",
  },

  // Chemical Tests (Anions)
  {
    id: "ph_alkalinity",
    name: "pH Alkalinity",
    type: "text",
    resultKey: "ph_alkalinity_result",
    remarkKey: "ph_alkalinity_remark",
    category: "anions",
  },
  {
    id: "total_alkalinity",
    name: "Total Alkalinity",
    type: "text",
    resultKey: "total_alkalinity_result",
    remarkKey: "total_alkalinity_remark",
    category: "anions",
  },
  {
    id: "chloride",
    name: "Chloride",
    type: "text",
    resultKey: "chloride_result",
    remarkKey: "chloride_remark",
    category: "anions",
  },
  {
    id: "fluoride",
    name: "Fluoride",
    type: "text",
    resultKey: "fluoride_result",
    remarkKey: "fluoride_remark",
    category: "anions",
  },
  {
    id: "sulfate",
    name: "Sulfate",
    type: "text",
    resultKey: "sulfate_result",
    remarkKey: "sulfate_remark",
    category: "anions",
  },
  {
    id: "nitrate",
    name: "Nitrate",
    type: "text",
    resultKey: "nitrate_result",
    remarkKey: "nitrate_remark",
    category: "anions",
  },
  {
    id: "nitrite",
    name: "Nitrite",
    type: "text",
    resultKey: "nitrite_result",
    remarkKey: "nitrite_remark",
    category: "anions",
  },
  {
    id: "phosphate",
    name: "Phosphate",
    type: "text",
    resultKey: "phosphate_result",
    remarkKey: "phosphate_remark",
    category: "anions",
  },
  {
    id: "sulfide",
    name: "Sulfide",
    type: "text",
    resultKey: "sulfide_result",
    remarkKey: "sulfide_remark",
    category: "anions",
  },

  // Chemical Tests (Cations)
  {
    id: "potassium",
    name: "Potassium",
    type: "text",
    resultKey: "potassium_result",
    remarkKey: "potassium_remark",
    category: "cations",
  },
  {
    id: "calcium",
    name: "Calcium",
    type: "text",
    resultKey: "calcium_result",
    remarkKey: "calcium_remark",
    category: "cations",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    type: "text",
    resultKey: "magnesium_result",
    remarkKey: "magnesium_remark",
    category: "cations",
  },
  {
    id: "iron",
    name: "Iron",
    type: "text",
    resultKey: "iron_result",
    remarkKey: "iron_remark",
    category: "cations",
  },
  {
    id: "manganese",
    name: "Manganese",
    type: "text",
    resultKey: "manganese_result",
    remarkKey: "manganese_remark",
    category: "cations",
  },
  {
    id: "ammonia",
    name: "Ammonia",
    type: "text",
    resultKey: "ammonia_result",
    remarkKey: "ammonia_remark",
    category: "cations",
  },
  {
    id: "copper",
    name: "Copper",
    type: "text",
    resultKey: "copper_result",
    remarkKey: "copper_remark",
    category: "cations",
  },
  {
    id: "zinc",
    name: "Zinc",
    type: "text",
    resultKey: "zinc_result",
    remarkKey: "zinc_remark",
    category: "cations",
  },
  {
    id: "chromium",
    name: "Chromium",
    type: "text",
    resultKey: "chromium_result",
    remarkKey: "chromium_remark",
    category: "cations",
  },

  // Other Parameters
  {
    id: "total_hardness",
    name: "Total Hardness",
    type: "text",
    resultKey: "total_hardness_result",
    remarkKey: "total_hardness_remark",
    category: "other",
  },
  {
    id: "calcium_hardness",
    name: "Calcium Hardness",
    type: "text",
    resultKey: "calcium_hardness_result",
    remarkKey: "calcium_hardness_remark",
    category: "other",
  },
  {
    id: "magnesium_hardness",
    name: "Magnesium Hardness",
    type: "text",
    resultKey: "magnesium_hardness_result",
    remarkKey: "magnesium_hardness_remark",
    category: "other",
  },
  {
    id: "silica",
    name: "Silica",
    type: "text",
    resultKey: "silica_result",
    remarkKey: "silica_remark",
    category: "other",
  },
  {
    id: "free_chlorine",
    name: "Free Chlorine",
    type: "text",
    resultKey: "free_chlorine_result",
    remarkKey: "free_chlorine_remark",
    category: "other",
  },

  // Microbiological Tests
  {
    id: "total_viable_counts",
    name: "Total Viable Counts",
    type: "text",
    resultKey: "total_viable_counts_result",
    remarkKey: "total_viable_counts_remark",
    category: "microbiological",
  },
  {
    id: "coliforms_mpn",
    name: "Coliforms (MPN)",
    type: "text",
    resultKey: "coliforms_mpn_result",
    remarkKey: "coliforms_mpn_remark",
    category: "microbiological",
  },
  {
    id: "ecoli_mpn",
    name: "E. coli (MPN)",
    type: "text",
    resultKey: "ecoli_mpn_result",
    remarkKey: "ecoli_mpn_remark",
    category: "microbiological",
  },
  {
    id: "faecal_coliforms_mpn",
    name: "Faecal Coliforms (MPN)",
    type: "text",
    resultKey: "faecal_coliforms_mpn_result",
    remarkKey: "faecal_coliforms_mpn_remark",
    category: "microbiological",
  },
];

// Helper function to get parameters by category
export const getParametersByCategory = (category: ParameterCategory) =>
  TEST_PARAMETERS.filter((param) => param.category === category);
