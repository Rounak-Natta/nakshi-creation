import Link from "next/link";

import { prisma } from "@/lib/prisma";

import CategoriesTable from "@/components/admin/categories/CategoriesTable";

export default async function CategoriesPage() {
  const categories =
    await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="mt-2 text-muted">
            Manage all categories
          </p>
        </div>

        <Link
          href="/admin/categories/create"
          className="rounded-xl bg-accent px-5 py-3 text-white"
        >
          Create Category
        </Link>
      </div>

      <CategoriesTable
        categories={categories}
      />
    </div>
  );
}