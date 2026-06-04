// app/categories/[categorySlug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      children: {
        orderBy: { name: "asc" },
        select: { id: true, name: true, slug: true },
      },
      products: {
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category.name}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {category.products.length} products
        </p>
      </div>

      {/* Subcategory pills */}
      {category.children.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {category.children.map((child) => (
            <Link
              key={child.id}
              href={`/categories/${category.slug}/${child.slug}`}
              className="rounded-full border px-4 py-2 text-sm transition hover:bg-neutral-100"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      {/* Product grid */}
      {category.products.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-neutral-500">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Product Card Component (reusable)
function ProductCard({ product }: { product: any }) {
  const primaryImage = product.images[0];
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              No image
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 group-hover:underline">
            {product.title}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-neutral-900">
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-neutral-500 line-through">
                  ₹{product.comparePrice.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-green-600">
                  {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}