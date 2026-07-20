# TeInvitoApp - Invitaciones Digitales Interactivas

Plataforma SaaS para crear invitaciones digitales interactivas.

## Stack

- **Frontend/Backend:** Next.js 16 + Tailwind CSS
- **Database:** PostgreSQL (Supabase) con Prisma ORM
- **Payments:** MercadoPago Checkout Pro
- **Deploy:** Vercel
- **Auth:** Custom con bcrypt + cookies HttpOnly

## Inicio rápido (desarrollo local)

```bash
git clone https://github.com/gerzavala40-bit/invitaciones-digitales.git
cd invitaciones-digitales
npm install
cp .env.example .env
# Editá .env con tus credenciales reales
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

## URLs

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page de venta |
| `/login` | Login admin |
| `/admin` | Panel de administración (protegido) |
| `/admin/events/new` | Crear nuevo evento |
| `/admin/events/[id]` | Ver RSVPs + Exportar Excel |
| `/[slug]` | Invitación pública del evento |

## Templates disponibles (5)

1. **elegant-dark** - Fondo oscuro, dorado, glassmorphism
2. **floral-light** - Crema, rosa, elegante para bodas
3. **minimal-white** - Blanco y negro, ultra limpio
4. **rustic-kraft** - Textura papel kraft, tonos madera
5. **modern-gradient** - Gradiente violeta/rosa, bold

## Variables de entorno requeridas

Ver `.env.example` para la lista completa.

## Seguridad implementada

- Middleware de autenticación en rutas admin
- Rate limiting en login (5 intentos/15 min) y RSVP (5/5 min)
- Validación Zod en todos los endpoints
- Cabeceras HTTP de seguridad (CSP, HSTS, X-Frame-Options, etc.)
- Verificación HMAC en webhook de MercadoPago
- Cookies HttpOnly, Secure, SameSite=strict
- Passwords hasheados con bcrypt (factor 12)
- Sin exposición de errores internos en producción

## Generar hash de password admin

```bash
node -e "require('bcryptjs').hash('TU-PASSWORD', 12).then(h => console.log(h))"
```

Copiar el resultado y ponerlo en `ADMIN_PASSWORD_HASH` en Vercel.



