"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Product = {
  id: number;
  src: string;
  title?: string;
  price?: string;
};

interface Props {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: Props) {
  const looped = [...products, ...products, ...products];

  const [index, setIndex] = useState(products.length);
  const [hovered, setHovered] = useState(false);

  const CARD_WIDTH = 264;
  const CENTER_OFFSET = 2;

  // Autoplay
  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [hovered]);

  // Infinite loop reset
  useEffect(() => {
    if (index >= products.length * 2) {
      setIndex(products.length);
    }
    if (index <= 0) {
      setIndex(products.length);
    }
  }, [index, products.length]);

  const next = () => setIndex((p) => p + 1);
  const prev = () => setIndex((p) => p - 1);

  return (
    <section className="bg-[#f3f0ea] py-12 px-4 md:px-6 relative">
      
      {/* Title */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#4b2e2b]">
          {title}
        </h2>
        <div className="w-20 md:w-24 h-0.5 bg-[#4b2e2b] mx-auto mt-2 md:mt-3" />
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-[#4b2e2b] text-white p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-[#4b2e2b] text-white p-3 rounded-full hover:scale-110 transition"
      >
        <ChevronRight />
      </button>

      {/* Slider */}
      <div
        className="relative max-w-6xl mx-auto overflow-x-hidden overflow-y-visible py-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: `-${index * CARD_WIDTH}px` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {looped.map((item, i) => {
            const isActive = i === index + CENTER_OFFSET;

            return (
              <motion.div
                key={i}
                className="relative min-w-50 md:min-w-60 h-70 md:h-85 rounded-2xl overflow-hidden will-change-transform"
                animate={{
                  scale: isActive ? 1.06 : 0.9,
                  y: isActive ? -10 : 0,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Image */}
                <Image
                  src={item.src}
                  alt="product"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />

                {/* Dim non-active */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20" />
                )}

                {/* Active Overlay */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  >
                    <h3 className="text-sm md:text-lg font-semibold">
                      {item.title || "Product Name"}
                    </h3>

                    <p className="text-xs md:text-sm mb-1">
                      {item.price || "₹999"}
                    </p>

                    <div className="flex gap-1">
                      {[...Array(4)].map((_, idx) => (
                        <Star key={idx} size={12} fill="white" />
                      ))}
                      <Star size={12} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 md:mt-8">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition ${
              i === index % products.length
                ? "bg-[#4b2e2b] scale-110"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-8 md:mt-10">
        <button className="px-6 md:px-10 py-2 md:py-3 border border-[#4b2e2b] rounded-full text-[#4b2e2b] hover:bg-[#4b2e2b] hover:text-white transition-all duration-300">
          View All
        </button>
      </div>
    </section>
  );
}