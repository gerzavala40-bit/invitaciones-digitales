import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json({ error: "eventId requerido" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });

  if (!event) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  // Crear datos para Excel
  const data = event.rsvps.map((rsvp, index) => ({
    "#": index + 1,
    "Nombre": rsvp.guestName,
    "Personas": rsvp.guestCount,
    "Dieta": rsvp.dietaryNotes || "-",
    "Canción": rsvp.songRequest || "-",
    "Fecha confirmación": new Date(rsvp.createdAt).toLocaleDateString("es-AR"),
  }));

  // Agregar fila de totales
  const totalGuests = event.rsvps.reduce((sum, r) => sum + r.guestCount, 0);
  data.push({
    "#": data.length + 1,
    "Nombre": "TOTAL",
    "Personas": totalGuests,
    "Dieta": "",
    "Canción": "",
    "Fecha confirmación": `${event.rsvps.length} confirmaciones`,
  });

  // Crear workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Confirmados");

  // Ajustar ancho de columnas
  ws["!cols"] = [
    { wch: 5 },  // #
    { wch: 30 }, // Nombre
    { wch: 10 }, // Personas
    { wch: 20 }, // Dieta
    { wch: 30 }, // Canción
    { wch: 18 }, // Fecha
  ];

  // Generar buffer
  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  // Devolver como descarga
  const filename = `confirmados-${event.slug}-${new Date().toISOString().split("T")[0]}.xlsx`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
