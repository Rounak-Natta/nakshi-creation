"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import FilterSidebar from "@/components/products/filtaration";

type Product = {
  id: number;
  name: string;
  price: number;
  size: string[];
  collection: string;
  discount: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
    size: ["Free Size"],
    collection: "Hand Block",
    discount: 20,
    image: "/products/1.webp",
  },
  {
    id: 2,
    name: "Black Traditional Printed Dhoti",
    price: 1299,
    size: ["Free Size"],
    collection: "Traditional",
    discount: 10,
    image: "/products/2.webp",
  },
  {
    id: 3,
    name: "Red Festival Wear Dhoti",
    price: 1199,
    size: ["Free Size"],
    collection: "Festive",
    discount: 25,
    image: "/products/3.webp",
  },
  {
    id: 4,
    name: "Navy Blue Border Dhoti",
    price: 1299,
    size: ["Free Size"],
    collection: "Classic",
    discount: 15,
    image: "/products/4.webp",
  },
  {
    id: 5,
    name: "Cream Floral Print Dhoti",
    price: 999,
    size: ["Free Size"],
    collection: "Hand Block",
    discount: 30,
    image: "/products/1.webp",
  },
  {
    id: 6,
    name: "Ethnic Black Printed Dhoti",
    price: 1499,
    size: ["Free Size"],
    collection: "Traditional",
    discount: 18,
    image: "/products/2.webp",
  },
  {
    id: 7,
    name: "Classic Red Draped Dhoti",
    price: 1399,
    size: ["Free Size"],
    collection: "Festive",
    discount: 22,
    image: "/products/3.webp",
  },
  {
    id: 8,
    name: "Designer Border Dhoti",
    price: 1599,
    size: ["Free Size"],
    collection: "Classic",
    discount: 12,
    image: "/products/4.webp",
  },
];

export default function ShopPage() {
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const priceMatch =
        selectedPrice.length === 0 ||
        selectedPrice.some((range) => {
          if (range === "0-1000") {
            return product.price <= 1000;
          }

          if (range === "1000-1500") {
            return (
              product.price > 1000 &&
              product.price <= 1500
            );
          }

          if (range === "1500+") {
            return product.price > 1500;
          }

          return true;
        });

      const collectionMatch =
        selectedCollection.length === 0 ||
        selectedCollection.includes(
          product.collection
        );

      const discountMatch =
        selectedDiscount.length === 0 ||
        selectedDiscount.some((discount) => {
          if (discount === "10") {
            return product.discount >= 10;
          }

          if (discount === "20") {
            return product.discount >= 20;
          }

          if (discount === "30") {
            return product.discount >= 30;
          }

          return true;
        });

      return (
        priceMatch &&
        collectionMatch &&
        discountMatch
      );
    });
  }, [
    selectedPrice,
    selectedCollection,
    selectedDiscount,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 lg:px-10">

        {/* MOBILE HEADER */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div>
            <h1 className="text-3xl font-medium text-[#4a2e18]">
              Dhoti
            </h1>

            <p className="mt-1 text-sm text-[#7c6b58]">
              {filteredProducts.length} Products
            </p>
          </div>

          <button
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="border border-[#d8cdbd] px-4 py-2 text-sm text-[#4a2e18]"
          >
            Filters
          </button>
        </div>

        <div className="relative flex gap-8 xl:gap-10">

          {/* SIDEBAR */}
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

          {/* PRODUCTS */}
          <div className="min-w-0 flex-1">

            {/* DESKTOP HEADER */}
            <div className="mb-8 hidden items-center justify-between lg:flex">
              <div>
                <h1 className="text-[42px] font-medium tracking-tight text-[#4a2e18]">
                  Dhoti
                </h1>

                <p className="mt-1 text-sm text-[#7c6b58]">
                  {filteredProducts.length} Products
                </p>
              </div>

              <select className="border border-[#d8cdbd] bg-transparent px-4 py-2 text-sm text-[#4a2e18] outline-none">
                <option>Sort by: Bestselling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-sm bg-[#f3efe6]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={700}
                      className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[340px] xl:h-[360px]"
                    />

                    <button className="absolute right-3 top-3 text-lg text-[#7d6b57]">
                      ♡
                    </button>
                  </div>

                  <div className="mt-3">
                    <h3 className="line-clamp-2 text-sm leading-[1.3] text-[#4a2e18]">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-base font-medium text-[#4a2e18]">
                        ₹ {product.price}
                      </span>

                      <span className="text-sm text-[#857260] line-through">
                        ₹ {product.price + 500}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#857260]">
                      Free Size Dhoti
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}