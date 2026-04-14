"use client";

export default function PromoBanner() {
  return (
<section className="bg-[#f7f1f1] py-12 md:py-20 text-center">      {/* Coupon */}
      <p className="text-xs md:text-sm tracking-widest text-[#4b2e2b] mb-3">
        USE CODE: NAKSHI70
      </p>

      {/* Main Content */}
      <div className="flex items-center justify-center gap-3 md:gap-6">
        
        {/* UPTO */}
        <span className="text-3xl md:text-6xl font-serif text-[#4b2e2b]">
          UPTO
        </span>

        {/* 70 */}
        <span className="text-[90px] md:text-[180px] leading-none font-bold text-[#4b2e2b]">
          70
        </span>

        {/* % OFF */}
        <span className="text-3xl md:text-6xl font-serif text-[#4b2e2b] whitespace-nowrap">
          % OFF
        </span>
      </div>
    </section>
  );
}