"use client";

import Link from "next/link";

import {
  ChevronDown,
  FolderOpen,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;

  children: {
    id: string;
    name: string;
    slug: string;

    _count: {
      products: number;
    };
  }[];

  _count: {
    products: number;
  };
}

interface Props {
  categories: Category[];
}

export default function CategoriesList({
  categories,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState<Record<string, boolean>>({});

  async function handleDelete(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete category?"
      )
    ) {
      return;
    }

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
  }

  return (
    <div className="space-y-5">
      {categories.map(
        (category) => {
          const expanded =
            open[
              category.id
            ] ?? false;

          return (
            <motion.div
              key={category.id}
              layout
              className="
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-sm
                ring-1
                ring-zinc-200/60
              "
            >
              <div className="flex items-center justify-between p-6">
                <button
                  onClick={() =>
                    setOpen(
                      (
                        prev
                      ) => ({
                        ...prev,
                        [category.id]:
                          !expanded,
                      })
                    )
                  }
                  className="flex items-center gap-4"
                >
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-2xl
                      bg-zinc-100
                    "
                  >
                    <FolderOpen
                      size={18}
                    />
                  </div>

                  <div className="text-left">
                    <h3 className="font-medium text-lg">
                      {
                        category.name
                      }
                    </h3>

                    <p className="text-sm text-muted">
                      {
                        category.children
                          .length
                      }{" "}
                      subcategories
                    </p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      expanded
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

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
                    {
                      category
                        ._count
                        .products
                    }{" "}
                    products
                  </span>

                  <Link
                    href={`/admin/categories/${category.id}/edit`}
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
                        category.id
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

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="space-y-3">
                        {category
                          .children
                          .length ===
                        0 ? (
                          <div className="rounded-2xl bg-zinc-50 p-4 text-sm text-muted">
                            No
                            subcategories
                            yet
                          </div>
                        ) : (
                          category.children.map(
                            (
                              child
                            ) => (
                              <div
                                key={
                                  child.id
                                }
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  rounded-2xl
                                  bg-zinc-50
                                  px-5
                                  py-4
                                  transition
                                  hover:bg-zinc-100
                                "
                              >
                                <div>
                                  <h4 className="font-medium">
                                    {
                                      child.name
                                    }
                                  </h4>

                                  <p className="text-xs text-muted">
                                    {
                                      child.slug
                                    }
                                  </p>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span
                                    className="
                                      rounded-full
                                      bg-white
                                      px-3
                                      py-1
                                      text-xs
                                      shadow-sm
                                    "
                                  >
                                    {
                                      child
                                        ._count
                                        .products
                                    }{" "}
                                    products
                                  </span>

                                  <Link
                                    href={`/admin/categories/${child.id}/edit`}
                                    className="
                                      rounded-xl
                                      p-2
                                      hover:bg-white
                                    "
                                  >
                                    <Pencil
                                      size={
                                        18
                                      }
                                    />
                                  </Link>

                                  <button
                                    onClick={() =>
                                      handleDelete(
                                        child.id
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
                                      size={
                                        18
                                      }
                                    />
                                  </button>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        }
      )}
    </div>
  );
}