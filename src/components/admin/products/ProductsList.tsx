"use client";

import Image from "next/image";
import Link from "next/link";

import { memo } from "react";

import {
Package,
Pencil,
Trash2,
Star,
ImageIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface Product {
id: string;

title: string;
slug: string;

price: number;

stock: number;

featured: boolean;

status: string;

category: {
name: string;
};

images: {
url: string;
}[];

_count: {
images: number;
};
}

interface Props {
products: Product[];
}

function ProductsList({
products,
}: Props) {
const router = useRouter();

async function handleDelete(
id: string
) {
const confirmed =
window.confirm(
"Delete this product?"
);


if (!confirmed) {
  return;
}

const response =
  await fetch(
    `/api/products/${id}`,
    {
      method: "DELETE",
    }
  );

if (!response.ok) {
  alert(
    "Failed to delete product"
  );

  return;
}

router.refresh();


}

if (!products.length) {
return ( <div
     className="
       rounded-3xl
       bg-white
       p-16
       text-center
       shadow-sm
       ring-1
       ring-zinc-200/60
     "
   > <Package
       size={40}
       className="mx-auto mb-4"
     />


    <h3 className="text-xl font-semibold">
      No Products Found
    </h3>

    <p className="mt-2 text-zinc-500">
      Create your first product.
    </p>
  </div>
);


}

return ( <div
   className="
     overflow-hidden
     rounded-3xl
     bg-white
     shadow-sm
     ring-1
     ring-zinc-200/60
   "
 >
{products.map(
(product, index) => (
<div
key={product.id}
className={`               flex
              flex-col
              gap-5
              p-5
              lg:flex-row
              lg:items-center
              lg:justify-between
              ${
                index !==
                products.length - 1
                  ? "border-b border-zinc-100"
                  : ""
              }
            `}
> <div className="flex items-center gap-4"> <div
             className="
               relative
               h-20
               w-20
               overflow-hidden
               rounded-2xl
               bg-zinc-100
             "
           >
{product.images[0] ? (
<Image
src={
product
.images[0]
.url
}
alt={
product.title
}
fill
sizes="80px"
className="object-cover"
/>
) : ( <div
                 className="
                   flex
                   h-full
                   items-center
                   justify-center
                 "
               > <Package
                   size={24}
                 /> </div>
)} </div>


          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">
                {product.title}
              </h3>

              {product.featured && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-amber-100
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-amber-700
                  "
                >
                  <Star
                    size={12}
                  />
                  Featured
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-zinc-500">
              /{product.slug}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className="
                  rounded-full
                  bg-zinc-100
                  px-3
                  py-1
                  text-xs
                "
              >
                {
                  product
                    .category
                    .name
                }
              </span>

              <span
                className="
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1
                  text-xs
                  text-blue-700
                "
              >
                <ImageIcon
                  size={12}
                  className="mr-1 inline"
                />
                {
                  product
                    ._count
                    .images
                }
              </span>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${
                    product.status ===
                    "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-zinc-100 text-zinc-700"
                  }
                `}
              >
                {product.status}
              </span>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${
                    product.stock >
                    10
                      ? "bg-green-100 text-green-700"
                      : product.stock >
                        0
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                Stock:
                {" "}
                {product.stock}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="
              rounded-2xl
              bg-zinc-50
              px-4
              py-3
            "
          >
            <p className="text-xs text-zinc-500">
              Price
            </p>

            <p className="font-semibold">
              ₹
              {product.price.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/admin/products/${product.id}/edit`}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-zinc-100
              transition
              hover:bg-zinc-200
            "
          >
            <Pencil
              size={18}
            />
          </Link>

          <button
            onClick={() =>
              handleDelete(
                product.id
              )
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-600
              transition
              hover:bg-red-100
            "
          >
            <Trash2
              size={18}
            />
          </button>
        </div>
      </div>
    )
  )}
</div>


);
}

export default memo(
ProductsList
);
