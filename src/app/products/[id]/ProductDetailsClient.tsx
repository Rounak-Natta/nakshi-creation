// app/products/[id]/ProductDetailsClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ProductVariant = {
  id: string;
  size: string | null;
  color: string | null;
  price: number | null;
  stock: number;
  sku: string | null;
};

type ProductAttribute = {
  id: string;
  name: string;
  value: string;
};

type Product = {
  id: string;
  title: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  comparePrice: number | null;
  sku: string;
  stock: number;
  images: string[];
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  categoryName: string;
};

type SimilarProduct = {
  id: string;
  title: string;
  price: number;
  comparePrice: number | null;
  image: string;
};

interface Props {
  product: Product;
  similarProducts: SimilarProduct[];
  availableSizes: string[];
}

export default function ProductDetailsClient({
  product,
  similarProducts,
  availableSizes,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || "");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const handleCheckDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryMessage("✅ Delivery available in 3-5 business days");
    } else {
      setDeliveryMessage("❌ Please enter a valid 6-digit pincode");
    }
  };

  const toggleAccordion = (item: string) => {
    setOpenAccordion(openAccordion === item ? null : item);
  };

  const accordionItems = [
    { key: "details", title: "Product Details", content: product.description || "No description available." },
    { key: "care", title: "Wash & Care", content: "Gentle hand wash separately in cold water. Do not bleach. Dry in shade." },
    { key: "returns", title: "Delivery & Returns", content: "Free shipping on orders above ₹999. Returns accepted within 7 days of delivery." },
    { key: "declaration", title: "Product Declaration", content: `SKU: ${product.sku} | Fabric: Pure Cotton | Origin: India` },
  ];

  // Get selected variant info
  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const variantPrice = selectedVariant?.price ?? product.price;
  const variantStock = selectedVariant?.stock ?? product.stock;

  const handleAddToCart = () => {
    // TODO: Implement cart logic
    alert(`Added ${quantity} x ${product.title} (Size: ${selectedSize}) to cart`);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 lg:px-10">

        {/* PRODUCT SECTION */}
        <div className="grid gap-10 lg:grid-cols-[110px_1fr_480px]">

          {/* THUMBNAILS - Desktop */}
          <div className="hidden lg:flex lg:flex-col lg:gap-4">
            {product.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden border ${
                  selectedImage === image ? "border-[#4a2e18]" : "border-[#ddd1c0]"
                }`}
              >
                <Image
                  src={image}
                  alt={`thumbnail ${idx}`}
                  width={90}
                  height={120}
                  className="h-[120px] w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="relative overflow-hidden bg-[#eee7db]">
            <Image
              src={selectedImage}
              alt={product.title}
              width={700}
              height={900}
              className="h-full w-full object-cover"
            />

            {/* MOBILE THUMBNAILS */}
            <div className="mt-4 flex gap-3 overflow-x-auto lg:hidden">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(image)}
                  className={`min-w-[70px] overflow-hidden border ${
                    selectedImage === image ? "border-[#4a2e18]" : "border-[#ddd1c0]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`thumb ${idx}`}
                    width={70}
                    height={90}
                    className="h-[90px] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="max-w-[480px]">
            <p className="text-sm text-[#8b7a68]">{product.categoryName}</p>
            <h1 className="mt-2 text-[32px] font-medium leading-[1.15] text-[#4a2e18]">
              {product.title}
            </h1>

            {/* PRICE + RATING */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[28px] font-semibold text-[#4a2e18]">
                ₹{variantPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-base text-[#857260] line-through">
                    ₹{product.comparePrice!.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-green-700">{discountPercent}% off</span>
                </>
              )}
              <div className="flex items-center gap-[2px] text-[#d5a642]">★★★★★</div>
              <button className="text-sm text-[#7c6b58] underline">Size Guide</button>
            </div>

            {/* SIZE - only if variants exist */}
            {availableSizes.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
                  Size
                </p>
                <div className="flex gap-3 flex-wrap">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-[42px] w-[42px] items-center justify-center border text-sm transition ${
                        selectedSize === size
                          ? "border-[#4a2e18] bg-[#4a2e18] text-white"
                          : "border-[#d8cdbd] text-[#4a2e18]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {variantStock <= 0 && <p className="mt-2 text-xs text-red-600">Out of stock</p>}
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[#4a2e18]">Quantity</p>
              <div className="flex items-center border border-[#d8cdbd] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-[#ede6d8]"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-[#ede6d8]"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={variantStock <= 0}
                className="flex-1 border border-[#d8cdbd] py-3 text-sm font-medium text-[#4a2e18] transition hover:bg-[#ede6d8] disabled:opacity-50"
              >
                Add To Cart
              </button>
              <button className="flex-1 bg-[#5a3418] py-3 text-sm font-medium text-white transition hover:bg-[#472611]">
                Buy Now
              </button>
            </div>

            {/* DELIVERY CHECK */}
            <div className="mt-8">
              <p className="mb-2 text-sm text-[#4a2e18]">Delivery</p>
              <div className="flex overflow-hidden border border-[#d8cdbd]">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
                />
                <button
                  onClick={handleCheckDelivery}
                  className="bg-[#5a3418] px-6 text-sm font-medium text-white"
                >
                  Check
                </button>
              </div>
              {deliveryMessage && <p className="mt-2 text-xs">{deliveryMessage}</p>}
            </div>

            {/* ACCORDION */}
            <div className="mt-10 border-t border-[#ddd1c0]">
              {accordionItems.map((item) => (
                <div key={item.key}>
                  <button
                    onClick={() => toggleAccordion(item.key)}
                    className="flex w-full items-center justify-between border-b border-[#ddd1c0] py-5 text-left"
                  >
                    <span className="text-sm font-medium text-[#4a2e18]">{item.title}</span>
                    <span className="text-[#4a2e18]">{openAccordion === item.key ? "−" : "+"}</span>
                  </button>
                  {openAccordion === item.key && (
                    <div className="py-4 text-sm text-[#4a2e18]/80">
                      {item.content}
                      {item.key === "details" && product.attributes.length > 0 && (
                        <ul className="mt-2 list-disc pl-4">
                          {product.attributes.map((attr) => (
                            <li key={attr.id}>
                              <strong>{attr.name}:</strong> {attr.value}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similarProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-10 text-center text-[42px] font-medium text-[#4a2e18]">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {similarProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group">
                  <div className="relative overflow-hidden bg-[#eee7db]">
                    <button className="absolute right-2 top-2 z-10 text-sm text-[#7d6b57]">♡</button>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={420}
                      className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="line-clamp-2 text-xs leading-[1.4] text-[#4a2e18]">
                      {product.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-[#4a2e18]">₹{product.price}</span>
                      {product.comparePrice && (
                        <span className="text-xs text-[#857260] line-through">
                          ₹{product.comparePrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}