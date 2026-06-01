"use client";

import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({
  children,
}: Props) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth");

  return (
    <main
      className={
        hideLayout
          ? ""
          : "pt-24"
      }
    >
      {children}
    </main>
  );
}