import React from "react";

const sections = [
  {
    title: "Shipping and Delivery",
    content: [
      "We at NAKSHI know how important it is to receive your purchased products in the finest condition, and on time. So we use a delivery partner namely ‘DELHIVERY’ to deliver your products to you as early as possible.",
      "Depending upon the serviceable location (as per the searchable pin code selected at the time of placing orders) by our delivery partner, the product shall be delivered to you within 5 to 7 working days after it has been dispatched from our warehouse.",
      "By ordering the product, the buyer agrees to share their contact details such as Name, Address, Mobile / Telephone Number, Email ID, etc.",
      "Free shipping is available on all products, subject to a minimum order value of ₹400.",
      "The whole order amount including any delivery charges will be refunded if the order is cancelled or lost in transit by the delivery partner.",
    ],
  },
  {
    title: "Billing and Payments",
    content: [
      "All billing details provided at the time of purchase must be accurate and complete. NAKSHI reserves the right to verify and validate the information provided by customers before processing any order.",
    ],
  },
  {
    title: "Cancellation Policy",
    content: [
      "NAKSHI reserves the right to cancel any order without any explanation for doing so, as per circumstances where the requirement could not be met.",
      "The company will ensure that any communication regarding cancellation of an order or any applicable refund will be made within a reasonable time.",
    ],
  },
  {
    title: "Cash On Delivery Policy",
    content: [
      "To avail COD service, all items in the cart should be applicable for Cash On Delivery.",
      "COD charges, as applicable from time to time, may be charged additionally.",
      "The pin code provided for Cash On Delivery should be within the serviceable area.",
      "In case the area is not serviceable by our delivery partner, the order shall not be accepted.",
      "You shall not be liable to open the box/product without making the payment at the time of delivery.",
      "If the package appears opened or tampered with, kindly do not accept the order.",
    ],
  },
];

const Page = () => {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-luxury section-padding">
          <div className="max-w-4xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-muted">
              Policies & Information
            </p>

            <h1 className="text-[3.2rem] leading-none md:text-[6rem]">
              Shipping <span className="text-accent">&</span> Policies
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted md:text-lg">
              Transparent shipping, delivery, cancellation and payment
              information designed to ensure a seamless experience with NAKSHI.
            </p>
          </div>
        </div>

        {/* subtle background accent */}
        <div className="absolute right-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* CONTENT */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid gap-8 md:gap-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className="group rounded-[32px] border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(36,22,15,0.06)] md:p-12"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-accent" />

                  <h2 className="text-3xl md:text-5xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((text, i) => (
                    <p
                      key={i}
                      className="max-w-4xl text-[15px] leading-8 text-muted md:text-base"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FOOT NOTE */}
          <div className="mt-16 border-t border-border pt-8">
            <p className="text-sm tracking-wide text-muted">
              Last updated: May 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;