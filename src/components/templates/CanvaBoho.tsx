"use client";
import BaseTemplate, { TemplatePalette, TemplateConfig } from "./BaseTemplate";
import { EventData } from "./types";

const palette: TemplatePalette = {
  bg: "#F4F2EE", bgSoft: "#EAE5DC", bgCard: "#FFFFFF",
  text: "#2C2A28", textMuted: "rgba(44,42,40,.6)",
  accent: "#BEAB8E", accentDeep: "#A59072",
  gold: "#BEAB8E", goldSoft: "#D3C3A7",
  line: "rgba(44,42,40,.1)",
  splashBefore: "radial-gradient(ellipse at 50% 30%, rgba(190,171,142,.15), transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(190,171,142,.08), transparent 45%)",
  heroBg: "radial-gradient(ellipse at 50% 20%, rgba(190,171,142,.15), transparent 50%), #F4F2EE",
  closeBg: "radial-gradient(ellipse at 50% 55%, rgba(190,171,142,.15), transparent 50%), #F4F2EE",
  musicBtnBg: "rgba(244,242,238,.9)", btnPrimaryColor: "#2C2A28",
  splashOrnament: "\u273F", splashKicker: "Nos casamos",
};

const config: TemplateConfig = {
  palette,
  getTitle: (e) => e.title,
  getKicker: () => "¡Nos casamos!",
  getInitials: (e) => { const [a, b] = e.title.split("&"); return `${(a||"?").trim()[0]}&${(b||"?").trim()[0]}`; },
  getSplashTitle: (e) => {
    const [a, b] = e.title.split("&");
    return <>{a?.trim()} <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: ".6em", color: "#BEAB8E" }}>&</span> {b?.trim()}</>;
  },
  closingQuote: () => "Los esperamos con muchas ganas de divertirse...",
  scriptPhrase: () => "¡Nos casamos!",
  dressCodeOverride: (e) => ({ name: e.dressCode || "Elegante Sport / Boho", pills: ["Beige", "Verde seco", "Terracota"] }),
};

export default function CanvaBoho({ event }: { event: EventData }) {
  // We can override the hero-photo styling in CSS to make it larger like the Canva example
  // and add a floral border if we had the image asset.
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-photo { width: 260px !important; height: 260px !important; border: 1px solid var(--gold) !important; padding: 4px; }
        .script { font-size: clamp(3rem, 10vw, 4rem) !important; color: var(--text) !important; }
        h1 { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; font-size: clamp(1.5rem, 6vw, 2rem) !important; color: var(--gold) !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
      `}} />
      <BaseTemplate event={event} config={config} />
    </>
  );
}
