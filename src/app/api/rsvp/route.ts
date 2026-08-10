import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, guestName, guestCount, dietaryNotes, songRequest, confirmed, tableNumber } = body;

    // We save the RSVP to the database
    const newRsvp = await prisma.rSVP.create({
      data: {
        eventId: eventId || "cm0a1b2c3d4e5f6g7h8i9j0k", // Placeholder event ID for testing if none provided
        guestName,
        guestCount: parseInt(guestCount) || 1,
        dietaryNotes: dietaryNotes || "",
        songRequest: songRequest || "",
        confirmed: confirmed === 'Si' || confirmed === true,
        tableNumber: tableNumber || null,
      },
    });

    return NextResponse.json({ success: true, rsvp: newRsvp }, { status: 201 });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json({ success: false, error: "Error saving RSVP" }, { status: 500 });
  }
}
