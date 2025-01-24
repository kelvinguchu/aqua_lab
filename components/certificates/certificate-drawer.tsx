"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CertificateNew } from "@/components/certificates/certificate-new";

interface CertificateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateDrawer({
  open,
  onOpenChange,
}: CertificateDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='max-h-[100vh]'>
        <DrawerHeader className='sticky top-0 z-50 bg-background border-b py-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>New Certificate</h2>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className='overflow-y-auto px-4'>
          <CertificateNew onClose={() => onOpenChange(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
