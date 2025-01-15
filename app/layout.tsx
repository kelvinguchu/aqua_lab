import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <div className='min-h-screen bg-[#EBF3FB]'>{children}</div>
      </body>
    </html>
  );
}
