"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

type Category = {
  id: string;
  name: string;
  slug: string;

  children: {
    id: string;
    name: string;
    slug: string;
  }[];
};

interface Props {
  categories: Category[];
}

export default function NavbarClient({
  categories,
}: Props) {
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
  const pathname = usePathname();

if (
  pathname.startsWith("/admin") ||
  pathname.startsWith("/auth")
) {
  return null;
}

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-xl">

        {/* Desktop */}

        <div className="hidden h-24 items-center px-8 md:grid md:grid-cols-3 lg:px-12">

          {/* Navigation */}

          <nav className="flex items-center gap-8">

            <Link
              href="/"
              className="group relative text-sm font-medium"
            >
              Home

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </Link>

            {categories.map(
              (category, index) => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() =>
                    handleMouseEnter(index)
                  }
                  onMouseLeave={
                    handleMouseLeave
                  }
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="group relative text-sm font-medium"
                  >
                    {category.name}

                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                  </Link>

                  {category.children
                    .length > 0 && (
                    <AnimatePresence>
                      {activeDropdown ===
                        index && (
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
                          className="absolute left-0 top-full mt-5 min-w-[250px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl"
                        >
                          {category.children.map(
                            (child) => (
                              <Link
                                key={child.id}
                                href={`/categories/${category.slug}/${child.slug}`}
                                className="block rounded-xl px-4 py-3 text-sm transition hover:bg-neutral-100"
                              >
                                {child.name}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            )}
          </nav>

          {/* Logo */}

          <div className="flex justify-center">
            <Link href="/">
              <div className="relative h-12 w-[160px]">
                <Image
                  src="/logo.webp"
                  alt="Logo"
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
                alt="Logo"
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

                <Link
                  href="/"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="block rounded-xl px-4 py-3 text-sm"
                >
                  Home
                </Link>

                {categories.map(
                  (
                    category,
                    index
                  ) => (
                    <div
                      key={category.id}
                    >
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
                          {category.name}
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
                            <Link
                              href={`/categories/${category.slug}`}
                              onClick={() =>
                                setMobileOpen(
                                  false
                                )
                              }
                              className="block py-2 text-sm font-medium"
                            >
                              View All
                            </Link>

                            {category.children.map(
                              (child) => (
                                <Link
                                  key={
                                    child.id
                                  }
                                  href={`/categories/${category.slug}/${child.slug}`}
                                  onClick={() =>
                                    setMobileOpen(
                                      false
                                    )
                                  }
                                  className="block py-2 text-sm text-neutral-600"
                                >
                                  {
                                    child.name
                                  }
                                </Link>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
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