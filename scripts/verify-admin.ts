import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verifying Admin Setup...");

  // 1. Verify Admin User Exists
  const email = "admin@vantus.com";
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      RoleAssignment: {
        include: {
          Role: true,
        },
      },
    },
  });

  if (!user) {
    console.error("❌ Admin user not found!");
    process.exit(1);
  }
  console.log(`✅ Admin user found: ${user.email} (ID: ${user.id})`);

  // 2. Verify Password Hash
  const password = "admin";
  if (!user.passwordHash) {
    console.error("❌ Admin user has no password hash!");
    process.exit(1);
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    console.error("❌ Password verification failed!");
    process.exit(1);
  }
  console.log("✅ Password verification successful");

  // 3. Verify Roles
  const roles = user.RoleAssignment.map((r) => r.Role.name);
  if (!roles.includes("Owner")) {
    console.error(`❌ Admin user missing 'Owner' role! Found: ${roles.join(", ")}`);
    process.exit(1);
  }
  console.log(`✅ Admin roles verified: ${roles.join(", ")}`);

  // 4. Verify Permissions for Owner Role
  const ownerRole = await prisma.role.findUnique({
    where: { name: "Owner" },
  });

  if (!ownerRole) {
      console.error("❌ Owner role not found in DB!");
      process.exit(1);
  }

  const permissions = JSON.parse(ownerRole.permissions);
  if (!permissions.includes("admin.access") || !permissions.includes("leads.read")) {
      console.error("❌ Owner role missing critical permissions!");
      process.exit(1);
  }
  console.log("✅ Owner role permissions verified");

  console.log("\n🎉 Admin setup verification passed! You can log in at /admin/login with:");
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
