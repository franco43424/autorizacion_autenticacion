import { PrismaClient } from '../src/generated/prisma/client/index.js';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.userType.createMany({
    data: [
      { description: 'Admin' },
      { description: 'Cliente' },
      { description: 'Soporte' }
    ],
    skipDuplicates: true
  });

  console.log('Seed ejecutado correctamente.');
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });