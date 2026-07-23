# 📸 TODO: Implementación Oficial de Party Cam

> **Nota para el Asistente AI futuro:** Si el usuario (Germán) te pide "Terminar la Party Cam", debes seguir exactamente los pasos descritos en este documento para pasar de la demo en memoria a la infraestructura real en producción.

## Estado Actual
Actualmente existe una **versión Demo** de Party Cam (Muro Social) implementada en:
- `/api/demo-wall/route.ts` (Guarda en memoria temporal `global.demoPhotos`)
- `/demo-wall/upload/page.tsx`
- `/demo-wall/pantalla/page.tsx`

La base de datos `schema.prisma` ya fue actualizada en el paso previo añadiendo los campos: `uploaderName`, `isApproved`, `createdAt` al modelo `Photo`.

## Pasos para la Implementación en Producción

### 1. Actualizar la Base de Datos
- Pedirle al usuario que consiga o verifique la conexión a PostgreSQL (variable `DIRECT_URL` y `DATABASE_URL` en Vercel o local).
- Correr `npx prisma db push` para aplicar los cambios del modelo `Photo` en la base de datos real.

### 2. Configurar Cloud Storage (Almacenamiento)
- Decidir con el usuario qué servicio usar: **Vercel Blob** (recomendado por ser Next.js), **Cloudinary** o **AWS S3**.
- Instalar SDK correspondiente (ej. `@vercel/blob`).
- Agregar las variables de entorno necesarias.

### 3. Crear las Páginas y APIs Dinámicas
Hay que reemplazar las rutas estáticas de la demo por rutas dinámicas amarradas a un Evento específico:
- Crear `/app/upload/[slug]/page.tsx` (Para que el invitado suba fotos leyendo el `eventId` vinculado a ese `slug`).
- Crear `/app/wall/[slug]/page.tsx` (La pantalla gigante del proyector, que hace fetch solo de las fotos de ese `slug`).
- Crear `/app/api/upload/route.ts` (Recibe la foto comprimida en base64 o formData, la sube al Cloud Storage, obtiene la URL pública, y hace un `prisma.photo.create()` guardando la URL y el `eventId`).
- Crear `/app/api/wall/[slug]/route.ts` (Endpoint que hace polling buscando las fotos más recientes de ese evento en Prisma).

### 4. Compresión de Imagen en el Cliente
- En `/app/upload/[slug]/page.tsx`, antes de enviar la foto por fetch, usar un Canvas en el navegador para achicar la imagen (max 1080px de ancho/alto) y bajarle la calidad a 0.7 en formato JPEG/WEBP. Esto ahorrará muchísimo ancho de banda tanto al usuario como a la base de datos.

### 5. Limpieza
- Una vez testeado en producción, eliminar la carpeta `/demo-wall` y `/api/demo-wall` para no dejar código basura en el proyecto.
