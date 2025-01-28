"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypeSpecificTable } from "@/components/certificates/type-specific-table";
import { TypeSpecificDrawer } from "@/components/certificates/type-specific-drawer";
import { supabase } from "@/lib/supabase";
import type { Certificate } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CertificateType =
  | "physical_chemical"
  | "microbiological"
  | "effluent"
  | "irrigation"
  | "borehole";

// Fetch function for certificates
const fetchCertificates = async (
  type: CertificateType
): Promise<Certificate[]> => {
  const { data, error } = await supabase
    .from("certificates")
    .select(
      `
      *,
      physical_chemical_results(*),
      microbiological_results(*),
      effluent_results(*),
      irrigation_results(*),
      borehole_results(*)
    `
    )
    .eq("certificate_type", type)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

const certificateTypes: CertificateType[] = [
  "physical_chemical",
  "microbiological",
  "effluent",
  "irrigation",
  "borehole",
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedType, setSelectedType] =
    useState<CertificateType>("physical_chemical");
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);

  // Use useQueries to fetch data for all certificate types simultaneously
  const queries = useQueries({
    queries: certificateTypes.map((type) => ({
      queryKey: ["certificates", type],
      queryFn: () => fetchCertificates(type),
      staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
    })),
  });

  // Check if any query is loading
  const isLoading = queries.some((query) => query.isLoading);

  // Check if any query has an error
  const hasError = queries.some((query) => query.isError);
  const firstError = queries.find((query) => query.error)?.error;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen pt-16'>
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24'>
        <Alert variant='destructive' className='mb-6'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {firstError?.message || "Failed to load certificates"}
          </AlertDescription>
        </Alert>
        <Button onClick={() => queries.forEach((query) => query.refetch())}>
          Try Again
        </Button>
      </div>
    );
  }

  // Get the certificates for the selected type
  const selectedTypeIndex = certificateTypes.indexOf(selectedType);
  const certificates = queries[selectedTypeIndex].data || [];

  return (
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24'>
      <Card className='overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg'>
        <CardContent className='pt-6'>
          <Tabs
            defaultValue='physical_chemical'
            value={selectedType}
            onValueChange={(value) =>
              setSelectedType(value as CertificateType)
            }>
            <TabsList className='grid w-full grid-cols-5'>
              <TabsTrigger value='physical_chemical'>
                Physical Chemical
              </TabsTrigger>
              <TabsTrigger value='microbiological'>Microbiological</TabsTrigger>
              <TabsTrigger value='effluent'>Effluent</TabsTrigger>
              <TabsTrigger value='irrigation'>Irrigation</TabsTrigger>
              <TabsTrigger value='borehole'>Borehole</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedType}>
              <TypeSpecificTable
                certificates={certificates}
                type={selectedType}
                onNew={() => setIsNewDrawerOpen(true)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <TypeSpecificDrawer
        open={isNewDrawerOpen}
        onOpenChange={setIsNewDrawerOpen}
        type={selectedType}
      />
    </main>
  );
}
