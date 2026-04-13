"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  { src: "/hero1.png" },
  { src: "/hero2.webp" },
  { src: "/hero3.webp" },
];

export default function HeroCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  // 🔥 PRELOAD IMAGES (IMPORTANT)
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, []);

  // AUTO PLAY
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, index]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => [
      (prev + dir + slides.length) % slides.length,
      dir,
    ]);
  };

  return (
    <section
      className="relative w-full h-[100vh] overflow-hidden -mt-[60px] md:-mt-[100px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 🔥 STACKED IMAGES (NO UNMOUNT = NO BLANK) */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            x: i === index ? 0 : direction > 0 ? -80 : 80,
            scale: i === index ? 1 : 1.05,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag={i === index ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(e, { offset }) => {
            if (i !== index) return;
            if (offset.x > 100) paginate(-1);
            else if (offset.x < -100) paginate(1);
          }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt="Hero"
            fill
            priority={i === 0}
            className="object-cover object-center"
          />
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white max-w-xl"
        >
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Discover Timeless Elegance
          </h1>

          <p className="text-sm md:text-lg mb-6 opacity-90">
            Handcrafted collections inspired by tradition
          </p>

          <button className="px-6 py-3 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-200 transition">
            Shop Now
          </button>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              setIndex([i, i > index ? 1 : -1])
            }
            className="relative h-2 w-6"
          >
            <div
              className={`absolute inset-0 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}