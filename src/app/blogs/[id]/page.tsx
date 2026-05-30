"use client";

import Image from "next/image";
import Link from "next/link";

const relatedPosts = [
  {
    title: "Inside The Artisan Communities Behind Nakshi",
    image: "/products/3.webp",
    category: "Artisans",
  },
  {
    title: "Conscious Living Through Sustainable Textiles",
    image: "/products/4.webp",
    category: "Sustainability",
  },
  {
    title: "The Journey From Loom To Lifestyle",
    image: "/products/1.webp",
    category: "Culture",
  },
];

export default function BlogDetailsPage() {
  return (
    <main className="overflow-hidden bg-[#F6F1EB] text-[#24160F]">
      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/products/1.webp"
            alt="Blog Hero"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="container-luxury relative z-10 pb-16 md:pb-20">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#E6D5C7]">
                Craftsmanship
              </span>

              <span className="h-[3px] w-[3px] rounded-full bg-[#D7C3B1]" />

              <span className="text-[11px] uppercase tracking-[0.24em] text-[#E6D5C7]">
                May 2026
              </span>
            </div>

            <h1 className="mt-6 text-[42px] leading-[0.92] text-white md:text-[82px]">
              The Revival Of Indian Handloom In Contemporary Fashion
            </h1>

            <p className="mt-7 max-w-2xl text-[14px] leading-7 text-white/80 md:text-[15px]">
              Exploring how traditional Indian craftsmanship is finding renewed
              relevance through conscious design, sustainable living, and modern
              aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          <div className="mx-auto max-w-4xl">
            {/* INTRO */}
            <div className="mb-14">
              <p className="text-[17px] leading-9 text-[#4F4338]">
                Indian handloom has always carried more than just fabric — it
                carries stories, identities, traditions, and generations of
                craftsmanship. In recent years, there has been a growing shift
                toward mindful consumption and authentic living, bringing
                handcrafted textiles back into the spotlight of contemporary
                fashion.
              </p>
            </div>

            {/* IMAGE */}
            <div className="overflow-hidden rounded-[32px] border border-[#E6DBCF] shadow-[0_10px_40px_rgba(36,22,15,0.04)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/products/2.webp"
                  alt="Indian Handloom"
                  fill
                  quality={84}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-16 space-y-14">
              {/* SECTION */}
              <div>
                <h2 className="text-[34px] leading-[1] md:text-[52px]">
                  Craftsmanship Beyond Trends
                </h2>

                <div className="mt-7 space-y-6 text-[16px] leading-9 text-[#5F5147]">
                  <p>
                    Unlike mass-produced fashion, handcrafted textiles embody
                    patience, skill, and individuality. Every weave, motif, and
                    detail reflects the human touch behind its creation.
                  </p>

                  <p>
                    Today’s consumers are increasingly valuing pieces that feel
                    personal and meaningful — moving away from fast fashion
                    toward timeless products rooted in authenticity.
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div className="overflow-hidden rounded-[32px] border border-[#E6DBCF] shadow-[0_10px_40px_rgba(36,22,15,0.04)]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/products/5.webp"
                    alt="Artisan Fashion"
                    fill
                    quality={82}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>

              {/* SECTION */}
              <div>
                <h2 className="text-[34px] leading-[1] md:text-[52px]">
                  The Role Of Sustainable Living
                </h2>

                <div className="mt-7 space-y-6 text-[16px] leading-9 text-[#5F5147]">
                  <p>
                    Sustainability is no longer a niche idea — it is becoming a
                    defining value in modern lifestyles. Handloom naturally
                    aligns with slow production, reduced waste, and ethical
                    craftsmanship.
                  </p>

                  <p>
                    By supporting artisan-led products, customers contribute to
                    preserving cultural heritage while encouraging responsible
                    production practices.
                  </p>
                </div>
              </div>

              {/* QUOTE */}
              <div className="border-y border-[#E7DBCF] py-12 text-center">
                <p className="mx-auto max-w-3xl text-[30px] italic leading-[1.4] text-[#2A1A12] md:text-[48px]">
                  “True luxury lies in the story woven into every thread.”
                </p>
              </div>

              {/* SECTION */}
              <div>
                <h2 className="text-[34px] leading-[1] md:text-[52px]">
                  A Future Rooted In Heritage
                </h2>

                <div className="mt-7 space-y-6 text-[16px] leading-9 text-[#5F5147]">
                  <p>
                    As contemporary fashion evolves, Indian handloom continues
                    to inspire designers, brands, and consumers around the
                    world. Its beauty lies in its imperfections, its humanity,
                    and its cultural depth.
                  </p>

                  <p>
                    At Nakshi, we believe handcrafted textiles are not simply
                    products — they are living traditions that deserve to be
                    preserved for generations to come.
                  </p>
                </div>
              </div>
            </div>

            {/* AUTHOR */}
            <div className="mt-20 rounded-[30px] border border-[#E7DBCF] bg-[#FBF8F4] p-8 shadow-[0_10px_40px_rgba(36,22,15,0.04)] md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="/products/3.webp"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                    Written By
                  </p>

                  <h3 className="mt-3 text-[28px] leading-none">
                    Nakshi Editorial Team
                  </h3>

                  <p className="mt-4 max-w-2xl text-[15px] leading-8 text-[#5F5147]">
                    Sharing stories around Indian craftsmanship, conscious
                    living, heritage textiles, and timeless design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      <section className="border-t border-[#E8DDD1] py-16 md:py-24">
        <div className="container-luxury">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                Related Stories
              </p>

              <h2 className="text-[36px] leading-[0.95] md:text-[58px]">
                Continue Reading
              </h2>
            </div>

            <Link
              href="/blogs"
              className="hidden text-[12px] uppercase tracking-[0.24em] text-[#8B5E3C] transition-opacity hover:opacity-60 md:block"
            >
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedPosts.map((post, index) => (
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
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                    {post.category}
                  </p>

                  <h3 className="mt-5 text-[28px] leading-[1.08] transition-opacity duration-300 group-hover:opacity-70">
                    {post.title}
                  </h3>

                  <div className="mt-8">
                    <Link
                      href={`/blogs/${index + 1}`}
                      className="inline-flex items-center text-[12px] uppercase tracking-[0.24em] text-[#8B5E3C]"
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

      {/* CTA */}
      <section className="border-t border-[#E8DDD1] py-16 md:py-24">
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