import { notFound } from "next/navigation";

import { PencilLine } from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProductEditForm from "@/components/admin/products/ProductEditForm";

import ProductImages from "@/components/admin/products/ProductImages";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: Props) {
  const { id } =
    await params;

  const [product, categories] =
    await Promise.all([
      prisma.product.findUnique({
        where: {
          id,
        },

        include: {
          images: {
            orderBy: {
              position: "asc",
            },
          },
        },
      }),

      prisma.category.findMany({
        where: {
          parentId: null,
        },

        include: {
          children: {
            select: {
              id: true,
              name: true,
            },

            orderBy: {
              name: "asc",
            },
          },
        },

        orderBy: {
          name: "asc",
        },
      }),
    ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div
        className="
          rounded-3xl
          bg-white
          p-8
          shadow-sm
          ring-1
          ring-zinc-200/60
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-zinc-100
            "
          >
            <PencilLine size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Edit Product
            </h1>

            <p className="mt-2 text-muted">
              Update product details,
              pricing, inventory,
              SEO and media.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ProductEditForm
            product={product}
            categories={categories}
          />
        </div>
      </div>

      <ProductImages
        productId={product.id}
        images={product.images}
      />
    </div>
  );
}