import { prisma } from "@/lib/prisma";

export async function getNavbarData() {
  const categories =
    await prisma.category.findMany({
      where: {
        parentId: null,
      },

      orderBy: {
        name: "asc",
      },

      include: {
        children: {
          orderBy: {
            name: "asc",
          },

          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

  return categories;
}