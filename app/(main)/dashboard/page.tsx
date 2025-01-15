"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CertificatesTable } from "@/components/certificates/certificates-table";
import { supabase } from "@/lib/supabase";
import type { Certificate } from "@/lib/supabase";

export default function Dashboard() {
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
      <div className='flex items-center justify-center min-h-screen pt-16'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary' />
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
