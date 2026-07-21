"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#0C0A09", bgSoft: "#161210", bgCard: "#1C1612",
  text: "#F5EFE4", textMuted: "rgba(245,239,228,.55)",
  accent: "#C9A84C", accentDeep: "#A67C2A",
  gold: "#C9A84C", goldSoft: "#E8D5A3",
  line: "rgba(245,239,228,.12)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,.16), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(201,168,76,.06), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(201,168,76,.16), transparent 50%), #0C0A09",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(201,168,76,.16), transparent 50%), #0C0A09",
  musicBtnBg: "rgba(12,10,9,.8)", btnPrimaryColor: "#0C0A09",
  splashOrnament: "\u25c6", splashKicker: "Nos casamos",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "Nos casamos",
  getInitials: (e) => { const [a, b] = e.title.split("&"); return `${(a||"?").trim()[0]}&${(b||"?").trim()[0]}`; },
  getSplashTitle: (e) => {
    const [a, b] = e.title.split("&");
    return <>{a?.trim()}<br /><span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: ".55em", color: "#C9A84C" }}>&amp;</span><br />{b?.trim()}</>;
  },
  closingQuote: () => "Que brille el amor esta noche\u2026",
  scriptPhrase: () => "Que brille el amor esta noche\u2026",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Formal black tie", pills: ["Negro", "Dorado", "Elegante"] }),
};

export default function ElegantDark({ event }: { event: EventData }) {
  return <BaseTemplate event={event} config={config} />;
}
