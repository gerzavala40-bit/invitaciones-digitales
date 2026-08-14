const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create a demo user if it doesn't exist
  let user = await prisma.user.findFirst({ where: { email: 'demo@teinvito.com' } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@teinvito.com',
        name: 'Demo User',
        password: 'password123',
      }
    });
    console.log("Created demo user");
  }

  // 2. Create the demo event if it doesn't exist
  let event = await prisma.event.findFirst({ where: { id: 'demo-despedida-neon' } });
  if (!event) {
    event = await prisma.event.create({
      data: {
        id: 'demo-despedida-neon',
        slug: 'demo-despedida-neon',
        userId: user.id,
        title: 'Despedida de Julieta',
        eventDate: new Date(),
        eventTime: '23:00',
        venueName: 'Salon Demo',
        venueAddress: 'Calle Falsa 123'
      }
    });
    console.log("Created demo event");
  } else {
    console.log("Demo event already exists");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
