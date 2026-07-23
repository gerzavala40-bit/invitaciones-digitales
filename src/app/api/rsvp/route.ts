import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Rate limit: máximo 5 RSVPs por IP cada 5 minutos
    const ip = getClientIp(request);
    const { success } = await rateLimit(`rsvp:${ip}`, { maxRequests: 5, windowMs: 300000 });
    if (!success) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intentá en unos minutos." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validar con Zod
    const result = rsvpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { eventSlug, guestName, guestCount, dietaryNotes, songRequest } = result.data;

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
        guestCount,
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

// GET protegido por middleware (solo admin)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  if (!eventId || typeof eventId !== "string" || eventId.length > 50) {
    return NextResponse.json({ error: "eventId requerido" }, { status: 400 });
  }

  const rsvps = await prisma.rSVP.findMany({
    where: { eventId },
    orderBy: { createdAt: "desc" },
  });

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);

  return NextResponse.json({ rsvps, totalConfirmed: rsvps.length, totalGuests });
}
