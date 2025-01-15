"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { CertificateEdit } from "@/components/certificates/certificate-edit";
import { createBrowserClient } from "@supabase/ssr";
import type { Certificate } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Initialize Supabase client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Certificate not found");

        setCertificate(data);
      } catch (err) {
        console.error("Error fetching certificate:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch certificate"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className='container py-10 space-y-4'>
        <p className='text-red-500'>{error || "Certificate not found"}</p>
        <Button asChild>
          <Link href='/'>Return to Certificates</Link>
        </Button>
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
            <BreadcrumbPage>Edit Certificate</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mb-8 mt-4'>
        <h1 className='text-3xl font-bold'>Edit Certificate</h1>
        <p className='text-muted-foreground'>
          Update the laboratory test report certificate.
        </p>
      </div>

      <CertificateEdit certificate={certificate} />
    </div>
  );
}
