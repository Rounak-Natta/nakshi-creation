// app/categories/[categorySlug]/[subcategorySlug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export default async function SubcategoryPage({ params }: Props) {
  const { categorySlug, subcategorySlug } = await params;

  // Get the parent category to validate breadcrumb
  const parentCategory = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true, name: true },
  });

  if (!parentCategory) notFound();

  // Get the subcategory (must belong to parentCategory)
  const subcategory = await prisma.category.findFirst({
    where: {
      slug: subcategorySlug,
      parentId: parentCategory.id,
    },
    include: {
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

  if (!subcategory) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Breadcrumb + Header */}
      <div className="mb-10">
        <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
          <Link href={`/categories/${categorySlug}`} className="hover:underline">
            {parentCategory.name}
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{subcategory.name}</span>
        </div>
        <h1 className="text-4xl font-semibold">{subcategory.name}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {subcategory.products.length} products
        </p>
      </div>

      {/* Product grid */}
      {subcategory.products.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-neutral-500">No products found in this subcategory.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subcategory.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Reuse the same ProductCard (or move to a shared component)
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