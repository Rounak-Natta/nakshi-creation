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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menu = [
  { label: "Home", href: "/" },
  {
    label: "Men",
    children: [
      "Dhoti",
      "Kurta",
      "Kurta Dhoti Set",
      "Neheru Jacket",
      "Sherwani",
      "Shirt",
    ],
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
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // prevent scroll on mobile menu
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        {/* Top bar */}
        <div className="flex items-center justify-between px-10 py-3 border-b border-[#eee]">
          <div className="text-sm text-foreground/70">
            Region: India ⌄
          </div>

          <Link href="/">
            <Image src="/logo.webp" alt="logo" width={120} height={40} />
          </Link>

          <div className="flex gap-5">
            <User className="w-5 h-5 cursor-pointer" />
            <Heart className="w-5 h-5 cursor-pointer" />
            <ShoppingBag className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center gap-8 py-3">
          {menu.map((item, index) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <Link
                href={item.href || "#"}
                className="text-sm tracking-wide hover:opacity-70"
              >
                {item.label}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute mt-3 bg-background border border-[#eee] shadow-md rounded-md p-4 min-w-[180px]"
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block text-sm py-1 text-foreground/70 hover:text-foreground"
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

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">

        {/* Header */}
        <div className="h-[60px] flex items-center justify-between px-4 border-b border-[#e5e5e5]">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>

          <Image src="/logo.webp" alt="logo" width={90} height={28} />

          <div className="flex gap-3">
            <User className="w-4 h-4" />
            <Heart className="w-4 h-4" />
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-background z-50 flex flex-col"
            >
              {/* Top */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
                <span className="text-[17px] font-semibold tracking-tight">
                  Welcome Nakshi !
                </span>
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu */}
              <div className="flex-1 overflow-y-auto">
                {menu.map((item, index) => (
                  <div key={item.label} className="border-b border-[#e5e5e5]">

                    <div
                      onClick={() =>
                        item.children
                          ? toggleAccordion(index)
                          : setMobileOpen(false)
                      }
                      className="flex items-center justify-between px-5 py-4"
                    >
                      {item.href ? (
                        <Link href={item.href} className="text-[15px] font-medium">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-[15px] font-medium">
                          {item.label}
                        </span>
                      )}

                      {item.children && (
                        <ChevronDown
                          className={`w-4 h-4 transition ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Children */}
                    <AnimatePresence>
                      {item.children && openIndex === index && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          {item.children.map((sub) => (
                            <Link
                              key={sub}
                              href={`/category/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              onClick={() => setMobileOpen(false)}
                              className="block px-7 py-3 text-[14px] text-foreground/70 border-t border-[#f0f0f0]"
                            >
                              {sub}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex justify-center gap-5 py-5 border-t border-[#e5e5e5]">
                <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white text-sm rounded">
                  f
                </div>
                <div className="w-9 h-9 flex items-center justify-center bg-sky-500 text-white text-sm rounded">
                  x
                </div>
                <div className="w-9 h-9 flex items-center justify-center bg-[#8b5e3c] text-white text-sm rounded">
                  ig
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}