// app/products/page.tsx
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import ProductsClient from "./ProductsClient";

interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  collection?: string | string[];
  discount?: string | string[];
  sort?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { minPrice, maxPrice, collection, discount, sort } = params;

  // Build where clause
  const where: Prisma.ProductWhereInput = {
    status: "PUBLISHED",
  };

  // Price filter (based on product.price or variant price? We'll use base price for simplicity)
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  // Discount filter (comparePrice exists and discount % >= threshold)
  if (discount) {
    const discountValues = Array.isArray(discount) ? discount : [discount];
    const discountThresholds = discountValues.map(Number).filter((d) => !isNaN(d));
    if (discountThresholds.length) {
      where.comparePrice = { not: null };
      // We'll filter after fetching because discount % is computed; use raw query or post-filter
      // Simpler: fetch and filter in JS; but for large datasets, better use raw SQL.
      // Here we'll fetch all matching price & collection then filter on discount.
    }
  }

  // Collection filter – assumes product has an attribute named "collection"
  if (collection) {
    const collectionNames = Array.isArray(collection) ? collection : [collection];
    where.attributes = {
      some: {
        name: "collection",
        value: { in: collectionNames },
      },
    };
  }

  // Fetch products with primary image and attributes
  let products = await prisma.product.findMany({
    where,
    include: {
      images: {
        where: { isPrimary: true },
        take: 1,
      },
      attributes: true,
    },
    orderBy:
      sort === "price-asc"
        ? { price: "asc" }
        : sort === "price-desc"
        ? { price: "desc" }
        : { createdAt: "desc" },
  });

  // Apply discount filter manually (since discount % not stored)
  if (discount) {
    const discountValues = Array.isArray(discount) ? discount : [discount];
    const discountThresholds = discountValues.map(Number).filter((d) => !isNaN(d));
    if (discountThresholds.length) {
      const minDiscount = Math.min(...discountThresholds);
      products = products.filter((p) => {
        if (!p.comparePrice || p.comparePrice <= p.price) return false;
        const discountPercent = Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100);
        return discountPercent >= minDiscount;
      });
    }
  }

  // Transform to a simple object for client
  const productList = products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    comparePrice: p.comparePrice,
    image: p.images[0]?.url || "/placeholder.png",
    collection: p.attributes.find((a) => a.name === "collection")?.value || "General",
    discountPercent: p.comparePrice
      ? Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100)
      : 0,
  }));

  return <ProductsClient initialProducts={productList} />;
}