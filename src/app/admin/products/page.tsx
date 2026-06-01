import Link from "next/link";

import { PackagePlus } from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProductsList from "@/components/admin/products/ProductsList";

export default async function ProductsPage() {
  const products =
    await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },

        images: {
          where: {
            isPrimary: true,
          },

          take: 1,

          select: {
            url: true,
          },
        },

        _count: {
          select: {
            images: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your store catalog,
            inventory and product media.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-accent
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          <PackagePlus size={18} />
          Create Product
        </Link>
      </div>

      <ProductsList
        products={products}
      />
    </div>
  );
}
