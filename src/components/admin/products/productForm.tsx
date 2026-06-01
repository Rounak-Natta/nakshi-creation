"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { ProductStatus } from "@prisma/client";

interface Category {
  id: string;
  name: string;

  children: {
    id: string;
    name: string;
  }[];
}

interface Props {
  categories: Category[];

  initialData?: {
    id?: string;

    title?: string;
    slug?: string;
    sku?: string;

    shortDescription?: string;
    description?: string;

    price?: number;
    comparePrice?: number | null;

    stock?: number;

    categoryId?: string;

    status?: ProductStatus;

    featured?: boolean;

    seoTitle?: string | null;
    seoDescription?: string | null;
  };
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

export default function ProductForm({
  categories,
  initialData,
}: Props) {
  const router = useRouter();

  const isEdit =
    !!initialData?.id;

  const [title, setTitle] =
    useState(
      initialData?.title ?? ""
    );

  const [slug, setSlug] =
    useState(
      initialData?.slug ?? ""
    );

  const [sku, setSku] =
    useState(
      initialData?.sku ?? ""
    );

  const [
    shortDescription,
    setShortDescription,
  ] = useState(
    initialData?.shortDescription ??
      ""
  );

  const [
    description,
    setDescription,
  ] = useState(
    initialData?.description ?? ""
  );

  const [price, setPrice] =
    useState(
      String(
        initialData?.price ?? ""
      )
    );

  const [
    comparePrice,
    setComparePrice,
  ] = useState(
    String(
      initialData?.comparePrice ??
        ""
    )
  );

  const [stock, setStock] =
    useState(
      String(
        initialData?.stock ?? ""
      )
    );

  const [
  parentCategoryId,
  setParentCategoryId,
] = useState("");

const [
  categoryId,
  setCategoryId,
] = useState(
  initialData?.categoryId ?? ""
);

const selectedParent =
  categories.find(
    (category) =>
      category.id ===
      parentCategoryId
  );

const childCategories =
  selectedParent?.children ?? [];

  const [status, setStatus] =
    useState(
      initialData?.status ??
        ProductStatus.DRAFT
    );

  const [featured, setFeatured] =
    useState(
      initialData?.featured ??
        false
    );

  const [seoTitle, setSeoTitle] =
    useState(
      initialData?.seoTitle ??
        ""
    );

  const [
    seoDescription,
    setSeoDescription,
  ] = useState(
    initialData?.seoDescription ??
      ""
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
          isEdit
            ? `/api/products/${initialData?.id}`
            : "/api/products",
          {
            method: isEdit
              ? "PUT"
              : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title,
              slug,
              sku,

              shortDescription,
              description,

              price:
                Number(price),

              comparePrice:
                comparePrice
                  ? Number(
                      comparePrice
                    )
                  : null,

              stock:
                Number(stock),

              categoryId,

              status,

              featured,

              seoTitle,

              seoDescription,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Something went wrong"
        );

        return;
      }

      router.push(
        "/admin/products"
      );

      router.refresh();

    } finally {
      setLoading(false);
    }
  }

  return (

<form
  onSubmit={handleSubmit}
  className="grid gap-8 lg:grid-cols-3"
>
  <div className="space-y-8 lg:col-span-2">
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
      <h2 className="mb-6 text-xl font-semibold">
        Product Information
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Title
          </label>

          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);

              if (!isEdit) {
                setSlug(
                  generateSlug(
                    e.target.value
                  )
                );
              }
            }}
            className="h-12 w-full rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none focus:ring-accent"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
              className="h-12 w-full rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              SKU
            </label>

            <input
              value={sku}
              onChange={(e) =>
                setSku(
                  e.target.value
                )
              }
              className="h-12 w-full rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description
          </label>

          <textarea
            rows={3}
            value={shortDescription}
            onChange={(e) =>
              setShortDescription(
                e.target.value
              )
            }
            className="w-full rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={8}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200 outline-none"
          />
        </div>
      </div>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
      <h2 className="mb-6 text-xl font-semibold">
        Pricing & Inventory
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          className="h-12 rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none"
        />

        <input
          type="number"
          placeholder="Compare Price"
          value={comparePrice}
          onChange={(e) =>
            setComparePrice(
              e.target.value
            )
          }
          className="h-12 rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
          className="h-12 rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200 outline-none"
        />
      </div>
    </div>
  </div>

  <div className="space-y-8">
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
  <h2 className="mb-6 text-xl font-semibold">
    Organization
  </h2>

  <div className="space-y-5">
    <div>
      <label className="mb-2 block text-sm font-medium">
        Parent Category
      </label>

      <select
        value={parentCategoryId}
        onChange={(e) => {
          setParentCategoryId(
            e.target.value
          );

          setCategoryId("");
        }}
        className="
          h-12
          w-full
          rounded-2xl
          bg-zinc-50
          px-4
          ring-1
          ring-zinc-200
          outline-none
          focus:ring-accent
        "
      >
        <option value="">
          Select Parent Category
        </option>

        {categories.map(
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

    <div>
      <label className="mb-2 block text-sm font-medium">
        Sub Category
      </label>

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(
            e.target.value
          )
        }
        disabled={
          !parentCategoryId
        }
        className="
          h-12
          w-full
          rounded-2xl
          bg-zinc-50
          px-4
          ring-1
          ring-zinc-200
          outline-none
          focus:ring-accent
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <option value="">
          Select Sub Category
        </option>

        {childCategories.map(
          (child) => (
            <option
              key={child.id}
              value={child.id}
            >
              {child.name}
            </option>
          )
        )}
      </select>
    </div>
  </div>
</div>

    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
      <h2 className="mb-6 text-xl font-semibold">
        Publishing
      </h2>

      <div className="space-y-4">
        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as ProductStatus
            )
          }
          className="h-12 w-full rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200"
        >
          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="OUT_OF_STOCK">
            Out Of Stock
          </option>
        </select>

        <label className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(
                e.target.checked
              )
            }
          />

          Featured Product
        </label>
      </div>
    </div>

    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/60">
      <h2 className="mb-6 text-xl font-semibold">
        SEO
      </h2>

      <div className="space-y-4">
        <input
          placeholder="SEO Title"
          value={seoTitle}
          onChange={(e) =>
            setSeoTitle(
              e.target.value
            )
          }
          className="h-12 w-full rounded-2xl bg-zinc-50 px-4 ring-1 ring-zinc-200"
        />

        <textarea
          rows={4}
          placeholder="SEO Description"
          value={seoDescription}
          onChange={(e) =>
            setSeoDescription(
              e.target.value
            )
          }
          className="w-full rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200"
        />
      </div>
    </div>

    <button
      disabled={loading}
      className="w-full rounded-2xl bg-accent py-4 font-medium text-white transition hover:opacity-90"
    >
      {loading
        ? isEdit
          ? "Updating Product..."
          : "Creating Product..."
        : isEdit
        ? "Update Product"
        : "Create Product"}
    </button>
  </div>
</form>


  );
}
