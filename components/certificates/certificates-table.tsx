"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
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
import { Badge } from "@/components/ui/badge";
import type { Certificate } from "@/lib/supabase";

interface CertificatesTableProps {
  certificates: Certificate[];
}

export function CertificatesTable({ certificates }: CertificatesTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Certificate Number</TableHead>
          <TableHead>Sample Name</TableHead>
          <TableHead>Date Analyzed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.map((cert) => (
          <TableRow key={cert.id}>
            <TableCell className='font-medium'>
              {cert.certificate_number}
            </TableCell>
            <TableCell>{cert.sample_name}</TableCell>
            <TableCell>
              {format(new Date(cert.date_analyzed), "MMM d, yyyy")}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  cert.status === "published"
                    ? "default"
                    : cert.status === "draft"
                    ? "secondary"
                    : "outline"
                }>
                {cert.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm'>
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/certificates/${cert.id}/edit`)
                    }>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/certificates/${cert.id}/view`)
                    }>
                    View PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
