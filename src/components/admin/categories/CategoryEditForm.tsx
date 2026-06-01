"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

interface ParentCategory {
  id: string;
  name: string;
}

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
  };

  parentCategories: ParentCategory[];
}

function generateSlug(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(
      /[^a-z0-9-]/g,
      ""
    );
}

export default function CategoryEditForm({
  category,
  parentCategories,
}: Props) {
  const router = useRouter();

  const [name, setName] =
    useState(category.name);

  const [slug, setSlug] =
    useState(category.slug);

  const [parentId, setParentId] =
    useState(
      category.parentId ?? ""
    );

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/categories/${category.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              slug,
              parentId:
                parentId || null,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to update category"
        );

        return;
      }

      router.push(
        "/admin/categories"
      );

      router.refresh();

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Name
        </label>

        <input
          value={name}
          onChange={(e) => {
            const value =
              e.target.value;

            setName(value);

            setSlug(
              generateSlug(value)
            );
          }}
          className="w-full rounded-xl border border-border bg-white p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) =>
            setSlug(
              generateSlug(
                e.target.value
              )
            )
          }
          className="w-full rounded-xl border border-border bg-white p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Parent Category
        </label>

        <select
          value={parentId}
          onChange={(e) =>
            setParentId(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-border bg-white p-3"
        >
          <option value="">
            No Parent
          </option>

          {parentCategories.map(
            (parent) => (
              <option
                key={parent.id}
                value={parent.id}
              >
                {parent.name}
              </option>
            )
          )}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-5 py-3 text-white disabled:opacity-50"
      >
        {loading
          ? "Updating..."
          : "Update Category"}
      </button>
    </form>
  );
}