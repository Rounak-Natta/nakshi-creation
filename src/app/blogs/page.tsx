"use client";

import Image from "next/image";
import Link from "next/link";

const featuredPost = {
  title: "The Revival Of Indian Handloom In Contemporary Fashion",
  description:
    "Exploring how traditional Indian craftsmanship is shaping modern lifestyles through timeless textiles, conscious design, and artisan-led storytelling.",
  image: "/products/1.webp",
  category: "Craftsmanship",
  date: "May 2026",
};

const blogPosts = [
  {
    title: "Why Handcrafted Fashion Holds Timeless Value",
    image: "/products/2.webp",
    category: "Heritage",
    date: "April 2026",
  },
  {
    title: "Inside The Artisan Communities Behind Nakshi",
    image: "/products/3.webp",
    category: "Artisans",
    date: "March 2026",
  },
  {
    title: "Conscious Living Through Sustainable Textiles",
    image: "/products/4.webp",
    category: "Sustainability",
    date: "February 2026",
  },
  {
    title: "Indian Motifs Reimagined For Modern Homes",
    image: "/products/5.webp",
    category: "Design",
    date: "January 2026",
  },
  {
    title: "The Journey From Loom To Lifestyle",
    image: "/products/3.webp",
    category: "Culture",
    date: "December 2025",
  },
  {
    title: "Preserving Craft Traditions For Future Generations",
    image: "/products/2.webp",
    category: "Legacy",
    date: "November 2025",
  },
];

export default function OurBlogsPage() {
  return (
    <main className="overflow-hidden bg-[#F6F1EB] text-[#24160F]">
      {/* HERO */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/products/1.webp"
            alt="Nakshi Journal"
            fill
            priority
            quality={84}
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="container-luxury relative z-10 pb-16 md:pb-20">
          <div className="max-w-5xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#E6D5C7]">
              Nakshi Journal
            </p>

            <h1 className="text-[44px] leading-[0.92] text-white md:text-[82px]">
              Stories Rooted In Craft, Culture & Contemporary Living
            </h1>

            <p className="mt-6 max-w-2xl text-[14px] leading-7 text-white/80 md:text-[15px]">
              Explore thoughtful stories around Indian craftsmanship,
              sustainable living, artisan heritage, and timeless design.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED BLOG */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                Featured Story
              </p>
            </div>

            <Link
              href="/blogs"
              className="text-[12px] uppercase tracking-[0.24em] text-[#8B5E3C] transition-opacity hover:opacity-60"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 overflow-hidden rounded-[32px] border border-[#E7DBCF] bg-[#FBF8F4] shadow-[0_10px_40px_rgba(36,22,15,0.04)] lg:grid-cols-[1.1fr_0.9fr]">
            {/* IMAGE */}
            <div className="relative min-h-[420px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                quality={84}
                className="object-cover"
                sizes="(max-width:768px) 100vw, 60vw"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                  {featuredPost.category}
                </span>

                <span className="h-[3px] w-[3px] rounded-full bg-[#B9A08A]" />

                <span className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                  {featuredPost.date}
                </span>
              </div>

              <h2 className="mt-6 text-[34px] leading-[1] md:text-[52px]">
                {featuredPost.title}
              </h2>

              <p className="mt-6 max-w-lg text-[15px] leading-8 text-[#5F5147]">
                {featuredPost.description}
              </p>

              <div className="mt-10">
                <Link href="/blogs/featured" className="btn-luxury">
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="pb-16 md:pb-24">
        <div className="container-luxury">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
              Latest Articles
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-[28px] border border-[#E7DBCF] bg-[#FBF8F4] shadow-[0_10px_40px_rgba(36,22,15,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(36,22,15,0.06)]"
              >
                {/* IMAGE */}
                <Link href={`/blogs/${index + 1}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      quality={82}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                      {post.category}
                    </span>

                    <span className="h-[3px] w-[3px] rounded-full bg-[#B9A08A]" />

                    <span className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[28px] leading-[1.08] transition-opacity duration-300 group-hover:opacity-70">
                    {post.title}
                  </h3>

                  <div className="mt-8">
                    <Link
                      href={`/blogs/${index + 1}`}
                      className="inline-flex items-center text-[12px] uppercase tracking-[0.24em] text-[#8B5E3C] transition-all duration-300 hover:gap-3"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-y border-[#E8DDD1] bg-[#FBF8F4] py-16 md:py-24">
        <div className="container-luxury">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[32px] italic leading-[1.3] text-[#2A1A12] md:text-[52px]">
              Every handcrafted piece carries a story worth preserving.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[32px] border border-[#E7DBCF] bg-[#FBF8F4] p-8 shadow-[0_10px_40px_rgba(36,22,15,0.04)] md:flex-row md:items-end md:p-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                Explore Nakshi
              </p>

              <h2 className="text-[36px] leading-[0.95] md:text-[58px]">
                Discover Timeless Handcrafted Collections
              </h2>
            </div>

            <Link href="/collections" className="btn-luxury">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}