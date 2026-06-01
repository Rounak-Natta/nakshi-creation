import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

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

    const product =
      await prisma.product.update({
        where: {
          id,
        },

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
          "Failed to update product",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to delete product",
      },
      {
        status: 500,
      }
    );
  }
}
