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
  const { id } =
    await params;

  const body =
    await req.json();

  const {
    name,
    slug,
  } = body;

  const category =
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

  return NextResponse.json(
    category
  );
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

  await prisma.category.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}