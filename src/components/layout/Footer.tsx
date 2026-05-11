import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f6f4ed] text-[#4a2e18] border-t border-[#e5e5e5]">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <Image
            src="/logo.webp"
            alt="Nakshi"
            width={140}
            height={40}
            className="mb-4"
          />

          <p className="text-[15px] leading-relaxed text-[#4a2e18]/80">
            Nakshi offers a range of exquisitely designed authentic hand-loom and handcrafted products created by the unparalleled craftsmanship of artisans from rural India.
          </p>

          <Link href="#" className="inline-block mt-4 text-sm underline">
            Read more
          </Link>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4">
            Contact Info
          </h3>

          <div className="space-y-4 text-[15px] text-[#4a2e18]/80">
            <div>
              <p className="font-semibold text-[#4a2e18]">ADDRESS</p>
              <p>
                76, EC, Sector 1, Kolkata,<br />
                West Bengal 700064
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#4a2e18]">PHONE</p>
              <p>+91 76040 60001</p>
            </div>

            <div>
              <p className="font-semibold text-[#4a2e18]">
                WORKING DAYS/HOURS
              </p>
              <p>Mon - Sun / 9:00AM - 8:00PM</p>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-[15px] text-[#4a2e18]/80">
            <Link href="/about" className="hover:underline">
              About Nakshi
            </Link>
            <Link href="#" className="hover:underline">
              Refund Policy
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>

        {/* PAYMENT */}
        <div>
          <h3 className="text-[18px] font-semibold mb-4">
            Payment Methods
          </h3>

          <div className="grid grid-cols-2 gap-4 items-center">
            <Image src="/partner/visa.png" alt="Visa" width={80} height={40} />
            <Image src="/partner/paypal.png" alt="PayPal" width={80} height={40} />
            <Image src="/partner/stripe.png" alt="Stripe" width={80} height={40} />
            <Image src="/partner/verisign.png" alt="Verisign" width={80} height={40} />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#e5e5e5] py-4 text-center text-sm text-[#4a2e18]/80">
        © 2026, Nakshi. All Rights Reserved
      </div>
    </footer>
  );
}