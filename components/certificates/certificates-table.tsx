"use client";

import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Certificate } from "@/lib/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CertificatesTableProps {
  certificates: Certificate[];
  onNew: () => void;
}

type TestCard = {
  label: string;
  result: string | number | null;
  remark: string | null;
};

const getRemarkColor = (remark: string | null) => {
  if (!remark) return "text-muted-foreground";
  const remarkUpper = remark.toUpperCase();
  if (remarkUpper === "PASS")
    return "text-emerald-600 dark:text-emerald-400 font-medium";
  if (remarkUpper === "FAIL")
    return "text-red-600 dark:text-red-400 font-medium";
  return "text-muted-foreground";
};

export function CertificatesTable({
  certificates,
  onNew,
}: CertificatesTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const generatePDF = async (certificate: Certificate) => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your report...",
      });

      // Create a display version of the certificate for PDF
      const certificateDisplayData: Certificate = {
        ...certificate,
        date_of_report: format(
          new Date(certificate.date_of_report),
          "dd/MM/yyyy"
        ),
        date_of_sampling: format(
          new Date(certificate.date_of_sampling),
          "dd/MM/yyyy"
        ),
        date_sample_received: format(
          new Date(certificate.date_sample_received),
          "dd/MM/yyyy"
        ),
        date_of_analysis: format(
          new Date(certificate.date_of_analysis),
          "dd/MM/yyyy"
        ),
        date_of_report_issue: format(
          new Date(certificate.date_of_report_issue),
          "dd/MM/yyyy"
        ),
      };

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
      link.download = `${certificate.certificate_id}-certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Report generated successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate report. Please try again.",
      });
    }
  };

  const renderTestCard = (test: TestCard) => (
    <div
      key={test.label}
      className='bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      <p className='text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
        {test.label}
      </p>
      <p className='text-sm text-muted-foreground mt-1'>
        Result: {test.result?.toString() ?? "N/A"}
      </p>
      <p className={`text-sm ${getRemarkColor(test.remark)}`}>
        Remark: {test.remark ?? "N/A"}
      </p>
    </div>
  );

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-muted-foreground'>
            <span className='text-lg font-medium'>Total Certificates:</span>
            <span className='ml-2 text-2xl font-bold text-foreground'>
              {certificates.length}
            </span>
          </div>
          <Button
            onClick={onNew}
            className='relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
            <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200'></div>
            <Plus className='mr-2 h-4 w-4' />
            New Certificate
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate ID</TableHead>
              <TableHead>Sample ID</TableHead>
              <TableHead>Sample Source</TableHead>
              <TableHead>Date of Analysis</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.certificate_id}</TableCell>
                <TableCell>{cert.sample_id}</TableCell>
                <TableCell>{cert.sample_source}</TableCell>
                <TableCell>
                  {format(new Date(cert.date_of_analysis), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setSelectedCertificate(cert)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/certificates/${cert.id}/edit`)
                        }>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => generatePDF(cert)}>
                        Generate Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet
        open={!!selectedCertificate}
        onOpenChange={() => setSelectedCertificate(null)}>
        <SheetContent className='min-w-[60vw] overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
          {selectedCertificate && (
            <div className='space-y-8 pb-8'>
              <SheetHeader>
                <SheetTitle className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Certificate Details
                </SheetTitle>
              </SheetHeader>

              {/* Header Information */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Header Information
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Certificate ID
                    </p>
                    <p className='font-medium'>
                      {selectedCertificate.certificate_id}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Sample ID</p>
                    <p className='font-medium'>
                      {selectedCertificate.sample_id}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Description of Sample
                    </p>
                    <p className='font-medium'>
                      {selectedCertificate.description_of_sample}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Sample Source
                    </p>
                    <p className='font-medium'>
                      {selectedCertificate.sample_source}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Submitted By
                    </p>
                    <p className='font-medium'>
                      {selectedCertificate.submitted_by}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Customer Contact
                    </p>
                    <p className='font-medium'>
                      {selectedCertificate.customer_contact}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Dates */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Dates
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Date of Report
                    </p>
                    <p className='font-medium'>
                      {format(
                        parseISO(selectedCertificate.date_of_report),
                        "PPP"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Date of Report Issue
                    </p>
                    <p className='font-medium'>
                      {format(
                        parseISO(selectedCertificate.date_of_report_issue),
                        "PPP"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Date of Sampling
                    </p>
                    <p className='font-medium'>
                      {format(
                        parseISO(selectedCertificate.date_of_sampling),
                        "PPP"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Date Sample Received
                    </p>
                    <p className='font-medium'>
                      {format(
                        parseISO(selectedCertificate.date_sample_received),
                        "PPP"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Date of Analysis
                    </p>
                    <p className='font-medium'>
                      {format(
                        parseISO(selectedCertificate.date_of_analysis),
                        "PPP"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Physical Tests */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Physical Tests
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      label: "pH",
                      result: selectedCertificate.ph_result,
                      remark: selectedCertificate.ph_remark,
                    },
                    {
                      label: "Turbidity",
                      result: selectedCertificate.turbidity_result,
                      remark: selectedCertificate.turbidity_remark,
                    },
                    {
                      label: "Color",
                      result: selectedCertificate.color_result,
                      remark: selectedCertificate.color_remark,
                    },
                    {
                      label: "TSS",
                      result: selectedCertificate.tss_result,
                      remark: selectedCertificate.tss_remark,
                    },
                    {
                      label: "TDS",
                      result: selectedCertificate.tds_result,
                      remark: selectedCertificate.tds_remark,
                    },
                    {
                      label: "Conductivity",
                      result: selectedCertificate.conductivity_result,
                      remark: selectedCertificate.conductivity_remark,
                    },
                  ].map(renderTestCard)}
                </div>
              </div>

              <Separator />

              {/* Chemical Tests (Anions) */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Chemical Tests (Anions)
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      label: "pH Alkalinity",
                      result: selectedCertificate.ph_alkalinity_result,
                      remark: selectedCertificate.ph_alkalinity_remark,
                    },
                    {
                      label: "Total Alkalinity",
                      result: selectedCertificate.total_alkalinity_result,
                      remark: selectedCertificate.total_alkalinity_remark,
                    },
                    {
                      label: "Chloride",
                      result: selectedCertificate.chloride_result,
                      remark: selectedCertificate.chloride_remark,
                    },
                    {
                      label: "Fluoride",
                      result: selectedCertificate.fluoride_result,
                      remark: selectedCertificate.fluoride_remark,
                    },
                    {
                      label: "Sulfate",
                      result: selectedCertificate.sulfate_result,
                      remark: selectedCertificate.sulfate_remark,
                    },
                    {
                      label: "Nitrate",
                      result: selectedCertificate.nitrate_result,
                      remark: selectedCertificate.nitrate_remark,
                    },
                    {
                      label: "Nitrite",
                      result: selectedCertificate.nitrite_result,
                      remark: selectedCertificate.nitrite_remark,
                    },
                    {
                      label: "Phosphate",
                      result: selectedCertificate.phosphate_result,
                      remark: selectedCertificate.phosphate_remark,
                    },
                    {
                      label: "Sulfide",
                      result: selectedCertificate.sulfide_result,
                      remark: selectedCertificate.sulfide_remark,
                    },
                  ].map(renderTestCard)}
                </div>
              </div>

              <Separator />

              {/* Chemical Tests (Cations) */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Chemical Tests (Cations)
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      label: "Potassium",
                      result: selectedCertificate.potassium_result,
                      remark: selectedCertificate.potassium_remark,
                    },
                    {
                      label: "Calcium",
                      result: selectedCertificate.calcium_result,
                      remark: selectedCertificate.calcium_remark,
                    },
                    {
                      label: "Magnesium",
                      result: selectedCertificate.magnesium_result,
                      remark: selectedCertificate.magnesium_remark,
                    },
                    {
                      label: "Iron",
                      result: selectedCertificate.iron_result,
                      remark: selectedCertificate.iron_remark,
                    },
                    {
                      label: "Manganese",
                      result: selectedCertificate.manganese_result,
                      remark: selectedCertificate.manganese_remark,
                    },
                    {
                      label: "Ammonia",
                      result: selectedCertificate.ammonia_result,
                      remark: selectedCertificate.ammonia_remark,
                    },
                    {
                      label: "Copper",
                      result: selectedCertificate.copper_result,
                      remark: selectedCertificate.copper_remark,
                    },
                    {
                      label: "Zinc",
                      result: selectedCertificate.zinc_result,
                      remark: selectedCertificate.zinc_remark,
                    },
                    {
                      label: "Chromium",
                      result: selectedCertificate.chromium_result,
                      remark: selectedCertificate.chromium_remark,
                    },
                  ].map(renderTestCard)}
                </div>
              </div>

              <Separator />

              {/* Other Parameters */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Other Parameters
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      label: "Total Hardness",
                      result: selectedCertificate.total_hardness_result,
                      remark: selectedCertificate.total_hardness_remark,
                    },
                    {
                      label: "Calcium Hardness",
                      result: selectedCertificate.calcium_hardness_result,
                      remark: selectedCertificate.calcium_hardness_remark,
                    },
                    {
                      label: "Magnesium Hardness",
                      result: selectedCertificate.magnesium_hardness_result,
                      remark: selectedCertificate.magnesium_hardness_remark,
                    },
                    {
                      label: "Silica",
                      result: selectedCertificate.silica_result,
                      remark: selectedCertificate.silica_remark,
                    },
                    {
                      label: "Free Chlorine",
                      result: selectedCertificate.free_chlorine_result,
                      remark: selectedCertificate.free_chlorine_remark,
                    },
                  ].map(renderTestCard)}
                </div>
              </div>

              <Separator />

              {/* Microbiological Tests */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Microbiological Tests
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      label: "Total Viable Counts",
                      result: selectedCertificate.total_viable_counts_result,
                      remark: selectedCertificate.total_viable_counts_remark,
                    },
                    {
                      label: "Coliforms MPN",
                      result: selectedCertificate.coliforms_mpn_result,
                      remark: selectedCertificate.coliforms_mpn_remark,
                    },
                    {
                      label: "E. coli MPN",
                      result: selectedCertificate.ecoli_mpn_result,
                      remark: selectedCertificate.ecoli_mpn_remark,
                    },
                    {
                      label: "Faecal Coliforms MPN",
                      result: selectedCertificate.faecal_coliforms_mpn_result,
                      remark: selectedCertificate.faecal_coliforms_mpn_remark,
                    },
                  ].map(renderTestCard)}
                </div>
              </div>

              <Separator />

              {/* Comments */}
              <div className='rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-sm'>
                <h3 className='text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  Comments
                </h3>
                <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                  {selectedCertificate.comments}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
