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
      customerName,
      phone,

      addressLine1,
      addressLine2,

      city,
      state,
      postalCode,
      country,

      paymentMethod,
    } = body;

    const cart =
      await prisma.cart.findUnique({
        where: {
          userId: user.id,
        },

        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    if (cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    let total = 0;

    for (const item of cart.items) {
      if (
        item.product.stock <
        item.quantity
      ) {
        return NextResponse.json(
          {
            error: `${item.product.title} is out of stock`,
          },
          { status: 400 }
        );
      }

      total +=
        item.product.price *
        item.quantity;
    }

    const order =
      await prisma.$transaction(
        async (tx) => {
          const createdOrder =
            await tx.order.create({
              data: {
                total,

                status: "PENDING",

                userId: user.id,

                customerName,
                phone,

                addressLine1,
                addressLine2,

                city,
                state,
                postalCode,
                country,

                paymentMethod,
                paymentStatus:
                  "PENDING",

                items: {
                  create:
                    cart.items.map(
                      (item) => ({
                        quantity:
                          item.quantity,

                        price:
                          item.product
                            .price,

                        productId:
                          item.productId,
                      })
                    ),
                },
              },

              include: {
                items: true,
              },
            });

          for (const item of cart.items) {
            await tx.product.update({
              where: {
                id: item.productId,
              },

              data: {
                stock: {
                  decrement:
                    item.quantity,
                },
              },
            });
          }

          await tx.cartItem.deleteMany({
            where: {
              cartId: cart.id,
            },
          });

          return createdOrder;
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Order created successfully",
      order,
    });

  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to complete checkout",
      },
      { status: 500 }
    );
  }
}