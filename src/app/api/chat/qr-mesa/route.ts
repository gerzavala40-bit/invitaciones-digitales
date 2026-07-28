import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/chat/qr-mesa?eventId=xxx&tableNumber=5
// Genera la URL para el QR de una mesa específica
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const tableNumber = searchParams.get("tableNumber");

    if (!eventId || !tableNumber) {
      return NextResponse.json(
        { error: "eventId y tableNumber son requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el evento existe
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, slug: true, title: true, chatEnabled: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    // Generar la URL del chat para esa mesa
    // El QR apunta a: /chat/{slug}?mesa={tableNumber}
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const chatUrl = `${baseUrl}/chat/${event.slug}?mesa=${tableNumber}`;

    return NextResponse.json({
      success: true,
      chatUrl,
      event: {
        id: event.id,
        slug: event.slug,
        title: event.title,
        chatEnabled: event.chatEnabled,
      },
      tableNumber,
    });
  } catch (error) {
    console.error("QR Mesa error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// POST /api/chat/qr-mesa - Generar URLs para múltiples mesas de un evento
// Body: { eventId, tables: [1, 2, 3, ...] } o { eventId, from: 1, to: 20 }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, tables, from, to } = body;

    if (!eventId) {
      return NextResponse.json({ error: "eventId es requerido" }, { status: 400 });
    }

    // Verificar evento
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, slug: true, title: true, chatEnabled: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

    // Generar lista de mesas
    let tableList: string[] = [];

    if (tables && Array.isArray(tables)) {
      tableList = tables.map(String);
    } else if (from !== undefined && to !== undefined) {
      const start = parseInt(from);
      const end = parseInt(to);
      if (isNaN(start) || isNaN(end) || start > end || end - start > 100) {
        return NextResponse.json(
          { error: "Rango inválido (máximo 100 mesas)" },
          { status: 400 }
        );
      }
      for (let i = start; i <= end; i++) {
        tableList.push(String(i));
      }
    } else {
      return NextResponse.json(
        { error: "Debes enviar 'tables' (array) o 'from'/'to' (rango)" },
        { status: 400 }
      );
    }

    // Generar URLs para cada mesa
    const qrData = tableList.map((tableNumber) => ({
      tableNumber,
      chatUrl: `${baseUrl}/chat/${event.slug}?mesa=${tableNumber}`,
    }));

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        slug: event.slug,
        title: event.title,
        chatEnabled: event.chatEnabled,
      },
      tables: qrData,
      total: qrData.length,
    });
  } catch (error) {
    console.error("QR Mesa batch error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
