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
    <>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.7
        }}
      >
        <source src="/mariposas.mp4" type="video/mp4" />
      </video>
      <main className="min-h-screen py-12 px-4" style={{ fontFamily: "var(--font-sans)", color: "#ffffff", background: "transparent" }}>
      <style>{`
        .clara-guestbook h2 { font-family: var(--font-display); color: #ffffff; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; text-shadow: 1px 1px 4px rgba(0,0,0,0.3); }
        .clara-guestbook .bg-white\\/5 { background: rgba(0,0,0,0.2) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: #ffffff !important; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .clara-guestbook .bg-black\\/20 { background: rgba(0,0,0,0.3) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #ffffff !important; font-family: var(--font-sans); }
        .clara-guestbook input, .clara-guestbook textarea { color: #ffffff !important; }
        .clara-guestbook input::placeholder, .clara-guestbook textarea::placeholder { color: rgba(255,255,255,0.6); }
        .clara-guestbook button[type="submit"] { background: linear-gradient(135deg, #C4A661, #D4AF37) !important; color: #ffffff !important; border-radius: 999px !important; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.16em; font-weight: 600; padding: 1rem 1.75rem !important; box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important; }
        .clara-guestbook .text-green-400 { color: #ffffff !important; font-weight: 900; font-family: var(--font-display); }
        .clara-guestbook p.opacity-60 { color: #C4A661 !important; opacity: 1 !important; font-weight: 600 !important; font-size: 0.85rem; }
        .clara-guestbook .italic { font-family: var(--font-sans); color: rgba(255,255,255,0.8); }
        .clara-guestbook form label { color: #ffffff !important; }
      `}</style>
      <div className="max-w-2xl mx-auto clara-guestbook text-center">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-90 hover:opacity-100 uppercase tracking-widest font-bold text-white drop-shadow-md">
          ← Volver a la invitación
        </a>
        <Guestbook event={eventData} />
      </div>
    </main>
    </>
  );
}
