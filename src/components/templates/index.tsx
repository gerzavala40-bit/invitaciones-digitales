import { EventData } from "./types";
import ElegantDark from "./ElegantDark";
import FloralLight from "./FloralLight";
import MinimalWhite from "./MinimalWhite";
import RusticKraft from "./RusticKraft";
import ModernGradient from "./ModernGradient";

export const TEMPLATES = {
  "elegant-dark": { name: "Elegante Oscuro", component: ElegantDark, description: "Fondo oscuro, dorado, glassmorphism" },
  "floral-light": { name: "Floral Claro", component: FloralLight, description: "Crema, rosa, elegante para bodas" },
  "minimal-white": { name: "Minimalista", component: MinimalWhite, description: "Blanco y negro, ultra limpio" },
  "rustic-kraft": { name: "Rústico", component: RusticKraft, description: "Textura papel kraft, tonos madera" },
  "modern-gradient": { name: "Moderno Gradiente", component: ModernGradient, description: "Gradiente violeta/rosa, bold" },
} as const;

export type TemplateId = keyof typeof TEMPLATES;

export default function InvitationTemplate({ event }: { event: EventData }) {
  const templateId = event.templateId as TemplateId;
  const template = TEMPLATES[templateId] || TEMPLATES["elegant-dark"];
  const Component = template.component;
  return <Component event={event} />;
}
