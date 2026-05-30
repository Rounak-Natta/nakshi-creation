"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const images = [
  "/products/1.webp",
  "/products/2.webp",
  "/products/3.webp",
  "/products/4.webp",
  "/products/5.webp",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function BestSeller() {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState("M");
  const [loading, setLoading] = useState(true);

  return (
    <section className="bg-[#F5F3ED] py-14 px-4">
      {/* Header */}
      <div className="flex justify-center gap-8 mb-10">
        <h2 className="text-xl md:text-3xl font-semibold text-[#4b2e2b] border-b border-[#4b2e2b] pb-1">
          Best Sellers
        </h2>
        <h2 className="text-xl md:text-3xl text-[#4b2e2b]/70">
          Shop By Category
        </h2>
      </div>

      {/* Layout */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        
        {/* LEFT */}
        <div className="flex gap-3">
          {/* Thumbs */}
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setLoading(true);
                  setActive(i);
                }}
                className={`relative w-14 h-18 md:w-16 md:h-20 rounded overflow-hidden ${
                  active === i ? "ring-2 ring-[#4b2e2b]" : "opacity-70"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-60 md:w-[320px] h-80 md:h-110 rounded-lg overflow-hidden">
            
            {/* Skeleton */}
            {loading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active]}
                  alt="product"
                  fill
                  className="object-cover"
                  onLoad={() => setLoading(false)}
                  sizes="(max-width:768px) 100vw, 320px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-[#4b2e2b]">
          <p className="text-xs mb-1 opacity-70">Nakshi</p>

          <h3 className="text-lg md:text-xl font-medium mb-2">
            Ethnic Red Saree with Kurta Set
          </h3>
          <p className="text-sm text-[#4b2e2b]/70 leading-relaxed mb-3 max-w-md">
  Handcrafted ethnic ensemble featuring intricate traditional patterns,
  breathable fabric, and a timeless silhouette—perfect for festive
  occasions and elegant everyday wear.
</p>

<p className="text-sm text-[#4b2e2b]/60 leading-relaxed mb-5 max-w-md">
  Designed for modern elegance, this piece blends heritage craftsmanship
  with contemporary styling. Its soft drape and refined finish ensure
  comfort without compromising on sophistication.
</p>

          <div className="flex items-center gap-3 mb-4">
            <p className="font-semibold">₹6999.00</p>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={14} fill="#f59e0b" stroke="none" />
              ))}
              <Star size={14} className="text-gray-300" />
            </div>
          </div>

          {/* Sizes */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 text-sm border rounded ${
                  size === s
                    ? "bg-[#4b2e2b] text-white border-[#4b2e2b]"
                    : "border-[#4b2e2b]/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button className="w-full border border-[#4b2e2b] py-2 rounded mb-4 hover:bg-[#4b2e2b] hover:text-white transition">
            Add To Cart
          </button>

          <button className="text-sm underline">
            View Product Details →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-[#4b2e2b] text-white rounded-full">
          View All
        </button>
      </div>
    </section>
  );
}