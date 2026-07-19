import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventSlug, guestName, guestCount, dietaryNotes, songRequest } = body;

    if (!eventSlug || !guestName) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { slug: eventSlug, isActive: true, rsvpEnabled: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        eventId: event.id,
        guestName,
        guestCount: parseInt(guestCount) || 1,
        dietaryNotes: dietaryNotes || null,
        songRequest: songRequest || null,
      },
    });

    return NextResponse.json({ success: true, rsvp });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "eventId requerido" }, { status: 400 });
  }

  const rsvps = await prisma.rSVP.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);

  return NextResponse.json({ rsvps, totalConfirmed: rsvps.length, totalGuests });
}
