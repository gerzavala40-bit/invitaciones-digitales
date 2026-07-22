import type { NextConfig } from "next";

const securityHeaders = [
  // Permitir iframes del mismo origen para las demos
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevenir MIME type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controlar referrer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desactivar permisos innecesarios
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Forzar HTTPS
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Prevenir XSS en navegadores viejos
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.mercadopago.com https://*.supabase.co",
      "frame-src 'self' https://*.mercadopago.com.ar https://*.mercadopago.com",
      "media-src 'self' https: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Headers adicionales para APIs - sin cache
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
  // Limitar tamaño de body en API routes (Next.js 14+)
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
    },
  },
  // No exponer powered-by header
  poweredByHeader: false,
};

export default nextConfig;
