import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquatreat Lab",
  description: "Water & Effluent Treatment Specialists",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='light'>
      <body className={inter.className}>
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950'>
          <Navbar />
          <div className='pt-16'>{children}</div>

          {/* Creative background elements */}
          <div className='fixed inset-0 -z-10 overflow-hidden'>
            {/* Top-right blob */}
            <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl' />

            {/* Bottom-left blob */}
            <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl' />

            {/* Center pattern */}
            <div className='absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.01]' />
          </div>
        </div>
      </body>
    </html>
  );
}
