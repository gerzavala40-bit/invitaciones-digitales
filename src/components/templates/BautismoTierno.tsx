"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#F4F7FA", bgSoft: "#E8EEF4", bgCard: "#FFFFFF",
  text: "#1E2A38", textMuted: "rgba(30,42,56,.5)",
  accent: "#5B8FA8", accentDeep: "#4A7A92",
  gold: "#8BA4B5", goldSoft: "#5B8FA8",
  line: "rgba(30,42,56,.1)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(91,143,168,.12), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(91,143,168,.06), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(91,143,168,.12), transparent 50%), #F4F7FA",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(91,143,168,.12), transparent 50%), #F4F7FA",
  musicBtnBg: "rgba(244,247,250,.9)", btnPrimaryColor: "#fff",
  splashOrnament: "\u2601\ufe0f", splashKicker: "Bautismo",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Bautismo",
  getInitials: (e) => e.title[0] || "B",
  getSplashTitle: (e) => e.title,
  closingQuote: () => "Un peque\u00f1o \u00e1ngel a bautizar\u2026",
  scriptPhrase: () => "Un peque\u00f1o \u00e1ngel a bautizar\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Elegante sport", pills: ["Celeste", "Blanco", "Pastel"] }),
};

export default function BautismoTierno({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
