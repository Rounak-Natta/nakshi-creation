"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";

const posts = [
  { id: 1, src: "/instagram/1.png", likes: "1.2k", comments: 86 },
  { id: 2, src: "/instagram/2.png", likes: "980", comments: 42 },
  { id: 3, src: "/instagram/3.png", likes: "2.1k", comments: 120 },
  { id: 4, src: "/instagram/4.png", likes: "760", comments: 30 },
];

export default function InstagramSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [liked, setLiked] = useState<number | null>(null);

  return (
    <section className="bg-[#f3f0ea] py-20 px-4 md:px-6">

      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#4b2e2b]">
          Follow Us On Instagram
        </h2>
        <div className="w-24 h-0.5 bg-[#4b2e2b] mx-auto mt-3" />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {posts.map((post, i) => (
          <TiltCard
            key={post.id}
            post={post}
            index={i}
            setSelected={setSelected}
            liked={liked}
            setLiked={setLiked}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={30} />
            </button>

            <motion.div
              key={selected}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%] md:w-[420px] aspect-[4/5] rounded-xl overflow-hidden"
            >
              <Image
                src={posts[selected].src}
                alt="preview"
                fill
                sizes="(max-width:768px) 90vw, 420px"
                className="object-cover"
              />
            </motion.div>

            <button
              onClick={() =>
                setSelected((prev) =>
                  prev === 0 ? posts.length - 1 : (prev as number) - 1
                )
              }
              className="absolute left-6 text-white"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() =>
                setSelected((prev) =>
                  prev === posts.length - 1 ? 0 : (prev as number) + 1
                )
              }
              className="absolute right-6 text-white"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* 🔥 PREMIUM TILT CARD */
function TiltCard({ post, index, setSelected, liked, setLiked }: any) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setPos({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={() => setSelected(index)}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group will-change-transform"
      style={{
        transform: `rotateY(${pos.x}deg) rotateX(${-pos.y}deg)`,
      }}
    >
      {/* Image */}
      <Image
        src={post.src}
        alt="instagram"
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />


      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent)]" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Center Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-xl">
          <Camera className="text-white" />
        </div>
      </motion.div>

      {/* Overlay Info */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition duration-300 text-white">
        <div className="text-sm font-medium">@nakshicreations</div>

        <div className="flex justify-between text-sm">
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              ❤️ {post.likes}
            </div>
            <div className="flex gap-1 items-center">
              💬 {post.comments}
            </div>
          </div>
        </div>
      </div>

      {/* Double Tap Like */}
      <AnimatePresence>
        {liked === index && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Heart size={80} fill="white" className="text-white/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Double Click Layer */}
      <div
        onDoubleClick={(e) => {
          e.stopPropagation();
          setLiked(index);
          setTimeout(() => setLiked(null), 700);
        }}
        className="absolute inset-0"
      />
    </motion.div>
  );
}