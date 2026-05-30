import BestSeller from "@/components/ui/BestSeller";
import HeroCarousel from "@/components/ui/HeroCarousel";
import InstagramSection from "@/components/ui/InstagramSection";
import ProductBanner from "@/components/ui/ProductBanner";
import ProductCarousel from "@/components/ui/ProductCarousel";
import ProductHotspot from "@/components/ui/ProductHotspot";
import YtVideo from "@/components/ui/YtVideo";

// Shared demo data (can later come from API)
const demoProducts = [
  {
    id: 1,
    src: "/products/1.webp",
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    priority: true,
  },
  {
    id: 2,
    src: "/products/2.webp",
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
  {
    id: 3,
    src: "/products/3.webp",
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
  {
    id: 4,
    src: "/products/4.webp",
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
  {
    id: 5,
    src: "/products/5.webp",
    sizes:
      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
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

      <ProductHotspot />

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

      <YtVideo />

      <InstagramSection />
    </>
  );
}