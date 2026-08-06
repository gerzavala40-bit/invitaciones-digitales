import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const recent = await prisma.rSVP.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { event: { select: { title: true } } }
    });

    const data = recent.map(r => ({
      guestName: r.guestName,
      eventName: r.event.title,
      guestCount: r.guestCount,
      confirmed: r.confirmed,
    }));

    return NextResponse.json({ success: true, rsvps: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch rsvps' }, { status: 500 });
  }
}
