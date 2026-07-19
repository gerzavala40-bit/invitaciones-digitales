import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate unique slug
    let slug = slugify(`${body.eventType || "evento"}-${body.title}`);
    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const event = await prisma.event.create({
      data: {
        slug,
        userId: body.userId || "admin",
        title: body.title,
        subtitle: body.subtitle || null,
        eventType: body.eventType || "boda",
        eventDate: new Date(body.eventDate),
        eventTime: body.eventTime,
        venueName: body.venueName,
        venueAddress: body.venueAddress,
        venueLatLng: body.venueLatLng || null,
        ceremonyName: body.ceremonyName || null,
        ceremonyAddress: body.ceremonyAddress || null,
        ceremonyLatLng: body.ceremonyLatLng || null,
        ceremonyTime: body.ceremonyTime || null,
        templateId: body.templateId || "elegant-dark",
        primaryColor: body.primaryColor || "#d4af37",
        musicUrl: body.musicUrl || null,
        phrase: body.phrase || null,
        dressCode: body.dressCode || null,
        hashtag: body.hashtag || null,
        bankAlias: body.bankAlias || null,
        bankCBU: body.bankCBU || null,
        bankHolder: body.bankHolder || null,
        rsvpEnabled: body.rsvpEnabled ?? true,
        rsvpDeadline: body.rsvpDeadline || null,
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
