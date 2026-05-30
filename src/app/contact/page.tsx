"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#F6F1EB] text-[#24160F]">
      {/* HERO */}
      <section className="relative flex min-h-[48vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/products/2.webp"
            alt="Nakshi Contact"
            fill
            priority
            quality={82}
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="container-luxury relative z-10 pb-14 md:pb-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#E7D6C7]">
              Contact Nakshi
            </p>

            <h1 className="text-[42px] leading-[0.92] text-white md:text-[72px]">
              Crafted Conversations Begin Here
            </h1>

            <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/80">
              Reach out for handcrafted collections, partnerships, gifting, or
              customer support.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-16 md:py-24">
        <div className="container-luxury">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch">
            {/* LEFT CARD */}
            <div className="flex h-full flex-col rounded-[30px] border border-[#E6DBCF] bg-[#FBF8F4] p-8 shadow-[0_10px_40px_rgba(36,22,15,0.04)] md:p-10">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                  Reach Us
                </p>

                <h2 className="max-w-md text-[36px] leading-[0.95] md:text-[52px]">
                  Send An Inquiry
                </h2>
              </div>

              <div className="mt-10 flex-1 space-y-8">
                {/* ADDRESS */}
                <div className="border-t border-[#E4D7CA] pt-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                    Address
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-[#55483E]">
                    76, EC, Sector 1
                    <br />
                    Kolkata, West Bengal 700064
                  </p>
                </div>

                {/* PHONE */}
                <div className="border-t border-[#E4D7CA] pt-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                    Phone
                  </p>

                  <a
                    href="tel:+917604060001"
                    className="mt-4 inline-block text-[15px] text-[#55483E] transition-opacity hover:opacity-60"
                  >
                    +91 76040 60001
                  </a>
                </div>

                {/* HOURS */}
                <div className="border-t border-[#E4D7CA] pt-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                    Working Hours
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-[#55483E]">
                    Mon — Sun
                    <br />
                    9:00AM — 8:00PM
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="flex h-full flex-col rounded-[30px] border border-[#E6DBCF] bg-[#FBF8F4] p-8 shadow-[0_10px_40px_rgba(36,22,15,0.04)] md:p-10">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                  Inquiry Form
                </p>

                <h3 className="text-[34px] leading-[1] md:text-[48px]">
                  How We Can Help
                </h3>

                <p className="mt-5 max-w-lg text-[14px] leading-7 text-[#5F5147]">
                  Fill in your details and our team will get back to you soon.
                </p>
              </div>

              <form className="mt-10 flex flex-1 flex-col">
                <div className="space-y-7">
                  {/* NAME + PHONE */}
                  <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                        Full Name
                      </label>

                      <input
                        type="text"
                        placeholder="Your name"
                        className="h-12 w-full border-b border-[#D7C8BA] bg-transparent text-[14px] outline-none placeholder:text-[#9B8A7C] transition-colors focus:border-[#24160F]"
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                        Phone
                      </label>

                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="h-12 w-full border-b border-[#D7C8BA] bg-transparent text-[14px] outline-none placeholder:text-[#9B8A7C] transition-colors focus:border-[#24160F]"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Your email address"
                      className="h-12 w-full border-b border-[#D7C8BA] bg-transparent text-[14px] outline-none placeholder:text-[#9B8A7C] transition-colors focus:border-[#24160F]"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="mb-3 block text-[11px] uppercase tracking-[0.24em] text-[#8B5E3C]">
                      Message
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Write your message..."
                      className="w-full resize-none border-b border-[#D7C8BA] bg-transparent py-3 text-[14px] leading-7 outline-none placeholder:text-[#9B8A7C] transition-colors focus:border-[#24160F]"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-auto pt-10">
                  <button
                    type="submit"
                    className="btn-luxury w-full md:w-auto"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="mt-12 overflow-hidden rounded-[32px] border border-[#E6DBCF] bg-white shadow-[0_10px_40px_rgba(36,22,15,0.04)]">
            <div className="flex flex-col justify-between gap-8 border-b border-[#ECE2D7] p-8 md:flex-row md:items-end md:p-10">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                  Visit Our Store
                </p>

                <h3 className="text-[32px] leading-[0.95] md:text-[46px]">
                  Find Nakshi In Kolkata
                </h3>

                <p className="mt-5 max-w-xl text-[14px] leading-7 text-[#5F5147]">
                  Located in the heart of Salt Lake, our store brings together
                  handcrafted collections inspired by timeless Indian heritage.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=76,EC,Sector+1,Kolkata,West+Bengal+700064"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury"
              >
                Open In Maps
              </a>
            </div>

            <iframe
              src="https://www.google.com/maps?q=76,EC,Sector+1,Kolkata,West+Bengal+700064&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E8DDD1] py-16 md:py-20">
        <div className="container-luxury">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8B5E3C]">
                Discover Nakshi
              </p>

              <h2 className="text-[36px] leading-[0.95] md:text-[56px]">
                Explore Handcrafted Collections
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