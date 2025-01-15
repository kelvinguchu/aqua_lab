"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Initialize Supabase client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500/10 via-white/50 to-indigo-500/10 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/dashboard'>
              <Image src='/logo.png' alt='Logo' width={170} height={70} />
            </Link>
          </div>

          {/* Sign Out Button */}
          <Button
            variant='ghost'
            size='sm'
            onClick={handleSignOut}
            className='text-muted-foreground hover:text-foreground transition-colors'>
            <LogOut className='h-4 w-4 mr-2' />
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
