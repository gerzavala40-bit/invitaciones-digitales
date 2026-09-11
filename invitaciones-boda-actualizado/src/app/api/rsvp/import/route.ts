import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Parse JSON from sheet
    const data = XLSX.utils.sheet_to_json(worksheet) as any[];

    let updatedCount = 0;

    for (const row of data) {
      const id = row["ID_SISTEMA"];
      const tableNumber = row["Mesa"] ? String(row["Mesa"]).trim() : null;

      if (id && id !== "") {
        try {
          await prisma.rSVP.update({
            where: { id },
            data: { tableNumber },
          });
          updatedCount++;
        } catch (e) {
          console.error(`Error updating RSVP ${id}:`, e);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se actualizaron ${updatedCount} invitados.` 
    });

  } catch (error) {
    console.error("Error importando Excel:", error);
    return NextResponse.json({ error: "Error procesando el archivo" }, { status: 500 });
  }
}
