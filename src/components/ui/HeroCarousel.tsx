"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/hero1.png" },
  { src: "/hero2.webp" },
  { src: "/hero3.webp" },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 100 : -100,
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -100 : 100,
    opacity: 0,
    scale: 1.05,
  }),
};

export default function HeroCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  // Stable autoplay (no reset bug)
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex(([prev]) => [
        (prev + 1) % slides.length,
        1,
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => [
      (prev + dir + slides.length) % slides.length,
      dir,
    ]);
  };

  return (
    <section
      className="
        relative w-full overflow-hidden
h-[calc(100vh-65px)] md:h-[calc(100vh-100px)]      "
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(e, { offset }) => {
            const threshold = window.innerWidth * 0.25;
            if (offset.x > threshold) paginate(-1);
            else if (offset.x < -threshold) paginate(1);
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt="Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay (premium look) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white max-w-xl"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
            Discover Timeless Elegance
          </h1>

          <p className="text-sm md:text-lg opacity-90 mb-6">
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
            aria-label={`Go to slide ${i + 1}`}
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