import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalEvents = await prisma.event.count();
    const activeEvents = await prisma.event.count({ where: { isActive: true } });
    
    // Total RSVPs across all events
    const rsvps = await prisma.rSVP.aggregate({
      _count: { id: true }
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalEvents,
        activeEvents,
        totalRsvps: rsvps._count.id
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
