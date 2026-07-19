import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas /admin
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");
    const expectedToken = Buffer.from(process.env.NEXTAUTH_SECRET || "dev-secret").toString("base64").slice(0, 32);

    if (!session || session.value !== expectedToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
