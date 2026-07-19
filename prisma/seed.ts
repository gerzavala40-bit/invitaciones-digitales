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
  await prisma.event.upsert({
    where: { slug: "boda-valentina-y-matias" },
    update: {},
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
    },
  });

  // Floral demo
  await prisma.event.upsert({
    where: { slug: "boda-luciana-y-gonzalo" },
    update: {},
    create: {
      slug: "boda-luciana-y-gonzalo",
      userId: user.id,
      title: "Luciana & Gonzalo",
      eventType: "boda",
      eventDate: new Date("2025-12-20T20:30:00-03:00"),
      eventTime: "20:30",
      venueName: "Salón Terramar",
      venueAddress: "Camino a La Bolsa km 8, Villa Allende",
      venueLatLng: "-31.2955,-64.2950",
      templateId: "floral-light",
      primaryColor: "#c27a6e",
      dressCode: "Semi-formal",
      bankAlias: "luci.gonza.mp",
      bankHolder: "Luciana Fernández",
      rsvpEnabled: true,
      isActive: true,
    },
  });

  // Minimal demo
  await prisma.event.upsert({
    where: { slug: "cumple-30-martin" },
    update: {},
    create: {
      slug: "cumple-30-martin",
      userId: user.id,
      title: "Martín",
      subtitle: "Festejo mis 30",
      eventType: "cumpleanos",
      eventDate: new Date("2025-10-05T22:00:00-03:00"),
      eventTime: "22:00",
      venueName: "Rooftop Bar Central",
      venueAddress: "Av. Hipólito Yrigoyen 500, Córdoba",
      templateId: "minimal-white",
      primaryColor: "#111111",
      dressCode: "Smart casual",
      bankAlias: "martin.cumple30",
      bankHolder: "Martín García",
      rsvpEnabled: true,
      isActive: true,
    },
  });

  console.log("Seed completado: 3 eventos demo creados");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
