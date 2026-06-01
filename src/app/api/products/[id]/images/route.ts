import { mkdir, writeFile } from "fs/promises";

import path from "path";

import { v4 as uuid } from "uuid";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const MAX_IMAGES = 5;

const MAX_FILE_SIZE =
  2 * 1024 * 1024;

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

    const formData =
      await request.formData();

    const files =
      formData.getAll(
        "images"
      ) as File[];

    if (
      !files ||
      files.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No files uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },

        include: {
          images: true,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          error:
            "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    const totalImages =
      product.images.length +
      files.length;

    if (
      totalImages >
      MAX_IMAGES
    ) {
      return NextResponse.json(
        {
          error:
            "Maximum 5 images allowed",
        },
        {
          status: 400,
        }
      );
    }

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "products",
        id
      );

    await mkdir(uploadDir, {
      recursive: true,
    });

    const images = [];

    for (
      let i = 0;
      i < files.length;
      i++
    ) {
      const file =
        files[i];

      if (
        file.size >
        MAX_FILE_SIZE
      ) {
        return NextResponse.json(
          {
            error:
              "Each image must be under 2MB",
          },
          {
            status: 400,
          }
        );
      }

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Only image files are allowed",
          },
          {
            status: 400,
          }
        );
      }

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const extension =
        file.name.split(".").pop();

      const fileName = `${uuid()}.${extension}`;

      const filePath =
        path.join(
          uploadDir,
          fileName
        );

      await writeFile(
        filePath,
        buffer
      );

      const image =
        await prisma.productImage.create({
          data: {
            url: `/uploads/products/${id}/${fileName}`,

            productId: id,

            position:
              product.images.length +
              i,

            isPrimary:
              product.images.length ===
                0 && i === 0,
          },
        });

      images.push(image);
    }

    return NextResponse.json(
      images
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to upload images",
      },
      {
        status: 500,
      }
    );
  }
}