import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"], // cleaner weights
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"], // tighter look
});

export const metadata: Metadata = {
  title: "Nakshi Creation",
  description: "Your All In One Showroom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">

        <Navbar />

        {/* Better spacing for mobile */}
        <main className="flex-1 pt-[65px] md:pt-[100px]">
          {children}
        </main>
<Footer/>
      </body>
    </html>
  );
}