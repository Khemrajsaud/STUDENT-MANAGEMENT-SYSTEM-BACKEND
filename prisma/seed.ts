import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Read credentials safely from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const rawPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !rawPassword) {
    throw new Error(" Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env file");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(" Admin account already exists!");
    return;
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("First Admin Created Securely!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });