"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Plus,
  MoreHorizontal,
  FileSpreadsheet,
  Search,
  Filter,
  Pencil,
  FileOutput,
  Archive,
  ArchiveRestore,
  RefreshCw,
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
import { Badge } from "@/components/ui/badge";
import {
  toggleCertificateArchiveStatus,
  publishCertificate,
} from "@/lib/actions/certificates/status";
import { fetchCertificateResults } from "@/lib/actions/certificates/results";

interface TypeSpecificTableProps {
  certificates: Certificate[];
  type:
    | "physical_chemical"
    | "microbiological"
    | "effluent"
    | "irrigation"
    | "borehole";
  onNew: () => void;
  onRefresh: () => void;
}

// Add status badge mapping
const statusConfig = {
  draft: {
    variant: "secondary" as const,
    label: "Draft",
  },
  published: {
    variant: "default" as const,
    label: "Published",
  },
  archived: {
    variant: "outline" as const,
    label: "Archived",
  },
};

export function TypeSpecificTable({
  certificates,
  type,
  onNew,
  onRefresh,
}: TypeSpecificTableProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // Calculate certificate counts
  const certificateCounts = {
    total: certificates.length,
    published: certificates.filter((cert) => cert.status === "published")
      .length,
    draft: certificates.filter((cert) => cert.status === "draft").length,
    archived: certificates.filter((cert) => cert.status === "archived").length,
  };

  // Filter certificates based on search query only
  const filteredCertificates = certificates.filter((cert) =>
    Object.values(cert).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Function to handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing",
      description: "Updating table data...",
    });

    // Refetch the data
    await onRefresh();

    // Reset the refreshing state and show success toast
    setIsRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Table data has been updated",
    });
  };

  const generatePDF = async (certificate: Certificate) => {
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your report...",
      });

      // If certificate is in draft, publish it
      if (certificate.status === "draft") {
        const publishResult = await publishCertificate(
          certificate.id,
          certificate.status
        );

        if (publishResult.error) {
          throw new Error(publishResult.error);
        }

        // Update the certificate data with the published status
        certificate = publishResult.data;
      }

      // Fetch the corresponding results
      const resultsResponse = await fetchCertificateResults(
        certificate.id,
        type
      );

      if (resultsResponse.error) {
        throw new Error(resultsResponse.error);
      }

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

      // Convert type from underscore to hyphen for file path
      const templateType = type.replace("_", "-");

      // Import the correct PDF template based on certificate type
      const templateModule = await import(
        `@/components/certificates/pdf/templates/${templateType}.tsx`
      );
      const Template =
        templateModule[
          `${type
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")}PDF`
        ];

      if (!Template) {
        throw new Error(`PDF template not found for type: ${type}`);
      }

      const { pdf } = await import("@react-pdf/renderer");

      const blob = await pdf(
        <Template
          certificate={certificateDisplayData}
          results={resultsResponse.data}
        />
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
        description:
          certificate.status === "draft"
            ? "Certificate published and report generated successfully"
            : "Report generated successfully",
      });

      // Refresh the page to show updated status
      router.refresh();
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate report. Please try again.",
      });
    }
  };

  const handleArchiveToggle = async (certificate: Certificate) => {
    try {
      const result = await toggleCertificateArchiveStatus(
        certificate.id,
        certificate.status as "draft" | "published" | "archived"
      );

      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Success",
        description: `Certificate ${
          certificate.status === "archived" ? "unarchived" : "archived"
        } successfully`,
      });

      // Refresh the page to show updated status
      router.refresh();
    } catch (error) {
      console.error("Error toggling archive status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update certificate status. Please try again.",
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
        {/* Certificate Statistics */}
        <div className='grid grid-cols-4 gap-4 mb-6'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm'>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              Total Certificates
            </div>
            <div className='text-2xl font-bold'>{certificateCounts.total}</div>
          </div>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm'>
            <div className='text-sm text-green-600 dark:text-green-400'>
              Published
            </div>
            <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
              {certificateCounts.published}
            </div>
          </div>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm'>
            <div className='text-sm text-yellow-600 dark:text-yellow-400'>
              Draft
            </div>
            <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
              {certificateCounts.draft}
            </div>
          </div>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm'>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Archived
            </div>
            <div className='text-2xl font-bold text-gray-600 dark:text-gray-400'>
              {certificateCounts.archived}
            </div>
          </div>
        </div>

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
            <Button
              variant='outline'
              size='icon'
              className='h-9 w-9'
              onClick={handleRefresh}
              disabled={isRefreshing}>
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
              />
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
                  <TableHead className='font-semibold'>Status</TableHead>
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
                      {cert.certificate_id || "N/A"}
                    </TableCell>
                    <TableCell>{cert.sample_id || "Not specified"}</TableCell>
                    <TableCell>
                      {cert.sample_source || "Source not specified"}
                    </TableCell>
                    <TableCell>
                      {cert.date_of_analysis
                        ? format(new Date(cert.date_of_analysis), "dd/MM/yyyy")
                        : "Date not set"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          statusConfig[cert.status as keyof typeof statusConfig]
                            .variant
                        }
                        className={cn(
                          "capitalize",
                          cert.status === "draft" &&
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
                          cert.status === "published" &&
                            "bg-green-100 text-green-800 hover:bg-green-100/80",
                          cert.status === "archived" &&
                            "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
                        )}>
                        {
                          statusConfig[cert.status as keyof typeof statusConfig]
                            .label
                        }
                      </Badge>
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
                        <DropdownMenuContent
                          align='end'
                          className='w-[190px] p-2 shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-md'>
                          <DropdownMenuLabel className='font-semibold text-sm px-2 py-1.5 text-gray-500 dark:text-gray-400'>
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => setEditingCertificate(cert)}
                            className='cursor-pointer relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300'>
                            <Pencil className='h-4 w-4 text-blue-500' />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => generatePDF(cert)}
                            className='cursor-pointer relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-blue-50 dark:hover:bg-blue-900/50 text-gray-700 dark:text-gray-300'>
                            <FileOutput className='h-4 w-4 text-indigo-500' />
                            Generate report
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleArchiveToggle(cert)}
                            className={cn(
                              "cursor-pointer relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-gray-700 dark:text-gray-300",
                              cert.status === "archived"
                                ? "hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                : "hover:bg-amber-50 dark:hover:bg-amber-900/30"
                            )}>
                            {cert.status === "archived" ? (
                              <ArchiveRestore className='h-4 w-4 text-emerald-500' />
                            ) : (
                              <Archive className='h-4 w-4 text-amber-500' />
                            )}
                            {cert.status === "archived"
                              ? "Unarchive"
                              : "Archive"}
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
