"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const paymentMethods = [
  {
    name: "Visa",
    src: "/partner/visa.png",
  },
  {
    name: "PayPal",
    src: "/partner/paypal.png",
  },
  {
    name: "Stripe",
    src: "/partner/stripe.png",
  },
  {
    name: "Verisign",
    src: "/partner/verisign.png",
  },
];

export default function Footer() {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth");

  if (hideLayout) {
    return null;
  }

  return (
    <footer className="border-t border-stone-200 bg-[#f6f4ed] text-[#4a2e18]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Nakshi Home">
              <Image
                src="/logo.webp"
                alt="Nakshi"
                width={160}
                height={50}
                priority
                className="h-auto w-auto"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#4a2e18]/80">
              Nakshi offers beautifully handcrafted and handloom products,
              celebrating the timeless artistry and craftsmanship of rural
              Indian artisans.
            </p>

            <Link
              href="/about"
              className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 hover:opacity-80"
            >
              Read More
            </Link>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Contact Information
            </h3>

            <div className="space-y-5 text-sm text-[#4a2e18]/80">
              <div>
                <p className="mb-1 font-semibold uppercase tracking-wide text-[#4a2e18]">
                  Address
                </p>

                <p>
                  76, EC Block, Sector 1
                  <br />
                  Kolkata, West Bengal 700064
                </p>
              </div>

              <div>
                <p className="mb-1 font-semibold uppercase tracking-wide text-[#4a2e18]">
                  Phone
                </p>

                <a
                  href="tel:+917604060001"
                  className="hover:text-[#4a2e18]"
                >
                  +91 76040 60001
                </a>
              </div>

              <div>
                <p className="mb-1 font-semibold uppercase tracking-wide text-[#4a2e18]">
                  Working Hours
                </p>

                <p>Monday – Sunday</p>
                <p>9:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-[#4a2e18]/80">
              <li>
                <Link href="/about" className="hover:underline">
                  About Nakshi
                </Link>
              </li>

              <li>
                <Link href="/refund" className="hover:underline">
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/shipping" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link href="/ourblogs" className="hover:underline">
                  Our Blogs
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Secure Payments
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((item) => (
                <div
                  key={item.name}
                  className="flex h-14 items-center justify-center rounded-lg border border-stone-200 bg-white p-3"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={90}
                    height={40}
                    className="h-auto w-auto max-h-8 object-contain"
                  />
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-[#4a2e18]/60">
              All payments are processed through secure and trusted payment
              gateways.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-[#4a2e18]/70">
          © {new Date().getFullYear()} Nakshi. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}