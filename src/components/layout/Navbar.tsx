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
    children: ["Dhoti","Kurta","Kurta Dhoti Set","Neheru Jacket","Sherwani","Shirt"],
  },
  {
    label: "Women",
    children: ["Kurti","Kurti Set","Bottom","Saree"],
  },
  {
    label: "Accessories",
    children: ["Jewellery","Bags"],
  },
  {
    label: "Formal",
    children: ["Men Shirt","Women Shirt"],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background shadow-sm" : "bg-transparent"
      }`}
    >
      {/* DOUBLE SEPARATORS */}
      {scrolled && (
        <>
          <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-[#eee] to-transparent" />
          <div className="absolute bottom-0 w-full h-px bg-[#e5e5e5]" />
        </>
      )}

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between px-10 py-3">
          <span className={`${scrolled ? "text-foreground/70" : "text-white"}`}>
            Region: India ⌄
          </span>

          <Image src="/logo.webp" alt="logo" width={120} height={40} />

          <div className="flex gap-5">
            {[User, Heart, ShoppingBag].map((Icon, i) => (
              <Icon
                key={i}
                className={`w-5 h-5 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              />
            ))}
          </div>
        </div>

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
                className={`text-sm ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                {item.label}
              </Link>

              <AnimatePresence>
                {item.children && activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute mt-3 bg-background shadow-md p-4 rounded"
                  >
                    {item.children.map((sub) => (
                      <Link key={sub} href="#" className="block py-1">
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

        <div
          className={`h-15 flex items-center justify-between px-4 ${
            scrolled ? "bg-background" : "bg-transparent"
          }`}
        >
          <Menu
            onClick={() => setMobileOpen(true)}
            className={`w-5 h-5 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          />

          <Image src="/logo.webp" alt="logo" width={90} height={28} />

          <div className="flex gap-3">
            {[User, Heart, ShoppingBag].map((Icon, i) => (
              <Icon
                key={i}
                className={`w-4 h-4 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-0 bg-background z-50 flex flex-col"
            >
              <div className="flex justify-between p-5 border-b">
                <span>Menu</span>
                <X onClick={() => setMobileOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto">
                {menu.map((item, index) => (
                  <div key={item.label} className="border-b">

                    <div
                      onClick={() =>
                        item.children
                          ? toggleAccordion(index)
                          : setMobileOpen(false)
                      }
                      className="flex justify-between px-5 py-4"
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={openIndex === index ? "rotate-180" : ""}
                        />
                      )}
                    </div>

                    {item.children && openIndex === index && (
                      <div>
                        {item.children.map((sub) => (
                          <Link
                            key={sub}
                            href="#"
                            className="block px-7 py-3 border-t"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}