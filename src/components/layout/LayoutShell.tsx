"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

interface Props {
  children: React.ReactNode;
}

export default function LayoutShell({
  children,
}: Props) {
  const pathname = usePathname();

  const isAdmin =
    pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="pt-[72px] md:pt-[88px]">
        {children}
      </main>

      <Footer />

      <BackToTop />
    </>
  );
}