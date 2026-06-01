"use client";

import {
  useState,
  FormEvent,
} from "react";

import { useRouter } from "next/navigation";

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function CategoryEditForm({
  category,
}: Props) {
  const router = useRouter();

  const [name, setName] =
    useState(category.name);

  const [slug, setSlug] =
    useState(category.slug);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: FormEvent
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
            }),
          }
        );

      if (!response.ok) {
        alert(
          "Failed to update category"
        );

        return;
      }

      router.push(
        "/admin/categories"
      );

      router.refresh();

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl space-y-6"
    >
      <input
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />

      <input
        value={slug}
        onChange={(e) =>
          setSlug(
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-5 py-3 text-white"
      >
        Update Category
      </button>
    </form>
  );
}