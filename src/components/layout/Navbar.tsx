"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  Menu,
  ShoppingBag,
  User,
  X,
  ChevronDown,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type MenuItem = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Men",
    children: [
      { label: "Dhoti", href: "/products" },
      { label: "Kurta", href: "/products" },
      { label: "Kurta Dhoti Set", href: "/products" },
      { label: "Nehru Jacket", href: "/products" },
      { label: "Sherwani", href: "/products" },
      { label: "Shirt", href: "/products" },
    ],
  },

  {
    label: "Women",
    children: [
      { label: "Kurti", href: "/products" },
      { label: "Kurti Set", href: "/products" },
      { label: "Bottom Wear", href: "/products" },
      { label: "Saree", href: "/products" },
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

  const [mobileAccordion, setMobileAccordion] =
    useState<number | null>(null);

  const [activeDropdown, setActiveDropdown] =
    useState<number | null>(null);

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (
    index: number
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-xl">

        {/* Desktop */}

        <div className="hidden h-24 items-center md:grid md:grid-cols-3 px-8 lg:px-12">

          {/* Navigation */}

          <nav className="flex items-center gap-8">

            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  handleMouseEnter(index)
                }
                onMouseLeave={
                  handleMouseLeave
                }
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group relative text-sm font-medium"
                  >
                    {item.label}

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button className="group relative text-sm font-medium">
                    {item.label}

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </button>
                )}

                <AnimatePresence>

                  {activeDropdown === index &&
                    item.children && (
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
                          y: 10,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="absolute top-full left-0 mt-5 min-w-[250px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl"
                      >
                        {item.children.map(
                          (child) => (
                            <Link
                              key={
                                child.label
                              }
                              href={
                                child.href
                              }
                              className="block rounded-xl px-4 py-3 text-sm transition hover:bg-neutral-100"
                            >
                              {
                                child.label
                              }
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Logo */}

          <div className="flex justify-center">

            <Link href="/">
              <div className="relative h-12 w-[160px]">

                <Image
                  src="/logo.webp"
                  alt="Nakshi"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Actions */}

          <div className="flex items-center justify-end gap-5">

            <Link href="/account">
              <User className="h-5 w-5 transition hover:opacity-70" />
            </Link>

            <Link href="/wishlist">
              <Heart className="h-5 w-5 transition hover:opacity-70" />
            </Link>

            <Link href="/cart">
              <ShoppingBag className="h-5 w-5 transition hover:opacity-70" />
            </Link>
          </div>
        </div>

        {/* Mobile */}

        <div className="flex h-16 items-center justify-between px-4 md:hidden">

          <button
            onClick={() =>
              setMobileOpen(true)
            }
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/">
            <div className="relative h-8 w-[110px]">

              <Image
                src="/logo.webp"
                alt="Nakshi"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">

            <User className="h-4 w-4" />

            <Heart className="h-4 w-4" />

            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      <AnimatePresence>

        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            />

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 250,
              }}
              className="fixed left-0 top-0 z-[100] flex h-screen w-[85%] max-w-sm flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b px-5 py-5">

                <h2 className="font-semibold">
                  Menu
                </h2>

                <button
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-4">

                {menuItems.map(
                  (item, index) => (
                    <div
                      key={item.label}
                    >
                      {item.href ? (
                        <Link
                          href={
                            item.href
                          }
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                          className="block rounded-xl px-4 py-3 text-sm"
                        >
                          {
                            item.label
                          }
                        </Link>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              setMobileAccordion(
                                mobileAccordion ===
                                  index
                                  ? null
                                  : index
                              )
                            }
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm"
                          >
                            <span>
                              {
                                item.label
                              }
                            </span>

                            <ChevronDown
                              className={`transition-transform ${
                                mobileAccordion ===
                                index
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>

                            {mobileAccordion ===
                              index && (
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height:
                                    "auto",
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                className="overflow-hidden pl-6"
                              >
                                {item.children?.map(
                                  (
                                    child
                                  ) => (
                                    <Link
                                      key={
                                        child.label
                                      }
                                      href={
                                        child.href
                                      }
                                      onClick={() =>
                                        setMobileOpen(
                                          false
                                        )
                                      }
                                      className="block py-2 text-sm text-neutral-600"
                                    >
                                      {
                                        child.label
                                      }
                                    </Link>
                                  )
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}