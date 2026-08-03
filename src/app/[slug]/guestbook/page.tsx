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

  if (!event || !event.guestbookEnabled) notFound();

  // Convert dates to string for client component
  const eventData: EventData = {
    ...event,
    eventDate: event.eventDate.toISOString(),
    photos: [],
  } as unknown as EventData;

  return (
    <main className="min-h-screen bg-[#f4f9fd] text-[#01132b] py-12 px-4" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="max-w-2xl mx-auto">
        <a href={`/${slug}`} className="text-sm underline mb-8 block opacity-80 hover:opacity-100 uppercase tracking-widest font-bold text-[#0a2d52]">
          ← Volver a la invitación
        </a>
        <div className="bg-[#0a2d52] rounded-[12px] p-6 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-white">
          <Guestbook event={eventData} className="text-white" />
        </div>
      </div>
    </main>
  );
}
