
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

  const permissions = JSON.parse(role.permissions);
  if (!permissions.includes("content.delete")) {
    permissions.push("content.delete");
    await prisma.role.update({
      where: { name: "Owner" },
      data: { permissions: JSON.stringify(permissions) },
    });
    console.log("Added content.delete permission to Owner role");
  } else {
    console.log("Owner role already has content.delete permission");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
