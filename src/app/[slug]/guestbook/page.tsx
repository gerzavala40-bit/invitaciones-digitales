import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Guestbook from "@/components/features/Guestbook";
import type { EventData } from "@/components/templates/types";

export const dynamic = "force-dynamic";

export default async function GuestbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const event = await prisma.event.findUnique({
    where: { slug, isActive: true },
    include: { messages: { orderBy: { createdAt: "desc" } } },
  });

  if (event && slug === '15anos-clara') {
    event.guestbookEnabled = true;
  }

  if (!event || !event.guestbookEnabled) notFound();

  // Convert dates to string for client component
  const eventData: EventData = {
    ...event,
    eventDate: event.eventDate.toISOString(),
    photos: [],
  } as unknown as EventData;

  return (
    <main className="min-h-screen bg-[#f4f9fd] text-[#01132b] py-12 px-4" style={{ fontFamily: "var(--font-sans)" }}>
      <style>{`
        .clara-guestbook h2 { font-family: var(--font-display); color: #0a2d52; text-transform: uppercase; font-weight: 500; }
        .clara-guestbook .bg-white\\/5 { background: #ffffff !important; border: 1px solid var(--line, rgba(0,0,0,0.1)) !important; color: #01132b !important; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .clara-guestbook .bg-black\\/20 { background: #f4f9fd !important; border: 1px solid rgba(10, 45, 82, 0.2) !important; color: #01132b !important; font-family: var(--font-sans); }
        .clara-guestbook input::placeholder, .clara-guestbook textarea::placeholder { color: #0a2d52; opacity: 0.5; }
        .clara-guestbook button[type="submit"] { background: linear-gradient(135deg, #0a2d52, #184678) !important; color: white !important; border-radius: 999px !important; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.16em; font-weight: 600; padding: 1rem 1.75rem !important; }
        .clara-guestbook .text-green-400 { color: #0a2d52 !important; font-weight: 600; font-family: var(--font-display); }
        .clara-guestbook p.opacity-60 { color: var(--gold, #c4a661) !important; opacity: 1 !important; font-weight: 600 !important; font-size: 0.85rem; }
        .clara-guestbook .italic { font-family: var(--font-sans); }
      `}</style>
      <div className="max-w-2xl mx-auto clara-guestbook text-center">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-80 hover:opacity-100 uppercase tracking-widest font-bold text-[#0a2d52]">
          ← Volver a la invitación
        </a>
        <Guestbook event={eventData} />
      </div>
    </main>
  );
}
