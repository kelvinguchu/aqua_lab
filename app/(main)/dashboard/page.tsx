"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CertificatesTable } from "@/components/certificates/certificates-table";
import { supabase } from "@/lib/supabase";
import type { Certificate } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fetch function for certificates
const fetchCertificates = async () => {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export default function Dashboard() {
  const router = useRouter();

  // Use React Query for caching and automatic revalidation
  const {
    data: certificates = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Certificate[], Error>({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when internet reconnects
    retry: 3, // Retry failed requests 3 times
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen pt-16'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24'>
        <Alert variant='destructive' className='mb-6'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || "Failed to load certificates"}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24'>
      <Card className='overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg'>
        <CardContent className='pt-6'>
          <CertificatesTable
            certificates={certificates}
            onNew={() => router.push("/certificates/new")}
          />
        </CardContent>
      </Card>
    </main>
  );
}
