import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing =
    await prisma.user.findUnique({
      where: {
        email: "admin@nakshi.com",
      },
    });

  if (existing) {
    console.log(
      "Admin already exists"
    );

    return;
  }

  const password =
    await bcrypt.hash(
      "Admin123",
      10
    );

  await prisma.user.create({
    data: {
      name: "Admin",

      email:
        "admin@nakshi.com",

      password,

      role: "ADMIN",
    },
  });

  console.log(
    "Admin created successfully"
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });