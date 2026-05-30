"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Hotspot = {
  id: number;
  top: string;
  left: string;
  name: string;
  price: string;
  image: string;
};

const hotspots: Hotspot[] = [
  {
    id: 1,
    top: "28%",
    left: "38%",
    name: "Handwoven Yellow Saree",
    price: "₹4,999",
    image: "/products/1.webp",
  },
  {
    id: 2,
    top: "42%",
    left: "60%",
    name: "Red Printed Blouse",
    price: "₹1,299",
    image: "/products/2.webp",
  },
  {
    id: 3,
    top: "65%",
    left: "48%",
    name: "Cotton Draped Saree",
    price: "₹3,499",
    image: "/products/3.webp",
  },
  {
    id: 4,
    top: "78%",
    left: "75%",
    name: "Traditional Border Saree",
    price: "₹5,999",
    image: "/products/4.webp",
  },
];

export default function HotspotSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative w-full h-[500px] md:h-[650px]">
      
      {/* Background Image */}
      <Image
        src="/hero1.png"
        alt="collection"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay (optional premium tint) */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute"
          style={{ top: spot.top, left: spot.left }}
          onMouseEnter={() => setActive(spot.id)}
          onMouseLeave={() => setActive(null)}
        >
          {/* Dot */}
          <div className="relative flex items-center justify-center">
            
            {/* Pulse */}
            <span className="absolute w-6 h-6 rounded-full bg-white/40 animate-ping" />

            {/* Core */}
            <span className="w-3 h-3 rounded-full bg-white border-2 border-white shadow" />

          </div>

          {/* Popup */}
          <AnimatePresence>
            {active === spot.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-56 bg-white rounded-xl shadow-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-32">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h4 className="text-sm font-medium text-[#4b2e2b] line-clamp-1">
                    {spot.name}
                  </h4>
                  <p className="text-sm text-[#4b2e2b]/70 mb-2">
                    {spot.price}
                  </p>

                  <button className="text-xs font-medium text-[#4b2e2b] hover:underline">
                    Explore →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
}