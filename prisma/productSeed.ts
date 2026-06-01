import {
  PrismaClient,
  ProductStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function createProduct(
  categoryId: string,
  data: {
    title: string;
    slug: string;
    sku: string;
    price: number;
    comparePrice?: number;
    description: string;
    featured?: boolean;
  }
) {
  return prisma.product.upsert({
    where: {
      slug: data.slug,
    },

    update: {},

    create: {
      title: data.title,

      slug: data.slug,

      sku: data.sku,

      description:
        data.description,

      shortDescription:
        data.description,

      price: data.price,

      comparePrice:
        data.comparePrice,

      stock: 25,

      featured:
        data.featured ?? false,

      status:
        ProductStatus.PUBLISHED,

      categoryId,
    },
  });
}

async function main() {
  console.log(
    "Seeding products..."
  );

  const categories =
    await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
      },
    });

  const categoryMap =
    Object.fromEntries(
      categories.map(
        (category) => [
          category.slug,
          category.id,
        ]
      )
    );

  //
  // DHOTI
  //

  await createProduct(
    categoryMap["dhoti"],
    {
      title:
        "Classic White Dhoti",
      slug:
        "classic-white-dhoti",
      sku: "DHOTI001",
      price: 899,
      comparePrice: 1099,
      description:
        "Traditional cotton dhoti.",
    }
  );

  await createProduct(
    categoryMap["dhoti"],
    {
      title:
        "Premium Silk Dhoti",
      slug:
        "premium-silk-dhoti",
      sku: "DHOTI002",
      price: 1499,
      description:
        "Premium silk dhoti.",
    }
  );

  //
  // KURTA
  //

  await createProduct(
    categoryMap["kurta"],
    {
      title:
        "Royal Cotton Kurta",
      slug:
        "royal-cotton-kurta",
      sku: "KURTA001",
      price: 1499,
      comparePrice: 1899,
      description:
        "Premium festive kurta.",
      featured: true,
    }
  );

  await createProduct(
    categoryMap["kurta"],
    {
      title:
        "Ivory Handloom Kurta",
      slug:
        "ivory-handloom-kurta",
      sku: "KURTA002",
      price: 1699,
      description:
        "Handloom artisan kurta.",
    }
  );

  await createProduct(
    categoryMap["kurta"],
    {
      title:
        "Maroon Festive Kurta",
      slug:
        "maroon-festive-kurta",
      sku: "KURTA003",
      price: 1799,
      description:
        "Festive embroidered kurta.",
    }
  );

  //
  // KURTA DHOTI SET
  //

  await createProduct(
    categoryMap[
      "kurta-dhoti-set"
    ],
    {
      title:
        "Traditional Kurta Dhoti Set",
      slug:
        "traditional-kurta-dhoti-set",
      sku: "KD001",
      price: 2499,
      comparePrice: 2999,
      description:
        "Complete festive outfit.",
    }
  );

  //
  // SHERWANI
  //

  await createProduct(
    categoryMap["sherwani"],
    {
      title:
        "Wedding Sherwani",
      slug:
        "wedding-sherwani",
      sku: "SH001",
      price: 6999,
      description:
        "Luxury wedding sherwani.",
      featured: true,
    }
  );

  //
  // NEHRU JACKET
  //

  await createProduct(
    categoryMap[
      "nehru-jacket"
    ],
    {
      title:
        "Navy Nehru Jacket",
      slug:
        "navy-nehru-jacket",
      sku: "NJ001",
      price: 2299,
      description:
        "Classic Nehru jacket.",
    }
  );

  //
  // SHIRT
  //

  await createProduct(
    categoryMap["shirt"],
    {
      title:
        "Linen Casual Shirt",
      slug:
        "linen-casual-shirt",
      sku: "SHIRT001",
      price: 1299,
      description:
        "Premium linen shirt.",
    }
  );

  //
  // KURTI
  //

  await createProduct(
    categoryMap["kurti"],
    {
      title:
        "Floral Printed Kurti",
      slug:
        "floral-printed-kurti",
      sku: "KURTI001",
      price: 1199,
      description:
        "Printed cotton kurti.",
    }
  );

  //
  // KURTI SET
  //

  await createProduct(
    categoryMap[
      "kurti-set"
    ],
    {
      title:
        "Elegant Kurti Set",
      slug:
        "elegant-kurti-set",
      sku: "KSET001",
      price: 2399,
      description:
        "Kurti set with dupatta.",
    }
  );

  //
  // BOTTOM
  //

  await createProduct(
    categoryMap["bottom"],
    {
      title:
        "Women's Palazzo",
      slug:
        "womens-palazzo",
      sku: "BOTTOM001",
      price: 899,
      description:
        "Comfort fit palazzo.",
    }
  );

  //
  // SAREE
  //

  await createProduct(
    categoryMap["saree"],
    {
      title:
        "Handloom Silk Saree",
      slug:
        "handloom-silk-saree",
      sku: "SAREE001",
      price: 4999,
      comparePrice: 5999,
      description:
        "Luxury silk saree.",
      featured: true,
    }
  );

  //
  // JEWELLERY
  //

  await createProduct(
    categoryMap[
      "jewellery"
    ],
    {
      title:
        "Temple Jewellery Set",
      slug:
        "temple-jewellery-set",
      sku: "JW001",
      price: 1799,
      description:
        "Traditional jewellery set.",
    }
  );

  //
  // BAGS
  //

  await createProduct(
    categoryMap["bags"],
    {
      title:
        "Handcrafted Jute Bag",
      slug:
        "handcrafted-jute-bag",
      sku: "BAG001",
      price: 999,
      description:
        "Eco-friendly jute bag.",
    }
  );

  //
  // MEN SHIRT
  //

  await createProduct(
    categoryMap[
      "men-shirt"
    ],
    {
      title:
        "Formal Blue Shirt",
      slug:
        "formal-blue-shirt",
      sku: "MS001",
      price: 1499,
      description:
        "Office wear shirt.",
    }
  );

  //
  // WOMEN SHIRT
  //

  await createProduct(
    categoryMap[
      "women-shirt"
    ],
    {
      title:
        "Women's Formal Shirt",
      slug:
        "womens-formal-shirt",
      sku: "WS001",
      price: 1399,
      description:
        "Tailored formal shirt.",
    }
  );

  console.log(
    "Products seeded successfully."
  );
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
