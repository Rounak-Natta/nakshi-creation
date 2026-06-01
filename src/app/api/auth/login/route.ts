import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth/jwt";

export async function POST(
  req: Request
) {
  try {
    //
    // BODY
    //

    const body =
      await req.json();

    const email =
      body.email
        ?.trim()
        ?.toLowerCase();

    const password =
      body.password?.trim();

    //
    // VALIDATION
    //

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    //
    // FIND USER
    //

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });


    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    //
    // PASSWORD CHECK
    //


    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    //
    // JWT
    //

    const token =
      generateToken({
        userId: user.id,
        role: user.role,
      });


    //
    // RESPONSE
    //

    const response =
      NextResponse.json({
        success: true,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}