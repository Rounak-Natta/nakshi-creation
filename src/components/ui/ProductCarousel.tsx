"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const products = [
  { id: 1, src: "/products/1.webp" },
  { id: 2, src: "/products/2.webp" },
  { id: 3, src: "/products/3.webp" },
  { id: 4, src: "/products/4.webp" },
  { id: 5, src: "/products/5.webp" },
  { id: 6, src: "/products/6.webp" },
  { id: 7, src: "/products/7.webp" },
];

// duplicate for seamless loop
const looped = [...products, ...products, ...products];

export default function ProductCarousel() {
  const [index, setIndex] = useState(products.length); // start from middle
  const [hovered, setHovered] = useState(false);

  const CARD_WIDTH = 264;

  // autoplay
  useEffect(() => {
    if (hovered) return;

    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(id);
  }, [hovered]);

  // invisible reset (NO flicker)
  useEffect(() => {
    if (index >= products.length * 2) {
      setIndex(products.length);
    }
    if (index <= 0) {
      setIndex(products.length);
    }
  }, [index]);

  const next = () => setIndex((p) => p + 1);
  const prev = () => setIndex((p) => p - 1);

  return (
    <section className="bg-[#f3f0ea] py-20 px-4 md:px-6 relative">
      {/* Title */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#4b2e2b]">
          New Arrivals
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
        className="relative max-w-6xl mx-auto overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Fade edges */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-20 bg-linear-to-r from-[#f3f0ea] to-transparent z-20" />
        <div className="hidden md:block absolute right-0 top-0 h-full w-20 bg-linear-to-l from-[#f3f0ea] to-transparent z-20" />

        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: `-${index * CARD_WIDTH}px` }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1], // ultra smooth cubic bezier
          }}
        >
          {looped.map((item, i) => {
            const isActive = i === index + 1;

            return (
              <motion.div
                key={i}
                className="relative min-w-50 md:min-w-60 h-70 md:h-85 rounded-2xl overflow-hidden"
                animate={{
                  scale: isActive ? 1.05 : 0.95,
                }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={item.src}
                  alt="product"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 50vw, 25vw"
                />

                {/* Overlay */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent text-white flex flex-col justify-end p-4"
                  >
                    <h3 className="text-sm md:text-lg font-semibold">
                      Handprinted Kurta
                    </h3>
                    <p className="text-xs md:text-sm mb-1">₹ 4999</p>

                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} size={12} fill="white" />
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
            className={`w-2 h-2 rounded-full ${
              i === index % products.length
                ? "bg-[#4b2e2b]"
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