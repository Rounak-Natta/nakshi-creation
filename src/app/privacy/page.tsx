import React from "react";

const privacySections = [
  {
    title: "Overview",
    paragraphs: [
      "At NAKSHI, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how your information is collected, used, and safeguarded when you access or use our website and services.",
      "By using our website, you agree to the practices described in this policy.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect personal information such as your name, email address, phone number, billing address, shipping address, and payment details when you place an order or interact with our website.",
      "We may also collect non-personal information including browser type, IP address, device information, cookies, and browsing behavior to improve user experience and website functionality.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "The information collected may be used to process orders, deliver products, provide customer support, improve our services, and communicate important updates related to your purchases.",
      "We may also use your contact details to send promotional offers, newsletters, or updates regarding new collections, unless you choose to opt out of such communications.",
    ],
  },
  {
    title: "Payment Security",
    paragraphs: [
      "All payment transactions are processed through secure and trusted payment gateways. NAKSHI does not store your complete card or banking information on our servers.",
      "Reasonable security measures are implemented to protect your personal information against unauthorized access, disclosure, or misuse.",
    ],
  },
  {
    title: "Cookies & Tracking",
    paragraphs: [
      "Our website may use cookies and similar technologies to enhance browsing experience, analyze website traffic, and understand customer preferences.",
      "Users can choose to disable cookies through their browser settings, although some features of the website may not function properly.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "We may share necessary customer information with trusted third-party service providers such as shipping partners, payment gateways, and analytics providers solely for operational purposes.",
      "These third parties are expected to maintain the confidentiality and security of your information.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to fulfill legal, operational, and business requirements.",
      "Users may request deletion or modification of their information by contacting our support team, subject to applicable legal obligations.",
    ],
  },
  {
    title: "Policy Updates",
    paragraphs: [
      "NAKSHI reserves the right to modify or update this Privacy Policy at any time without prior notice.",
      "Changes will be effective immediately upon being posted on this page. Continued use of the website signifies your acceptance of the updated policy.",
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
              Legal & Privacy
            </p>

            <h1 className="text-[3.5rem] leading-none md:text-[6.5rem]">
              Privacy <span className="text-accent">&</span> Policy
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted md:text-lg">
              Your trust matters to us. Learn how NAKSHI collects,
              protects, and responsibly uses your information while
              providing a secure shopping experience.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-80px] h-[280px] w-[280px] rounded-full border border-accent/20" />
      </section>

      {/* CONTENT */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid gap-8 md:gap-10">
            {privacySections.map((section, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[34px] border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(36,22,15,0.06)] md:p-12"
              >
                {/* Accent line */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-accent/80" />

                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-accent" />

                  <h2 className="text-3xl md:text-5xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="max-w-4xl text-[15px] leading-8 text-muted md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm tracking-wide text-muted">
              Last updated: May 2026
            </p>

            <p className="text-sm text-muted">
              © NAKSHI — All Rights Reserved
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;