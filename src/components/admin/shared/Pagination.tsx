"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ page, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) rangeWithDots.push(1, "dots");
    else rangeWithDots.push(1);

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) rangeWithDots.push("dots", totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-accent px-4 py-3 shadow-md"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <Link
        href={`${basePath}?page=${Math.max(1, page - 1)}`}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all ${
          page === 1
            ? "pointer-events-none text-white/40"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <ChevronLeft size={15} />
        <span className="hidden sm:inline">Prev</span>
      </Link>

      {/* Page numbers */}
      {pages.map((p, idx) =>
        p === "dots" ? (
          <span
            key={`dots-${idx}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50"
          >
            <MoreHorizontal size={16} />
          </span>
        ) : (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-2 text-sm font-medium transition-all ${
              p === page
                ? "bg-white text-accent shadow-md"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {/* Next button */}
      <Link
        href={`${basePath}?page=${Math.min(totalPages, page + 1)}`}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all ${
          page === totalPages
            ? "pointer-events-none text-white/40"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={15} />
      </Link>
    </nav>
  );
}