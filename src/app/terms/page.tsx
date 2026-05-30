import React from "react";

const sections = [
  {
    title: "Overview",
    content: [
      "This website is operated by Nakshi. Throughout the site, the terms “we”, “us” and “our” refer to Nakshi. Nakshi offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
      "By visiting our site and/or purchasing something from us, you engage in our Service and agree to be bound by these Terms of Service, including additional policies and conditions referenced herein.",
      "Our store is hosted on AWS, which provides the online e-commerce platform that allows us to sell our products and services to you.",
    ],
  },
  {
    title: "Section 1 — Online Store Terms",
    content: [
      "By agreeing to these Terms of Service, you confirm that you are at least the age of majority in your state or province of residence.",
      "You may not use our products for any illegal or unauthorized purpose or violate any applicable laws while using the Service.",
      "Any breach or violation of the Terms will result in immediate termination of your Services.",
    ],
  },
  {
    title: "Section 2 — General Conditions",
    content: [
      "We reserve the right to refuse service to anyone for any reason at any time.",
      "Your content (excluding credit card information) may be transferred unencrypted across networks and adapted to technical requirements.",
      "You agree not to reproduce, duplicate, copy, sell or exploit any portion of the Service without express written permission from us.",
    ],
  },
  {
    title: "Section 3 — Accuracy & Information",
    content: [
      "We are not responsible if information available on this site is inaccurate, incomplete or outdated.",
      "Historical information may appear on the website and is provided only for reference purposes.",
      "We reserve the right to modify website contents at any time without obligation to update information.",
    ],
  },
  {
    title: "Section 4 — Modifications to Service & Prices",
    content: [
      "Prices for products are subject to change without notice.",
      "We reserve the right to modify or discontinue the Service without notice at any time.",
      "Nakshi shall not be liable for any modification, suspension or discontinuance of the Service.",
    ],
  },
  {
    title: "Section 5 — Products & Services",
    content: [
      "Certain products or services may be available exclusively online and may have limited quantities.",
      "Product colors and images are displayed as accurately as possible, although monitor settings may affect appearance.",
      "We reserve the right to limit sales, quantities or discontinue products at any time.",
    ],
  },
  {
    title: "Section 6 — Services Provided",
    content: [
      "Nakshi provides internet-based services allowing customers to purchase ethnic Indian wear through the website.",
      "Purchases are additionally governed by Billing, Shipping, Return and Exchange Policies.",
      "Product-specific conditions may also apply and be displayed on individual product pages.",
    ],
  },
  {
    title: "Section 7 — Billing & Account Information",
    content: [
      "We reserve the right to refuse or cancel any order placed with us.",
      "Users agree to provide current, complete and accurate billing and account information.",
      "Orders suspected to be placed by dealers, resellers or distributors may be restricted or prohibited.",
    ],
  },
  {
    title: "Section 8 — Optional Tools",
    content: [
      "We may provide access to third-party tools without monitoring or control over them.",
      "Such tools are provided 'as is' and 'as available' without warranties of any kind.",
      "Future services, features or tools introduced through the website shall also be subject to these Terms.",
    ],
  },
  {
    title: "Section 9 — Third-Party Links",
    content: [
      "Third-party links on this website may direct users to external websites not affiliated with Nakshi.",
      "We are not responsible for the accuracy, content or practices of third-party websites.",
      "Users should carefully review third-party policies before engaging in transactions.",
    ],
  },
  {
    title: "Section 10 — User Comments & Feedback",
    content: [
      "Any comments, feedback, suggestions or submissions sent to us may be used without restriction.",
      "We may monitor, edit or remove unlawful, offensive or objectionable content.",
      "Users are solely responsible for the comments they post and their accuracy.",
    ],
  },
  {
    title: "Section 11 — Personal Information",
    content: [
      "Your submission of personal information through the store is governed by our Privacy Policy.",
      "Certain content may be transferred unencrypted across various networks except payment information.",
    ],
  },
  {
    title: "Section 12 — User Account & Security",
    content: [
      "Users are responsible for maintaining the confidentiality of their account credentials.",
      "You agree to immediately notify us of any unauthorized use of your account.",
      "Nakshi shall not be liable for losses arising from failure to maintain account security.",
    ],
  },
  {
    title: "Section 13 — Errors & Omissions",
    content: [
      "Occasionally there may be typographical errors, inaccuracies or omissions related to products, pricing or promotions.",
      "We reserve the right to correct such errors or cancel orders without prior notice.",
    ],
  },
  {
    title: "Section 14 — Prohibited Uses",
    content: [
      "Users are prohibited from using the site for unlawful, abusive, fraudulent or harmful activities.",
      "Uploading malicious code, scraping data, phishing, harassment or violating intellectual property rights is strictly prohibited.",
      "Violation of prohibited uses may result in termination of access to the Service.",
    ],
  },
  {
    title: "Section 15 — Feedback & Information",
    content: [
      "Any feedback submitted to the Website shall be deemed non-confidential.",
      "Nakshi is free to use submitted feedback without obligation or compensation.",
    ],
  },
  {
    title: "Section 16 — Disclaimer of Warranties & Liability",
    content: [
      "We do not guarantee uninterrupted, secure or error-free use of the Service.",
      "Services and products are provided 'as is' and 'as available' without warranties.",
      "Nakshi shall not be liable for direct, indirect, incidental or consequential damages arising from use of the Service.",
    ],
  },
  {
    title: "Section 17 — General Disclaimer",
    content: [
      "Nakshi Creations Private Limited has no relationship with Bandhan Financial Services Limited, Bandhan Financial Holdings Limited or Bandhan Bank Limited.",
    ],
  },
  {
    title: "Section 18 — Indemnification",
    content: [
      "You agree to indemnify and hold harmless Nakshi and its affiliates, employees and partners from any claims arising out of your breach of these Terms.",
    ],
  },
  {
    title: "Section 19 — Severability",
    content: [
      "If any provision of these Terms is found unenforceable, the remaining provisions shall remain valid and enforceable.",
    ],
  },
  {
    title: "Section 20 — Termination",
    content: [
      "These Terms remain effective unless terminated by either you or us.",
      "Nakshi may terminate access to the Services at any time if Terms are violated.",
    ],
  },
  {
    title: "Section 21 — Entire Agreement",
    content: [
      "These Terms of Service constitute the entire agreement between you and Nakshi regarding use of the Service.",
    ],
  },
  {
    title: "Section 22 — Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of India.",
      "Any disputes shall fall under the jurisdiction of the courts located in Kolkata, India.",
    ],
  },
  {
    title: "Section 23 — Changes to Terms",
    content: [
      "We reserve the right to update or replace any part of these Terms of Service by posting updates on the website.",
      "Continued use of the website after changes are posted constitutes acceptance of those changes.",
    ],
  },
  {
    title: "Section 24 — Contact Information",
    content: [
      "Questions about the Terms of Service should be sent to customercare@nakshicreations.in.",
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
              Legal Information
            </p>

            <h1 className="text-[3.4rem] leading-none md:text-[7rem]">
              Terms <span className="text-accent">&</span> Conditions
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-muted md:text-lg">
              Please review these Terms carefully before accessing or using
              the NAKSHI website and services. Your continued use of the
              platform signifies acceptance of these conditions.
            </p>
          </div>
        </div>

        {/* background accents */}
        <div className="absolute right-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[10%] h-[240px] w-[240px] rounded-full border border-accent/20" />
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
                {/* accent */}
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

          {/* footer */}
          <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm tracking-wide text-muted">
              Last updated: May 2026
            </p>

            <p className="text-sm text-muted">
              For support or legal queries, contact
              {" "}
              <span className="text-foreground">
                customercare@nakshicreations.in
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;