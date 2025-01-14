"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CertificatesTable } from "@/components/certificates/certificates-table";
import { CertificatesStats } from "@/components/certificates/certificates-stats";
import { supabase, type Certificate } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching certificates:", error);
      } else {
        setCertificates(data || []);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary' />
      </div>
    );
  }

  return (
    <main className='container mx-auto py-10 px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-y-8'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent'>
              Certificates
            </h1>
            <p className='text-muted-foreground mt-2'>
              Manage and generate water analysis certificates
            </p>
          </div>
          <Button
            onClick={() => router.push("/certificates/new")}
            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'>
            <Plus className='mr-2 h-4 w-4' />
            New Certificate
          </Button>
        </div>

        {/* Stats */}
        <CertificatesStats certificates={certificates} />

        {/* Table */}
        <Card className='mt-8 overflow-hidden border-0 shadow-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>
              Recent Certificates
            </CardTitle>
            <CardDescription>
              A list of all certificates and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CertificatesTable certificates={certificates} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
