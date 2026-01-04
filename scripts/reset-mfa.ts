import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@vantus.com' } });
  if (!user) {
    console.error('User admin@vantus.com not found!');
    return;
  }
  console.log('User found:', user.id, 'Hash:', user.passwordHash ? 'Present' : 'Missing');

  await prisma.user.update({
    where: { email: 'admin@vantus.com' },
    data: { mfaSecret: null },
  });
  console.log('MFA reset for admin@vantus.com');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
