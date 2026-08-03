require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.findUnique({
    where: { slug: '15anos-clara' }
  });

  if (!event) {
    console.error('Event not found!');
    return;
  }

  const newPhoto = await prisma.photo.create({
    data: {
      eventId: event.id,
      url: '/foto-clara.jpg',
      uploaderName: 'Admin',
      isApproved: true,
      order: 0,
    }
  });

  console.log('Added photo:', newPhoto);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
