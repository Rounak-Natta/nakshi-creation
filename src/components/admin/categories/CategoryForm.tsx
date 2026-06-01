"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

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

export default function CategoryForm() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
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
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Failed to create category"
        );

        return;
      }

      setName("");
      setSlug("");

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
      className="mt-8 max-w-xl space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            const value =
              e.target.value;

            setName(value);

            setSlug(
              generateSlug(value)
            );
          }}
          placeholder="Women's Sarees"
          required
          className="w-full rounded-xl border border-border bg-white p-3 outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Slug
        </label>

        <input
          type="text"
          value={slug}
          onChange={(e) =>
            setSlug(
              generateSlug(
                e.target.value
              )
            )
          }
          required
          className="w-full rounded-xl border border-border bg-white p-3 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-5 py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating..."
          : "Create Category"}
      </button>
    </form>
  );
}