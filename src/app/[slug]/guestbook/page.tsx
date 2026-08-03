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
    <main className="min-h-screen py-12 px-4" style={{ fontFamily: "var(--font-sans)", background: "linear-gradient(to bottom, #F0F6FA 0%, #C1DFF0 100%)", color: "#5A6B7C" }}>
      <style>{`
        .clara-guestbook h2 { font-family: var(--font-display); color: #3B7EAE; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; }
        .clara-guestbook .bg-white\\/5 { background: #ffffff !important; border: 1px solid var(--line, rgba(0,0,0,0.1)) !important; color: #5A6B7C !important; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
        .clara-guestbook .bg-black\\/20 { background: #F0F6FA !important; border: 1px solid rgba(59, 126, 174, 0.2) !important; color: #5A6B7C !important; font-family: var(--font-sans); }
        .clara-guestbook input::placeholder, .clara-guestbook textarea::placeholder { color: #5A6B7C; opacity: 0.5; }
        .clara-guestbook button[type="submit"] { background: linear-gradient(135deg, #CDE8F9, #9DCFEF) !important; color: #3B7EAE !important; border-radius: 999px !important; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.16em; font-weight: 600; padding: 1rem 1.75rem !important; }
        .clara-guestbook .text-green-400 { color: #3B7EAE !important; font-weight: 900; font-family: var(--font-display); }
        .clara-guestbook p.opacity-60 { color: #C4A661 !important; opacity: 1 !important; font-weight: 600 !important; font-size: 0.85rem; }
        .clara-guestbook .italic { font-family: var(--font-sans); }
        .clara-guestbook form label { color: #5A6B7C !important; }
      `}</style>
      <div className="max-w-2xl mx-auto clara-guestbook text-center">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-80 hover:opacity-100 uppercase tracking-widest font-bold text-[#3B7EAE]">
          ← Volver a la invitación
        </a>
        <Guestbook event={eventData} />
      </div>
    </main>
  );
}
