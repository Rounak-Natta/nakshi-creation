"use client";

import {
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menu = [
  { label: "Home", href: "/" },
  {
    label: "Men",
    children: ["Dhoti", "Kurta", "Kurta Dhoti Set", "Neheru Jacket", "Sherwani", "Shirt"],
  },
  {
    label: "Women",
    children: ["Kurti", "Kurti Set", "Bottom", "Saree"],
  },
  {
    label: "Accessories",
    children: ["Jewellery", "Bags"],
  },
  {
    label: "Formal",
    children: ["Men Shirt", "Women Shirt"],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✨ animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[var(--background)]/90 backdrop-blur-xl">

        {/* subtle top glow */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />

        {/* ===== DESKTOP ===== */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between px-10 py-3">
            <span className="text-[var(--foreground)]/70 text-sm">
              Region: India ⌄
            </span>

            <Image
              src="/logo.webp"
              alt="logo"
              width={120}
              height={40}
              sizes="120px"
            />

            <div className="flex gap-5">
              {[User, Heart, ShoppingBag].map((Icon, i) => (
                <Icon
                  key={i}
                  className="w-5 h-5 text-[var(--foreground)] hover:opacity-70 transition"
                />
              ))}
            </div>
          </div>

          {/* subtle divider */}
          <div className="mx-10 h-px bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent" />

          <nav className="flex justify-center gap-8 py-3">
            {menu.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setActiveIndex(null);
                  }, 150);
                }}
              >
                <Link className="text-sm relative group" href="#">
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </Link>

                <AnimatePresence>
                  {item.children && activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-4 bg-[var(--background)] shadow-xl p-4 rounded-xl min-w-[200px]"
                    >
                      {item.children.map((sub) => (
                        <Link
                          key={sub}
                          href="#"
                          className="block py-1 text-sm hover:opacity-70 transition"
                        >
                          {sub}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>

        {/* ===== MOBILE BAR ===== */}
        <div className="md:hidden flex items-center justify-between px-4 h-[65px]">
          <Menu onClick={() => setMobileOpen(true)} className="w-5 h-5" />

          <Image
            src="/logo.webp"
            alt="logo"
            width={90}
            height={28}
            sizes="90px"
          />

          <div className="flex gap-3">
            {[User, Heart, ShoppingBag].map((Icon, i) => (
              <Icon key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[998]"
              onClick={() => setMobileOpen(false)}
            />

            {/* ================= DRAWER ================= */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 w-[85%] max-w-sm h-screen bg-[var(--background)] z-[999] flex flex-col shadow-2xl"
            >
              {/* Top */}
              <div className="flex justify-between items-center px-5 py-5">
                <span className="text-lg font-medium">Menu</span>
                <X onClick={() => setMobileOpen(false)} />
              </div>

              {/* Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-3"
              >
                {menu.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="mb-2"
                  >
                    <div
                      onClick={() =>
                        item.children
                          ? toggleAccordion(index)
                          : setMobileOpen(false)
                      }
                      className="flex justify-between items-center px-4 py-3 rounded-lg active:scale-[0.97] transition"
                    >
                      <span className="text-sm">{item.label}</span>

                      {item.children && (
                        <ChevronDown
                          className={`transition ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    <AnimatePresence>
                      {item.children && openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-6"
                        >
                          {item.children.map((sub) => (
                            <Link
                              key={sub}
                              href="#"
                              className="block py-2 text-sm opacity-80 hover:opacity-100 transition"
                            >
                              {sub}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}