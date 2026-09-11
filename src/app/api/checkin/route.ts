import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { rsvpId } = await req.json();

    if (!rsvpId) {
      return NextResponse.json({ error: "Falta el ID del invitado" }, { status: 400 });
    }

    if (rsvpId === "simulated-qr-code-test-12345") {
      return NextResponse.json({ 
        success: true, 
        message: "¡SIMULACIÓN EXITOSA! Esto es una prueba.",
        guestName: "Invitado de Prueba",
        guestCount: 2
      });
    }

    const rsvp = await prisma.rSVP.findUnique({
      where: { id: rsvpId },
    });

    if (!rsvp) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 });
    }

    if (rsvp.attended) {
      return NextResponse.json({ 
        success: false, 
        message: `¡ALERTA! El invitado ${rsvp.guestName} ya ingresó previamente.`,
        guestName: rsvp.guestName
      });
    }

    await prisma.rSVP.update({
      where: { id: rsvpId },
      data: { attended: true },
    });

    return NextResponse.json({ 
      success: true, 
      message: `Acceso concedido a ${rsvp.guestName} (${rsvp.guestCount} pers.)`,
      guestName: rsvp.guestName,
      guestCount: rsvp.guestCount
    });

  } catch (error) {
    console.error("Error en checkin:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
