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

    const body = await req.json();

    const {
      cartItemId,
      quantity,
    } = body;

    await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },

      data: {
        quantity,
      },
    });

    return NextResponse.json({
      message: "Cart updated",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}