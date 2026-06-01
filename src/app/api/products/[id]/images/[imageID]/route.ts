import { unlink } from "fs/promises";

import path from "path";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    imageId: string;
  }>;
}

export async function DELETE(
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

    const filePath =
      path.join(
        process.cwd(),
        "public",
        image.url
      );

    try {
      await unlink(filePath);
    } catch {
      console.log(
        "Physical file not found"
      );
    }

    await prisma.productImage.delete({
      where: {
        id: imageId,
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
          "Failed to delete image",
      },
      {
        status: 500,
      }
    );
  }
}