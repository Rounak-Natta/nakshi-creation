"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import {
  Package,
  Pencil,
  Trash2,
  Star,
  ImageIcon,
  Eye,
  Loader2,
  PackageOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  stock: number;
  featured: boolean;
  status: string;
  category: {
    name: string;
  };
  images: {
    url: string;
  }[];
  _count: {
    images: number;
  };
}

interface Props {
  products: Product[];
}

function ProductsList({ products }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (deletingId) return;
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Failed to delete");
        return;
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setDeletingId(null);
    }
  }

  if (!products.length) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-surface/60 p-5 ring-1 ring-border">
          <PackageOpen size={40} className="text-muted/60" strokeWidth={1.2} />
        </div>
        <h3 className="mt-5 font-heading text-xl font-medium text-foreground">
          No products
        </h3>
        <p className="mt-1 text-sm text-muted">Create your first product.</p>
        <Link
          href="/admin/products/new"
          className="mt-5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
        >
          Create product
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="group rounded-xl border border-border/40 bg-surface/80 p-3 transition-all hover:border-border/80 hover:shadow-sm sm:p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: image + details */}
            <div className="flex min-w-0 flex-1 gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-surface shadow-sm">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.title}
                    fill
                    sizes="64px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package size={20} className="text-muted/50" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-base font-medium tracking-tight text-foreground">
                    {product.title}
                  </h3>
                  {product.featured && (
                    <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50/70 px-2 py-0 text-[10px] font-medium text-amber-800">
                      <Star size={10} className="fill-amber-600" />
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted/70">/{product.slug}</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-surface px-2 py-0 text-[10px] font-medium text-foreground/80 ring-1 ring-border/60">
                    {product.category.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-accent-soft/20 px-2 py-0 text-[10px] font-medium text-accent ring-1 ring-accent/20">
                    <ImageIcon size={10} />
                    {product._count.images}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0 text-[10px] font-medium ring-1 ${
                      product.status === "PUBLISHED"
                        ? "bg-emerald-50/70 text-emerald-800 ring-emerald-200"
                        : "bg-surface text-muted ring-border/60"
                    }`}
                  >
                    {product.status === "PUBLISHED" ? "Pub" : "Draft"}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0 text-[10px] font-medium ring-1 ${
                      product.stock > 10
                        ? "bg-sky-50/70 text-sky-800 ring-sky-200"
                        : product.stock > 0
                          ? "bg-amber-50/70 text-amber-800 ring-amber-200"
                          : "bg-rose-50/70 text-rose-800 ring-rose-200"
                    }`}
                    title={`Stock: ${product.stock}`}
                  >
                    S:{product.stock}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: price + actions */}
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <div className="rounded-lg border border-border/60 bg-surface px-3 py-1.5 shadow-sm">
                <p className="text-[9px] font-medium uppercase tracking-wider text-muted/70">
                  Price
                </p>
                <p className="font-heading text-sm font-medium text-foreground">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex gap-1.5">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-surface text-foreground/80 transition-all hover:bg-foreground hover:text-background"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </Link>
                <Link
                  href={`/product/${product.slug}`}
                  target="_blank"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-surface text-foreground/80 transition-all hover:bg-foreground hover:text-background"
                  aria-label="View"
                >
                  <Eye size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50/60 text-rose-700 transition-all hover:bg-rose-100 disabled:opacity-50"
                >
                  {deletingId === product.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ProductsList);