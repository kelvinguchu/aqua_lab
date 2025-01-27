import { Database } from "@/lib/database.types";
import {
  TestParameter,
  TestCategory,
} from "@/components/certificates/pdf/shared/types";

// Get the row types from the database
type Tables = Database["public"]["Tables"];
export type Certificate = Tables["certificates"]["Row"];
export type PhysicalChemicalResults =
  Tables["physical_chemical_results"]["Row"];
export type MicrobiologicalResults = Tables["microbiological_results"]["Row"];
export type EffluentResults = Tables["effluent_results"]["Row"];
export type IrrigationResults = Tables["irrigation_results"]["Row"];
export type BoreholeResults = Tables["borehole_results"]["Row"];

// Combine certificate and results for form values
export type FormValues = Certificate &
  Partial<PhysicalChemicalResults> &
  Partial<MicrobiologicalResults> &
  Partial<EffluentResults> &
  Partial<IrrigationResults> &
  Partial<BoreholeResults>;

// Extend TestParameter to include form-specific metadata
export interface TestParameterWithMeta<T = any> extends TestParameter<T> {
  id: string;
  type: "text" | "number";
  category: string;
  severity?: "low" | "medium" | "high";
}

// Helper function to get parameters by category
export function getParametersByCategory(
  category: string
): TestParameterWithMeta<PhysicalChemicalResults>[] {
  return []; // This will be populated with actual parameters
}
