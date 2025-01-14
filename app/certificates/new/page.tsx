"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import type { Certificate } from "@/lib/supabase";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  cn,
  generateSampleId,
  TEST_PARAMETERS,
  getParametersByCategory,
} from "@/lib/utils";
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
import { Textarea } from "@/components/ui/textarea";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Create form schema
const formSchema = z.object({
  // Header Information
  sample_id: z.string(),
  date_of_report: z.date(),
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

  // Comments
  comments: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewCertificatePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sample_id: "",
      description_of_sample: "",
      sample_source: "",
      date_of_report: new Date(),
      date_of_sampling: new Date(),
      date_sample_received: new Date(),
      date_of_analysis: new Date(),
      comments: "",
      // Add default values for all test parameters
      ...Object.fromEntries(
        TEST_PARAMETERS.flatMap((param) => [
          [param.resultKey, "0"],
          [param.remarkKey, ""],
        ])
      ),
    },
  });

  useEffect(() => {
    const initializeSampleId = async () => {
      try {
        setLoading(true);
        const sampleId = await generateSampleId();
        form.setValue("sample_id", sampleId);
      } catch (error) {
        setError("Failed to generate sample ID. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeSampleId();
  }, [form]);

  async function onSubmit() {
    try {
      setLoading(true);

      // Hardcoded test data - ignore form values completely
      const testData: Certificate = {
        id: "1",
        sample_id: "AQ-20240823-001",
        description_of_sample: "TREATED WATER",
        sample_source: "BIOFARMS LIMITED - THIKA",
        submitted_by: "JOSEPH KAMIRI",
        customer_contact: "LABAN - 0755570390",
        sampled_by: "JOSEPH KAMIRI",
        date_of_report: "23/08/2024",
        date_of_sampling: "19/08/2024",
        date_sample_received: "19/08/2024",
        date_of_analysis: "20/08/2024",
        date_of_report_issue: "23/08/2024",

        // Physical Tests
        ph_result: 7.2,
        ph_remark: "Within limits",
        turbidity_result: 0.5,
        turbidity_remark: "Clear",
        color_result: "5",
        color_remark: "Acceptable",
        tss_result: "12",
        tss_remark: "Pass",
        tds_result: 450,
        tds_remark: "Within range",
        conductivity_result: 750,
        conductivity_remark: "Normal",
        // Chemical Tests (Anions)
        ph_alkalinity_result: "0",
        ph_alkalinity_remark: "Normal",
        total_alkalinity_result: 120,
        total_alkalinity_remark: "Within range",
        chloride_result: 85,
        chloride_remark: "Acceptable",
        fluoride_result: 0.8,
        fluoride_remark: "Within limits",
        sulfate_result: "95",
        sulfate_remark: "Pass",
        nitrate_result: 4.2,
        nitrate_remark: "Within range",
        nitrite_result: 0.02,
        nitrite_remark: "Acceptable",
        phosphate_result: 0.5,
        phosphate_remark: "Normal",
        sulfide_result: 0.1,
        sulfide_remark: "Pass",
        // Chemical Tests (Cations)
        potassium_result: 12,
        potassium_remark: "Normal",
        calcium_result: "80",
        calcium_remark: "Within range",
        magnesium_result: "30",
        magnesium_remark: "Acceptable",
        iron_result: 0.15,
        iron_remark: "Within limits",
        manganese_result: 0.05,
        manganese_remark: "Pass",
        ammonia_result: "0.2",
        ammonia_remark: "Within range",
        copper_result: 0.05,
        copper_remark: "Acceptable",
        zinc_result: 0.1,
        zinc_remark: "Normal",
        chromium_result: 0.01,
        chromium_remark: "Pass",
        // Other Parameters
        total_hardness_result: "300",
        total_hardness_remark: "Moderate",
        calcium_hardness_result: "200",
        calcium_hardness_remark: "Normal",
        magnesium_hardness_result: "100",
        magnesium_hardness_remark: "Acceptable",
        silica_result: "15",
        silica_remark: "Within range",
        free_chlorine_result: 0.3,
        free_chlorine_remark: "Safe",
        comments:
          "Sample meets all required standards for treated water. All parameters are within acceptable limits for drinking water.",
        status: "draft" as const,
        created_at: new Date().toISOString(),

        // Add microbiological test results
        total_viable_counts_result: "ND",
        total_viable_counts_remark: "PASS",
        coliforms_mpn_result: "ND",
        coliforms_mpn_remark: "PASS",
        ecoli_mpn_result: "ND",
        ecoli_mpn_remark: "PASS",
        faecal_coliforms_mpn_result: "ND",
        faecal_coliforms_mpn_remark: "PASS",
      };

      // Import and use CertificatePDF component
      const { CertificatePDF } = await import(
        "@/components/certificates/certificate-pdf"
      );
      const { pdf } = await import("@react-pdf/renderer");

      // Generate PDF
      const blob = await pdf(
        <CertificatePDF certificate={testData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      // Create download link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${testData.sample_id}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      URL.revokeObjectURL(url);

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className='container py-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/' asChild>
              <Link href='/'>
                <HomeIcon className='h-4 w-4' />
                <span className='sr-only'>Certificates</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Certificate</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mb-8 mt-4'>
        <h1 className='text-3xl font-bold'>New Certificate</h1>
        <p className='text-muted-foreground'>
          Create a new laboratory test report certificate.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className='space-y-8'>
          {/* Header Information */}
          <Card>
            <CardHeader>
              <CardTitle>Header Information</CardTitle>
              <CardDescription>
                Enter the basic information about the sample and customer.
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-6'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='sample_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date_of_report'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Report</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4' />
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

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='description_of_sample'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description of Sample</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Sample Source</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='submitted_by'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submitted By</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Customer Contact</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='sampled_by'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sampled By</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Date of Sampling</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4' />
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

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='date_sample_received'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Sample Received</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4' />
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
                  name='date_of_analysis'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Analysis</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              <CalendarIcon className='mr-2 h-4 w-4' />
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

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                Enter the test results and remarks for each parameter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type='single' collapsible className='w-full'>
                {/* Physical Tests */}
                <AccordionItem value='physical'>
                  <AccordionTrigger>Physical Tests</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-4'>
                      {getParametersByCategory("physical").map((param) => (
                        <div
                          key={param.name}
                          className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={param.resultKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Result</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={param.remarkKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Remark</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chemical Tests (Anions) */}
                <AccordionItem value='anions'>
                  <AccordionTrigger>Chemical Tests (Anions)</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-4'>
                      {getParametersByCategory("anions").map((param) => (
                        <div
                          key={param.name}
                          className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={param.resultKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Result</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={param.remarkKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Remark</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chemical Tests (Cations) */}
                <AccordionItem value='cations'>
                  <AccordionTrigger>Chemical Tests (Cations)</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-4'>
                      {getParametersByCategory("cations").map((param) => (
                        <div
                          key={param.name}
                          className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={param.resultKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Result</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={param.remarkKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Remark</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Other Parameters */}
                <AccordionItem value='other'>
                  <AccordionTrigger>Other Parameters</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-4'>
                      {getParametersByCategory("other").map((param) => (
                        <div
                          key={param.name}
                          className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={param.resultKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Result</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={param.remarkKey as keyof FormValues}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{param.name} Remark</FormLabel>
                                <FormControl>
                                  <Input
                                    value={field.value?.toString() ?? ""}
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Add any additional comments or notes about the test results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name='comments'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        value={field.value?.toString() ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        placeholder='Enter any comments about the test results...'
                        className='min-h-[100px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className='flex justify-end gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push("/certificates")}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? "Creating..." : "Create Certificate"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
