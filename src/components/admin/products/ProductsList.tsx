"use client";

import Link from "next/link";

import {
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import { useRouter } from "next/navigation";

interface Product {
  id: string;

  title: string;
  slug: string;

  price: number;

  stock: number;

  featured: boolean;

  status: string;

  category: {
    name: string;
  };

  _count: {
    images: number;
  };
}

interface Props {
  products: Product[];
}

export default function ProductsList({
  products,
}: Props) {
  const router = useRouter();

  async function handleDelete(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete product?"
      )
    ) {
      return;
    }

    const response =
      await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
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

    router.refresh();
  }

  if (
    products.length === 0
  ) {
    return (
      <div
        className="
          rounded-3xl
          bg-white
          p-12
          text-center
          shadow-sm
          ring-1
          ring-zinc-200/60
        "
      >
        <Package
          size={40}
          className="mx-auto mb-4"
        />

        <h3 className="text-lg font-medium">
          No products found
        </h3>

        <p className="mt-2 text-muted">
          Create your first product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {products.map(
        (product) => (
          <motion.div
            key={product.id}
            layout
            className="
              rounded-3xl
              bg-white
              p-6
              shadow-sm
              ring-1
              ring-zinc-200/60
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-zinc-100
                  "
                >
                  <Package
                    size={20}
                  />
                </div>

                <div>
                  <h3 className="font-medium text-lg">
                    {product.title}
                  </h3>

                  <p className="text-sm text-muted">
                    {
                      product
                        .category
                        .name
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="
                    rounded-full
                    bg-zinc-100
                    px-3
                    py-1
                    text-xs
                  "
                >
                  ₹
                  {product.price}
                </span>

                <span
                  className="
                    rounded-full
                    bg-zinc-100
                    px-3
                    py-1
                    text-xs
                  "
                >
                  Stock:
                  {" "}
                  {product.stock}
                </span>

                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="
                    rounded-xl
                    p-2
                    hover:bg-zinc-100
                  "
                >
                  <Pencil
                    size={18}
                  />
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      product.id
                    )
                  }
                  className="
                    rounded-xl
                    p-2
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}
