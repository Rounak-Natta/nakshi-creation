import BestSeller from "@/components/ui/BestSeller";
import HeroCarousel from "@/components/ui/HeroCarousel";
import ProductBanner from "@/components/ui/ProductBanner";
import ProductCarousel from "@/components/ui/ProductCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroCarousel/>
    <ProductCarousel/>
    <ProductBanner/>
    <BestSeller/>
    </>
  );
}
