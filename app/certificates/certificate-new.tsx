"use client";

import { CertificateForm } from "@/components/certificates/form/certificate-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewCertificate() {
  return (
    <div className='container mx-auto py-6'>
      <Card>
        <CardHeader>
          <CardTitle>New Water Analysis Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificateForm />
        </CardContent>
      </Card>
    </div>
  );
}
