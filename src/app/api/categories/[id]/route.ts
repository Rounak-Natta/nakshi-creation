import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Props
) {
  const { id } =
    await params;

  const category =
    await prisma.category.findUnique({
      where: { id },

      include: {
        parent: true,

        children: true,

        _count: {
          select: {
            products: true,
          },
        },
      },
    });

  if (!category) {
    return NextResponse.json(
      {
        error:
          "Category not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    category
  );
}
export async function PUT(
  req: Request,
  { params }: Props
) {
  try {
    const { id } =
      await params;

    const body =
      await req.json();

    const {
      name,
      slug,
      parentId,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          error:
            "Name and slug required",
        },
        {
          status: 400,
        }
      );
    }

    if (parentId === id) {
      return NextResponse.json(
        {
          error:
            "Category cannot be its own parent",
        },
        {
          status: 400,
        }
      );
    }

    const existing =
      await prisma.category.findFirst({
        where: {
          id: {
            not: id,
          },

          OR: [
            { name },
            { slug },
          ],
        },
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Category already exists",
        },
        {
          status: 400,
        }
      );
    }

    const category =
      await prisma.category.update({
        where: {
          id,
        },

        data: {
          name,
          slug,
          parentId:
            parentId || null,
        },
      });

    return NextResponse.json(
      category
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update category",
      },
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: Props
) {
  const { id } =
    await params;

  const category =
    await prisma.category.findUnique({
      where: { id },

      include: {
        children: true,

        _count: {
          select: {
            products: true,
          },
        },
      },
    });

  if (!category) {
    return NextResponse.json(
      {
        error:
          "Category not found",
      },
      {
        status: 404,
      }
    );
  }

  if (
    category._count.products >
    0
  ) {
    return NextResponse.json(
      {
        error:
          "Category contains products",
      },
      {
        status: 400,
      }
    );
  }

  if (
    category.children.length >
    0
  ) {
    return NextResponse.json(
      {
        error:
          "Delete child categories first",
      },
      {
        status: 400,
      }
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}