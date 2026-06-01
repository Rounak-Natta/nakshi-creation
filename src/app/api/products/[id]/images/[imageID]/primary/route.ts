import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    imageId: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: Props
) {
  try {
    const { imageId } =
      await params;

    const image =
      await prisma.productImage.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!image) {
      return NextResponse.json(
        {
          error:
            "Image not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.productImage.updateMany({
      where: {
        productId:
          image.productId,
      },

      data: {
        isPrimary: false,
      },
    });

    const updatedImage =
      await prisma.productImage.update({
        where: {
          id: imageId,
        },

        data: {
          isPrimary: true,
        },
      });

    return NextResponse.json(
      updatedImage
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to set primary image",
      },
      {
        status: 500,
      }
    );
  }
}