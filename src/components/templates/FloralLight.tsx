"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#F7F1E8", bgSoft: "#EFE6D6", bgCard: "#FFFFFF",
  text: "#2C241C", textMuted: "rgba(44,36,28,.55)",
  accent: "#B86B5A", accentDeep: "#9A5548",
  gold: "#A67C2A", goldSoft: "#8B6914",
  line: "rgba(44,36,28,.12)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(184,107,90,.12), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(166,124,42,.08), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(184,107,90,.12), transparent 50%), #F7F1E8",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(184,107,90,.12), transparent 50%), #F7F1E8",
  musicBtnBg: "rgba(247,241,232,.9)", btnPrimaryColor: "#fff",
  splashOrnament: "\u2740", splashKicker: "Nos casamos",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Nos casamos",
  getInitials: (e) => { const [a, b] = e.title.split("&"); return `${(a||"?").trim()[0]}&${(b||"?").trim()[0]}`; },
  getSplashTitle: (e) => {
    const [a, b] = e.title.split("&");
    return <>{a?.trim()}<br /><span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: ".55em", color: "#B86B5A" }}>&amp;</span><br />{b?.trim()}</>;
  },
  closingQuote: () => "Que florezca el amor entre ustedes\u2026",
  scriptPhrase: () => "Que florezca el amor entre ustedes\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Elegante Jard\u00edn", pills: ["Crema", "Terracota", "Verde salvia"] }),
};

export default function FloralLight({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
