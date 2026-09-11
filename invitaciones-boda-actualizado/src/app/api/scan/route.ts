import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scanSchema } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Rate limit: 10 requests per minute per IP
    const ip = getClientIp(req);
    const limiter = await rateLimit(`scan:${ip}`, {
      maxRequests: 10,
      windowMs: 60000,
    });
    if (!limiter.success) {
      return NextResponse.json(
        { error: "Demasiados intentos. Intenta de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate request body
    const result = scanSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos invalidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { qrCode, pin, eventSlug } = result.data;

    // Look up event by slug to get its scannerPin
    const event = await prisma.event.findUnique({
      where: { slug: eventSlug },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    // Validate PIN against event's scannerPin
    if (pin !== event.scannerPin) {
      return NextResponse.json(
        { error: "PIN incorrecto" },
        { status: 401 }
      );
    }

    // Look up RSVP by qrCode
    const rsvp = await prisma.rSVP.findUnique({
      where: { qrCode },
      include: { event: true },
    });

    if (!rsvp) {
      return NextResponse.json(
        { error: "Codigo QR no encontrado" },
        { status: 404 }
      );
    }

    // Verify the RSVP belongs to this event
    if (rsvp.eventId !== event.id) {
      return NextResponse.json(
        { error: "Este QR no pertenece a este evento" },
        { status: 400 }
      );
    }

    // Check if already attended
    if (rsvp.attended) {
      return NextResponse.json({
        success: false,
        message: `${rsvp.guestName} ya ingreso previamente.`,
        guestName: rsvp.guestName,
        guestCount: rsvp.guestCount,
        tableNumber: rsvp.tableNumber,
        status: "already_attended",
      });
    }

    // Mark as attended
    await prisma.rSVP.update({
      where: { qrCode },
      data: { attended: true },
    });

    return NextResponse.json({
      success: true,
      message: `Acceso concedido`,
      guestName: rsvp.guestName,
      guestCount: rsvp.guestCount,
      tableNumber: rsvp.tableNumber,
      status: "admitted",
    });
  } catch (error) {
    console.error("Error en scan:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
