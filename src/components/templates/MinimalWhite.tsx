"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#FAFAF8", bgSoft: "#F0F0EC", bgCard: "#FFFFFF",
  text: "#1A1A1A", textMuted: "rgba(26,26,26,.5)",
  accent: "#2C2C2C", accentDeep: "#111111",
  gold: "#6B6B6B", goldSoft: "#444444",
  line: "rgba(26,26,26,.1)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,.04), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(0,0,0,.02), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(0,0,0,.04), transparent 50%), #FAFAF8",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,.04), transparent 50%), #FAFAF8",
  musicBtnBg: "rgba(250,250,248,.9)", btnPrimaryColor: "#fff",
  splashOrnament: "\u2014", splashKicker: "Celebraci\u00f3n",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Cumplea\u00f1os",
  getInitials: (e) => e.title[0] || "?",
  getSplashTitle: (e) => e.title,
  closingQuote: () => "Compartamos este momento especial\u2026",
  scriptPhrase: () => "Compartamos este momento especial\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Smart casual", pills: ["Negro", "Blanco", "Minimalista"] }),
};

export default function MinimalWhite({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
