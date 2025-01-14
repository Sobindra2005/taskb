import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { DNDwrapper } from "@/lib/dndwrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase  flex `}
      >
        <div className="min-w-[14rem]"><Sidebar /></div>

        <div className="w-full" >
          <Header />
          <DNDwrapper>
            {children}
          </DNDwrapper>
        </div>
      </body>
    </html>
  );
}
