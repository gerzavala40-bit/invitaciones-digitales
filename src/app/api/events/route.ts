import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";
import { createEventSchema } from "@/lib/validators";

// POST y GET protegidos por middleware (solo admin puede crear/listar eventos)

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar con Zod
    const result = createEventSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Generar slug único
    let slug = slugify(`${data.eventType}-${data.title}`);
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    // El middleware ya verificó que es admin, pero la autenticación es por env vars,
    // no por tabla User. Aseguramos que exista el usuario "admin" para poder
    // satisfacer la relación userId -> User.id sin violar la foreign key.
    await prisma.user.upsert({
      where: { id: "admin" },
      update: {},
      create: {
        id: "admin",
        email: process.env.ADMIN_EMAIL || "admin@miplataforma.com",
        name: "Admin",
        password: "managed-via-env-vars",
      },
    });

    const event = await prisma.event.create({
      data: {
        slug,
        userId: "admin", // El middleware ya verificó que es admin
        title: data.title,
        subtitle: data.subtitle || null,
        eventType: data.eventType,
        eventDate: new Date(data.eventDate),
        eventTime: data.eventTime,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        venueLatLng: data.venueLatLng || null,
        ceremonyName: data.ceremonyName || null,
        ceremonyAddress: data.ceremonyAddress || null,
        ceremonyLatLng: data.ceremonyLatLng || null,
        ceremonyTime: data.ceremonyTime || null,
        templateId: data.templateId,
        primaryColor: data.primaryColor,
        musicUrl: data.musicUrl || null,
        phrase: data.phrase || null,
        dressCode: data.dressCode || null,
        hashtag: data.hashtag || null,
        bankAlias: data.bankAlias || null,
        bankCBU: data.bankCBU || null,
        bankHolder: data.bankHolder || null,
        rsvpEnabled: data.rsvpEnabled,
        rsvpDeadline: data.rsvpDeadline || null,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, event, url: `/${slug}` });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 });
  }
}

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { rsvps: true } } },
  });

  return NextResponse.json({ events });
}
