import Link from "next/link";
import { Suspense } from "react";
import { PackagePlus, PackageOpen } from "lucide-react";

import { prisma } from "@/lib/prisma";
import ProductsList from "@/components/admin/products/ProductsList";
import Pagination from "@/components/admin/shared/Pagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 10;

function ProductsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 rounded-xl border border-border/40 bg-surface/80 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex gap-3">
            <div className="h-16 w-16 animate-pulse rounded-lg bg-border/60" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 animate-pulse rounded bg-border/60" />
              <div className="h-3 w-24 animate-pulse rounded bg-border/60" />
              <div className="flex gap-1.5">
                <div className="h-5 w-12 animate-pulse rounded-full bg-border/50" />
                <div className="h-5 w-12 animate-pulse rounded-full bg-border/50" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-20 animate-pulse rounded-lg bg-border/60" />
            <div className="h-8 w-8 animate-pulse rounded-lg bg-border/60" />
            <div className="h-8 w-8 animate-pulse rounded-lg bg-border/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-8 w-16 animate-pulse rounded-full bg-border/60" />
      <div className="h-8 w-8 animate-pulse rounded-full bg-border/60" />
      <div className="h-8 w-8 animate-pulse rounded-full bg-foreground/20" />
      <div className="h-8 w-8 animate-pulse rounded-full bg-border/60" />
      <div className="h-8 w-16 animate-pulse rounded-full bg-border/60" />
    </div>
  );
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const skip = (page - 1) * PAGE_SIZE;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: PAGE_SIZE,
      include: {
        category: { select: { name: true } },
        images: { where: { isPrimary: true }, take: 1, select: { url: true } },
        _count: { select: { images: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col px-4 sm:px-6">
      {/* Compact header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-baseline gap-3">
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Products
          </h1>
          <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface px-2.5 py-0.5 text-xs font-medium text-muted shadow-sm">
            <PackageOpen size={12} className="text-accent" />
            {total}
          </div>
        </div>

        <Link
          href="/admin/products/new"
          className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-sans text-xs font-medium uppercase tracking-wide text-background shadow-md transition-all hover:bg-foreground/90 hover:-translate-y-0.5"
        >
          <PackagePlus size={14} />
          Create
        </Link>
      </div>

      {/* Main card – more compact */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border/40 bg-surface/30 shadow-sm">
        <div className="admin-scrollbar flex-1 overflow-y-auto p-3 sm:p-4">
          <Suspense fallback={<ProductsListSkeleton />}>
            <ProductsList products={products} />
          </Suspense>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-border/40 bg-surface/60 px-4 py-3 sm:px-6">
            <Suspense fallback={<PaginationSkeleton />}>
              <Pagination page={page} totalPages={totalPages} basePath="/admin/products" />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}