"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import type { Certificate } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
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
  generateCertificateId,
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { supabase } from "@/lib/supabase/client";

// Create form schema
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

const CACHE_KEY = "certificate_form_draft";
const AUTO_SAVE_DELAY = 1000; // 1 second

export default function NewCertificatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificate_id: "",
      sample_id: "",
      description_of_sample: "",
      sample_source: "",
      submitted_by: "",
      customer_contact: "",
      sampled_by: "",
      date_of_report: new Date(),
      date_of_report_issue: new Date(),
      date_of_sampling: new Date(),
      date_sample_received: new Date(),
      date_of_analysis: new Date(),
      comments: "",
      ...Object.fromEntries(
        TEST_PARAMETERS.flatMap((param) => [
          [param.resultKey, ""],
          [param.remarkKey, ""],
        ])
      ),
      total_viable_counts_result: "",
      total_viable_counts_remark: "",
      coliforms_mpn_result: "",
      coliforms_mpn_remark: "",
      ecoli_mpn_result: "",
      ecoli_mpn_remark: "",
      faecal_coliforms_mpn_result: "",
      faecal_coliforms_mpn_remark: "",
    },
  });

  // Load cached form data
  useEffect(() => {
    const loadCachedForm = async () => {
      try {
        setLoading(true);
        // Generate certificate ID
        const certificateId = await generateCertificateId();
        form.setValue("certificate_id", certificateId);

        // Load cached form data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);

          // Convert date strings back to Date objects
          const dateFields = [
            "date_of_report",
            "date_of_report_issue",
            "date_of_sampling",
            "date_sample_received",
            "date_of_analysis",
          ];

          dateFields.forEach((field) => {
            if (parsedData[field]) {
              parsedData[field] = new Date(parsedData[field]);
            }
          });

          // Keep the new certificate ID but load other cached data
          form.reset({ ...parsedData, certificate_id: certificateId });
          toast({
            title: "Draft Restored",
            description: "Your previous work has been restored from cache.",
          });
        }
      } catch (error) {
        console.error("Error loading cached form:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load cached form",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCachedForm();
  }, [form, toast]);

  // Watch form changes and update state
  useEffect(() => {
    const subscription = form.watch((data) => {
      setFormData(data as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Debounced auto-save effect
  useEffect(() => {
    if (!formData) return;

    const handler = setTimeout(() => {
      try {
        setIsSaving(true);
        localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
        setLastSaved(new Date());
      } catch (error) {
        console.error("Error saving form:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save draft",
        });
      } finally {
        setIsSaving(false);
      }
    }, AUTO_SAVE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [formData, toast]);

  // Handle form submission
  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      // Format dates for display in PDF (DD/MM/YYYY)
      const formatDisplayDate = (date: Date) => format(date, "dd/MM/yyyy");

      // Format dates for database (YYYY-MM-DD)
      const formatDatabaseDate = (date: Date) => format(date, "yyyy-MM-dd");

      // Prepare certificate data from form values
      const certificateData: Certificate = {
        id: crypto.randomUUID(), // Generate a UUID for new certificate
        certificate_id: values.certificate_id,
        sample_id: values.sample_id,
        description_of_sample: values.description_of_sample,
        sample_source: values.sample_source,
        submitted_by: values.submitted_by,
        customer_contact: values.customer_contact,
        sampled_by: values.sampled_by,
        date_of_report: formatDatabaseDate(values.date_of_report),
        date_of_sampling: formatDatabaseDate(values.date_of_sampling),
        date_sample_received: formatDatabaseDate(values.date_sample_received),
        date_of_analysis: formatDatabaseDate(values.date_of_analysis),
        date_of_report_issue: formatDatabaseDate(values.date_of_report_issue),

        // Physical Tests
        ph_result: parseFloat(values.ph_result),
        ph_remark: values.ph_remark,
        turbidity_result: parseFloat(values.turbidity_result),
        turbidity_remark: values.turbidity_remark,
        color_result: values.color_result,
        color_remark: values.color_remark,
        tss_result: values.tss_result,
        tss_remark: values.tss_remark,
        tds_result: parseFloat(values.tds_result),
        tds_remark: values.tds_remark,
        conductivity_result: parseFloat(values.conductivity_result),
        conductivity_remark: values.conductivity_remark,

        // Chemical Tests (Anions)
        ph_alkalinity_result: values.ph_alkalinity_result,
        ph_alkalinity_remark: values.ph_alkalinity_remark,
        total_alkalinity_result: parseFloat(values.total_alkalinity_result),
        total_alkalinity_remark: values.total_alkalinity_remark,
        chloride_result: parseFloat(values.chloride_result),
        chloride_remark: values.chloride_remark,
        fluoride_result: parseFloat(values.fluoride_result),
        fluoride_remark: values.fluoride_remark,
        sulfate_result: values.sulfate_result,
        sulfate_remark: values.sulfate_remark,
        nitrate_result: parseFloat(values.nitrate_result),
        nitrate_remark: values.nitrate_remark,
        nitrite_result: parseFloat(values.nitrite_result),
        nitrite_remark: values.nitrite_remark,
        phosphate_result: parseFloat(values.phosphate_result),
        phosphate_remark: values.phosphate_remark,
        sulfide_result: parseFloat(values.sulfide_result),
        sulfide_remark: values.sulfide_remark,

        // Chemical Tests (Cations)
        potassium_result: parseFloat(values.potassium_result),
        potassium_remark: values.potassium_remark,
        calcium_result: values.calcium_result,
        calcium_remark: values.calcium_remark,
        magnesium_result: values.magnesium_result,
        magnesium_remark: values.magnesium_remark,
        iron_result: parseFloat(values.iron_result),
        iron_remark: values.iron_remark,
        manganese_result: parseFloat(values.manganese_result),
        manganese_remark: values.manganese_remark,
        ammonia_result: values.ammonia_result,
        ammonia_remark: values.ammonia_remark,
        copper_result: parseFloat(values.copper_result),
        copper_remark: values.copper_remark,
        zinc_result: parseFloat(values.zinc_result),
        zinc_remark: values.zinc_remark,
        chromium_result: parseFloat(values.chromium_result),
        chromium_remark: values.chromium_remark,

        // Other Parameters
        total_hardness_result: values.total_hardness_result,
        total_hardness_remark: values.total_hardness_remark,
        calcium_hardness_result: values.calcium_hardness_result,
        calcium_hardness_remark: values.calcium_hardness_remark,
        magnesium_hardness_result: values.magnesium_hardness_result,
        magnesium_hardness_remark: values.magnesium_hardness_remark,
        silica_result: values.silica_result,
        silica_remark: values.silica_remark,
        free_chlorine_result: parseFloat(values.free_chlorine_result),
        free_chlorine_remark: values.free_chlorine_remark,

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

        // Metadata
        comments: values.comments,
        status: "draft" as const,
        created_at: new Date().toISOString(),
      };

      // Create a display version of the certificate for PDF
      const certificateDisplayData: Certificate = {
        ...certificateData,
        date_of_report: formatDisplayDate(values.date_of_report),
        date_of_sampling: formatDisplayDate(values.date_of_sampling),
        date_sample_received: formatDisplayDate(values.date_sample_received),
        date_of_analysis: formatDisplayDate(values.date_of_analysis),
        date_of_report_issue: formatDisplayDate(values.date_of_report_issue),
      };

      // Save to database
      const { error: saveError } = await supabase
        .from("certificates")
        .insert([certificateData]);

      if (saveError) {
        throw new Error(`Failed to save certificate: ${saveError.message}`);
      }

      // Generate PDF with display formatted dates
      const { CertificatePDF } = await import(
        "@/components/certificates/certificate-pdf"
      );
      const { pdf } = await import("@react-pdf/renderer");

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
      localStorage.removeItem(CACHE_KEY); // Clear cached form data

      // Redirect to home page
      router.push("/");
      toast({
        title: "Success",
        description: "Certificate created successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create certificate",
      });
    } finally {
      setLoading(false);
    }
  }

  // Handle form discard
  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard this draft?")) {
      localStorage.removeItem(CACHE_KEY);
      router.push("/dashboard");
      toast({
        title: "Draft Discarded",
        description: "Your draft has been discarded",
      });
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen pt-16'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='container py-10'>
      <div className='flex items-center justify-between mb-8'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard' asChild>
                <Link href='/dashboard'>
                  <HomeIcon className='h-4 w-4' />
                  <span className='sr-only'>Dashboard</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Certificate</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Auto-save indicator */}
        <div className='text-sm text-muted-foreground'>
          {isSaving ? (
            <span>Saving draft...</span>
          ) : lastSaved ? (
            <span>Last saved {format(lastSaved, "HH:mm:ss")}</span>
          ) : null}
        </div>
      </div>

      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>New Certificate</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                  name='certificate_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate ID</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
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
                      <FormLabel>Sample ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter sample ID' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
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
                <FormField
                  control={form.control}
                  name='date_of_report_issue'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Report Issue</FormLabel>
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
              </div>

              <div className='grid grid-cols-2 gap-4'>
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

                {/* Microbiological Tests */}
                <AccordionItem value='microbiological'>
                  <AccordionTrigger>Microbiological Tests</AccordionTrigger>
                  <AccordionContent>
                    <div className='grid gap-4'>
                      {/* Total Viable Counts */}
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='total_viable_counts_result'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Viable Counts Result</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='ND'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='total_viable_counts_remark'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Viable Counts Remark</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='PASS'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Coliforms */}
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='coliforms_mpn_result'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coliforms MPN Result</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='ND'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='coliforms_mpn_remark'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coliforms MPN Remark</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='PASS'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* E. coli */}
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='ecoli_mpn_result'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E. coli MPN Result</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='ND'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='ecoli_mpn_remark'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E. coli MPN Remark</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='PASS'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Faecal Coliforms */}
                      <div className='grid grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='faecal_coliforms_mpn_result'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Faecal Coliforms MPN Result</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='ND'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='faecal_coliforms_mpn_remark'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Faecal Coliforms MPN Remark</FormLabel>
                              <FormControl>
                                <Input
                                  value={field.value?.toString() ?? ""}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  ref={field.ref}
                                  placeholder='PASS'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
            <Button type='button' variant='outline' onClick={handleDiscard}>
              Discard
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
