import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import localFont from "next/font/local";

const geistmono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geistmono",
});

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
      <body className={geistmono.className}>
        <Providers>
          <div className='min-h-screen bg-[#EBF3FB]'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
