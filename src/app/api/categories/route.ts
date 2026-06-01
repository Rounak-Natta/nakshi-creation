import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories =
      await prisma.category.findMany({
        include: {
          parent: {
            select: {
              id: true,
              name: true,
            },
          },

          children: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          _count: {
            select: {
              products: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      categories
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
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

    const existing =
      await prisma.category.findFirst({
        where: {
          OR: [
            { slug },
            { name },
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
      await prisma.category.create({
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
          "Failed to create category",
      },
      {
        status: 500,
      }
    );
  }
}