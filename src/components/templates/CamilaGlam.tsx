"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#1A0A14", bgSoft: "#2A1220", bgCard: "#321828",
  text: "#FFF5F8", textMuted: "rgba(255,245,248,.55)",
  accent: "#E85A8C", accentDeep: "#C23B72",
  gold: "#E8C878", goldSoft: "#F0D89A",
  line: "rgba(255,245,248,.12)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(232,90,140,.2), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(232,200,120,.08), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(232,90,140,.2), transparent 50%), #1A0A14",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(232,90,140,.2), transparent 50%), #1A0A14",
  musicBtnBg: "rgba(26,10,20,.8)", btnPrimaryColor: "#fff",
  splashOrnament: "\u2726", splashKicker: "Mis XV",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Mis XV",
  getInitials: () => "XV",
  getSplashTitle: (e) => e.title,
  closingQuote: () => "Brillemos juntos\u2026",
  scriptPhrase: () => "Que comience la magia\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Formal / Gala", pills: ["Rosa", "Dorado", "Negro"] }),
};

export default function CamilaGlam({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
