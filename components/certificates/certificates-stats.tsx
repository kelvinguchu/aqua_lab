import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Certificate } from "@/lib/supabase";

interface CertificatesStatsProps {
  certificates: Certificate[];
}

export function CertificatesStats({ certificates }: CertificatesStatsProps) {
  const totalDraft = certificates.filter(
    (cert) => cert.status === "draft"
  ).length;
  const totalPublished = certificates.filter(
    (cert) => cert.status === "published"
  ).length;
  const totalArchived = certificates.filter(
    (cert) => cert.status === "archived"
  ).length;

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{certificates.length}</div>
          <p className='text-xs text-muted-foreground'>
            All time certificates generated
          </p>
        </CardContent>
      </Card>

      <Card className='bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Draft</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalDraft}</div>
          <p className='text-xs text-muted-foreground'>
            Certificates pending review
          </p>
        </CardContent>
      </Card>

      <Card className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Published</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalPublished}</div>
          <p className='text-xs text-muted-foreground'>Active certificates</p>
        </CardContent>
      </Card>

      <Card className='bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Archived</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalArchived}</div>
          <p className='text-xs text-muted-foreground'>Historical records</p>
        </CardContent>
      </Card>
    </div>
  );
}
