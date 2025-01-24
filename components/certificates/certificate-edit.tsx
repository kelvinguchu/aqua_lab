"use client";

import type { Certificate } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { supabase } from "@/lib/supabase/client";

// Define FormValues type explicitly based on the form schema
type FormValues = {
  certificate_id: string;
  sample_id: string;
  date_of_report: Date;
  date_of_report_issue: Date;
  description_of_sample: string;
  sample_source: string;
  submitted_by: string;
  customer_contact: string;
  sampled_by: string;
  date_of_sampling: Date;
  date_sample_received: Date;
  date_of_analysis: Date;

  // Physical Tests
  color_result: string;
  color_remark: string;
  conductivity_result: string;
  conductivity_remark: string;
  ph_result: string;
  ph_remark: string;
  tds_result: string;
  tds_remark: string;
  tss_result: string;
  tss_remark: string;
  turbidity_result: string;
  turbidity_remark: string;

  // Chemical Tests (Anions)
  chloride_result: string;
  chloride_remark: string;
  fluoride_result: string;
  fluoride_remark: string;
  nitrate_result: string;
  nitrate_remark: string;
  nitrite_result: string;
  nitrite_remark: string;
  sulfate_result: string;
  sulfate_remark: string;
  free_chlorine_result: string;
  free_chlorine_remark: string;

  // Chemical Tests (Cations)
  calcium_result: string;
  calcium_remark: string;
  magnesium_result: string;
  magnesium_remark: string;
  potassium_result: string;
  potassium_remark: string;
  iron_result: string;
  iron_remark: string;
  manganese_result: string;
  manganese_remark: string;
  copper_result: string;
  copper_remark: string;
  zinc_result: string;
  zinc_remark: string;
  chromium_result: string;
  chromium_remark: string;

  // Other Parameters
  total_hardness_result: string;
  total_hardness_remark: string;
  calcium_hardness_result: string;
  calcium_hardness_remark: string;
  magnesium_hardness_result: string;
  magnesium_hardness_remark: string;
  ph_alkalinity_result: string;
  ph_alkalinity_remark: string;
  total_alkalinity_result: string;
  total_alkalinity_remark: string;
  silica_result: string;
  silica_remark: string;
  phosphate_result: string;
  phosphate_remark: string;
  sulfide_result: string;
  sulfide_remark: string;
  ammonia_result: string;
  ammonia_remark: string;

  // Microbiological Tests
  total_viable_counts_result: string;
  total_viable_counts_remark: string;
  coliforms_mpn_result: string;
  coliforms_mpn_remark: string;
  ecoli_mpn_result: string;
  ecoli_mpn_remark: string;
  faecal_coliforms_mpn_result: string;
  faecal_coliforms_mpn_remark: string;

  comments?: string;
};

// Define the form schema based on FormValues type
const formSchema = z.object({
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

  // Physical Tests
  color_result: z.string(),
  color_remark: z.string(),
  conductivity_result: z.string(),
  conductivity_remark: z.string(),
  ph_result: z.string(),
  ph_remark: z.string(),
  tds_result: z.string(),
  tds_remark: z.string(),
  tss_result: z.string(),
  tss_remark: z.string(),
  turbidity_result: z.string(),
  turbidity_remark: z.string(),

  // Chemical Tests (Anions)
  chloride_result: z.string(),
  chloride_remark: z.string(),
  fluoride_result: z.string(),
  fluoride_remark: z.string(),
  nitrate_result: z.string(),
  nitrate_remark: z.string(),
  nitrite_result: z.string(),
  nitrite_remark: z.string(),
  sulfate_result: z.string(),
  sulfate_remark: z.string(),
  free_chlorine_result: z.string(),
  free_chlorine_remark: z.string(),

  // Chemical Tests (Cations)
  calcium_result: z.string(),
  calcium_remark: z.string(),
  magnesium_result: z.string(),
  magnesium_remark: z.string(),
  potassium_result: z.string(),
  potassium_remark: z.string(),
  iron_result: z.string(),
  iron_remark: z.string(),
  manganese_result: z.string(),
  manganese_remark: z.string(),
  copper_result: z.string(),
  copper_remark: z.string(),
  zinc_result: z.string(),
  zinc_remark: z.string(),
  chromium_result: z.string(),
  chromium_remark: z.string(),

  // Other Parameters
  total_hardness_result: z.string(),
  total_hardness_remark: z.string(),
  calcium_hardness_result: z.string(),
  calcium_hardness_remark: z.string(),
  magnesium_hardness_result: z.string(),
  magnesium_hardness_remark: z.string(),
  ph_alkalinity_result: z.string(),
  ph_alkalinity_remark: z.string(),
  total_alkalinity_result: z.string(),
  total_alkalinity_remark: z.string(),
  silica_result: z.string(),
  silica_remark: z.string(),
  phosphate_result: z.string(),
  phosphate_remark: z.string(),
  sulfide_result: z.string(),
  sulfide_remark: z.string(),
  ammonia_result: z.string(),
  ammonia_remark: z.string(),

  // Microbiological Tests
  total_viable_counts_result: z.string(),
  total_viable_counts_remark: z.string(),
  coliforms_mpn_result: z.string(),
  coliforms_mpn_remark: z.string(),
  ecoli_mpn_result: z.string(),
  ecoli_mpn_remark: z.string(),
  faecal_coliforms_mpn_result: z.string(),
  faecal_coliforms_mpn_remark: z.string(),

  comments: z.string().optional(),
}) satisfies z.ZodType<FormValues>;

