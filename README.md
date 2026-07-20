# Invitaciones Digitales - SaaS Platform

Plataforma SaaS para crear invitaciones digitales interactivas.

## Stack

- **Frontend:** Next.js 14 + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (dev) / PostgreSQL (prod) con Prisma ORM
- **Deploy:** Vercel

## Inicio rapido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Crear base de datos y seed
npx prisma db push
npx tsx prisma/seed.ts

# Iniciar servidor de desarrollo
npm run dev
```

## URLs

- `/` - Landing page de venta
- `/admin` - Panel de administracion
- `/admin/events/new` - Crear nuevo evento
- `/[slug]` - Invitacion publica del evento

## Templates disponibles

1. **Elegant Dark** - Fondo oscuro, dorado, glassmorphism
2. **Floral Light** - Crema, rosa, elegante para bodas
3. **Minimal White** - Blanco y negro, ultra limpio

## Eventos demo

Despues del seed tenes 3 eventos:
- `/boda-valentina-y-matias` (template elegant-dark)
- `/boda-luciana-y-gonzalo` (template floral-light)
- `/cumple-30-martin` (template minimal-white)

