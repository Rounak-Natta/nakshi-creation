import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import CategoryEditForm from "@/components/admin/categories/CategoryEditForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: Props) {
  const { id } =
    await params;

  const category =
    await prisma.category.findUnique({
      where: {
        id,
      },
    });

  if (!category) {
    notFound();
  }

  const parentCategories =
    await prisma.category.findMany({
      where: {
        id: {
          not: category.id,
        },

        parentId: null,
      },

      select: {
        id: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        Edit Category
      </h1>

      <p className="mt-2 text-muted">
        Update category details
      </p>

      <CategoryEditForm
        category={category}
        parentCategories={
          parentCategories
        }
      />
    </div>
  );
}