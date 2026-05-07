"use client";

import React from "react";

type Props = {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  selectedPrice: string[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<string[]>>;

  selectedCollection: string[];
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  selectedDiscount: string[];
  setSelectedDiscount: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

export default function FilterSidebar({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  selectedPrice,
  setSelectedPrice,
  selectedCollection,
  setSelectedCollection,
  selectedDiscount,
  setSelectedDiscount,
}: Props) {

  const toggleValue = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAll = () => {
    setSelectedPrice([]);
    setSelectedCollection([]);
    setSelectedDiscount([]);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-[280px]
          overflow-y-auto bg-background p-5
          transition-transform duration-300 lg:hidden
          ${
            mobileFiltersOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <SidebarContent
          clearAll={clearAll}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          selectedDiscount={selectedDiscount}
          setSelectedDiscount={setSelectedDiscount}
          toggleValue={toggleValue}
          closeSidebar={() => setMobileFiltersOpen(false)}
        />
      </aside>

      {/* DESKTOP SIDEBAR */}
{/* DESKTOP SIDEBAR */}
<aside className="relative hidden w-[260px] shrink-0 lg:block">
  <div
    className="
      sticky
      top-[90px]
      max-h-[calc(100vh-90px)]
      overflow-y-auto
    "
  >
    <SidebarContent
      clearAll={clearAll}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
      selectedCollection={selectedCollection}
      setSelectedCollection={setSelectedCollection}
      selectedDiscount={selectedDiscount}
      setSelectedDiscount={setSelectedDiscount}
      toggleValue={toggleValue}
    />
  </div>
</aside>
    </>
  );
}

type SidebarContentProps = {
  clearAll: () => void;
  closeSidebar?: () => void;

  selectedPrice: string[];
  setSelectedPrice: React.Dispatch<React.SetStateAction<string[]>>;

  selectedCollection: string[];
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  selectedDiscount: string[];
  setSelectedDiscount: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  toggleValue: (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
};

function SidebarContent({
  clearAll,
  closeSidebar,
  selectedPrice,
  setSelectedPrice,
  selectedCollection,
  setSelectedCollection,
  selectedDiscount,
  setSelectedDiscount,
  toggleValue,
}: SidebarContentProps) {

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#4a2e18]">
          Filters
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={clearAll}
            className="text-sm text-[#7c6b58] underline"
          >
            Clear All
          </button>

          {closeSidebar && (
            <button
              onClick={closeSidebar}
              className="text-xl lg:hidden"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-[#ddd1c0] py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Price
        </h3>

        <div className="space-y-3">
          {[
            {
              label: "₹0 - ₹1000",
              value: "0-1000",
            },
            {
              label: "₹1000 - ₹1500",
              value: "1000-1500",
            },
            {
              label: "₹1500+",
              value: "1500+",
            },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedPrice.includes(item.value)}
                onChange={() =>
                  toggleValue(
                    item.value,
                    selectedPrice,
                    setSelectedPrice
                  )
                }
                className="h-4 w-4 accent-[#4a2e18]"
              />

              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div className="border-b border-[#ddd1c0] py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Collection
        </h3>

        <div className="space-y-3">
          {[
            "Hand Block",
            "Traditional",
            "Festive",
            "Classic",
          ].map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedCollection.includes(item)}
                onChange={() =>
                  toggleValue(
                    item,
                    selectedCollection,
                    setSelectedCollection
                  )
                }
                className="h-4 w-4 accent-[#4a2e18]"
              />

              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="py-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#4a2e18]">
          Discount
        </h3>

        <div className="space-y-3">
          {[
            {
              label: "10% and above",
              value: "10",
            },
            {
              label: "20% and above",
              value: "20",
            },
            {
              label: "30% and above",
              value: "30",
            },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#4a2e18]"
            >
              <input
                type="checkbox"
                checked={selectedDiscount.includes(item.value)}
                onChange={() =>
                  toggleValue(
                    item.value,
                    selectedDiscount,
                    setSelectedDiscount
                  )
                }
                className="h-4 w-4 accent-[#4a2e18]"
              />

              {item.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}