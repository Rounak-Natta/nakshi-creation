import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { categorySlug } =
    await params;

  const category =
    await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },

      include: {
        children: {
          orderBy: {
            name: "asc",
          },
        },

        products: true,
      },
    });

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">

      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {category.name}
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          {category.products.length} products
        </p>
      </div>

      {category.children.length >
        0 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {category.children.map(
            (child) => (
              <a
                key={child.id}
                href={`/categories/${category.slug}/${child.slug}`}
                className="rounded-full border px-4 py-2 text-sm transition hover:bg-neutral-100"
              >
                {child.name}
              </a>
            )
          )}
        </div>
      )}

      {category.products.length ===
      0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-neutral-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {category.products.map(
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