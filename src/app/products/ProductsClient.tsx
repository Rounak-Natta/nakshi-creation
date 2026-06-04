// app/products/ProductsClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FilterSidebar from "@/components/product/filtaration";

type Product = {
  id: string;
  title: string;
  price: number;
  comparePrice: number | null;
  image: string;
  collection: string;
  discountPercent: number;
};

interface Props {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL
  const urlPrice = searchParams.get("price")?.split(",") || [];
  const urlCollection = searchParams.get("collection")?.split(",") || [];
  const urlDiscount = searchParams.get("discount")?.split(",") || [];
  const urlSort = searchParams.get("sort") || "bestselling";

  const [selectedPrice, setSelectedPrice] = useState<string[]>(urlPrice);
  const [selectedCollection, setSelectedCollection] = useState<string[]>(urlCollection);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>(urlDiscount);
  const [sortBy, setSortBy] = useState(urlSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply filters on client side (since server already filtered, but we need to re-filter for discount and collection because server may have missed some)
  // Actually server did the heavy lifting, but to be safe we re-filter:
  const filteredProducts = initialProducts.filter((product) => {
    // Price range (client side filter to handle ranges)
    let priceMatch = true;
    if (selectedPrice.length) {
      priceMatch = selectedPrice.some((range) => {
        if (range === "0-1000") return product.price <= 1000;
        if (range === "1000-1500") return product.price > 1000 && product.price <= 1500;
        if (range === "1500+") return product.price > 1500;
        return true;
      });
    }

    // Collection filter
    let collectionMatch = true;
    if (selectedCollection.length) {
      collectionMatch = selectedCollection.includes(product.collection);
    }

    // Discount filter
    let discountMatch = true;
    if (selectedDiscount.length) {
      discountMatch = selectedDiscount.some((d) => {
        const threshold = parseInt(d);
        return product.discountPercent >= threshold;
      });
    }

    return priceMatch && collectionMatch && discountMatch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    // default "bestselling" - use discount percent as proxy
    return b.discountPercent - a.discountPercent;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPrice.length) params.set("price", selectedPrice.join(","));
    if (selectedCollection.length) params.set("collection", selectedCollection.join(","));
    if (selectedDiscount.length) params.set("discount", selectedDiscount.join(","));
    if (sortBy !== "bestselling") params.set("sort", sortBy);
    router.push(`/products?${params.toString()}`);
  }, [selectedPrice, selectedCollection, selectedDiscount, sortBy, router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 lg:px-10">
        {/* Mobile header */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div>
            <h1 className="text-3xl font-medium text-[#4a2e18]">Products</h1>
            <p className="mt-1 text-sm text-[#7c6b58]">{sortedProducts.length} Products</p>
          </div>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="border border-[#d8cdbd] px-4 py-2 text-sm text-[#4a2e18]"
          >
            Filters
          </button>
        </div>

        <div className="relative flex gap-8 xl:gap-10">
          <FilterSidebar
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
          />

          {/* Products area */}
          <div className="min-w-0 flex-1">
            <div className="mb-8 hidden items-center justify-between lg:flex">
              <div>
                <h1 className="text-[42px] font-medium tracking-tight text-[#4a2e18]">Products</h1>
                <p className="mt-1 text-sm text-[#7c6b58]">{sortedProducts.length} Products</p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-[#d8cdbd] bg-transparent px-4 py-2 text-sm text-[#4a2e18] outline-none"
              >
                <option value="bestselling">Sort by: Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group block cursor-pointer">
                  <div className="relative overflow-hidden rounded-sm bg-[#f3efe6]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={500}
                      height={700}
                      className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[340px] xl:h-[360px]"
                    />
                    <button className="absolute right-3 top-3 text-lg text-[#7d6b57]">♡</button>
                  </div>
                  <div className="mt-3">
                    <h3 className="line-clamp-2 text-sm leading-[1.3] text-[#4a2e18]">{product.title}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-base font-medium text-[#4a2e18]">₹{product.price}</span>
                      {product.comparePrice && (
                        <span className="text-sm text-[#857260] line-through">₹{product.comparePrice}</span>
                      )}
                      {product.discountPercent > 0 && (
                        <span className="text-xs font-medium text-green-700">{product.discountPercent}% off</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}