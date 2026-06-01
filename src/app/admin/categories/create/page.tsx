import {
  FolderPlus,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import CategoryForm from "@/components/admin/categories/CategoryForm";

export default async function CreateCategoryPage() {
  const parentCategories =
    await prisma.category.findMany({
      where: {
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
    <div className="mx-auto max-w-3xl">
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
            <FolderPlus
              size={24}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Create Category
            </h1>

            <p className="mt-2 text-muted">
              Create a parent category or
              attach a new subcategory to an
              existing category.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <CategoryForm
            parentCategories={
              parentCategories
            }
          />
        </div>
      </div>
    </div>
  );
}