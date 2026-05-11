"use client";

import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Authentic Craftsmanship",
    description:
      "Every Nakshi piece is handcrafted using traditional weaving and artisan techniques passed through generations.",
  },
  {
    title: "Conscious Creation",
    description:
      "We believe in mindful production, small-batch craftsmanship, and responsible sourcing rooted in sustainability.",
  },
  {
    title: "Empowering Communities",
    description:
      "Nakshi works closely with rural artisan communities to preserve India’s rich craft heritage through meaningful livelihood opportunities.",
  },
];

const stats = [
  {
    number: "2012",
    label: "Founded",
  },
  {
    number: "100+",
    label: "Artisan Communities",
  },
  {
    number: "6",
    label: "Retail Stores",
  },
  {
    number: "Pan India",
    label: "Marketplace Presence",
  },
];

export default function Page() {
  return (
    <main className="bg-[#F6F1EB] text-[#24160F] overflow-hidden">
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[680px] w-full">
        <Image
          src="/products/1.webp"
          alt="Nakshi Heritage"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex h-full items-end">
          <div className="container-luxury pb-16 md:pb-24">
            <div className="max-w-5xl">
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#E8D7C8]">
                Crafted In India
              </p>

              <h1 className="max-w-5xl text-[52px] leading-[0.92] text-white md:text-[92px]">
                Heritage Woven Into Contemporary Living
              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 md:text-[15px]">
                Nakshi is a contemporary lifestyle brand rooted in India’s rich
                handloom and handcrafted traditions — creating timeless pieces
                that celebrate craftsmanship, culture, and conscious living.
              </p>

              <div className="mt-10">
                <Link href="/collections" className="btn-luxury border-white text-white hover:bg-white hover:text-black">
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* IMAGE */}
            <div className="editorial-image relative aspect-[4/5]">
              <Image
                src="/products/2.webp"
                alt="Nakshi Artisans"
                fill
                quality={82}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* CONTENT */}
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                Our Philosophy
              </p>

              <h2 className="max-w-xl text-[42px] leading-[0.95] md:text-[72px]">
                A Brand Built Around Human Craft
              </h2>

              <div className="mt-10 max-w-xl space-y-6 text-[15px] leading-8 text-[#5F5147]">
                <p>
                  At Nakshi, every creation begins with the hands of an artisan.
                </p>

                <p>
                  We collaborate with weaving and craft communities across rural
                  India to preserve centuries-old techniques while reimagining
                  them for contemporary lifestyles.
                </p>

                <p>
                  Each textile, motif, and handcrafted detail reflects a story
                  of heritage, patience, and skilled artistry.
                </p>

                <p>
                  Our approach combines timeless Indian craftsmanship with
                  refined contemporary aesthetics — creating products that feel
                  authentic, elegant, and deeply personal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL GALLERY */}
      <section className="pb-20 md:pb-32">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="editorial-image relative aspect-[4/5]">
              <Image
                src="/products/3.webp"
                alt="Handcrafted Textiles"
                fill
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="editorial-image relative aspect-[4/5] md:mt-16">
              <Image
                src="/products/4.webp"
                alt="Nakshi Collection"
                fill
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="editorial-image relative aspect-[4/5]">
              <Image
                src="/products/5.webp"
                alt="Indian Craftsmanship"
                fill
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding border-y border-[#E8DDD1] bg-[#FBF8F4]">
        <div className="container-luxury">
          <div className="max-w-2xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
              What We Stand For
            </p>

            <h2 className="text-[42px] leading-[0.95] md:text-[72px]">
              Purpose Beyond Fashion
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
            {values.map((item) => (
              <div key={item.title}>
                <div className="h-px w-full bg-[#D8CABB]" />

                <h3 className="mt-8 text-[28px] leading-tight">
                  {item.title}
                </h3>

                <p className="mt-6 max-w-sm text-[15px] leading-8 text-[#5F5147]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-[#1E140F] py-20 text-white md:py-32">
        <div className="container-luxury">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* LEFT */}
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#C6A98F]">
                Legacy & Impact
              </p>

              <h2 className="max-w-2xl text-[42px] leading-[0.95] md:text-[72px]">
                Preserving Craft. Creating Impact.
              </h2>

              <div className="mt-10 max-w-xl space-y-6 text-[15px] leading-8 text-white/70">
                <p>
                  Since 2012, Nakshi has worked closely with artisan
                  communities to create dignified livelihood opportunities
                  through handcrafted design-led products.
                </p>

                <p>
                  Today, our collections reach customers across India through
                  retail stores, digital platforms, and curated marketplaces —
                  while remaining deeply rooted in authenticity, sustainability,
                  and craftsmanship.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 border border-white/10">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 p-8 md:p-10"
                >
                  <h3 className="text-[32px] leading-none text-white md:text-[54px]">
                    {item.number}
                  </h3>

                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[#C6A98F]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section-padding border-y border-[#E8DDD1] bg-[#FBF8F4]">
        <div className="container-luxury">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[34px] italic leading-[1.3] text-[#2A1A12] md:text-[54px]">
              Craftsmanship is not a trend. It is a legacy.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* IMAGE */}
            <div className="editorial-image relative order-2 aspect-[4/5] lg:order-1">
              <Image
                src="/products/2.webp"
                alt="Nakshi Premium Collection"
                fill
                quality={82}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* CONTENT */}
            <div className="order-1 lg:order-2">
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                More Than A Purchase
              </p>

              <h2 className="max-w-xl text-[42px] leading-[0.95] md:text-[72px]">
                Every Piece Carries A Story
              </h2>

              <div className="mt-10 max-w-xl space-y-6 text-[15px] leading-8 text-[#5F5147]">
                <p>
                  Every Nakshi creation carries the story of skilled hands,
                  cultural heritage, and thoughtful craftsmanship.
                </p>

                <p>
                  When you choose Nakshi, you become part of a larger movement
                  that values authenticity, sustainability, and timeless design.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/collections" className="btn-luxury">
                  Discover The Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}