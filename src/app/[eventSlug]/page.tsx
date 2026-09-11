import { notFound } from "next/navigation";
import { getEventData } from "@/lib/data-fetcher";
import HeaderHero from "@/components/modules/HeaderHero";
import PhraseSection from "@/components/modules/PhraseSection";
import Timeline from "@/components/modules/Timeline";
import Locations from "@/components/modules/Locations";
import DressCodeSection from "@/components/modules/DressCodeSection";
import Gallery from "@/components/modules/Gallery";
import GiftSection from "@/components/modules/GiftSection";
import RsvpSection from "@/components/modules/RsvpSection";
import TicketSection from "@/components/modules/TicketSection";
import MusicSection from "@/components/modules/MusicSection";
import GuestbookSection from "@/components/modules/GuestbookSection";
import SocialSection from "@/components/modules/SocialSection";
import BrandFooter from "@/components/modules/BrandFooter";
import BottomNav from "@/components/modules/BottomNav";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ eventSlug: string }> }): Promise<Metadata> {
  const { eventSlug } = await params;
  
  if (eventSlug.startsWith("_") || eventSlug === "favicon.ico") return {};

  const eventData = await getEventData(eventSlug);
  if (!eventData) return {};

  const title = `Te Invito | ${eventData.header?.title || 'Invitación Especial'}`;
  const description = "¡Estás invitado! Hacé clic para ver todos los detalles, ubicación y confirmar tu asistencia.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.teinvitoapp.com.ar/${eventSlug}`,
      siteName: "Te Invito App",
    }
  };
}

export default async function EventPage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = await params;

  if (eventSlug.startsWith("_") || eventSlug === "favicon.ico") {
    notFound();
  }

  const eventData = await getEventData(eventSlug);

  if (!eventData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black flex justify-center w-full relative">
      
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/assets/videos/fondo-15-anos.mp4" type="video/mp4" />
        </video>
        {/* Overlays for dark theme readability */}
        <div className="absolute inset-0 bg-[#031326]/70"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }}></div>
      </div>

      <main 
        className="w-full max-w-[440px] min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col font-sans z-10"
        style={{
          "--bg-base": "transparent",
          "--text-main": "#FDFCF8",
          "--text-muted": "rgba(253, 252, 248, 0.65)",
          "--gold": "#D4C9BD",
          "--gold-accent": "#C2A878",
          "--accent": "#D4C9BD",
        } as React.CSSProperties}
      >
        <div id="inicio">
          {eventData.header && <HeaderHero data={eventData.header} />}
        </div>
        
        <PhraseSection data={{
          emotionalPhrase: eventData.header?.emotionalPhrase,
          hashtag: eventData.header?.hashtag
        }} />
        
        <div id="ubicacion">
          {eventData.locations && <Locations data={eventData.locations} />}
        </div>

        {eventData.timeline && (
          <Timeline data={eventData.timeline} />
        )}

        <DressCodeSection />
        
        <div id="galeria">
          {eventData.gallery && (
            <Gallery data={eventData.gallery} />
          )}
        </div>

        {(eventData.music as any) && (
          <MusicSection data={eventData.music as any} />
        )}
        
        {eventData.details?.ticket && (
          <TicketSection data={eventData.details.ticket as any} />
        )}

        <div id="regalos">
          {eventData.details?.gifts && <GiftSection data={eventData.details.gifts} />}
        </div>
        
        <div id="asistencia">
          {eventData.rsvp && <RsvpSection data={eventData.rsvp} />}
        </div>

        {(eventData.guestbook as any) && (
          <GuestbookSection data={eventData.guestbook as any} />
        )}

        {/* Footer Comercial */}
        {(eventData.brandFooter as any) && (
          <BrandFooter data={eventData.brandFooter as any} />
        )}

        {/* Floating Navigation */}
        <BottomNav />
      </main>
    </div>
  );
}
