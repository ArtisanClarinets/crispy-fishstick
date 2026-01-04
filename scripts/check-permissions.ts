
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.findUnique({
    where: { name: "Owner" },
  });

  if (!role) {
    console.log("Owner role not found");
    return;
  }

  console.log("Owner permissions:", role.permissions);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
