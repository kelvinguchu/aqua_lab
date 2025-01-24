"use client";

import { CertificateForm } from "./form/certificate-form";

interface CertificateNewProps {
  onClose?: () => void;
}

export function CertificateNew({ onClose }: CertificateNewProps) {
  return <CertificateForm onSuccess={onClose} />;
}
