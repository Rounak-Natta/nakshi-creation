import BestSeller from "@/components/ui/BestSeller";
import HeroCarousel from "@/components/ui/HeroCarousel";
import InstagramSection from "@/components/ui/InstagramSection";
import ProductBanner from "@/components/ui/ProductBanner";
import ProductCarousel from "@/components/ui/ProductCarousel";
import YtVideo from "@/components/ui/YtVideo";

// shared demo data (can later come from API)
const demoProducts = [
  { id: 1, src: "/products/1.webp" },
  { id: 2, src: "/products/2.webp" },
  { id: 3, src: "/products/3.webp" },
  { id: 4, src: "/products/4.webp" },
  { id: 5, src: "/products/5.webp" },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <ProductCarousel
        title="New Arrivals"
        products={demoProducts}
      />

      <ProductBanner />

      <BestSeller />

      <ProductCarousel
        title="Parampara Collection"
        products={demoProducts}
      />

      <ProductCarousel
        title="Utsav Collection"
        products={demoProducts}
      />

      <ProductCarousel
        title="Handmade Jewellery"
        products={demoProducts}
      />

      <YtVideo/>
      <InstagramSection/>
    </>
  );
}