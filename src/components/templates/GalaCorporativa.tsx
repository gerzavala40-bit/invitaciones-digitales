"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#0B1220", bgSoft: "#121A2C", bgCard: "#1A2438",
  text: "#E8EEF8", textMuted: "rgba(232,238,248,.55)",
  accent: "#5B8DEF", accentDeep: "#3A6FD8",
  gold: "#8BB0F0", goldSoft: "#A8C4F5",
  line: "rgba(232,238,248,.12)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(91,141,239,.15), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(91,141,239,.06), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(91,141,239,.15), transparent 50%), #0B1220",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(91,141,239,.15), transparent 50%), #0B1220",
  musicBtnBg: "rgba(11,18,32,.8)", btnPrimaryColor: "#fff",
  splashOrnament: "\u25c6", splashKicker: "Evento corporativo",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Evento corporativo",
  getInitials: (e) => e.title[0] || "?",
  getSplashTitle: (e) => e.title,
  closingQuote: () => "Los esperamos para celebrar los logros\u2026",
  scriptPhrase: () => "Una noche para celebrar juntos\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Elegante sport / Formal", pills: ["Azul marino", "Plata", "Gala"] }),
};

export default function GalaCorporativa({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
