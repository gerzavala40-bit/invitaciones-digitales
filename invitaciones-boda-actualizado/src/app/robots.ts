import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Evitamos que Google indexe rutas privadas o paneles de admin
    },
    sitemap: "https://www.teinvitoapp.com.ar/sitemap.xml",
  };
}
