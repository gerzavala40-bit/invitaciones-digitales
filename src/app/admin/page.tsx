import { prisma } from "@/lib/prisma";
import { EventStats } from "@/components/admin/EventStats";
import { EventsList } from "@/components/admin/EventsList";
import { RecentRSVPs } from "@/components/admin/RecentRSVPs";
import { QuickActions } from "@/components/admin/QuickActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { rsvps: true } } },
  });

  const totalEvents = events.length;
  const activeEvents = events.filter((e) => e.isActive).length;
  const totalRsvps = events.reduce((sum, e) => sum + (e._count?.rsvps || 0), 0);

  // Obtener RSVPs recientes de todos los eventos
  const recentRsvpsRaw = await prisma.rSVP.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { event: { select: { title: true } } }
  });

  const recentRsvps = recentRsvpsRaw.map(r => ({
    guestName: r.guestName,
    eventName: r.event.title,
    guestCount: r.guestCount,
    confirmed: r.confirmed,
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30 font-sans relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white/90">Panel Admin</h1>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <EventStats 
          totalEvents={totalEvents} 
          activeEvents={activeEvents} 
          totalRsvps={totalRsvps} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EventsList events={events} />
          </div>
          <div className="space-y-6 flex flex-col">
            <div className="flex-1"><QuickActions /></div>
            <div className="flex-1"><RecentRSVPs rsvps={recentRsvps} /></div>
          </div>
        </div>
      </main>
    </div>
  );
}
