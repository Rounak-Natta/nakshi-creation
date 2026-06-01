import Link from "next/link";

import { prisma } from "@/lib/prisma";

import CategoriesList from "@/components/admin/categories/CategoriesList";

export default async function CategoriesPage() {
  const categories =
    await prisma.category.findMany({
      where: {
        parentId: null,
      },

      include: {
        children: {
          include: {
            _count: {
              select: {
                products: true,
              },
            },
          },

          orderBy: {
            name: "asc",
          },
        },

        _count: {
          select: {
            products: true,
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-2 text-muted">
            Manage categories and
            subcategories
          </p>
        </div>

        <Link
          href="/admin/categories/create"
          className="rounded-xl bg-accent px-5 py-3 text-white"
        >
          Create Category
        </Link>
      </div>

      <CategoriesList
        categories={categories}
      />
    </div>
  );
}