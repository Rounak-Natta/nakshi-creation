"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const gallery = [
  "/products/1.webp",
  "/products/2.webp",
  "/products/3.webp",
  "/products/4.webp",
];

const similarProducts = [
  {
    id: 1,
    image: "/products/1.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
  {
    id: 2,
    image: "/products/2.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
  {
    id: 3,
    image: "/products/3.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
  {
    id: 4,
    image: "/products/4.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
  {
    id: 5,
    image: "/products/3.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
  {
    id: 6,
    image: "/products/4.webp",
    title: "Floral Pattern Hand Block Print Free Size Dhoti",
    price: 1299,
  },
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(
    gallery[0]
  );

  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 lg:px-10">

        {/* PRODUCT SECTION */}
        <div className="grid gap-10 lg:grid-cols-[110px_1fr_480px]">

          {/* THUMBNAILS */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            {gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`
                  overflow-hidden border
                  ${
                    selectedImage === image
                      ? "border-[#4a2e18]"
                      : "border-[#ddd1c0]"
                  }
                `}
              >
                <Image
                  src={image}
                  alt="thumbnail"
                  width={90}
                  height={120}
                  className="h-[120px] w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="relative overflow-hidden bg-[#eee7db]">
            <Image
              src={selectedImage}
              alt="product"
              width={700}
              height={900}
              className="h-full w-full object-cover"
            />

            {/* MOBILE THUMBNAILS */}
            <div className="mt-4 flex gap-3 overflow-x-auto lg:hidden">
              {gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`
                    min-w-[70px] overflow-hidden border
                    ${
                      selectedImage === image
                        ? "border-[#4a2e18]"
                        : "border-[#ddd1c0]"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt="thumbnail"
                    width={70}
                    height={90}
                    className="h-[90px] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="max-w-[480px]">

            <p className="text-sm text-[#8b7a68]">
              Nakshi
            </p>

            <h1 className="mt-2 text-[32px] font-medium leading-[1.15] text-[#4a2e18]">
              Ethnic Red Saree with Kurta Set
            </h1>

            {/* PRICE + RATING */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[28px] font-semibold text-[#4a2e18]">
                ₹6999.00
              </span>

              <div className="flex items-center gap-[2px] text-[#d5a642]">
                ★★★★★
              </div>

              <button className="text-sm text-[#7c6b58] underline">
                Size Guide
              </button>
            </div>

            {/* SIZE */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
                Size
              </p>

              <div className="flex gap-3">
                {["S", "M", "L", "XL", "XXL"].map(
                  (size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`
                        flex h-[42px] w-[42px] items-center justify-center
                        border text-sm transition
                        ${
                          selectedSize === size
                            ? "border-[#4a2e18] bg-[#4a2e18] text-white"
                            : "border-[#d8cdbd] text-[#4a2e18]"
                        }
                      `}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 border border-[#d8cdbd] py-3 text-sm font-medium text-[#4a2e18] transition hover:bg-[#ede6d8]">
                Add To Cart
              </button>

              <button className="flex-1 bg-[#5a3418] py-3 text-sm font-medium text-white transition hover:bg-[#472611]">
                Buy Now
              </button>
            </div>

            {/* DELIVERY */}
            <div className="mt-8">
              <p className="mb-2 text-sm text-[#4a2e18]">
                Delivery
              </p>

              <div className="flex overflow-hidden border border-[#d8cdbd]">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                />

                <button className="bg-[#5a3418] px-6 text-sm font-medium text-white">
                  Check
                </button>
              </div>
            </div>

            {/* ACCORDION */}
            <div className="mt-10 border-t border-[#ddd1c0]">

              {[
                "Product Details",
                "Wash & Care",
                "Delivery & Returns",
                "Product Declaration",
              ].map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between border-b border-[#ddd1c0] py-5 text-left"
                >
                  <span className="text-sm font-medium text-[#4a2e18]">
                    {item}
                  </span>

                  <span className="text-[#4a2e18]">
                    +
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-24">

          <h2 className="mb-10 text-center text-[42px] font-medium text-[#4a2e18]">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

            {similarProducts.map((product) => (
              <Link
                href={`/shop/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#eee7db]">

                  <button className="absolute right-2 top-2 z-10 text-sm text-[#7d6b57]">
                    ♡
                  </button>

                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={420}
                    className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="line-clamp-2 text-xs leading-[1.4] text-[#4a2e18]">
                    {product.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-[#4a2e18]">
                      ₹ {product.price}
                    </span>

                    <span className="text-xs text-[#857260] line-through">
                      ₹ {product.price + 500}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}