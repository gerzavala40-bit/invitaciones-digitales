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
        { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { qrCode, pin } = result.data;

    // Validate PIN against environment variable (default '1234' in dev)
    const validPin = process.env.SCANNER_PIN || "1234";
    if (pin !== validPin) {
      return NextResponse.json(
        { error: "PIN incorrecto" },
        { status: 401 }
      );
    }

    // Look up RSVP by qrCode
    const rsvp = await prisma.rSVP.findUnique({
      where: { qrCode },
    });

    if (!rsvp) {
      return NextResponse.json(
        { error: "Código QR no encontrado" },
        { status: 404 }
      );
    }

    // Check if already attended
    if (rsvp.attended) {
      return NextResponse.json({
        success: false,
        message: `¡ALERTA! El invitado ${rsvp.guestName} ya ingresó previamente.`,
        guestName: rsvp.guestName,
        guestCount: rsvp.guestCount,
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
      message: `Acceso concedido a ${rsvp.guestName} (${rsvp.guestCount} pers.)`,
      guestName: rsvp.guestName,
      guestCount: rsvp.guestCount,
      status: "admitted",
    });
  } catch (error) {
    console.error("Error en scan:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
