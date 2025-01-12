import { createClient } from "@supabase/supabase-js";

export type LabCertificate = {
  id: string;
  certificate_number: string;
  date: string;
  description: string;
  submitted_by: string;
  customer_name: string;
  sample_point: string;
  physical_tests: {
    ph: number;
    turbidity: number;
    conductivity: number;
    tds: number;
    temperature: number;
  };
  chemical_tests_anions: {
    fluoride: number;
    chloride: number;
    nitrite: number;
    bromide: number;
    nitrate: number;
    phosphate: number;
    sulphate: number;
  };
  chemical_tests_cations: {
    sodium: number;
    ammonium: number;
    potassium: number;
    calcium: number;
    magnesium: number;
  };
  other_parameters: {
    free_chlorine: number;
    total_chlorine: number;
  };
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
