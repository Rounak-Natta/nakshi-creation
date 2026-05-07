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
import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const menu = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Men",
    children: [
      {
        label: "Dhoti",
        href: "/products",
      },
      {
        label: "Kurta",
        href: "/products",
      },
      {
        label: "Kurta Dhoti Set",
        href: "/products",
      },
      {
        label: "Neheru Jacket",
        href: "/products",
      },
      {
        label: "Sherwani",
        href: "/products",
      },
      {
        label: "Shirt",
        href: "/products",
      },
    ],
  },

  {
    label: "Women",
    children: [
      {
        label: "Kurti",
        href: "/products",
      },
      {
        label: "Kurti Set",
        href: "/products",
      },
      {
        label: "Bottom",
        href: "/products",
      },
      {
        label: "Saree",
        href: "/products",
      },
    ],
  },

  {
    label: "Couple",
    children: [
      {
        label: "Couple Collection",
        href: "/products",
      },
    ],
  },

  {
    label: "Accessories",
    children: [
      {
        label: "Jewellery",
        href: "/products",
      },
      {
        label: "Bags",
        href: "/products",
      },
    ],
  },
];

export default function Navbar() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const toggleAccordion = (
    index: number
  ) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <>
      {/* ================= HEADER ================= */}

      <header className="fixed left-0 top-0 z-40 w-full border-b border-neutral-200/40 bg-[var(--background)]/90 backdrop-blur-xl">

        {/* top glow */}
        <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-neutral-300/50 to-transparent" />

        {/* ================= DESKTOP ================= */}

        <div className="hidden h-[90px] grid-cols-3 items-center px-10 md:grid">

          {/* LEFT NAV */}
          <nav className="flex items-center gap-8">

            {menu.map((item, index) => (

              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(
                      timeoutRef.current
                    );
                  }

                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  timeoutRef.current =
                    setTimeout(() => {
                      setActiveIndex(null);
                    }, 150);
                }}
              >

                {/* MAIN LINK */}

                {item.href ? (
                  <Link
                    href={item.href}
                    className="group relative text-sm text-[var(--foreground)]"
                  >
                    {item.label}

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button className="group relative text-sm text-[var(--foreground)]">
                    {item.label}

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </button>
                )}

                {/* DROPDOWN */}

                <AnimatePresence>

                  {item.children &&
                    activeIndex === index && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 8,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="absolute top-full mt-4 min-w-[220px] rounded-2xl border border-neutral-200/60 bg-[var(--background)] p-4 shadow-2xl"
                      >

                        {item.children.map(
                          (sub) => (

                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block rounded-lg px-3 py-2 text-sm transition hover:bg-black/5"
                            >
                              {sub.label}
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ================= LOGO ================= */}

          <div className="flex justify-center">

            <Link href="/">
              <Image
                src="/logo.webp"
                alt="logo"
                width={120}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* ================= RIGHT ICONS ================= */}

          <div className="flex justify-end gap-5">

            <Link href="/">
              <User className="h-5 w-5 cursor-pointer text-[var(--foreground)] transition hover:opacity-70" />
            </Link>

            <Link href="/">
              <Heart className="h-5 w-5 cursor-pointer text-[var(--foreground)] transition hover:opacity-70" />
            </Link>

            <Link href="/">
              <ShoppingBag className="h-5 w-5 cursor-pointer text-[var(--foreground)] transition hover:opacity-70" />
            </Link>
          </div>
        </div>

        {/* ================= MOBILE ================= */}

        <div className="flex h-[65px] items-center justify-between px-4 md:hidden">

          <Menu
            onClick={() =>
              setMobileOpen(true)
            }
            className="h-5 w-5 cursor-pointer"
          />

          <Link href="/">
            <Image
              src="/logo.webp"
              alt="logo"
              width={90}
              height={28}
            />
          </Link>

          <div className="flex gap-3">

            <User className="h-4 w-4" />

            <Heart className="h-4 w-4" />

            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}

      <AnimatePresence>

        {mobileOpen && (
          <>
            {/* OVERLAY */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[998] bg-black/30 backdrop-blur-sm"
              onClick={() =>
                setMobileOpen(false)
              }
            />

            {/* DRAWER */}

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="fixed left-0 top-0 z-[999] flex h-screen w-[85%] max-w-sm flex-col bg-[var(--background)] shadow-2xl"
            >

              {/* TOP */}

              <div className="flex items-center justify-between px-5 py-5">

                <span className="text-lg font-medium">
                  Menu
                </span>

                <X
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="cursor-pointer"
                />
              </div>

              {/* MOBILE LINKS */}

              <div className="flex-1 overflow-y-auto px-3">

                {menu.map((item, index) => (

                  <div
                    key={item.label}
                    className="mb-2"
                  >

                    {/* SIMPLE LINK */}

                    {item.href ? (

                      <Link
                        href={item.href}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className="block rounded-lg px-4 py-3 text-sm"
                      >
                        {item.label}
                      </Link>

                    ) : (

                      <>
                        {/* ACCORDION BUTTON */}

                        <button
                          onClick={() =>
                            toggleAccordion(index)
                          }
                          className="flex w-full items-center justify-between rounded-lg px-4 py-3"
                        >

                          <span className="text-sm">
                            {item.label}
                          </span>

                          <ChevronDown
                            className={`transition ${
                              openIndex === index
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {/* SUBMENU */}

                        <AnimatePresence>

                          {openIndex === index && (

                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              className="overflow-hidden pl-6"
                            >

                              {item.children?.map(
                                (sub) => (

                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() =>
                                      setMobileOpen(false)
                                    }
                                    className="block py-2 text-sm opacity-80"
                                  >
                                    {sub.label}
                                  </Link>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}