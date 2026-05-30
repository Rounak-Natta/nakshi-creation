import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";

export async function GET(req: NextRequest) {
  try {
    //
    // GET TOKEN
    //

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    //
    // VERIFY TOKEN
    //

    const decoded = verifyToken(token) as {
      userId: string;
      role: string;
    } | null;

    if (!decoded) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    //
    // GET USER
    //

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { user: null },
      { status: 500 }
    );
  }
}