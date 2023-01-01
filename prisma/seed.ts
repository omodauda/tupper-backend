import prisma from '../src/lib/prisma';

async function seed() {
  await prisma.storage.upsert({
    where: { title: 'Fridge' },
    update: {},
    create: {
      title: 'Fridge',
      logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562707/tupper/fridge_j84rs0.png',
    }
  });
  await prisma.storage.upsert({
    where: { title: 'Pantry' },
    update: {},
    create: {
      title: 'Pantry',
      logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562717/tupper/pantry_y411wd.png',
    }
  });
  await prisma.storage.upsert({
    where: { title: 'Freezer' },
    update: {},
    create: {
      title: 'Freezer',
      logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562717/tupper/freezer_edpj58.png',
    }
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
  })