// Define test parameter categories
type ParameterCategory =
  | "physical"
  | "anions"
  | "cations"
  | "other"
  | "microbiological";

// Add this type helper
type TestParameterWithMeta = {
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
];

// Helper function to get parameters by category
export const getParametersByCategory = (category: ParameterCategory) =>
  TEST_PARAMETERS.filter((param) => param.category === category);

interface CertificateEditProps {
  certificate: Certificate;
  onClose: () => void;
}

export function CertificateEdit({
  certificate,
  onClose,
}: CertificateEditProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificate_id: certificate.certificate_id,
      sample_id: certificate.sample_id,
      date_of_report: new Date(certificate.date_of_report),
      date_of_report_issue: new Date(certificate.date_of_report_issue),
      description_of_sample: certificate.description_of_sample,
      sample_source: certificate.sample_source,
      submitted_by: certificate.submitted_by,
      customer_contact: certificate.customer_contact,
      sampled_by: certificate.sampled_by,
      date_of_sampling: new Date(certificate.date_of_sampling),
      date_sample_received: new Date(certificate.date_sample_received),
      date_of_analysis: new Date(certificate.date_of_analysis),

      // Initialize all test parameters
      ...Object.fromEntries(
        TEST_PARAMETERS.flatMap((param) => [
          [
            param.resultKey,
            certificate[param.resultKey as keyof Certificate]?.toString() ?? "",
          ],
          [
            param.remarkKey,
            certificate[param.remarkKey as keyof Certificate] ?? "",
          ],
        ])
      ),

      // Microbiological Tests
      total_viable_counts_result: certificate.total_viable_counts_result ?? "",
      total_viable_counts_remark: certificate.total_viable_counts_remark ?? "",
      coliforms_mpn_result: certificate.coliforms_mpn_result ?? "",
      coliforms_mpn_remark: certificate.coliforms_mpn_remark ?? "",
      ecoli_mpn_result: certificate.ecoli_mpn_result ?? "",
      ecoli_mpn_remark: certificate.ecoli_mpn_remark ?? "",
      faecal_coliforms_mpn_result:
        certificate.faecal_coliforms_mpn_result ?? "",
      faecal_coliforms_mpn_remark:
        certificate.faecal_coliforms_mpn_remark ?? "",

      comments: certificate.comments ?? "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Format dates for database (YYYY-MM-DD)
      const formatDatabaseDate = (date: Date) => format(date, "yyyy-MM-dd");

      // Prepare certificate data from form values
      const certificateData = {
        ...certificate,
        certificate_id: values.certificate_id,
        sample_id: values.sample_id,
        date_of_report: formatDatabaseDate(values.date_of_report),
        date_of_report_issue: formatDatabaseDate(values.date_of_report_issue),
        description_of_sample: values.description_of_sample,
        sample_source: values.sample_source,
        submitted_by: values.submitted_by,
        customer_contact: values.customer_contact,
        sampled_by: values.sampled_by,
        date_of_sampling: formatDatabaseDate(values.date_of_sampling),
        date_sample_received: formatDatabaseDate(values.date_sample_received),
        date_of_analysis: formatDatabaseDate(values.date_of_analysis),

        // Convert test parameters
        ...Object.fromEntries(
          TEST_PARAMETERS.flatMap((param) => [
            [
              param.resultKey,
              values[param.resultKey as keyof FormValues]
                ? parseFloat(
                    values[param.resultKey as keyof FormValues] as string
                  )
                : null,
            ],
            [
              param.remarkKey,
              values[param.remarkKey as keyof FormValues] || null,
            ],
          ])
        ),

        // Microbiological Tests
        total_viable_counts_result: values.total_viable_counts_result || "ND",
        total_viable_counts_remark: values.total_viable_counts_remark || "PASS",
        coliforms_mpn_result: values.coliforms_mpn_result || "ND",
        coliforms_mpn_remark: values.coliforms_mpn_remark || "PASS",
        ecoli_mpn_result: values.ecoli_mpn_result || "ND",
        ecoli_mpn_remark: values.ecoli_mpn_remark || "PASS",
        faecal_coliforms_mpn_result: values.faecal_coliforms_mpn_result || "ND",
        faecal_coliforms_mpn_remark:
          values.faecal_coliforms_mpn_remark || "PASS",

        comments: values.comments || null,
      } as Certificate;

      // Update certificate in database
      const { error: updateError } = await supabase
        .from("certificates")
        .update(certificateData)
        .eq("id", certificate.id);

      if (updateError) throw updateError;

      // Generate PDF with display formatted dates
      const { CertificatePDF } = await import(
        "@/components/certificates/certificate-pdf"
      );
      const { pdf } = await import("@react-pdf/renderer");

      // Format dates for display in PDF (DD/MM/YYYY)
      const certificateDisplayData = {
        ...certificateData,
        date_of_report: format(values.date_of_report, "dd/MM/yyyy"),
        date_of_sampling: format(values.date_of_sampling, "dd/MM/yyyy"),
        date_sample_received: format(values.date_sample_received, "dd/MM/yyyy"),
        date_of_analysis: format(values.date_of_analysis, "dd/MM/yyyy"),
        date_of_report_issue: format(values.date_of_report_issue, "dd/MM/yyyy"),
      };

      const blob = await pdf(
        <CertificatePDF certificate={certificateDisplayData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      // Create download link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateData.certificate_id}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      URL.revokeObjectURL(url);

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating certificate:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update certificate"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6 p-4 pb-8'>
      {isLoading && (
        <div className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50'>
          <div className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <LoadingSpinner />
          </div>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {error && (
            <div className='bg-destructive/15 text-destructive p-4 rounded-lg border border-destructive/20'>
              {error}
            </div>
          )}

          <Card className='shadow-sm'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>
                Certificate Information
              </CardTitle>
              <CardDescription className='text-base'>
                Update the certificate details below.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='certificate_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Certificate ID
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled className='bg-muted/50' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sample_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Sample ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='date_of_report'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Date of Report
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal border-input bg-background hover:bg-accent hover:text-accent-foreground",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align='start' className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date_of_report_issue'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Date of Report Issue
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal border-input bg-background hover:bg-accent hover:text-accent-foreground",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align='start' className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='description_of_sample'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Description of Sample
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sample_source'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Sample Source
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='submitted_by'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Submitted By
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='customer_contact'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Customer Contact
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='sampled_by'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Sampled By
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='transition-colors focus:bg-background'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date_of_sampling'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Date of Sampling
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal border-input bg-background hover:bg-accent hover:text-accent-foreground",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4 opacity-50' />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align='start' className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-sm'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>Test Results</CardTitle>
              <CardDescription className='text-base'>
                Update the test results and remarks below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Physical Tests */}
              <div className='space-y-8'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Physical Tests</h3>
                  <div className='grid gap-6'>
                    {getParametersByCategory("physical").map((param) => (
                      <div
                        key={param.resultKey}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name={param.resultKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Result
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter result'
                                  className='font-mono'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={param.remarkKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Remark
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter remark'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chemical Tests (Anions) */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>
                    Chemical Tests (Anions)
                  </h3>
                  <div className='grid gap-6'>
                    {getParametersByCategory("anions").map((param) => (
                      <div
                        key={param.resultKey}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name={param.resultKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Result
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter result'
                                  className='font-mono'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={param.remarkKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Remark
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter remark'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chemical Tests (Cations) */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>
                    Chemical Tests (Cations)
                  </h3>
                  <div className='grid gap-6'>
                    {getParametersByCategory("cations").map((param) => (
                      <div
                        key={param.resultKey}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name={param.resultKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Result
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter result'
                                  className='font-mono'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={param.remarkKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Remark
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter remark'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Parameters */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Other Parameters</h3>
                  <div className='grid gap-6'>
                    {getParametersByCategory("other").map((param) => (
                      <div
                        key={param.resultKey}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name={param.resultKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Result
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter result'
                                  className='font-mono'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={param.remarkKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Remark
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value?.toString() || ""}
                                  placeholder='Enter remark'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Microbiological Tests */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>
                    Microbiological Tests
                  </h3>
                  <div className='grid gap-6'>
                    {getParametersByCategory("microbiological").map((param) => (
                      <div
                        key={param.resultKey}
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name={param.resultKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Result
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='ND'
                                  value={field.value?.toString() || ""}
                                  className='font-mono'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={param.remarkKey}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-sm font-medium'>
                                {param.name} Remark
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='PASS'
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-sm'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>Comments</CardTitle>
              <CardDescription className='text-base'>
                Add any additional comments or notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name='comments'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium'>
                      Comments
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className='min-h-[100px] resize-y transition-colors focus:bg-background'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className='fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='min-w-[100px] transition-colors hover:bg-accent'>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='min-w-[100px] transition-colors'>
              {isLoading ? "Updating..." : "Update Certificate"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
