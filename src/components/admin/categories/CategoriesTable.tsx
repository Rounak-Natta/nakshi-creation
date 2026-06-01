"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;

  _count: {
    products: number;
  };
}

interface Props {
  categories: Category[];
}

export default function CategoriesTable({
  categories,
}: Props) {
  const router = useRouter();

  async function handleDelete(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Delete this category?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `/api/categories/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      router.refresh();

    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete category"
      );
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Slug
            </th>

            <th className="px-6 py-4 text-left">
              Products
            </th>

            <th className="px-6 py-4 text-left">
              Created
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map(
            (category) => (
              <tr
                key={category.id}
                className="border-b border-border"
              >
                <td className="px-6 py-4 font-medium">
                  {category.name}
                </td>

                <td className="px-6 py-4">
                  {category.slug}
                </td>

                <td className="px-6 py-4">
                  {
                    category._count
                      .products
                  }
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          category.id
                        )
                      }
                      className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}

          {!categories.length && (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center"
              >
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}