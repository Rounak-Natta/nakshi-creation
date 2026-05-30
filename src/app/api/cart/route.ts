import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth/get-user";

export async function GET() {
  try {

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    //
    // GET CART
    //

    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },

      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },

            variant: true,
          },
        },
      },
    });

    return NextResponse.json(cart);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}