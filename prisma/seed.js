import { PrismaClient } from '../src/generated/prisma/client/index.js';
const prisma = new PrismaClient();

async function main() {
  await prisma.producto.createMany({
    data: [
      {
        codigo_barras: 1234567,
        marca: 'red bull',
        nombre: 'redbull clasica',
        medida: 'mililitros',
        cantidad: 250
      },
      {
        codigo_barras: 7654321,
        marca: 'DC shoes',
        nombre: 'court grafics negra',
        medida: 'unidad',
        cantidad: 1
      },
      {
        codigo_barras: 2345678,
        marca: 'apple',
        nombre: 'macbook air m1 2020',
        medida: 'unidad',
        cantidad: 1
      }
    ],
    skipDuplicates: true
  });

  console.log('Seed ejecutado correctamente.');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
