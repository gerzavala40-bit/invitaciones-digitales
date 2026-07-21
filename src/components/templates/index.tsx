import { EventData } from "./types";
import ElegantDark from "./ElegantDark";
import FloralLight from "./FloralLight";
import MinimalWhite from "./MinimalWhite";
import RusticKraft from "./RusticKraft";
import ModernGradient from "./ModernGradient";
import JuliaXV from "./JuliaXV";
import NocheDorada from "./NocheDorada";
import CamilaGlam from "./CamilaGlam";
import BautismoTierno from "./BautismoTierno";
import GalaCorporativa from "./GalaCorporativa";

export const TEMPLATES = {
  "elegant-dark": { name: "Elegante Oscuro", component: ElegantDark, description: "Boda oscura con dorado, pantalla de bienvenida" },
  "noche-dorada": { name: "Noche Dorada", component: NocheDorada, description: "Boda oscura premium con splash y cuenta regresiva" },
  "floral-light": { name: "Floral Claro", component: FloralLight, description: "Crema, rosa, elegante para bodas" },
  "minimal-white": { name: "Minimalista", component: MinimalWhite, description: "Blanco y negro, ultra limpio" },
  "rustic-kraft": { name: "Rústico", component: RusticKraft, description: "Textura papel kraft, tonos madera" },
  "modern-gradient": { name: "Moderno Gradiente", component: ModernGradient, description: "Gradiente violeta/rosa, bold" },
  "julia-xv": { name: "Julia XV", component: JuliaXV, description: "15 Años, fondo claro, tipografía Montserrat, limpio" },
  "camila-glam": { name: "15 Años Glam", component: CamilaGlam, description: "15 años oscuro, rosa y dorado, pantalla de bienvenida" },
  "bautismo-tierno": { name: "Bautismo Tierno", component: BautismoTierno, description: "Bautismo fondo claro, celeste, pantalla de bienvenida" },
} as const;

export type TemplateId = keyof typeof TEMPLATES;

export default function InvitationTemplate({ event }: { event: EventData }) {
  const templateId = event.templateId as TemplateId;
  const template = TEMPLATES[templateId] || TEMPLATES["elegant-dark"];
  const Component = template.component;
  return <Component event={event} />;
}
