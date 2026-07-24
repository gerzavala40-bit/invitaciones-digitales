import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Te Invito | Agencia de Invitaciones Digitales a Medida",
  description: "Invitaciones web interactivas para bodas, 15 años y eventos. Sorprendé a tus invitados con cuenta regresiva, confirmación de asistencia (RSVP) y mapas en un solo link.",
  keywords: ["invitaciones digitales", "tarjetas virtuales", "casamiento", "15 años", "boda", "invitacion web"],
  openGraph: {
    title: "Te Invito | Invitaciones Digitales a Medida",
    description: "La forma más elegante e interactiva de invitar. Cuenta regresiva, mapas y RSVP integrados.",
    url: "https://www.teinvitoapp.com.ar",
    siteName: "Te Invito App",
    images: [
      {
        url: "https://www.teinvitoapp.com.ar/og-image.jpg", // TODO: Asegurar que exista una imagen en public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Te Invito - Invitaciones Digitales",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Te Invito | Invitaciones Digitales",
    description: "Invitaciones web interactivas para tu próximo evento.",
  },
};

import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        
        {/* Google Ads Tracking */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-18347198797" />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18347198797');
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
