import TemplateDespedida from "@/components/templates/TemplateDespedida";
import type { EventData } from "@/components/templates/types";

export const dynamic = "force-dynamic";

export default function DemoDespedidaPage() {
  const demoEvent: EventData = {
    id: "demo-despedida",
    slug: "demo-despedida",
    title: "Julieta",
    subtitle: "Despedida de Soltera VIP",
    eventType: "despedida",
    eventDate: new Date("2026-11-20T22:00:00-03:00").toISOString(),
    eventTime: "22:00",
    venueName: "Bar La Previa",
    venueAddress: "Av. Libertador 1234, Buenos Aires",
    venueLatLng: "-34.588, -58.399",
    templateId: "despedida-neon",
    primaryColor: "#FF6B9D",
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    phrase: "Lo que pasa en la despedida... no se sube a Instagram.",
    dressCode: "Total Black",
    bankAlias: "juli.despedida.mp",
    bankHolder: "Julieta Martinez",
    rsvpEnabled: true,
    isActive: true,
    guestbookEnabled: true,
    isTrial: false,
    photos: [
      { url: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80", order: 1 },
      { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80", order: 2 },
      { url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80", order: 3 },
    ],
    timeline: [
      { id: "1", time: "22:00", title: "Previa", description: "Arrancamos tranqui en el bar", order: 1 },
      { id: "2", time: "00:00", title: "Cena Bizarra", description: "Juegos y sorpresas", order: 2 },
      { id: "3", time: "02:00", title: "Boliche", description: "Hasta que salga el sol", order: 3 },
    ],
  };

  return <TemplateDespedida event={demoEvent} />;
}
