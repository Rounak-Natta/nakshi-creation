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

    //
    // BODY
    //

    const body = await req.json();

    const {
      productId,
      variantId,
      quantity,
    } = body;

    //
    // FIND OR CREATE CART
    //

    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    //
    // CHECK EXISTING ITEM
    //

    const existingItem =
      await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
        },
      });

    //
    // UPDATE QUANTITY
    //

    if (existingItem) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },

        data: {
          quantity:
            existingItem.quantity +
            (quantity || 1),
        },
      });

    } else {

      //
      // CREATE ITEM
      //

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,

          productId,

          variantId: variantId || null,

          quantity: quantity || 1,
        },
      });
    }

    return NextResponse.json({
      message: "Added to cart",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}