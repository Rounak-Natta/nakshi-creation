import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      title,
      slug,
      sku,

      shortDescription,
      description,

      price,
      comparePrice,

      stock,

      categoryId,

      status,
      featured,

      seoTitle,
      seoDescription,
    } = body;

    if (
      !title ||
      !slug ||
      !sku ||
      !description ||
      !categoryId
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.product.findFirst({
        where: {
          OR: [
            { slug },
            { sku },
          ],
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Slug or SKU already exists",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.create({
        data: {
          title,
          slug,
          sku,

          shortDescription,

          description,

          price:
            Number(price),

          comparePrice:
            comparePrice
              ? Number(
                  comparePrice
                )
              : null,

          stock:
            Number(stock),

          categoryId,

          status,

          featured,

          seoTitle,

          seoDescription,
        },
      });

    return NextResponse.json(
      product
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}
