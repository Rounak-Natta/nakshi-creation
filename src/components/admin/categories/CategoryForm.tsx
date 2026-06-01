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

export default function CategoryForm({
  parentCategories,
}: Props) {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [parentId, setParentId] =
    useState("");

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
          "/api/categories",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
              slug,
              parentId,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error
        );
        return;
      }

      router.push(
        "/admin/categories"
      );

      router.refresh();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
  <div className="space-y-2">
    <label className="text-sm font-medium">
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
      placeholder="Men"
      className="
        h-12
        w-full
        rounded-2xl
        bg-zinc-50
        px-4
        outline-none
        ring-1
        ring-zinc-200
        transition
        focus:ring-accent
      "
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
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
      className="
        h-12
        w-full
        rounded-2xl
        bg-zinc-50
        px-4
        outline-none
        ring-1
        ring-zinc-200
        transition
        focus:ring-accent
      "
    />

    {slug && (
      <div
        className="
          inline-flex
          rounded-full
          bg-zinc-100
          px-3
          py-1
          text-xs
        "
      >
        /{slug}
      </div>
    )}
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Parent Category
    </label>

    <select
      value={parentId}
      onChange={(e) =>
        setParentId(
          e.target.value
        )
      }
      className="
        h-12
        w-full
        rounded-2xl
        bg-zinc-50
        px-4
        outline-none
        ring-1
        ring-zinc-200
      "
    >
      <option value="">
        No Parent
      </option>

      {parentCategories.map(
        (category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        )
      )}
    </select>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="
      h-12
      rounded-2xl
      bg-accent
      px-6
      text-white
      transition
      hover:opacity-90
      disabled:opacity-50
    "
  >
    {loading
      ? "Creating..."
      : "Create Category"}
  </button>
</form>
  );
}