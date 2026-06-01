import type { Metadata } from "next";

import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import PageWrapper from "@/components/layout/PageWrapper";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Nakshi",
  description:
    "Luxury handcrafted fashion rooted in Indian heritage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white text-black antialiased">
        <Navbar />

        <PageWrapper>
          {children}
        </PageWrapper>

        <Footer />

        <BackToTop />
      </body>
    </html>
  );
}