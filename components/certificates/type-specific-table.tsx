"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
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

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 w-full max-w-sm'>
            <Input
              placeholder='Search certificates...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='h-9'
            />
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

        <div className='rounded-md border'>
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
              {filteredCertificates.map((cert) => (
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
                          onClick={() => setEditingCertificate(cert)}>
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
