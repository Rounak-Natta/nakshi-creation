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
      where: { id },
    });

  if (!category) {
    return (
      <div>
        Category not found
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Edit Category
      </h1>

      <CategoryEditForm
        category={category}
      />
    </div>
  );
}