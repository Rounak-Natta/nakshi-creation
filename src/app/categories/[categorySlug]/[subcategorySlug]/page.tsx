import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export default async function SubcategoryPage({
  params,
}: Props) {
  const {
    categorySlug,
    subcategorySlug,
  } = await params;

  const category =
    await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },

      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

  if (!category) {
    notFound();
  }

  const subcategory =
    await prisma.category.findFirst({
      where: {
        slug: subcategorySlug,
        parentId: category.id,
      },

      include: {
        products: true,
      },
    });

  if (!subcategory) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">

      <div className="mb-10">
        <p className="mb-2 text-sm text-neutral-500">
          {category.name}
        </p>

        <h1 className="text-4xl font-semibold">
          {subcategory.name}
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {
            subcategory.products
              .length
          }{" "}
          products
        </p>
      </div>

      {subcategory.products
        .length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-neutral-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {subcategory.products.map(
            (product) => (
              <div
                key={product.id}
                className="rounded-2xl border p-4"
              >
                <h3 className="font-medium">
                  {product.title}
                </h3>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}