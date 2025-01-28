"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Plus,
  MoreHorizontal,
  FileSpreadsheet,
  Search,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Certificate } from "@/lib/supabase";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TypeSpecificEditDrawer } from "./type-specific-edit-drawer";
import { cn } from "@/lib/utils";

interface TypeSpecificTableProps {
  certificates: Certificate[];
  type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole";
  onNew: () => void;
}

export function TypeSpecificTable({
  certificates,
  type,
  onNew,
}: TypeSpecificTableProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter((cert) =>
    Object.values(cert).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const generatePDF = async (certificate: Certificate) => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your report...",
      });

      // Create a display version of the certificate for PDF
      const certificateDisplayData = {
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

      // Import the correct PDF template based on certificate type
      const { default: Template } = await import(
        `@/components/certificates/pdf/templates/${type}.tsx`
      );
      const { pdf } = await import("@react-pdf/renderer");

      const blob = await pdf(
        <Template certificate={certificateDisplayData} />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      // Create download link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificate.certificate_id}-${type}-certificate.pdf`;
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

  // Empty state component
  const EmptyState = () => (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <FileSpreadsheet className='h-16 w-16 text-gray-400 mb-4' />
      <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
        No Certificates Found
      </h3>
      <p className='text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm'>
        {searchQuery
          ? "No certificates match your search criteria. Try adjusting your search."
          : `Get started by creating your first ${type.replace(
              "_",
              " "
            )} certificate.`}
      </p>
      <Button
        onClick={onNew}
        className='relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
        <Plus className='mr-2 h-4 w-4' />
        Create Certificate
      </Button>
    </div>
  );

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center flex-1 max-w-sm space-x-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
              <Input
                placeholder='Search certificates...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-8 h-9'
              />
            </div>
            <Button variant='outline' size='icon' className='h-9 w-9'>
              <Filter className='h-4 w-4' />
            </Button>
          </div>
          <Button
            onClick={onNew}
            className='relative overflow-hidden group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
            <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-200'></div>
            <Plus className='mr-2 h-4 w-4' />
            New{" "}
            {type
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            Certificate
          </Button>
        </div>

        {filteredCertificates.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='rounded-lg border bg-card'>
            <Table>
              <TableHeader>
                <TableRow className='bg-muted/50'>
                  <TableHead className='font-semibold'>
                    Certificate ID
                  </TableHead>
                  <TableHead className='font-semibold'>Sample ID</TableHead>
                  <TableHead className='font-semibold'>Sample Source</TableHead>
                  <TableHead className='font-semibold'>
                    Date of Analysis
                  </TableHead>
                  <TableHead className='text-right font-semibold'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((cert) => (
                  <TableRow
                    key={cert.id}
                    className='hover:bg-muted/50 transition-colors'>
                    <TableCell className='font-medium'>
                      {cert.certificate_id}
                    </TableCell>
                    <TableCell>{cert.sample_id}</TableCell>
                    <TableCell>{cert.sample_source}</TableCell>
                    <TableCell>
                      {format(new Date(cert.date_of_analysis), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0 hover:bg-muted'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-[160px]'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setEditingCertificate(cert)}
                            className='cursor-pointer'>
                            Edit certificate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => generatePDF(cert)}
                            className='cursor-pointer'>
                            Generate report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <TypeSpecificEditDrawer
        open={!!editingCertificate}
        onOpenChange={(open) => !open && setEditingCertificate(null)}
        type={type}
        certificate={editingCertificate}
      />
    </>
  );
}
