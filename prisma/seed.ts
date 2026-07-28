import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const user = await prisma.user.upsert({
    where: { email: "admin@miplataforma.com" },
    update: {},
    create: {
      email: "admin@miplataforma.com",
      name: "Admin",
      password: "admin123",
      plan: "PREMIUM_PLUS",
    },
  });

  // Create demo event
  const event = await prisma.event.upsert({
    where: { slug: "boda-valentina-y-matias" },
    update: { scannerPin: "1234" },
    create: {
      slug: "boda-valentina-y-matias",
      userId: user.id,
      title: "Valentina & Matías",
      subtitle: "Celebramos nuestro casamiento",
      eventType: "boda",
      eventDate: new Date("2025-11-15T21:00:00-03:00"),
      eventTime: "21:00",
      venueName: "Estancia La Paz",
      venueAddress: "Ruta 5 km 12, Córdoba, Argentina",
      venueLatLng: "-31.4201,-64.1888",
      ceremonyName: "Parroquia San José",
      ceremonyAddress: "Av. Colón 1234, Córdoba",
      ceremonyLatLng: "-31.4135,-64.1811",
      ceremonyTime: "18:30",
      templateId: "elegant-dark",
      primaryColor: "#d4af37",
      dressCode: "Elegante formal",
      hashtag: "#ValeYMati2025",
      bankAlias: "vale.mati.boda",
      bankCBU: "0000003100012345678901",
      bankHolder: "Valentina Rodriguez",
      rsvpEnabled: true,
      rsvpDeadline: "1 de Noviembre",
      isActive: true,
      scannerPin: "1234"
    },
  });

  // Create test RSVP for the event
  await prisma.rSVP.upsert({
    where: { qrCode: "QR-TEST-555" },
    update: { attended: false }, // reset attended for testing
    create: {
      eventId: event.id,
      guestName: "Familia Rodriguez",
      guestCount: 2,
      qrCode: "QR-TEST-555",
      confirmed: true
    }
  });

  console.log("Seed completado: Evento y RSVP creados exitosamente");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
