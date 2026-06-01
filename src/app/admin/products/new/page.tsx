import { PackagePlus } from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProductForm from "@/components/admin/products/productForm";

export default async function CreateProductPage() {
  const categories =
    await prisma.category.findMany({
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
    });

  return (
    <div className="mx-auto max-w-6xl">
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
            <PackagePlus size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Create Product
            </h1>

            <p className="mt-2 text-muted">
              Add a new product to your
              catalog.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <ProductForm
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}