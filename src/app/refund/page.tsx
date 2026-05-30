import React from "react";

const sections = [
  {
    title: "Return Policy",
    content: [
      "We have a 2 days return policy, which means you have 2 days after receiving your item to request a return.",
      "To be eligible for a return, your item must be in the same condition that you received it — unworn or unused, with tags, and in its original packaging.",
      "You’ll also need the receipt or proof of purchase for initiating the return process.",
    ],
  },
  {
    title: "How to Start a Return",
    content: [
      "To start a return, you can contact us at productionhead@nakshicreations.in.",
      "If your return is accepted, we’ll send you a return shipping label along with instructions on how and where to send your package.",
      "Items sent back to us without first requesting a return will not be accepted.",
      "You can always contact us for any return-related questions at productionhead@nakshicreations.in.",
    ],
  },
  {
    title: "Damages & Issues",
    content: [
      "Please inspect your order immediately upon reception.",
      "Contact us right away if the item is defective, damaged, or if you receive the wrong item so that we can evaluate the issue and make it right.",
    ],
  },
  {
    title: "Exceptions / Non-Returnable Items",
    content: [
      "Certain types of items cannot be returned, including custom products such as special orders or personalized items.",
      "Please contact us if you have questions or concerns about your specific item.",
      "Unfortunately, we cannot accept returns on sale items or gift cards.",
    ],
  },
  {
    title: "Exchanges",
    content: [
      "The fastest way to ensure you get what you want is to return the item you currently have.",
      "Once the return is accepted, you may place a separate order for the new item.",
    ],
  },
  {
    title: "Refunds",
    content: [
      "We will notify you once we’ve received and inspected your return and let you know whether the refund was approved or not.",
      "If approved, you’ll automatically be refunded to your original payment method within 15 working days.",
      "Please remember that it may also take additional time for your bank or credit card company to process and post the refund.",
    ],
  },
];

const Page = () => {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-luxury section-padding relative z-10">
          <div className="max-w-5xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-muted">
              Returns & Refunds
            </p>

            <h1 className="text-[3.2rem] leading-none md:text-[6.8rem]">
              Refund <span className="text-accent">&</span> Return Policy
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-muted md:text-lg">
              A clear and transparent overview of our return eligibility,
              exchanges, refunds, and customer support process for all
              purchases made through NAKSHI.
            </p>
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[10%] h-[240px] w-[240px] rounded-full border border-accent/20" />
      </section>

      {/* CONTENT */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(36,22,15,0.06)] md:p-12"
              >
                {/* Accent line */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-accent/80" />

                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-accent" />

                  <h2 className="text-2xl leading-tight md:text-4xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="max-w-5xl text-[15px] leading-8 text-muted md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CONTACT / FOOTER */}
          <div className="mt-20 rounded-[28px] border border-border bg-surface p-8 md:p-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-muted">
                Customer Support
              </p>

              <h3 className="text-3xl md:text-5xl">
                Need help with a return?
              </h3>

              <p className="mt-6 text-base leading-8 text-muted">
                For refund, exchange, or return related queries, please
                contact our support team directly.
              </p>

              <div className="mt-8 inline-flex items-center rounded-full border border-border px-6 py-4 text-sm tracking-wide">
                productionhead@nakshicreations.in
              </div>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div className="mt-12 border-t border-border pt-8">
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