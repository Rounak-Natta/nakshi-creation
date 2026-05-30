import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth/get-user";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { cartItemId } =
      await req.json();

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Cart item id is required" },
        { status: 400 }
      );
    }

    const cartItem =
      await prisma.cartItem.findUnique({
        where: {
          id: cartItemId,
        },

        include: {
          cart: true,
        },
      });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    if (
      cartItem.cart.userId !== user.id
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    console.error(
      "REMOVE CART ITEM ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to remove item from cart",
      },
      { status: 500 }
    );
  }
}