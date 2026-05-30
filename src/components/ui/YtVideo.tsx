"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden group">
      
      {/* Background Image with subtle zoom */}
      <motion.div
        initial={{ scale: 1.05 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/instagram/download.png"
          alt="preview"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Premium center element */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow ring */}
          <div className="absolute w-28 h-28 rounded-full bg-white/10 blur-2xl" />

          {/* Glass circle */}
          <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            
            {/* Soft pulse */}
            <span className="absolute w-full h-full rounded-full border border-white/20 animate-ping opacity-40" />

            {/* Icon */}
            <Play
              size={30}
              className="text-white ml-1 opacity-90"
              fill="white"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom luxury text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.2em]"
        >
          EXPERIENCE THE CRAFT
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-3xl font-semibold mt-2"
        >
          Timeless Tradition in Motion
        </motion.h3>
      </div>

    </section>
  );
}