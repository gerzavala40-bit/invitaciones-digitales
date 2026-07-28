const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@teinvitoapp.com.ar' },
    update: {},
    create: {
      email: 'test@teinvitoapp.com.ar',
      password: 'hashedpassword',
      name: 'Usuario Prueba'
    }
  });

  const event = await prisma.event.upsert({
    where: { slug: 'boda-prueba' },
    update: { scannerPin: '1234' },
    create: {
      slug: 'boda-prueba',
      userId: user.id,
      title: 'Boda de Prueba',
      eventDate: new Date(),
      eventTime: '20:00',
      venueName: 'Salon Real',
      venueAddress: 'Calle Falsa 123',
      scannerPin: '1234'
    }
  });

  const rsvp = await prisma.rSVP.upsert({
    where: { qrCode: 'QR-PRUEBA-123' },
    update: { attended: false },
    create: {
      eventId: event.id,
      guestName: 'Familia Lopez',
      guestCount: 3,
      qrCode: 'QR-PRUEBA-123'
    }
  });

  console.log('Seeded successfully!');
  console.log('Event Slug:', event.slug);
  console.log('PIN:', event.scannerPin);
  console.log('QR Code URL:', `/mi-entrada/${rsvp.qrCode}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
