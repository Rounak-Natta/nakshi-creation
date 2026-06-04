// components/product/FilterSidebar.tsx
"use client";

import React, { useCallback } from "react";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

export interface FilterSidebarProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  selectedPrice: string[];
  setSelectedPrice: (value: string[]) => void;      // ← changed
  selectedCollection: string[];
  setSelectedCollection: (value: string[]) => void;  // ← changed
  selectedDiscount: string[];
  setSelectedDiscount: (value: string[]) => void;    // ← changed
  collectionOptions?: string[];
}

// ----------------------------------------------------------------------
// Helper: Toggle a value in an array state (works with simple setter)
// ----------------------------------------------------------------------

const toggleValue = (
  value: string,
  selected: string[],
  setter: (value: string[]) => void   // ← changed
) => {
  setter(
    selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
  );
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export default function FilterSidebar({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  selectedPrice,
  setSelectedPrice,
  selectedCollection,
  setSelectedCollection,
  selectedDiscount,
  setSelectedDiscount,
  collectionOptions = ["Hand Block", "Traditional", "Festive", "Classic"],
}: FilterSidebarProps) {
  const clearAll = useCallback(() => {
    setSelectedPrice([]);
    setSelectedCollection([]);
    setSelectedDiscount([]);
  }, [setSelectedPrice, setSelectedCollection, setSelectedDiscount]);

  return (
    <>
      {/* Mobile overlay */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-[280px]
          overflow-y-auto bg-background p-5
          transition-transform duration-300 lg:hidden
          ${mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Filter sidebar (mobile)"
      >
        <SidebarContent
          clearAll={clearAll}
          closeSidebar={() => setMobileFiltersOpen(false)}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          selectedDiscount={selectedDiscount}
          setSelectedDiscount={setSelectedDiscount}
          collectionOptions={collectionOptions}
        />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="relative hidden w-[260px] shrink-0 lg:block"
        aria-label="Filter sidebar (desktop)"
      >
        <div className="sticky top-[90px] max-h-[calc(100vh-90px)] overflow-y-auto">
          <SidebarContent
            clearAll={clearAll}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            collectionOptions={collectionOptions}
          />
        </div>
      </aside>
    </>
  );
}

// ----------------------------------------------------------------------
// Sidebar Content (shared between mobile and desktop)
// ----------------------------------------------------------------------

interface SidebarContentProps {
  clearAll: () => void;
  closeSidebar?: () => void;
  selectedPrice: string[];
  setSelectedPrice: (value: string[]) => void;      // ← changed
  selectedCollection: string[];
  setSelectedCollection: (value: string[]) => void;  // ← changed
  selectedDiscount: string[];
  setSelectedDiscount: (value: string[]) => void;    // ← changed
  collectionOptions: string[];
}

const SidebarContent = React.memo(function SidebarContent({
  clearAll,
  closeSidebar,
  selectedPrice,
  setSelectedPrice,
  selectedCollection,
  setSelectedCollection,
  selectedDiscount,
  setSelectedDiscount,
  collectionOptions,
}: SidebarContentProps) {
  const handlePriceToggle = useCallback(
    (value: string) => toggleValue(value, selectedPrice, setSelectedPrice),
    [selectedPrice, setSelectedPrice]
  );

  const handleCollectionToggle = useCallback(
    (value: string) => toggleValue(value, selectedCollection, setSelectedCollection),
    [selectedCollection, setSelectedCollection]
  );

  const handleDiscountToggle = useCallback(
    (value: string) => toggleValue(value, selectedDiscount, setSelectedDiscount),
    [selectedDiscount, setSelectedDiscount]
  );

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#4a2e18]">Filters</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={clearAll}
            className="text-sm text-[#7c6b58] underline hover:opacity-80"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
          {closeSidebar && (
            <button
              onClick={closeSidebar}
              className="text-xl lg:hidden hover:opacity-80"
              aria-label="Close filters"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Price filter */}
      <div className="border-b border-[#ddd1c0] py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Price
        </h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label
              key={range.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedPrice.includes(range.value)}
                onChange={() => handlePriceToggle(range.value)}
                className="h-4 w-4 accent-[#4a2e18]"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Collection filter */}
      <div className="border-b border-[#ddd1c0] py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Collection
        </h3>
        <div className="space-y-3">
          {collectionOptions.map((collection) => (
            <label
              key={collection}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedCollection.includes(collection)}
                onChange={() => handleCollectionToggle(collection)}
                className="h-4 w-4 accent-[#4a2e18]"
              />
              {collection}
            </label>
          ))}
        </div>
      </div>

      {/* Discount filter */}
      <div className="py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Discount
        </h3>
        <div className="space-y-3">
          {discountOptions.map((discount) => (
            <label
              key={discount.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedDiscount.includes(discount.value)}
                onChange={() => handleDiscountToggle(discount.value)}
                className="h-4 w-4 accent-[#4a2e18]"
              />
              {discount.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
});

// ----------------------------------------------------------------------
// Static filter options
// ----------------------------------------------------------------------

const priceRanges = [
  { label: "₹0 - ₹1000", value: "0-1000" },
  { label: "₹1000 - ₹1500", value: "1000-1500" },
  { label: "₹1500+", value: "1500+" },
] as const;

const discountOptions = [
  { label: "10% and above", value: "10" },
  { label: "20% and above", value: "20" },
  { label: "30% and above", value: "30" },
] as const;