# Contexto del Proyecto Te Invito App

Este archivo contiene el contexto general del proyecto para que la IA lo recuerde en todas las sesiones futuras.

## Estructura
- El repositorio principal de Next.js está en `C:\Te invitoapp\invitaciones-digitales`.
- El repositorio remoto de GitHub es: `https://github.com/gerzavala40-bit/invitaciones-digitales`.
- Las demos en HTML puro se guardan tanto en `C:\Te invitoapp\demos` como en `C:\Te invitoapp\invitaciones-digitales\public` para ser servidas estáticamente.
- Para que Vercel tome los cambios de las demos, es necesario hacer `git add`, `git commit` y `git push` en la carpeta del repositorio de Next.js.
- El panel de administrador real del sistema se encuentra en las rutas `/dashboard` (Dashboard general) y `/dashboard/events/[id]` (Panel de un evento específico). El inicio de sesión está en `/cliente/login`.

## Directrices de Desarrollo
- La estética de las tarjetas debe ser móvil primero (mobile-first), elegante, dinámica y utilizar colores acordes a la temática.
- Los archivos HTML estáticos deben tener sus estilos (Tailwind CDN) configurados localmente y Next.js tiene ajustado su `Content-Security-Policy` en `next.config.ts` para permitir Tailwnind, Three.js y otros CDNs necesarios.
- Cualquier modificación a los archivos `public/*.html` debe copiarse a la carpeta externa de demos como respaldo.
