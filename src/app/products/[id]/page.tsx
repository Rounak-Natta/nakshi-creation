// app/products/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: [{ position: "asc" }, { createdAt: "asc" }],
      },
      variants: true,
      attributes: true,
      category: {
        include: {
          products: {
            where: { status: "PUBLISHED" },
            take: 6,
            include: {
              images: {
                where: { isPrimary: true },
                take: 1,
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!product) notFound();

  // Transform images array to URLs for the client
  const productImages = product.images.map((img) => img.url);
  const primaryImage = productImages[0] || "/placeholder.png";

  // Extract unique sizes from variants
  const availableSizes = product.variants
    .map((v) => v.size)
    .filter((size): size is string => size !== null);

  // Group attributes by name (if needed)
  const attributes = product.attributes;

  // Similar products: exclude current product, from same category
  const similarProducts = product.category.products
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <ProductDetailsClient
      product={{
        id: product.id,
        title: product.title,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        comparePrice: product.comparePrice,
        sku: product.sku,
        stock: product.stock,
        images: productImages,
        variants: product.variants,
        attributes,
        categoryName: product.category.name,
      }}
      similarProducts={similarProducts.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        image: p.images[0]?.url || "/placeholder.png",
      }))}
      availableSizes={availableSizes}
    />
  );
}