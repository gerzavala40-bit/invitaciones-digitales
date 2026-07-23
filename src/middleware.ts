import { NextRequest, NextResponse } from "next/server";

// Rutas protegidas que requieren autenticación admin
const PROTECTED_ROUTES = ["/admin", "/api/events", "/api/rsvp/export"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta requiere autenticación
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Verificar cookie de sesión
  const session = request.cookies.get("admin_session");
  const secret = process.env.NEXTAUTH_SECRET;
  
  if (!secret && process.env.NODE_ENV === "production") {
    // Si no hay secreto en prod, bloquear TODO acceso a rutas seguras
    return NextResponse.json({ error: "Falta configuración de seguridad" }, { status: 500 });
  }

  const expectedToken = secret ? btoa(secret).slice(0, 32) : btoa("dev-secret").slice(0, 32);

  if (!session || session.value !== expectedToken) {
    // Si es una API, devolver 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    // Si es una página, redirigir a login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/events/:path*", "/api/rsvp/export/:path*"],
};
